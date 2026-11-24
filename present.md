# StockAI — Feature Presentation & Platform Capabilities (`present.md`)

> **AI-Powered Demand Forecasting & Automated Inventory Replenishment Platform**  
> *Transform raw POS sales data into predictive demand curves, safety stock buffers, and automated purchase orders.*

---

## 1. Executive Summary & Value Proposition

Retailers, cafes, and multi-channel merchants face two chronic operational challenges:
1. **Stockouts & Lost Revenue (Under-stocking)**: Running out of high-demand items during predictable surge windows (e.g., student backpacks during school reopening, electronics on Black Friday, gifts during the holidays).
2. **Trapped Capital & Depreciating Dead Stock (Over-stocking)**: Holding excess inventory with high warehousing fees and depreciation risk.

**StockAI** replaces manual spreadsheets and gut-feel purchasing with **Machine Learning Demand Forecasting (Random Forest)** combined with **Formulaic Supply Chain Restocking Calculations** ($\text{ROP} = \text{Lead Time Demand} + \text{Safety Stock}$).

Merchants can use the built-in **Seasonal Retail Demo Store** to evaluate capabilities immediately, or drag-and-drop **CSV exports from any POS** (Square, Shopify, Toast, Clover, etc.) to get instant forecasts on their real business data.

---

## 2. Core Features & Capabilities

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                                StockAI Platform                                  │
├─────────────────────┬─────────────────────┬──────────────────────────────────────┤
│ 1. DEMAND           │ 2. SMART            │ 3. UNIVERSAL                         │
│    FORECASTING      │    RESTOCKING       │    POS INGESTION                     │
│  - Random Forest ML │  - Dynamic ROP      │  - Square, Shopify, Toast, Clover    │
│  - 3-Layer Chart    │  - Safety Stock     │  - Auto-detected column mapping      │
│  - Seasonal Spikes  │  - Critical Alerts  │  - Receipt aggregator & 0-fill       │
│  - Confidence Range │  - 1-Click PO logs  │  - Auto-generated inventory catalog  │
├─────────────────────┴─────────────────────┴──────────────────────────────────────┤
│ 4. DUAL-STORE COEXISTENCE: Instant 1-Click Switch between Demo Store & User POS  │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

### Feature 1: Machine Learning Demand Forecasting

The Forecasting Engine trains product-specific Random Forest Regressors on historical sales to forecast daily demand 30 days into the future.

* **3-Layer Interactive Visual Chart**:
  - 🟢 **Actual Demand (Solid Green)**: Real recorded daily sales units.
  - 🟣 **Predicted Demand (Solid Purple)**: ML regression output accounting for seasonal and day-of-week patterns.
  - 🟪 **Forecast Range (Shaded Confidence Band)**: Residual-based error margin ($Z \cdot \sigma$) representing high/low demand probability bounds.
* **Dual Timeline Presets**:
  - **Next 30D (Operational View)**: Seamlessly stitches the trailing 14 days of real sales into the next 30 days of future predictions.
  - **Filtered (Deep-Dive Analysis)**: Inspects the full multi-year timeline with calendar-specific filtering.
* **Granular Time-Series Filtering**:
  - **Product SKU Selector**: Switch between products with instant chart transitions.
  - **Dynamic Year Filter**: Automatically lists all years present in the dataset (e.g., `2024`, `2025`, `2026`).
  - **Month / Season Filter**: 12 individual months tagged with operational events (`Jan (Term Start)`, `Jun (School Reopen Peak)`, `Oct (Festive / Diwali)`, `Dec (Holiday Rush)`).
* **Real Model Performance Metrics**:
  - **Model Accuracy (%)**: Calculated from historical validation splits.
  - **Mean Absolute Error (MAE)**: Average units/day deviation.
  - **Root Mean Squared Error (RMSE)**: Penalizes large forecasting outliers.
  - **Period Demand Totals**: Live sums of actual vs. predicted units for the selected window.

---

### Feature 2: Smart Inventory Optimization & Restocking

StockAI converts demand forecasts into actionable purchase decisions based on supplier lead times and safety stock buffers.

* **Dynamic Reorder Point ($\text{ROP}$)**:
  $$\text{ROP} = \text{Lead Time Demand} + \text{Safety Stock}$$
  - $\text{Lead Time Demand}$: The sum of ML-predicted demand over the supplier's delivery window ($L$ days).
  - $\text{Safety Stock}$: Statistical buffer protecting against demand spikes or shipping delays.
* **Automated Stock Health Classification**:
  - 🔴 **Critical**: Current stock $\le$ Safety Stock (immediate stockout risk).
  - 🟡 **Restock**: Current stock $\le \text{ROP}$ (order must be placed now to arrive before stockout).
  - 🟢 **Healthy**: Current stock $> \text{ROP}$ (sufficient inventory).
* **Recommended Order Quantities**:
  - Calculates exact replenishment: $\text{Recommended Order} = \max(0, \lceil\text{ROP} - \text{Current Stock}\rceil)$.
* **Purchase Order Logging**:
  - Create and track supplier replenishment orders directly from the UI into the backend database.

---

### Feature 3: Universal POS CSV Ingestion (Any POS System)

Merchants do not need a custom developer integration. StockAI ingests raw sales exports from virtually any Point of Sale or ERP system.

* **Supported POS Exports**: Square, Shopify, Toast, Clover, Lightspeed, WooCommerce, Tally, Excel sheets.
* **Multi-Encoding Support**: Reads standard `utf-8`, Windows Excel `latin1`, `cp1252`, and `utf-8-sig`.
* **Smart Fuzzy Column Detection**: Automatically detects column headers:
  - **Date**: `Transaction Date`, `Order Date`, `Date`, `timestamp`, `created_at`
  - **Product**: `Item Name`, `Product Name`, `SKU`, `Title`, `Description`
  - **Quantity**: `Quantity Sold`, `Qty`, `Units`, `Count`, `Volume`
  - **Price / Total**: `Unit Price`, `Price`, `Total`, `Gross Sales`
* **Interactive Column Mapper & Live 5-Row Preview**:
  - Users can review auto-detected mappings or override any column via dropdowns.
  - Displays the first 5 rows of raw CSV data before importing.
* **POS Receipt Line-Item Aggregation**:
  - If a POS exports 50 individual receipts for coffee on Saturday, StockAI automatically groups by `(date, product)` and calculates total daily units.
* **Continuous Calendar Resampling (Zero-Sales Filling)**:
  - POS systems only record days with transactions. Missing days are automatically filled with `0` units across the continuous date span so ML lag features (`lag_1`, `lag_7`) remain mathematically sound.
* **Auto-Catalog Generator**:
  - If a merchant only uploads a sales CSV without an inventory list, StockAI automatically extracts unique products, calculates sales velocity, and estimates safe current stock, 7-day lead times, and unit prices.
* **Automated Pipeline Retraining**:
  - Uploading triggers asynchronous ML model retraining and restock calculations in seconds.

---

### Feature 4: Dual-Store Coexistence (Safe Sandbox)

Uploading custom data never destroys the demonstration catalog.

* **Demo Store (Seasonal Retail)**:
  - 8 realistic products: Student Backpack, Calculator FX-991, Laptop 14", Notebook Bundle, Festive Gift Hamper, Headphones, Smart Fitness Watch, Desk Lamp.
  - Multi-year seasonal sales history (2024–2026) demonstrating school reopening and holiday surges.
* **User Store (Uploaded POS)**:
  - Created dynamically upon CSV upload under `bkend/data/user/`.
* **Persistent Header Status Banner**:
  - Visible on every page showing the active store name, product count, and date span.
* **1-Click "Reset to Demo Store"**:
  - Instantly reverts the entire application back to the standard seasonal showcase anytime.

---

### Feature 5: Executive Dashboard & Analytics

* **High-Level KPI Cards**:
  - Total Catalog SKUs tracked.
  - Critical Stockout Alerts count.
  - Reorder Recommendations count.
  - Average Daily Demand velocity.
* **Actionable Stockout Risk Radar**:
  - Prioritized table showing items requiring immediate purchase order placement.
* **Historical Sales Activity Feed**:
  - Real chronological transaction logs formatted with rupee/dollar valuations and relative dates.

---

## 3. Technology Architecture

| Layer | Technologies Used | Key Responsibilities |
| :--- | :--- | :--- |
| **Backend** | Python 3.9, FastAPI, Uvicorn, SQLAlchemy | REST API, POS Ingestion, Calendar Resampling, PO storage |
| **Machine Learning** | scikit-learn, pandas, numpy | Random Forest Regressors, Feature Engineering (lags, rolling averages, seasonal multipliers), Metrics (MAE, RMSE, MAPE) |
| **Frontend** | React 19, Vite, TanStack Router, TanStack Query | Responsive single-page application, client caching, modal dialogs |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons, Recharts | Glassmorphism dashboard cards, interactive multi-layer time-series charts |
| **Data Storage** | Structured CSV pipelines + SQLite | Dual-directory data stores (`data/demo/` and `data/user/`) |

---

## 4. Live Demonstration Script (How to Present)

1. **The Problem Statement (1 min)**:
   - *"Retailers lose substantial revenue when high-demand products run out during peak seasons, while tying up cash in dead stock. StockAI solves this with predictive inventory forecasting."*
2. **The Seasonal Demo Showcase (2 mins)**:
   - Open `http://localhost:8080/forecasts`.
   - Select **"Student Ergonomic Backpack"**.
   - Show the **"Next 30D"** view highlighting the smooth transition from actual demand (green) into predicted demand (purple) with confidence bounds.
   - Switch to **"Filtered"** view, select **"June (School Reopen Peak)"** to showcase the model capturing the back-to-school spike.
   - Navigate to `/restock` to showcase automated **Critical** and **Restock** alerts with calculated order sizes.
3. **The Universal POS Upload (2 mins)**:
   - Click **"Upload POS CSV"** on the top banner.
   - Drag and drop `sample_pos_export.csv` (or any merchant CSV).
   - Show how StockAI auto-detects `Transaction_Date`, `Item_Title`, and `Units_Sold` and displays the raw preview table.
   - Click **"Process & Retrain ML"**.
   - Show the banner turning purple (**"My POS Store"**) and the Forecast Chart instantly displaying predictions for the uploaded items (`Avocado Sourdough Toast`, `Nitro Cold Brew`, `Matcha Latte`).
4. **The Sandbox Reset (30 sec)**:
   - Click **"Reset to Demo Store"** in the top banner.
   - The application immediately restores the 8-product seasonal showcase.
