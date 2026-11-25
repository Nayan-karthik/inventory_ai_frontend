import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Trash2, Upload, Pencil, PackageX } from "lucide-react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/AppShell";
import { UploadModal } from "@/components/app/UploadModal";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, suppliers, statusOf, type Product } from "@/lib/mock-data";
import { getProducts } from "@/services/inventory";
import { getRestockRecommendations } from "@/services/mlApi";

export const Route = createFileRoute("/inventory")({
  head: () => ({
    meta: [
      { title: "Inventory — StockAI" },
      {
        name: "description",
        content:
          "Manage products, stock levels, reorder points and suppliers in one searchable inventory table.",
      },
      { property: "og:title", content: "Inventory — StockAI" },
      {
        property: "og:description",
        content: "Search, filter, add and edit products across your whole catalogue.",
      },
    ],
  }),
  component: InventoryPage,
});

const empty = {
  name: "",
  category: categories[0]!,
  supplier: suppliers[0]!,
  currentStock: "0",
  reorderLevel: "0",
  unitPrice: "0",
};

function InventoryPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: restockData } = useQuery({
    queryKey: ["ml-restock"],
    queryFn: getRestockRecommendations,
  });

  const [rows, setRows] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [supplier, setSupplier] = useState("all");
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (data) {
      setRows(
        data.map((p) => {
          const restock = restockData?.find((r) => r.product_id === p.product_id);

          return {
            id: p.product_id,
            name: p.product_name,
            sku: p.product_id,
            category: "General",
            supplier: "Default Supplier",
            currentStock: p.current_stock,
            reorderLevel: p.reorder_level,
            unitPrice: p.unit_price,
            predictedDemand: restock?.predicted_7_day_demand ?? 0,
            recommendedQty: restock?.recommended_order ?? 0,
            leadTimeDays: p.supplier_lead_time_days,
            safetyStock: p.safety_stock,
            status: restock?.status?.toLowerCase() ?? "healthy",
          };
        }),
      );
    }
  }, [data, restockData]);

  const filtered = useMemo(
    () =>
      rows.filter((p) => {
        const q = query.trim().toLowerCase();

        if (q && !`${p.name} ${p.sku}`.toLowerCase().includes(q)) {
          return false;
        }

        if (category !== "all" && p.category !== category) {
          return false;
        }

        if (supplier !== "all" && p.supplier !== supplier) {
          return false;
        }

        if (status !== "all" && statusOf(p) !== status) {
          return false;
        }

        return true;
      }),
    [rows, query, category, supplier, status],
  );

  const openAdd = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category,
      supplier: p.supplier,
      currentStock: String(p.currentStock),
      reorderLevel: String(p.reorderLevel),
      unitPrice: String(p.unitPrice),
    });
    setOpen(true);
  };

  const save = () => {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }

    const base = {
      name: form.name.trim(),
      category: form.category,
      supplier: form.supplier,
      currentStock: Number(form.currentStock) || 0,
      reorderLevel: Number(form.reorderLevel) || 0,
      unitPrice: Number(form.unitPrice) || 0,
    };

    if (editing) {
      setRows((r) => r.map((p) => (p.id === editing.id ? { ...p, ...base } : p)));

      toast.success(`${base.name} updated`);
    } else {
      setRows((r) => [
        {
          id: `p${Date.now()}`,
          sku: `NEW-${String(r.length + 1).padStart(3, "0")}`,
          predictedDemand: Math.round(base.reorderLevel * 1.6),
          recommendedQty: Math.max(0, base.reorderLevel - base.currentStock),
          leadTimeDays: 5,
          safetyStock: Math.round(base.reorderLevel * 0.4),
          status: "healthy",
          ...base,
        },
        ...r,
      ]);

      toast.success(`${base.name} added to inventory`);
    }

    setOpen(false);
  };

  const remove = (p: Product) => {
    setRows((r) => r.filter((x) => x.id !== p.id));
    toast.success(`${p.name} removed`);
  };

  return (
    <AppShell
      title="Inventory"
      subtitle="Every product, stock level and reorder point in one place."
      actions={
        <>
          <Button variant="crimson" onClick={openAdd}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>

          <Button
            variant="outlineCrimson"
            onClick={() => setUploadOpen(true)}
          >
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
        </>
      }
    >
      <div className="panel p-4 sm:p-5">
        <div className="grid gap-3 lg:grid-cols-[1.4fr_repeat(3,0.9fr)]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" />

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="pl-9"
            />
          </div>

          <Filter value={category} onChange={setCategory} label="Category" options={categories} />

          <Filter
            value={status}
            onChange={setStatus}
            label="Stock Status"
            options={["critical", "restock", "healthy"]}
          />

          <Filter value={supplier} onChange={setSupplier} label="Supplier" options={suppliers} />
        </div>
      </div>

      <div className="panel mt-5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-subtle-foreground">
                <th className="px-5 py-3 font-medium sm:px-6">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Current Stock</th>
                <th className="px-4 py-3 font-medium">Reorder Level</th>
                <th className="px-4 py-3 font-medium">Unit Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium sm:px-6">Actions</th>
              </tr>
            </thead>

            <tbody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border">
                    <td colSpan={7} className="px-5 py-3 sm:px-6">
                      <Skeleton className="h-6 w-full" />
                    </td>
                  </tr>
                ))}

              {!isLoading &&
                filtered.map((p) => (
                  <tr key={p.id} className="border-t border-border hover:bg-card-hover">
                    <td className="px-5 py-3.5 sm:px-6">
                      <span className="block font-medium">{p.name}</span>

                      <span className="block text-xs text-subtle-foreground"> {p.sku}</span>
                    </td>

                    <td className="px-4 py-3.5 text-muted-foreground"> {p.category}</td>

                    <td className="px-4 py-3.5 text-muted-foreground">{p.currentStock}</td>

                    <td className="px-4 py-3.5 text-muted-foreground"> {p.reorderLevel}</td>

                    <td className="px-4 py-3.5"> ₹{p.unitPrice.toLocaleString("en-IN")} </td>

                    <td className="px-4 py-3.5">
                      <StatusBadge status={statusOf(p)} />
                    </td>

                    <td className="px-5 py-3.5 text-right sm:px-6">
                      <div className="inline-flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <Button size="icon" variant="ghost" onClick={() => remove(p)}>
                          <Trash2 className="h-4 w-4 text-primary" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
            <PackageX className="h-8 w-8 text-subtle-foreground" />

            <p className="font-medium">No products match your filters</p>

            <p className="max-w-sm text-sm text-muted-foreground">
              Try clearing the search or filters, or add a new product to your catalogue.
            </p>

            <Button variant="outlineCrimson" onClick={openAdd}>
              <Plus className="h-4 w-4" /> Add Product
            </Button>
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit product" : "Add product"}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Product name</Label>

              <Input
                id="name"
                className="mt-1.5"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label>Category</Label>

              <Select
                value={form.category}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    category: v,
                  })
                }
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Supplier</Label>

              <Select
                value={form.supplier}
                onValueChange={(v) =>
                  setForm({
                    ...form,
                    supplier: v,
                  })
                }
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="stock">Current stock</Label>

              <Input
                id="stock"
                type="number"
                className="mt-1.5"
                value={form.currentStock}
                onChange={(e) =>
                  setForm({
                    ...form,
                    currentStock: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <Label htmlFor="reorder">Reorder level</Label>

              <Input
                id="reorder"
                type="number"
                className="mt-1.5"
                value={form.reorderLevel}
                onChange={(e) =>
                  setForm({
                    ...form,
                    reorderLevel: e.target.value,
                  })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="price">Unit price (₹)</Label>

              <Input
                id="price"
                type="number"
                className="mt-1.5"
                value={form.unitPrice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    unitPrice: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>

            <Button variant="crimson" onClick={save}>
              {editing ? "Save changes" : "Add product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </AppShell>
  );
}

function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder={label} />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All {label.toLowerCase()}</SelectItem>

        {options.map((o) => (
          <SelectItem key={o} value={o} className="capitalize">
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
