import type { StockStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const map: Record<StockStatus, { label: string; className: string }> = {
  critical: {
    label: "Critical",
    className: "border-primary/45 bg-primary/15 text-primary",
  },
  restock: {
    label: "Restock",
    className: "border-warning/40 bg-warning/12 text-warning",
  },
  healthy: {
    label: "Healthy",
    className: "border-border bg-secondary text-muted-foreground",
  },
};

export function StatusBadge({ status }: { status: StockStatus }) {
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        s.className,
      )}
    >
      {s.label}
    </span>
  );
}
