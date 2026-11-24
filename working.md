# StockAI: Seasonal Demand Forecasting & Smart Inventory Predictor
## System Architecture, Working Mechanics & Evolution Plan (`working.md`)

---

## 1. Executive Summary

**StockAI** is an intelligent inventory optimization software designed to prevent stockouts and overstocking for businesses. By analyzing historical sales velocity alongside predictable seasonal surges—such as **back-to-school reopenings**, **holiday shopping seasons**, **festive events**, and **weekend cycles**—the system provides:
1. **Accurate Demand Forecasting**: Predicts units needed daily and over 7-to-30 day horizons.
2. **Current Stock Tracking**: Monitors warehouse quantities, unit prices, reorder levels, and supplier lead times.
3. **Automated Restock Recommendations**: Computes exact replenishment quantities before supplier lead-time buffers expire.

> **Status**: Currently operating on local structured datasets (`.csv` / SQLite) with full local hosting separation (`bkend/` and `frntend/`). Future iterations will incorporate dynamic CSV/Excel customer data ingestion.

---

## 2. Core Problem & Real-World Use Case

Retailers face two costly extremes:
- **Stockouts (Under-stocking)**: Losing 20–40% of potential revenue during peak seasons (e.g., running out of backpacks when schools reopen in June/July, or running out of electronics before Christmas/Diwali).
- **Dead Stock (Over-stocking)**: Tying up working capital in unsold inventory with storage depreciation and holding costs.

### The Seasonal Dynamics:
```
Demand
  ^
  |        [School Reopening Spike]            [Holiday / Festive Peak]
  |               ▲                                    ▲▲
  |              / \                                  /  \
  |   Baseline  /   \     Normal Trading Period      /    \
  |  ──────────/     \──────────────────────────────/      \───────► Time (Months)
  |   Jan  Feb Mar Apr May Jun  Jul Aug Sep Oct Nov Dec
```

To stock up effectively, the system must consider:
1. **Supplier Lead Time ($L$)**: If a supplier takes 7–14 days to deliver, restock decisions must happen *ahead* of the surge.
2. **Safety Stock ($SS$)**: Buffer stock reserved to handle unexpected demand variance or supplier delays.
3. **Event Windows**: Specific calendar intervals (e.g. Back-to-School, Black Friday, Diwali, Year-End) where sales velocity increases by $2\times$ to $5\times$.

---

## 3. System Architecture & Component Decoupling

The project is structured into two cleanly isolated layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    FRNTEND (React 19)                       │
│  - Dashboard: Stock health, high-risk items, KPI cards     │
│  - Forecasts Page: Demand curve vs historical sales chart   │
│  - Restock Page: Recommended order quantities & 1-click PO  │
│  - Inventory Table: Stock levels, lead times, safety stocks │
└──────────────────────────────▲──────────────────────────────┘
                               │ REST API (JSON)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    BKEND (FastAPI + ML)                     │
│  - app.py: REST endpoints (/products, /forecast, /restock)  │
│  - forecast.py: Random Forest Regressor with seasonal lags  │
│  - restock.py: Lead-time demand & reorder formula engine    │
│  - database.py & models.py: SQLite/PostgreSQL order logging │
│  - data/: Sales history, active inventory, metrics CSVs     │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. How the Backend Engine Works

### 4.1. Inventory State Tracking (`inventory.csv` / DB)
The backend maintains real-time records for every SKU:
- `current_stock`: Physical units currently in warehouse.
- `reorder_level`: Minimum operational threshold before warning triggers.
- `safety_stock`: Protected reserve against demand spikes or transit delays.
- `supplier_lead_time_days`: Days needed from PO issuance to warehouse arrival.
- `unit_price`: Cost per unit.

### 4.2. Demand Forecasting Engine (`forecast.py`)
A Machine Learning model (**Random Forest Regressor**) trains on historical sales data to forecast upcoming daily sales per product.

**Feature Engineering Pipeline**:
1. **Calendar & Seasonality Features**:
   - `day_of_week` (0–6): Captures weekend consumer spikes.
   - `day_of_month` (1–31) & `month` (1–12): Captures monthly & annual trends.
   - `is_holiday_season` (Binary Flag): Flags peak festival months (Oct–Dec).
   - `is_school_reopen_season` (Binary Flag): Flags peak back-to-school windows (May–July / Jan).
2. **Lag Features**:
   - `lag_1`: Sales yesterday.
   - `lag_7`: Sales on the same day last week.
   - `rolling_7_mean`: 7-day moving average to smooth short-term variance.

**Model Evaluation**:
- Evaluates per SKU using **MAE** (Mean Absolute Error), **RMSE**, and **MAPE** (Mean Absolute Percentage Error) to display predictive accuracy on the dashboard.

### 4.3. Smart Restock Calculation Logic (`restock.py`)
To prevent running dry during supplier transit, restock recommendations calculate:

1. **Lead Time Demand ($LTD$)**:
   $$\text{LTD} = \sum_{t=1}^{\text{LeadTime}} \widehat{\text{Demand}}_t$$
2. **Dynamic Reorder Point ($ROP$)**:
   $$\text{ROP} = \text{LTD} + \text{Safety Stock}$$
3. **Recommended Order Quantity**:
   $$\text{Recommended Order} = \begin{cases} 
   \text{ROP} - \text{Current Stock}, & \text{if } \text{Current Stock} \le \text{ROP} \\
   0, & \text{otherwise}
   \end{cases}$$
4. **Stock Urgency Status**:
   - **Critical**: $\text{Current Stock} \le \text{Safety Stock}$ (Immediate stockout risk).
   - **Restock**: $\text{Current Stock} \le \text{ROP}$ (Order now to receive before stock reaches safety level).
   - **Adequate / Good**: $\text{Current Stock} > \text{ROP}$ (Sufficient inventory).

---

## 5. Dataset Enhancement Plan: Realistic Seasonal Retail Goods

Currently, the default dataset contains 7 generic tech SKUs (`Laptop`, `Wireless Mouse`, `Keyboard`, `Monitor`, `USB Dock`, `Headset`, `Office Chair`). While functional, they don't clearly demonstrate **School Reopenings** and **Holiday-specific surges**.

### Proposed Catalog Expansion:
We can refine and extend the product catalog to explicitly highlight seasonal behaviors:

| Product ID | SKU Name | Category | Primary Demand Driver | Lead Time |
| :--- | :--- | :--- | :--- | :--- |
| **P101** | Student Ergonomic Backpack | School / Stationery | **School Reopen (May–July surge: 3.5×)** | 7 days |
| **P102** | Scientific Calculator FX-991 | School / Tech | **School Reopen (May–July surge: 4.0×)** | 5 days |
| **P103** | Premium Notebook Bundle (Pack of 6) | Stationery | **School Reopen & Semester Start** | 3 days |
| **P104** | Student Laptop 14" | Tech / Education | **School Reopen & Festival Sales** | 10 days |
| **P105** | Festive Gift Hamper Deluxe | Retail / Gifting | **Holidays / Diwali / New Year (Oct–Dec: 5.0×)** | 6 days |
| **P106** | Wireless Noise-Canceling Headphones | Consumer Tech | **Holiday Gifting & Cyber Week** | 4 days |
| **P107** | Smart Fitness Watch | Wearables | **New Year Resolutions (Jan) & Holidays** | 5 days |
| **P108** | Desk Study Lamp (LED) | Home / Study | **School Reopen & Exam Season** | 4 days |

*This dataset will give the charts dramatic, realistic seasonal curves that clearly validate the AI's restocking recommendations.*

---

## 6. Future Data Ingestion & Upload Architecture (Design Only)

In future releases, users should be able to upload their own store sales and inventory data directly from the frontend UI rather than editing local CSV files.

### Ingestion Flow:
```
[User UI: Drag & Drop CSV/Excel]
                │
                ▼
[Frontend: Client Validation & Column Mapping Wizard]
  - Checks required columns: Date, SKU/Product, Units Sold, Stock
  - Previews first 5 rows with automatic column matching
                │
                ▼
[Backend API: POST /api/upload/sales & /api/upload/inventory]
  - Streaming chunked file upload (FastAPI UploadFile)
  - Schema validation with Pydantic & Pandas dtype checking
  - Deduplication and anomaly detection (negative sales, invalid dates)
                │
                ▼
[Database / Storage Layer]
  - Stores raw files in local storage / S3 bucket
  - Ingests clean records into SQLite / PostgreSQL `sales_records` table
                │
                ▼
[Automated Retraining Trigger]
  - Dispatches background job (Celery / BackgroundTasks)
  - Executes `forecast.py` and `restock.py` with the newly ingested data
  - Updates metrics and broadcasts completion notification to the UI
```

---

## 7. Universal POS CSV Ingestion & Dual Dataset Architecture (Implemented)

The system now supports arbitrary POS CSV uploads (Square, Shopify, Toast, Clover, WooCommerce, custom ERP/Tally) alongside the permanent seasonal demo catalog.

### Architecture Highlights:
1. **Dual Dataset Directory Isolation**:
   - `bkend/data/demo/`: Immutable 8-product seasonal retail catalog with 2-year history.
   - `bkend/data/user/`: Dynamic storage for user-uploaded stores and retrained models.
   - `bkend/data/active_mode.json`: Active store state pointer (`demo` vs `user`).
2. **Universal Ingestion Engine (`bkend/ingest.py`)**:
   - Multi-encoding CSV reader (`utf-8`, `utf-8-sig`, `latin1`, `cp1252`).
   - Fuzzy column detection for Date, Product, Quantity, and Price.
   - Receipt line-item aggregator: sums transactions on identical dates per product.
   - Continuous calendar resampling: fills unlogged days with `0` units so lag features (`lag_1`, `lag_7`) remain mathematically sound.
   - Auto-catalog generator: automatically extracts items and computes safe starting inventory & lead times if only a sales CSV is provided.
3. **Frontend UI**:
   - `DatasetBanner.tsx`: Top status bar displaying active store badge, product count, and date span.
   - `UploadModal.tsx`: Drag-and-drop CSV uploader with auto-detected column mapper dropdowns, raw data preview table, and 1-click model retraining.
   - "Reset to Demo Store" button: Instant 1-click fallback to restore the seasonal retail showcase.

