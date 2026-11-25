import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  PackageCheck,
  ShieldCheck,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  createRestockOrder,
  getRestockOrders,
  getRestockRecommendations,
  type RestockRecommendation,
} from "@/services/mlApi";

export const Route = createFileRoute("/restock")({
  head: () => ({
    meta: [
      { title: "Smart Restocking — StockAI" },
      {
        name: "description",
        content:
          "AI-generated restock recommendations based on predicted demand, safety stock and supplier lead time.",
      },
      { property: "og:title", content: "Smart Restocking — StockAI" },
      {
        property: "og:description",
        content: "Recommended order quantities for every product that needs replenishment.",
      },
    ],
  }),
  component: RestockPage,
});

function RestockPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ml-restock"],
    queryFn: getRestockRecommendations,
  });

  const { data: savedOrders = [] } = useQuery({
    queryKey: ["restock-orders"],
    queryFn: getRestockOrders,
  });

  const [selectedProduct, setSelectedProduct] = useState<RestockRecommendation | null>(null);
  const [orderQty, setOrderQty] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [pendingOrders, setPendingOrders] = useState<Set<string>>(new Set());

  useEffect(() => {
    setPendingOrders(new Set(savedOrders.map((order) => order.product_id)));
  }, [savedOrders]);

  const needs = (data ?? []).filter((product) => product.recommended_order > 0);

  const handleCreateOrder = (product: RestockRecommendation) => {
    setSelectedProduct(product);
    setOrderQty(String(product.recommended_order));
  };

  const handleConfirmOrder = async () => {
    if (!selectedProduct) return;
    const quantity = Math.max(1, parseInt(orderQty, 10) || selectedProduct.recommended_order);
    setSubmitting(true);

    try {
      await createRestockOrder({
        product_id: selectedProduct.product_id,
        product_name: selectedProduct.product_name,
        quantity,
      });

      setPendingOrders((current) => {
        const updated = new Set(current);
        updated.add(selectedProduct.product_id);
        return updated;
      });

      await queryClient.invalidateQueries({ queryKey: ["restock-orders"] });

      toast.success("Restock order created", {
        description: `${quantity} × ${selectedProduct.product_name} is now pending.`,
      });

      setSelectedProduct(null);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create restock order", {
        description: "Make sure the FastAPI server is running.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell
      title="Smart Restocking"
      subtitle="AI-generated recommendations based on predicted demand, current stock, safety stock and supplier lead time."
    >
      {isLoading ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-60 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="panel flex flex-col items-center gap-3 px-6 py-20 text-center">
          <p className="font-medium">Unable to load restocking data</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Make sure the FastAPI server is running on port 8000.
          </p>
        </div>
      ) : needs.length === 0 ? (
        <div className="panel flex flex-col items-center gap-3 px-6 py-20 text-center">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          <p className="font-medium">Everything is well stocked</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            No product is projected to require replenishment within the forecast window.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {needs.map((product) => {
            const isPending = pendingOrders.has(product.product_id);

            return (
              <article key={product.product_id} className="panel p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{product.product_name}</h2>
                    <p className="mt-1 text-xs text-subtle-foreground">
                      {product.product_id} · Lead time: {product.supplier_lead_time_days} days
                    </p>
                  </div>

                  <StatusBadge
                    status={product.status.toLowerCase() === "critical" ? "critical" : "restock"}
                  />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Metric icon={PackageCheck} label="Current Stock" value={product.current_stock} />
                  <Metric
                    icon={TrendingUp}
                    label="Predicted 7-Day"
                    value={Math.round(product.predicted_7_day_demand)}
                  />
                  <Metric icon={ShieldCheck} label="Safety Stock" value={product.safety_stock} />
                  <Metric
                    icon={Clock}
                    label="Lead Time"
                    value={`${product.supplier_lead_time_days} d`}
                  />
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-subtle-foreground">
                      Recommended Order
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold text-primary">
                      {product.recommended_order} Units
                    </p>
                  </div>

                  {isPending ? (
                    <Button variant="outline" disabled>
                      <Clock className="mr-2 h-4 w-4" />
                      Order Pending
                    </Button>
                  ) : (
                    <Button variant="crimson" onClick={() => handleCreateOrder(product)}>
                      Create Restock Order
                    </Button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* LOGGED RESTOCK ORDERS HISTORY */}
      <section className="panel mt-8 overflow-hidden">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2.5">
            <ClipboardList className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-semibold">Restock Orders Ledger</h2>
              <p className="text-xs text-muted-foreground">
                Orders persisted in the backend database.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            {savedOrders.length} total
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left text-sm">
            <thead>
              <tr className="bg-secondary/40 text-xs uppercase tracking-wider text-subtle-foreground">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {savedOrders.length === 0 ? (
                <tr className="border-t border-border">
                  <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                    No restock orders created yet.
                  </td>
                </tr>
              ) : (
                savedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-border transition-colors hover:bg-card-hover"
                  >
                    <td className="px-6 py-3.5 font-mono text-xs text-subtle-foreground">
                      #{order.id}
                    </td>
                    <td className="px-4 py-3.5 font-medium">
                      {order.product_name}{" "}
                      <span className="text-xs text-subtle-foreground">({order.product_id})</span>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-primary">{order.quantity} units</td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium capitalize text-amber-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-xs text-muted-foreground">
                      {order.created_at
                        ? new Date(order.created_at).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-sm">
          <div className="panel w-full max-w-md p-6 shadow-2xl">
            <div>
              <h2 className="text-xl font-semibold">Confirm Restock Order</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Review or adjust the order quantity before submitting to the backend.
              </p>
            </div>

            <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">{selectedProduct.product_name}</p>
                  <p className="mt-0.5 text-xs text-subtle-foreground">
                    {selectedProduct.product_id} · Recommended: {selectedProduct.recommended_order} units
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="order-qty" className="text-xs text-muted-foreground">
                  Order Quantity
                </Label>
                <Input
                  id="order-qty"
                  type="number"
                  min={1}
                  className="mt-1.5 bg-card"
                  value={orderQty}
                  onChange={(e) => setOrderQty(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedProduct(null)} disabled={submitting}>
                Cancel
              </Button>
              <Button variant="crimson" onClick={handleConfirmOrder} disabled={submitting}>
                {submitting ? "Submitting..." : "Confirm Order"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-3">
      <span className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-subtle-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <p className="mt-1.5 font-display text-lg font-semibold">{value}</p>
    </div>
  );
}
