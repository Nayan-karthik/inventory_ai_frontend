import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Activity,
  Boxes,
  CircleDot,
  LineChart as LineChartIcon,
  PackageCheck,
  TrendingUp,
} from "lucide-react";
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { SiteNav } from "@/components/site/SiteNav";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { ChartLegend, ForecastChart } from "@/components/charts/ForecastChart";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { buildForecast, inventoryHealth, products, recentSales, statusOf } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StockAI — Predict demand. Optimize inventory. Restock smarter." },
      {
        name: "description",
        content:
          "StockAI uses machine learning and time-series forecasting to predict inventory demand and recommend smarter restocking decisions.",
      },
      { property: "og:title", content: "StockAI — AI-powered inventory intelligence" },
      {
        property: "og:description",
        content:
          "Turn historical sales data into accurate demand forecasts and smarter restocking decisions.",
      },
    ],
  }),
  component: Landing,
});

const heroStats = [
  { label: "Total Inventory", value: "₹24.8L", accent: false },
  { label: "Products", value: "1,284", accent: false },
  { label: "Low Stock", value: "24", accent: true },
  { label: "Forecast Accuracy", value: "94.8%", accent: true },
];

const spark = buildForecast(7, 2).map((p) => ({
  v: p.actual ?? p.predicted ?? 0,
}));

const healthColors = [
  "var(--color-chart-5)",
  "var(--color-warning)",
  "var(--color-primary-bright)",
];

function Landing() {
  const forecast = buildForecast(30, 1);

  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* HERO */}
      <section className="radial-crimson relative overflow-hidden px-4 pt-36 pb-16 sm:pt-44">
        <div className="mx-auto max-w-4xl text-center">
          <Link
            to="/forecasts"
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/18"
          >
            <CircleDot className="h-3.5 w-3.5 text-primary" />
            AI-Powered Inventory Intelligence
            <ArrowRight className="h-3.5 w-3.5 text-primary" />
          </Link>

          <h1 className="mt-8 text-5xl leading-[1.05] font-bold sm:text-6xl md:text-7xl">
            Predict <span className="text-primary">Demand</span>.
            <br />
            Restock With <span className="text-primary">Confidence</span>.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Turn historical sales data into accurate demand forecasts and smarter inventory decisions with machine learning.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="crimson">
              <Link to="/forecasts">
                Start Forecasting <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineCrimson">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* DASHBOARD PREVIEW */}
        <div className="mx-auto mt-16 max-w-6xl">
          <div className="rounded-3xl border border-border bg-surface/80 p-3 shadow-[0_60px_140px_-60px_var(--primary)] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {heroStats.map((s) => (
                <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
                  <p className="text-xs uppercase tracking-widest text-subtle-foreground">
                    {s.label}
                  </p>
                  <p
                    className={`mt-2 font-display text-2xl font-bold ${s.accent ? "text-primary" : ""}`}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-2xl border border-border bg-card p-4 sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold">Demand Forecast</h3>
                <ChartLegend />
              </div>
              <ForecastChart data={forecast} height={320} />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES INTRO */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need to make smarter inventory decisions
            </h2>
            <p className="mt-4 text-muted-foreground">
              StockAI combines historical demand, machine learning and real-time inventory data into one intelligent platform.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="panel flex flex-col justify-between p-8">
              <div>
                <h3 className="text-2xl font-bold leading-tight sm:text-3xl">
                  From raw sales data to intelligent restocking decisions.
                </h3>
                <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                  Analyze historical demand, identify trends, forecast future requirements and automatically calculate recommended reorder quantities.
                </p>
              </div>
              <Button asChild variant="crimson" className="mt-8 w-fit">
                <Link to="/restock">
                  Explore Intelligence <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-3xl border border-border bg-surface p-4 sm:p-5">
              <div className="grid gap-4 md:grid-cols-2">
                <MiniPanel title="Inventory Overview" icon={Boxes}>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ["Products", "1,284"],
                      ["Categories", "6"],
                      ["Suppliers", "4"],
                      ["Low stock", "24"],
                    ].map(([k, v]) => (
                      <div key={k} className="rounded-xl bg-secondary/60 p-3">
                        <p className="text-[11px] uppercase tracking-wider text-subtle-foreground">
                          {k}
                        </p>
                        <p className="mt-1 font-display text-lg font-semibold">{v}</p>
                      </div>
                    ))}
                  </div>
                </MiniPanel>

                <MiniPanel title="Stock Health" icon={Activity}>
                  <div className="flex items-center gap-4">
                    <div className="h-28 w-28">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={inventoryHealth}
                            dataKey="value"
                            innerRadius={34}
                            outerRadius={52}
                            paddingAngle={3}
                            stroke="none"
                          >
                            {inventoryHealth.map((_, i) => (
                              <Cell key={i} fill={healthColors[i]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid gap-2 text-xs">
                      {inventoryHealth.map((h, i) => (
                        <span key={h.name} className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: healthColors[i] }}
                          />
                          <span className="text-muted-foreground">{h.name}</span>
                          <span className="font-medium">{h.value}%</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </MiniPanel>

                <MiniPanel title="Demand Forecast" icon={LineChartIcon}>
                  <div className="h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={spark}>
                        <defs>
                          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.45} />
                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="v"
                          stroke="var(--color-primary-bright)"
                          strokeWidth={2}
                          fill="url(#sparkFill)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Next 7 days: <span className="text-primary">+18.4%</span> expected demand
                  </p>
                </MiniPanel>

                <MiniPanel title="Restock Recommendations" icon={PackageCheck}>
                  <div className="grid gap-2">
                    {products.slice(0, 3).map((p) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between gap-2 rounded-xl bg-secondary/60 px-3 py-2"
                      >
                        <span className="truncate text-xs">{p.name}</span>
                        <StatusBadge status={statusOf(p)} />
                      </div>
                    ))}
                  </div>
                </MiniPanel>

                <div className="md:col-span-2">
                  <MiniPanel title="Recent Sales" icon={TrendingUp}>
                    <div className="grid gap-1.5">
                      {recentSales.slice(0, 4).map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 text-xs last:border-0"
                        >
                          <span className="truncate text-muted-foreground">{s.product}</span>
                          <span className="shrink-0 text-subtle-foreground">×{s.qty}</span>
                          <span className="shrink-0 font-medium">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </MiniPanel>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="px-4 pb-24">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-3">
          <div className="panel p-7">
            <h3 className="text-xl font-semibold">AI Demand Forecasting</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Predict future product demand using machine learning and time-series forecasting.
            </p>
            <div className="mt-6 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={spark}>
                  <defs>
                    <linearGradient id="cardFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--color-primary-bright)"
                    strokeWidth={2}
                    fill="url(#cardFill)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel p-7">
            <h3 className="text-xl font-semibold">Smart Restocking</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Automatically identify products that need replenishment and calculaterecommendedorderquantities.
            </p>
            <div className="mt-6 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={products.slice(0, 6).map((p) => ({ v: p.recommendedQty || 4 }))}>
                  <Bar dataKey="v" radius={[6, 6, 0, 0]}>
                    {products.slice(0, 6).map((p, i) => (
                      <Cell
                        key={i}
                        fill={
                          p.recommendedQty > 0
                            ? "var(--color-primary-bright)"
                            : "var(--color-muted)"
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="panel p-7">
            <h3 className="text-xl font-semibold">Inventory Intelligence</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Monitor stock levels, demand trends and inventory health from one unified dashboard.
            </p>
            <div className="mt-6 h-28">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={inventoryHealth}
                    dataKey="value"
                    innerRadius={36}
                    outerRadius={54}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {inventoryHealth.map((_, i) => (
                      <Cell key={i} fill={healthColors[i]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
          <Logo />
          <p className="text-sm text-subtle-foreground">
            Predict demand. Optimize inventory. Restock smarter.
          </p>
        </div>
      </footer>
    </div>
  );
}

function MiniPanel({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: typeof Boxes;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {children}
    </div>
  );
}
