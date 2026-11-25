import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  accent,
  loading,
}: {
  label: string;
  value: string | number;
  delta?: string;
  icon?: LucideIcon;
  accent?: boolean;
  loading?: boolean;
}) {
  return (
    <div className="panel p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-widest text-subtle-foreground">
          {label}
        </span>
        {Icon && (
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl",
              accent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground",
            )}
          >
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>
      {loading ? (
        <Skeleton className="mt-4 h-8 w-24" />
      ) : (
        <p className={cn("mt-3 font-display text-3xl font-bold", accent && "text-primary")}>
          {value}
        </p>
      )}
      {delta && !loading && <p className="mt-1.5 text-xs text-muted-foreground">{delta}</p>}
    </div>
  );
}
