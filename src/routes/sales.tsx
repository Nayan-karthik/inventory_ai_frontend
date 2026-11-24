import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/app/AppShell";
import { Skeleton } from "@/components/ui/skeleton";
import { getSalesHistory } from "@/services/inventory";

export const Route = createFileRoute("/sales")({
  head: () => ({
    meta: [
      { title: "Sales History — StockAI" },
      {
        name: "description",
        content: "Recent sales transactions feeding the demand forecasting models.",
      },
      { property: "og:title", content: "Sales History — StockAI" },
      {
        property: "og:description",
        content: "Every recorded sale, quantity and value in one ledger.",
      },
    ],
  }),
  component: SalesPage,
});

function SalesPage() {
  const { data, isLoading } = useQuery({ queryKey: ["sales"], queryFn: getSalesHistory });

  return (
    <AppShell
      title="Sales History"
      subtitle="The transaction history powering every demand prediction."
    >
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-subtle-foreground">
                <th className="px-5 py-3 font-medium sm:px-6">Product</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium sm:px-6">When</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    <td colSpan={4} className="px-5 py-3 sm:px-6">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))}
              {(data ?? []).map((s) => (
                <tr key={s.id} className="border-t border-border hover:bg-card-hover">
                  <td className="px-5 py-3.5 font-medium sm:px-6">{s.product}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">×{s.qty}</td>
                  <td className="px-4 py-3.5 text-primary">{s.value}</td>
                  <td className="px-5 py-3.5 text-subtle-foreground sm:px-6">{s.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
