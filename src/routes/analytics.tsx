import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
  getCategoryPerformance,
  getMonthlySales,
  getSlowMoving,
  getTopSelling,
} from "@/services/inventory";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — StockAI" },
      {
        name: "description",
        content:
          "Sales and demand trends, top sellers, slow movers, category performance and forecast accuracy.",
      },
      { property: "og:title", content: "Analytics — StockAI" },
      {
        property: "og:description",
        content: "Understand what sells, what stalls and how accurate your forecasts are.",
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
};

function AnalyticsPage() {
  const monthly = useQuery({ queryKey: ["monthly"], queryFn: getMonthlySales });
  const cats = useQuery({ queryKey: ["cats"], queryFn: getCategoryPerformance });
  const top = useQuery({ queryKey: ["top"], queryFn: getTopSelling });
  const slow = useQuery({ queryKey: ["slow"], queryFn: getSlowMoving });

  return (
    <AppShell
      title="Analytics"
      subtitle="Sales, demand and forecast performance across your catalogue."
    >
      <section className="panel p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold">Sales & Demand Trends</h2>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded bg-primary" /> Sales
            </span>
            <span className="flex items-center gap-2">
              <span className="h-0.5 w-5 rounded bg-chart-2" /> Demand
            </span>
          </div>
        </div>
        <div className="mt-5 h-[320px]">
          {monthly.isLoading ? (
            <Skeleton className="h-full w-full rounded-xl" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly.data ?? []} margin={{ left: -18, right: 8, top: 8 }}>
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
                  width={46}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-border)" }} />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="var(--color-primary-bright)"
                  strokeWidth={2.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="demand"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
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
          <h2 className="text-lg font-semibold">Category Performance</h2>
          <div className="mt-5 h-[280px]">
            {cats.isLoading ? (
              <Skeleton className="h-full w-full rounded-xl" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cats.data ?? []} margin={{ left: -18, right: 8, top: 8 }}>
                  <CartesianGrid
                    stroke="var(--color-border)"
                    strokeDasharray="3 6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="category"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-subtle-foreground)", fontSize: 10 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-subtle-foreground)", fontSize: 11 }}
                    width={46}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]}>
                    {(cats.data ?? []).map((_, i) => (
                      <Cell
                        key={i}
                        fill={i < 2 ? "var(--color-primary-bright)" : "var(--color-muted)"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Forecast Accuracy</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Rolling accuracy of the active ML model across the last nine months.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              ["Accuracy", "94.8%", true],
              ["MAPE", "5.2%", false],
              ["Bias", "-0.8%", false],
            ].map(([l, v, a]) => (
              <div
                key={l as string}
                className="rounded-xl border border-border bg-secondary/50 p-4"
              >
                <p className="text-[11px] uppercase tracking-wider text-subtle-foreground">
                  {l as string}
                </p>
                <p className={`mt-1.5 font-display text-2xl font-bold ${a ? "text-primary" : ""}`}>
                  {v as string}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3">
            {(monthly.data ?? []).slice(-5).map((m) => {
              const acc = Math.round(100 - Math.abs(m.sales - m.demand) / (m.demand / 100));
              return (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="w-10 text-xs text-subtle-foreground">{m.month}</span>
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                    <span
                      className="block h-full rounded-full bg-primary"
                      style={{ width: `${acc}%` }}
                    />
                  </span>
                  <span className="w-12 text-right text-xs">{acc}%</span>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Top Selling Products</h2>
          <div className="mt-4 grid gap-2">
            {(top.data ?? []).map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between border-b border-border/60 py-2 text-sm last:border-0"
              >
                <span className="text-muted-foreground">{t.name}</span>
                <span className="font-medium text-primary">{t.units} units</span>
              </div>
            ))}
            {top.isLoading && <Skeleton className="h-40 w-full rounded-xl" />}
          </div>
        </section>

        <section className="panel p-5 sm:p-6">
          <h2 className="text-lg font-semibold">Slow Moving Products</h2>
          <div className="mt-4 grid gap-2">
            {(slow.data ?? []).map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between border-b border-border/60 py-2 text-sm last:border-0"
              >
                <span className="text-muted-foreground">{t.name}</span>
                <span className="font-medium">{t.units} units</span>
              </div>
            ))}
            {slow.isLoading && <Skeleton className="h-40 w-full rounded-xl" />}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
