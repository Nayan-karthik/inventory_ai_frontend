# StockAI Demand Forecasting Engine
## Architectural Design & Operational Specification (`forecast.md`)

---

## 1. Vision & Purpose

The primary objective of the **StockAI Demand Forecasting Engine** is to replace reactive inventory ordering with **proactive, predictive stock planning**. 

Traditional inventory models reorder only when stock drops below a fixed threshold. In seasonal retail, this leads to fatal stockouts: by the time an alert triggers during a surge (such as school reopening week or the holiday shopping rush), supplier lead times ensure that replacements arrive only *after* the peak shopping window has passed.

The forecasting engine solves this by projecting daily unit demand **30 days into the future**, allowing businesses to place supplier purchase orders with exact lead-time buffers.

---

## 2. Key Demand Drivers & Seasonality Patterns

The forecasting pipeline is calibrated around four real-world demand dynamics:

### 2.1. Back-to-School Cycles
- **Primary Surge (May, June, July)**:
  - Coincides with the end of summer vacations and the start of academic terms.
  - Categories affected: Backpacks, calculators, notebook bundles, student laptops, study lamps.
  - Demand intensity: **$3.0\times$ to $4.0\times$ baseline velocity**, peaking in mid-June.
- **Secondary Surge (January)**:
  - Winter break return and mid-year semester start.
  - Demand intensity: **$1.6\times$ to $2.0\times$ baseline velocity**.

### 2.2. Festival & Holiday Peaks
- **October (Diwali / Festive Kickoff)**:
  - Strong surge in corporate gifting, electronics, and festive hampers ($2.5\times$ to $4.0\times$).
- **November (Cyber Week / Black Friday)**:
  - Peak pre-holiday shopping surge across consumer electronics and accessories ($3.0\times$ to $4.5\times$).
- **December (Christmas & Year-End)**:
  - Maximum gifting and retail velocity ($3.5\times$ to $5.0\times$).
- **Early January (New Year Resolutions)**:
  - Surge in health, fitness, and productivity wearables ($2.0\times$ to $2.6\times$).

### 2.3. Intra-Week Seasonality (Weekend Effect)
- Consumer retail purchases surge on **Friday, Saturday, and Sunday** by $25\%$ to $40\%$ compared to mid-week trading (Tuesday/Wednesday).

### 2.4. Baseline Noise & Trends
- Annual cyclical sinusoidal curves modulated with Gaussian noise ($\mu = 0, \sigma = 1.8$) to mirror real consumer variance.

---

## 3. Forecasting Architecture

```
┌────────────────────────────────────────────────────────┐
│                   HISTORICAL SALES                     │
│         Daily Sales Ledger (sales.csv / DB)            │
│         [date, product_id, quantity_sold]              │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│             FEATURE ENGINEERING PIPELINE               │
│  - Calendar Flags: day_of_week, day, month, day_of_year│
│  - Seasonal Flags: is_school_reopen, is_holiday_season │
│  - Shopping Flags: is_weekend                          │
│  - Autoregressive Lags: lag_1, lag_7                   │
│  - Velocity Trend: rolling_7_mean                      │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│           MACHINE LEARNING MODEL ENSEMBLE              │
│               Random Forest Regressor                  │
│       - 150 Estimators, Max Depth: 12                  │
│       - Evaluated via 80/20 Chronological Split        │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│      AUTOREGRESSIVE 30-DAY RECURSIVE PROJECTION        │
│  - Predict t+1 using known features                    │
│  - Append t+1 to history as lag_1 for t+2              │
│  - Recalculate 7-day rolling window for t+3... t+30    │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                   OUTPUT ARTIFACTS                     │
│  1. forecast.csv (Date, SKU, Predicted Demand)         │
│  2. forecast_metrics.csv (MAE, RMSE, MAPE, Accuracy)   │
│  3. Fed into restock.py for Purchase Order Generation  │
└────────────────────────────────────────────────────────┘
```

---

## 4. Feature Engineering Specifications

For every product SKU, the raw historical sales series is transformed into a rich tabular feature matrix:

| Feature Name | Type | Description | Purpose |
| :--- | :--- | :--- | :--- |
| `day_of_week` | Integer (0–6) | Monday = 0, Sunday = 6 | Captures weekly shopping cycles |
| `day_of_month`| Integer (1–31)| Day of the calendar month | Captures salary/payday spending spikes |
| `month` | Integer (1–12)| Month of the year | Captures broad seasonal shifts |
| `day_of_year` | Integer (1–365)| Sequential day of the year | Captures smooth annual periodicity |
| `is_school_reopen` | Binary (0 or 1)| 1 if month $\in \{1, 5, 6, 7\}$ | Signals academic purchasing surges |
| `is_holiday_season`| Binary (0 or 1)| 1 if month $\in \{10, 11, 12\}$ | Signals festive/holiday purchasing surges |
| `is_weekend` | Binary (0 or 1)| 1 if Friday, Saturday, or Sunday | Gives direct weekend shopping lift |
| `lag_1` | Float / Int | Sales units on previous day ($t-1$) | Immediate short-term momentum |
| `lag_7` | Float / Int | Sales units 7 days prior ($t-7$) | Same-day-of-week weekly momentum |
| `rolling_7` | Float | Average sales over trailing 7 days | Smooths daily anomalies & outliers |

---

## 5. Model Selection: Why Random Forest?

1. **Non-Linear Seasonal Interactions**: Standard linear models (like Linear Regression or simple ARIMA) struggle when school reopening interacts with day-of-week boosts. Random Forest decision trees naturally segment complex event conditions.
2. **Outlier Resilience**: Random Forest aggregates across 150 independent decision trees, preventing one-off flash sales or stockout dips from distorting the forecast curve.
3. **No Strict Stationarity Requirements**: Unlike ARIMA, which requires extensive differencing and log transforms to achieve stationarity, tree ensembles natively ingest raw lag features and calendar markers.

---

## 6. Recursive Autoregressive 30-Day Forecasting

When predicting the upcoming 30 days, actual future sales are not yet known. The engine employs an **Autoregressive Multi-Step Recursive Rollout**:

```python
# Conceptual 30-Day Autoregressive Loop
for day in range(1, 31):
    future_date = last_date + timedelta(days=day)
    
    # 1. Compute deterministic calendar features
    temp_features = compute_calendar_features(future_date)
    
    # 2. Extract lag features from expanding prediction history
    temp_features["lag_1"] = history[-1]
    temp_features["lag_7"] = history[-7]
    temp_features["rolling_7"] = mean(history[-7:])
    
    # 3. Model predicts day t
    predicted_units = model.predict(temp_features)
    
    # 4. Append predicted_units back to history for day t+1
    history.append(predicted_units)
```

This ensures that future demand smoothly reflects both underlying seasonal events and recent sales trends.

---

## 7. Model Evaluation & Accuracy Standards

Every product's model is evaluated on a chronological holdout test set (most recent 20% of sales data):

1. **Mean Absolute Error (MAE)**:
   $$\text{MAE} = \frac{1}{n} \sum_{i=1}^{n} |y_i - \hat{y}_i|$$
   *Measures the average unit discrepancy per day (typically 1.5–3.5 units).*

2. **Root Mean Squared Error (RMSE)**:
   $$\text{RMSE} = \sqrt{\frac{1}{n} \sum_{i=1}^{n} (y_i - \hat{y}_i)^2}$$
   *Penalizes large outlier forecast errors.*

3. **Mean Absolute Percentage Error (MAPE)**:
   $$\text{MAPE} = \frac{100\%}{n} \sum_{i=1}^{n} \left|\frac{y_i - \hat{y}_i}{y_i}\right|$$

4. **Predictive Accuracy Score**:
   $$\text{Accuracy} = \max(0\%, \min(100\%, 100\% - \text{MAPE}))$$
   *Current benchmark: **88% – 94% accuracy** across all catalog products.*

---

## 8. Translating Forecasts into Purchase Orders (`restock.py`)

A demand forecast is only valuable if it triggers actionable procurement. The forecasting outputs directly feed the replenishment formulas:

1. **Lead Time Demand ($LTD$)**:
   $$\text{LTD} = \sum_{d=1}^{\text{LeadTime}} \widehat{\text{Demand}}_d$$
   *The total predicted units expected to sell while waiting for a supplier delivery.*

2. **Dynamic Reorder Point ($ROP$)**:
   $$\text{ROP} = \text{LTD} + \text{Safety Stock}$$
   *The threshold where an order MUST be placed.*

3. **Recommended Order Quantity**:
   $$\text{Recommended Order} = \max(0, \text{round}(\text{ROP} - \text{Current Stock}))$$

4. **Stock Health Classification**:
   - 🔴 **Critical**: $\text{Current Stock} \le \text{Safety Stock}$ (High stockout probability before delivery).
   - 🟡 **Restock**: $\text{Current Stock} \le \text{ROP}$ (Order today to prevent breaching safety buffer).
   - 🟢 **Healthy**: $\text{Current Stock} > \text{ROP}$ (Adequate inventory buffer).

---

## 9. Future Roadmap for the Forecasting Engine

1. **Promotional & Discount Features**: Adding `discount_pct` and `marketing_campaign_flag` to capture price elasticity.
2. **Weather & Event Anomaly Tracking**: Capturing unseasonable weather or local sporting events that cause unexpected demand spikes.
3. **Censored Demand Reconstruction**: If an item is out of stock, recorded sales drop to 0, which biases the model downward. Future updates will impute true lost demand during stockout periods.
4. **Dynamic User Dataset Uploads**: Enabling store owners to drag-and-drop CSV/Excel sales history via the frontend with automated background model retraining.
