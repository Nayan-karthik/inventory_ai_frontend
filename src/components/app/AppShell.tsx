import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  BarChart3,
  Boxes,
  LayoutDashboard,
  LineChart,
  Menu,
  Receipt,
  Settings,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { DatasetBanner } from "./DatasetBanner";

const nav = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { label: "Inventory", to: "/inventory", icon: Boxes },
  { label: "Forecasting", to: "/forecasts", icon: LineChart },
  { label: "Smart Restocking", to: "/restock", icon: Sparkles },
  { label: "Sales History", to: "/sales", icon: Receipt },
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Settings", to: "/settings", icon: Settings },
] as const;

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="grid gap-1">
      {nav.map((item) => {
        const active = pathname === item.to;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
              active
                ? "bg-primary/10 font-medium text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_22%,transparent)]"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
            )}
          >
            <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-subtle-foreground")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserCard() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-secondary/60 px-3 py-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary">
        <UserRound className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-foreground">Store Manager</span>
        <span className="block truncate text-xs text-subtle-foreground">admin@stockai.io</span>
      </span>
    </div>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 lg:flex">
        <div className="grid gap-6">
          <Link to="/" className="px-1 py-2">
            <Logo />
          </Link>
          <NavList />
        </div>
        <UserCard />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur-md lg:hidden">
          <Link to="/">
            <Logo />
          </Link>
          <button
            aria-label="Toggle navigation"
            className="rounded-lg p-2 text-muted-foreground hover:bg-secondary"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-b border-border bg-card p-4 lg:hidden">
            <NavList onNavigate={() => setOpen(false)} />
            <div className="mt-4">
              <UserCard />
            </div>
          </div>
        )}

        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <DatasetBanner />
          <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{title}</h1>
              {subtitle && <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </header>
          <div className="animate-in fade-in duration-300">{children}</div>
        </main>
      </div>
    </div>
  );
}
