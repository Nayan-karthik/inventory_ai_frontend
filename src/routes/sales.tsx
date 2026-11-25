import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Search, Receipt, Package, IndianRupee } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { StatCard } from "@/components/dashboard/StatCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const PAGE_SIZE = 25;

function parseValue(raw: string): number {
  const num = Number(raw.replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

function normalizeCurrency(raw: string): string {
  return raw.replace(/^â‚¹/, "₹");
}

function SalesPage() {
  const { data, isLoading } = useQuery({ queryKey: ["sales"], queryFn: getSalesHistory });
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = data ?? [];
    if (!q) return list;
    return list.filter(
      (s) => s.product.toLowerCase().includes(q) || s.when.toLowerCase().includes(q),
    );
  }, [data, query]);

  const totals = useMemo(() => {
    let units = 0;
    let revenue = 0;
    for (const s of filtered) {
      units += s.qty;
      revenue += parseValue(s.value);
    }
    return { count: filtered.length, units, revenue };
  }, [filtered]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <AppShell
      title="Sales History"
      subtitle="The transaction ledger powering every demand prediction."
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Transactions"
          value={isLoading ? "—" : totals.count.toLocaleString("en-IN")}
          icon={Receipt}
          loading={isLoading}
        />
        <StatCard
          label="Total Units Sold"
          value={isLoading ? "—" : totals.units.toLocaleString("en-IN")}
          icon={Package}
          loading={isLoading}
        />
        <StatCard
          label="Total Revenue"
          value={isLoading ? "—" : `₹${Math.round(totals.revenue).toLocaleString("en-IN")}`}
          icon={IndianRupee}
          accent
          loading={isLoading}
        />
      </div>

      <div className="panel mb-5 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by product or date..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="bg-secondary/40 text-left text-xs uppercase tracking-wider text-subtle-foreground">
                <th className="px-5 py-3 font-medium sm:px-6">Product</th>
                <th className="px-4 py-3 font-medium">Quantity</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium sm:px-6">Date</th>
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
              {!isLoading && pageRows.length === 0 && (
                <tr className="border-t border-border">
                  <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground">
                    No matching sales records found.
                  </td>
                </tr>
              )}
              {pageRows.map((s) => (
                <tr key={s.id} className="border-t border-border transition-colors hover:bg-card-hover">
                  <td className="px-5 py-3.5 font-medium sm:px-6">{s.product}</td>
                  <td className="px-4 py-3.5 text-muted-foreground">×{s.qty}</td>
                  <td className="px-4 py-3.5 font-medium text-primary">
                    {normalizeCurrency(s.value)}
                  </td>
                  <td className="px-5 py-3.5 text-subtle-foreground sm:px-6">{s.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!isLoading && filtered.length > PAGE_SIZE && (
          <div className="flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground">
            <span>
              Page {safePage} of {totalPages} ({filtered.length} records)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={safePage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={safePage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
