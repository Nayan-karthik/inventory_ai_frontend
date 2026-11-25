import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getForecastMetrics,
  getForecastTimeline,
  getRestockRecommendations,
} from "@/services/mlApi";
import { getProducts } from "@/services/inventory";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — StockAI" },
      {
        name: "description",
        content:
          "Live sales and demand trends, top sellers, slow movers, inventory valuation and ML model accuracy.",
      },
      { property: "og:title", content: "Analytics — StockAI" },
      {
        property: "og:description",
        content: "Understand what sells, what stalls and how accurate your ML forecasts are.",
      },
    ],
  }),
  component: AnalyticsPage,
});

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-foreground)",
  fontSize: 12,
  boxShadow: "0 10px 25px -8px oklch(0.2 0.02 260 / 0.12)",
};

function AnalyticsPage() {
  const timelineQ = useQuery({
    queryKey: ["ml-forecast-timeline", "all"],
    queryFn: () => getForecastTimeline({}),
  });
  const metricsQ = useQuery({
    queryKey: ["ml-forecast-metrics"],
    queryFn: getForecastMetrics,
  });
  const restockQ = useQuery({
    queryKey: ["ml-restock"],
    queryFn: getRestockRecommendations,
  });
  const productsQ = useQuery({
    queryKey: ["inventory-products"],
    queryFn: getProducts,
  });

  const monthlyTrend = useMemo(() => {
    const timeline = timelineQ.data ?? [];
    const buckets = new Map<string, { month: string; actual: number; predicted: number }>();

    for (const pt of timeline) {
      if (!pt.date) continue;
      const key = pt.date.slice(0, 7);
      const existing = buckets.get(key) ?? { month: key, actual: 0, predicted: 0 };
      if (pt.actual_demand !== null && pt.actual_demand !== undefined) {
        existing.actual += pt.actual_demand;
      }
      existing.predicted += pt.predicted_demand ?? 0;
      buckets.set(key, existing);
    }

    return Array.from(buckets.values())
      .sort((a, b) => a.month.localeCompare(b.month))
      .slice(-12)
      .map((b) => ({
        month: new Date(`${b.month}-01`).toLocaleDateString("en-IN", {
          month: "short",
          year: "2-digit",
        }),
        actual: Math.round(b.actual),
        predicted: Math.round(b.predicted),
      }));
  }, [timelineQ.data]);

  const productValuation = useMemo(() => {
    return (productsQ.data ?? [])
      .map((p) => ({
        name: p.product_name.length > 16 ? `${p.product_name.slice(0, 15)}…` : p.product_name,
        value: Math.round(p.current_stock * p.unit_price),
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  }, [productsQ.data]);

  const modelSummary = useMemo(() => {
    const metrics = metricsQ.data ?? [];
    if (metrics.length === 0) {
      return { accuracy: "—", mape: "—", mae: "—", rmse: "—" };
    }
    const avgAcc = metrics.reduce((s, m) => s + (m.accuracy ?? 0), 0) / metrics.length;
    const avgMape = metrics.reduce((s, m) => s + (m.mape ?? 0), 0) / metrics.length;
    const avgMae = metrics.reduce((s, m) => s + (m.mae ?? 0), 0) / metrics.length;
    const avgRmse = metrics.reduce((s, m) => s + (m.rmse ?? 0), 0) / metrics.length;
    return {
      accuracy: `${avgAcc.toFixed(1)}%`,
      mape: `${avgMape.toFixed(1)}%`,
      mae: `${avgMae.toFixed(2)}`,
      rmse: `${avgRmse.toFixed(2)}`,
    };
  }, [metricsQ.data]);

  const topDemanded = useMemo(() => {
    return [...(restockQ.data ?? [])]
      .sort((a, b) => b.predicted_7_day_demand - a.predicted_7_day_demand)
      .slice(0, 5);
  }, [restockQ.data]);

  const slowMoving = useMemo(() => {
    return [...(restockQ.data ?? [])]
      .sort((a, b) => a.predicted_7_day_demand - b.predicted_7_day_demand)
      .slice(0, 5);
  }, [restockQ.data]);

  return (
    <AppShell
      title="Analytics"
      subtitle="Live sales, demand trends, inventory valuation, and ML model performance."
    >
      <section className="panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Actual vs Predicted Demand Trends</h2>
            <p className="text-xs text-muted-foreground">
              Aggregated monthly demand across all products from the ML timeline.
            </p>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded bg-chart-2" /> Actual Sales
            </span>
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded bg-primary" /> Predicted Demand
            </span>
          </div>
        </div>
        <div className="mt-5 h-[320px]">
          {timelineQ.isLoading ? (
            <Skeleton className="h-full w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrend} margin={{ left: -12, right: 8, top: 8 }}>
                <CartesianGrid
                  stroke="var(--color-border)"
                  strokeDasharray="3 6"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-subtle-foreground)", fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-subtle-foreground)", fontSize: 11 }}
                  width={50}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-border)" }} />
                <Line
                  type="monotone"
                  dataKey="actual"
                  name="Actual Units"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2.5}
                  dot={{ r: 2.5, fill: "var(--color-chart-2)" }}
                />
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="Predicted Units"
                  stroke="var(--color-primary)"
                  strokeWidth={2.2}
                  strokeDasharray="6 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Inventory Value by Product (₹)</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Current stock multiplied by unit price for top SKUs.
          </p>
          <div className="mt-5 h-[280px]">
            {productsQ.isLoading ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productValuation} margin={{ left: -6, right: 8, top: 8 }}>
                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="3 6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-subtle-foreground)", fontSize: 10 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-subtle-foreground)", fontSize: 11 }}
                    width={54}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                  <Bar dataKey="value" name="Stock Value (₹)" radius={[8, 8, 0, 0]}>
                    {productValuation.map((_, i) => (
                      <Cell
                        key={i}
                        fill={i < 2 ? "var(--color-primary)" : "var(--color-chart-3)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">ML Model Evaluation</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Live evaluation metrics averaged across all trained product models.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Avg Accuracy", modelSummary.accuracy, true],
              ["Mean MAPE", modelSummary.mape, false],
              ["Mean MAE", `${modelSummary.mae} u/day`, false],
              ["Mean RMSE", `${modelSummary.rmse} u/day`, false],
            ].map(([label, val, accent]) => (
              <div
                key={label as string}
                className="rounded-xl border border-border bg-secondary/50 p-4"
              >
                <p className="text-[11px] uppercase tracking-wider text-subtle-foreground">
                  {label as string}
                </p>
                <p
                  className={`mt-1.5 font-display text-2xl font-bold ${
                    accent ? "text-primary" : "text-foreground"
                  }`}
                >
                  {val as string}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 max-h-[130px] overflow-y-auto rounded-xl border border-border">
            <table className="w-full text-left text-xs">
              <thead className="bg-secondary/70 text-subtle-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Product</th>
                  <th className="px-3 py-2 font-medium">Accuracy</th>
                  <th className="px-3 py-2 font-medium">MAE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {(metricsQ.data ?? []).map((m) => (
                  <tr key={m.product_id}>
                    <td className="px-3 py-2 font-medium">{m.product_name}</td>
                    <td className="px-3 py-2 text-primary font-semibold">
                      {m.accuracy.toFixed(1)}%
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">±{m.mae.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Highest Forecasted Demand (7 Days)</h2>
          <div className="mt-4 grid gap-2.5">
            {restockQ.isLoading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
              : topDemanded.map((p) => (
                  <div
                    key={p.product_id}
                    className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm"
                  >
                    <div>
                      <span className="font-medium text-foreground">{p.product_name}</span>
                      <span className="ml-2 text-xs text-subtle-foreground">
                        Stock: {p.current_stock}
                      </span>
                    </div>
                    <span className="font-semibold text-primary">
                      {Math.round(p.predicted_7_day_demand)} units / 7d
                    </span>
                  </div>
                ))}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Slowest Moving Products (7 Days)</h2>
          <div className="mt-4 grid gap-2.5">
            {restockQ.isLoading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)
              : slowMoving.map((p) => (
                  <div
                    key={p.product_id}
                    className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm"
                  >
                    <div>
                      <span className="font-medium text-foreground">{p.product_name}</span>
                      <span className="ml-2 text-xs text-subtle-foreground">
                        Stock: {p.current_stock}
                      </span>
                    </div>
                    <span className="font-medium text-muted-foreground">
                      {Math.round(p.predicted_7_day_demand)} units / 7d
                    </span>
                  </div>
                ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
