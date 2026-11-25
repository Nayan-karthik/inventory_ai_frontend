import type { StockStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const map: Record<StockStatus, { label: string; className: string }> = {
  critical: {
    label: "Critical",
    className: "border-rose-200 bg-rose-50 text-rose-700",
  },
  restock: {
    label: "Restock",
    className: "border-amber-200 bg-amber-50 text-amber-700",
  },
  healthy: {
    label: "Healthy",
    className: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
};

export function StatusBadge({ status }: { status: StockStatus }) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        s.className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          status === "critical"
            ? "bg-rose-500"
            : status === "restock"
              ? "bg-amber-500"
              : "bg-emerald-500",
        )}
      />
      {s.label}
    </span>
  );
}
