import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — StockAI" },
      {
        name: "description",
        content:
          "Configure forecasting defaults, safety stock policy and low-stock alerting for StockAI.",
      },
      { property: "og:title", content: "Settings — StockAI" },
      {
        property: "og:description",
        content: "Workspace, forecasting and alert preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <AppShell title="Settings" subtitle="Workspace, forecasting and alerting preferences.">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="panel p-6">
          <h2 className="text-lg font-semibold">Workspace</h2>
          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor="org">Organisation</Label>
              <Input id="org" className="mt-1.5" defaultValue="StockAI Retail Pvt Ltd" />
            </div>
            <div>
              <Label htmlFor="email">Admin email</Label>
              <Input id="email" className="mt-1.5" defaultValue="admin@stockai.io" />
            </div>
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="text-lg font-semibold">Forecasting</h2>
          <div className="mt-5 grid gap-4">
            <div>
              <Label htmlFor="safety">Default safety stock (%)</Label>
              <Input id="safety" type="number" className="mt-1.5" defaultValue={40} />
            </div>
            <div>
              <Label htmlFor="lead">Default supplier lead time (days)</Label>
              <Input id="lead" type="number" className="mt-1.5" defaultValue={5} />
            </div>
            <Row label="Auto-generate restock orders" />
            <Row label="Low-stock email alerts" defaultChecked />
          </div>
        </section>
      </div>

      <div className="mt-6">
        <Button variant="crimson" onClick={() => toast.success("Settings saved")}>
          Save changes
        </Button>
      </div>
    </AppShell>
  );
}

function Row({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/50 px-4 py-3">
      <span className="text-sm">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
