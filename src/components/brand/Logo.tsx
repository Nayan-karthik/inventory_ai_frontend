import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
        <span className="h-3 w-3 rounded-full bg-primary glow-primary" />
      </span>
      {!compact && (
        <span className="font-display text-lg font-bold tracking-tight">
          Stock<span className="text-primary">AI</span>
        </span>
      )}
    </span>
  );
}
