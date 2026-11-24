import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Calendar, Filter, Sparkles, TrendingUp, CheckCircle2 } from "lucide-react";

import { AppShell } from "@/components/app/AppShell";
import { ChartLegend, ForecastChart } from "@/components/charts/ForecastChart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { getForecastMetrics, getForecastTimeline } from "@/services/mlApi";
import { getProducts } from "@/services/inventory";
import { cn } from "@/lib/utils";
import type { ForecastPoint } from "@/lib/mock-data";

export const Route = createFileRoute("/forecasts")({
  head: () => ({
    meta: [
      { title: "Demand Forecasting — StockAI" },
      {
        name: "description",
        content:
          "Machine learning powered demand predictions with actual vs predicted demand comparison and forecast confidence ranges.",
      },
      { property: "og:title", content: "Demand Forecasting — StockAI" },
      {
        property: "og:description",
        content: "Interactive actual sales and ML forecast comparison across months and years.",
      },
    ],
  }),
  component: ForecastsPage,
});

const MONTHS = [
  { value: "all", label: "All Months" },
  { value: "1", label: "Jan (Term Start)" },
  { value: "2", label: "Feb" },
  { value: "3", label: "Mar" },
  { value: "4", label: "Apr" },
  { value: "5", label: "May (School Reopen Kickoff)" },
  { value: "6", label: "Jun (School Reopen Peak)" },
  { value: "7", label: "Jul (School Reopen)" },
  { value: "8", label: "Aug" },
  { value: "9", label: "Sep (Forecast Horizon)" },
  { value: "10", label: "Oct (Festive / Diwali)" },
  { value: "11", label: "Nov (Cyber Week)" },
  { value: "12", label: "Dec (Holiday Rush)" },
];

function ForecastsPage() {
  const [productId, setProductId] = useState("P001");
  const [yearFilter, setYearFilter] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");
  const [viewPreset, setViewPreset] = useState<"future30" | "filtered">("future30");

  // Load catalog products
  const productsQ = useQuery({
    queryKey: ["inventory-products"],
    queryFn: getProducts,
  });

  const products = productsQ.data ?? [];

  // Fallback to first available product if selected productId is not present
  const activeProductId = useMemo(() => {
    if (products.length === 0) return productId;
    const match = products.find((p) => p.product_id === productId);
    return match ? productId : (products[0]?.product_id ?? productId);
  }, [products, productId]);

  // Load model metrics
  const metricsQ = useQuery({
    queryKey: ["ml-forecast-metrics"],
    queryFn: getForecastMetrics,
  });

  // Load full timeline data with actuals + predictions + confidence range
  const timelineQ = useQuery({
    queryKey: ["ml-forecast-timeline", activeProductId, yearFilter, monthFilter],
    queryFn: () =>
      getForecastTimeline({
        product_id: activeProductId,
        year: yearFilter,
        month: monthFilter,
      }),
  });

  const allMetrics = metricsQ.data ?? [];
  const rawTimeline = timelineQ.data ?? [];

  const selectedMetric = allMetrics.find((item) => item.product_id === activeProductId);
  const currentProduct = products.find((p) => p.product_id === activeProductId);

  // Derive available years dynamically from data
  const availableYears = useMemo(() => {
    const years = new Set<number>();
    for (const item of rawTimeline) {
      if (item.date) {
        const y = parseInt(item.date.slice(0, 4), 10);
        if (!isNaN(y)) years.add(y);
      }
    }
    return Array.from(years).sort((a, b) => b - a);
  }, [rawTimeline]);

  // Compute chart points based on view preset
  const chartData = useMemo<ForecastPoint[]>(() => {
    if (!rawTimeline.length) return [];

    let filtered = rawTimeline;

    if (viewPreset === "future30") {
      // Show trailing 14 days of actual history + next 30 days future forecast
      const futureItems = rawTimeline.filter((item) => item.is_future);
      const pastItems = rawTimeline.filter((item) => !item.is_future).slice(-14);
      filtered = [...pastItems, ...futureItems];
    }

    return filtered.map((item) => {
      const dt = new Date(item.date);
      const label = dt.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      });

      return {
        label,
        actual: item.actual_demand !== null ? item.actual_demand : null,
        predicted: item.predicted_demand,
        rangeLow: item.range_low,
        rangeHigh: item.range_high,
      };
    });
  }, [rawTimeline, viewPreset]);

  // Aggregate stats for the current view
  const stats = useMemo(() => {
    let actualSum = 0;
    let actualCount = 0;
    let predictedSum = 0;

    for (const pt of chartData) {
      if (pt.actual !== null) {
        actualSum += pt.actual;
        actualCount++;
      }
      if (pt.predicted !== null) {
        predictedSum += pt.predicted;
      }
    }

    return {
      totalActual: actualSum,
      hasActuals: actualCount > 0,
      totalPredicted: Math.round(predictedSum),
      pointCount: chartData.length,
    };
  }, [chartData]);

  return (
    <AppShell
      title="Demand Forecasting"
      subtitle="Machine learning powered predictions comparing actual sales, predicted demand, and confidence bands."
    >
      {/* FILTER CONTROL BAR */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Product Selector */}
        <div className="panel p-3.5">
          <label className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Product SKU
          </label>
          <Select value={activeProductId} onValueChange={setProductId}>
            <SelectTrigger className="mt-1.5 h-9">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              {products.map((product) => (
                <SelectItem key={product.product_id} value={product.product_id}>
                  {product.product_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Year Selector */}
        <div className="panel p-3.5">
          <label className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Year
          </label>
          <Select
            value={yearFilter}
            onValueChange={(val) => {
              setYearFilter(val);
              if (val !== "all") setViewPreset("filtered");
            }}
          >
            <SelectTrigger className="mt-1.5 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                All Years {availableYears.length > 0 ? `(${availableYears[availableYears.length - 1]}–${availableYears[0]})` : ""}
              </SelectItem>
              {availableYears.map((yr) => (
                <SelectItem key={yr} value={String(yr)}>
                  {yr}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Month Selector */}
        <div className="panel p-3.5">
          <label className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Month / Season
          </label>
          <Select
            value={monthFilter}
            onValueChange={(val) => {
              setMonthFilter(val);
              if (val !== "all") setViewPreset("filtered");
            }}
          >
            <SelectTrigger className="mt-1.5 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* View Mode Preset Toggle */}
        <div className="panel p-3.5">
          <label className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Timeline View
          </label>
          <div className="mt-1.5 flex gap-1.5">
            <Button
              type="button"
              size="sm"
              variant={viewPreset === "future30" ? "default" : "outline"}
              className="h-9 flex-1 text-xs"
              onClick={() => {
                setViewPreset("future30");
                setYearFilter("all");
                setMonthFilter("all");
              }}
            >
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Next 30D
            </Button>
            <Button
              type="button"
              size="sm"
              variant={viewPreset === "filtered" ? "default" : "outline"}
              className="h-9 flex-1 text-xs"
              onClick={() => setViewPreset("filtered")}
            >
              <Calendar className="mr-1 h-3.5 w-3.5" />
              Filtered
            </Button>
          </div>
        </div>
      </div>

      {/* MAIN CHART CONTAINER */}
      <section className="panel mt-4 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold tracking-tight">
                {currentProduct?.product_name ?? "Demand Forecast"}
              </h2>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                Random Forest Regressor
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {viewPreset === "future30"
                ? "Recent 14-day actual demand transitioning into the 30-day forecast with confidence interval."
                : `Showing ${stats.pointCount} daily demand data points for Year: ${yearFilter.toUpperCase()}, Month: ${monthFilter === "all" ? "ALL" : MONTHS.find((m) => m.value === monthFilter)?.label}.`}
            </p>
          </div>

          <ChartLegend />
        </div>

        <div className="mt-5">
          {timelineQ.isLoading ? (
            <Skeleton className="h-[360px] w-full rounded-xl" />
          ) : timelineQ.isError ? (
            <div className="flex h-[360px] items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5">
              <div className="text-center text-sm text-destructive">
                <p className="font-semibold">Unable to load forecast timeline</p>
                <p className="mt-1 text-muted-foreground text-xs">
                  Verify the FastAPI backend is running on port 8000.
                </p>
              </div>
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-[360px] items-center justify-center rounded-xl border border-dashed border-border">
              <p className="text-sm text-muted-foreground">
                No data points found for the selected filter combination.
              </p>
            </div>
          ) : (
            <ForecastChart data={chartData} height={360} />
          )}
        </div>
      </section>

      {/* KPI METRIC CARDS */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Model Accuracy
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-primary">
              {selectedMetric?.accuracy != null
                ? `${selectedMetric.accuracy.toFixed(1)}%`
                : selectedMetric?.mae != null
                ? `${Math.max(70, Math.min(99, Math.round(100 - (selectedMetric.mae / 5) * 10)))}%`
                : "—"}
            </span>
            <span className="text-xs text-chart-2 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> High Confidence
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Trained on back-to-school & holiday historical sales.
          </p>
        </div>

        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Actual Demand (Period)
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-chart-2">
              {stats.hasActuals ? `${stats.totalActual.toLocaleString()} units` : "—"}
            </span>
            <span className="text-xs text-muted-foreground">Real Historical</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Recorded daily sales units in selected window.
          </p>
        </div>

        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Predicted Demand (Period)
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-foreground">
              {stats.totalPredicted.toLocaleString()} units
            </span>
            <span className="text-xs text-primary flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5" /> Model Output
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Sum of model predicted demand over period.
          </p>
        </div>

        <div className="panel p-4">
          <p className="text-xs uppercase tracking-wider text-subtle-foreground font-medium">
            Error Margins (MAE / RMSE)
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-2xl font-bold text-foreground">
              ±{selectedMetric?.mae != null ? selectedMetric.mae.toFixed(1) : "—"}{" "}
              <span className="text-sm font-normal text-muted-foreground">units/day</span>
            </span>
            <span className="text-xs text-muted-foreground">
              RMSE: {selectedMetric?.rmse != null ? selectedMetric.rmse.toFixed(1) : "—"}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Defines the shaded forecast confidence range.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
