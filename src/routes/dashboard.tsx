import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Boxes, IndianRupee, Target, TriangleAlert } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
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
import { getForecast, getRestockRecommendations } from "@/services/mlApi";
import { getProducts } from "@/services/inventory";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
});

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatus(status: string): "critical" | "restock" | "healthy" {
  if (status === "Critical" || status === "critical") return "critical";
  if (status === "Restock" || status === "restock") return "restock";
  return "healthy";
}

function DashboardPage() {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [period, setPeriod] = useState("7");

  const forecastQ = useQuery({
    queryKey: ["ml-forecast"],
    queryFn: getForecast,
  });

  const restockQ = useQuery({
    queryKey: ["ml-restock"],
    queryFn: getRestockRecommendations,
  });
  const productsQ = useQuery({
    queryKey: ["inventory-products"],
    queryFn: getProducts,
  });
  const forecastData = forecastQ.data ?? [];
  const restockData = restockQ.data ?? [];

  const products = useMemo(() => productsQ.data ?? [], [productsQ.data]);
  const activeProductId = selectedProduct || (products[0]?.product_id ?? "P001");

  useEffect(() => {
    const firstProduct = products[0];

    if (firstProduct && !selectedProduct) {
      setSelectedProduct(firstProduct.product_id);
    }
  }, [products, selectedProduct]);

  const selectedForecast = forecastData
    .filter((item) => item.product_id === activeProductId)
    .slice(0, Number(period));

  const forecastPoints = selectedForecast.map((item) => ({
    label: new Date(item.date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    }),
    actual: null,
    predicted: item.predicted_demand,
    rangeLow: item.range_low ?? Math.max(0, Math.round(item.predicted_demand - 3)),
    rangeHigh: item.range_high ?? Math.round(item.predicted_demand + 3),
  }));

  const totalProducts = products.length;

  const inventoryValue = products.reduce(
    (total, product) => total + product.current_stock * product.unit_price,
    0,
  );

  const lowStock = restockData.filter(
    (product) => product.current_stock <= product.reorder_level || product.recommended_order > 0,
  ).length;
  const averageDemand =
    selectedForecast.length > 0
      ? selectedForecast.reduce((sum, item) => sum + item.predicted_demand, 0) /
        selectedForecast.length
      : 0;

  const peakDemand =
    selectedForecast.length > 0
      ? Math.max(...selectedForecast.map((item) => item.predicted_demand))
      : 0;

  const criticalCount = restockData.filter(
    (product) => getStatus(product.status) === "critical",
  ).length;

  const restockCount = restockData.filter(
    (product) => getStatus(product.status) === "restock",
  ).length;

  const healthyCount = restockData.filter(
    (product) => getStatus(product.status) === "healthy",
  ).length;

  const healthData = [
    { name: "Critical", value: criticalCount },
    { name: "Restock", value: restockCount },
    { name: "Healthy", value: healthyCount },
  ];
  const healthColors = ["var(--color-destructive)", "var(--color-primary)", "var(--color-chart-2)"];

  const isLoading = forecastQ.isLoading || restockQ.isLoading || productsQ.isLoading;
  const hasError = forecastQ.isError || restockQ.isError || productsQ.isError;

  return (
    <AppShell title="Inventory Dashboard">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory Dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            AI-powered demand forecasting and smart inventory insights.
          </p>
        </div>

        {hasError && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
            Unable to load dashboard data. Make sure the FastAPI server is running on port 8000.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Products" value={isLoading ? "—" : totalProducts} icon={Boxes} />

          <StatCard
            label="Inventory Value"
            value={isLoading ? "—" : formatCurrency(inventoryValue)}
            icon={IndianRupee}
          />

          <StatCard
            label="Low Stock Items"
            value={isLoading ? "—" : lowStock}
            icon={TriangleAlert}
          />

          <StatCard
            label="Average Forecast"
            value={isLoading ? "—" : `${averageDemand.toFixed(1)} units/day`}
            icon={Target}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-semibold">Demand Forecast</h2>
                <p className="text-sm text-muted-foreground">
                  Predicted demand from the ML forecasting model.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Select value={activeProductId} onValueChange={setSelectedProduct}>
                  <SelectTrigger className="w-[190px]">
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

                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-[110px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="30">30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Forecast Period: {period} days</span>

              <span className="text-xs text-muted-foreground">
                Peak: {peakDemand.toFixed(1)} units
              </span>
            </div>

            {isLoading ? (
              <div className="h-[300px]">
                <Skeleton className="h-full w-full rounded-xl" />
              </div>
            ) : forecastPoints.length > 0 ? (
              <>
                <ForecastChart data={forecastPoints} />

                <div className="mt-4">
                  <ChartLegend />
                </div>
              </>
            ) : (
              <div className="flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground">
                No forecast data available.
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-5">
              <h2 className="text-lg font-semibold">Inventory Health</h2>
              <p className="text-sm text-muted-foreground">
                Current stock status from the ML restocking engine.
              </p>
            </div>

            <div className="h-[220px]">
              {isLoading ? (
                <Skeleton className="h-full w-full rounded-xl" />
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={healthData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {healthData.map((_, index) => (
                        <Cell key={index} fill={healthColors[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Critical</span>
                <span className="font-semibold text-destructive">{criticalCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Needs Restock</span>
                <span className="font-semibold text-primary">{restockCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Healthy</span>
                <span className="font-semibold text-chart-2">{healthyCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold">Smart Restocking</h2>
              <p className="text-sm text-muted-foreground">
                AI-generated recommendations based on predicted demand, current stock,andsafetystock
              </p>
            </div>

            <Button asChild variant="outline">
              <Link to="/restock">View All</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Current Stock</th>
                  <th className="px-4 py-3 font-medium">7-Day Demand</th>
                  <th className="px-4 py-3 font-medium">Reorder Level</th>
                  <th className="px-4 py-3 font-medium">Recommended</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center">
                      <div className="flex justify-center">
                        <Skeleton className="h-5 w-40" />
                      </div>
                    </td>
                  </tr>
                ) : restockData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No restocking recommendations available.
                    </td>
                  </tr>
                ) : (
                  restockData.slice(0, 6).map((product) => (
                    <tr
                      key={product.product_id}
                      className="border-b border-border/60 last:border-0"
                    >
                      <td className="px-4 py-3.5 font-medium">{product.product_name}</td>

                      <td className="px-4 py-3.5 text-muted-foreground">{product.current_stock}</td>

                      <td className="px-4 py-3.5 text-muted-foreground">
                        {Math.round(product.predicted_7_day_demand)}
                      </td>

                      <td className="px-4 py-3.5 text-muted-foreground">{product.reorder_level}</td>

                      <td className="px-4 py-3.5">
                        <span className="text-primary">{product.recommended_order}</span> units
                      </td>

                      <td className="px-4 py-3.5">
                        <StatusBadge status={getStatus(product.status)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
