import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Product", to: "/" },
  { label: "Forecasting", to: "/forecasts" },
  { label: "Inventory", to: "/inventory" },
  { label: "Analytics", to: "/analytics" },
  { label: "Solutions", to: "/restock" },
  { label: "Docs", to: "/settings" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="glass-nav mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard">Log In</Link>
          </Button>
          <Button asChild size="sm" variant="crimson">
            <Link to="/dashboard">Start Free</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="rounded-lg p-2 text-muted-foreground sm:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="glass-nav mx-auto mt-2 max-w-6xl rounded-2xl p-3 sm:hidden">
          <div className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="crimson" className="mt-2">
              <Link to="/dashboard">Start Free</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
