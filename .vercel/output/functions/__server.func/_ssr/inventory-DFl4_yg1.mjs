import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Y9N3DePz.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as Search, g as Pencil, h as Plus, o as Trash2, r as Upload, v as PackageX } from "../_libs/lucide-react.mjs";
import { a as DialogHeader, c as Label, h as getRestockRecommendations, i as DialogFooter, l as UploadModal, n as Dialog, o as DialogTitle, r as DialogContent, s as Input, t as AppShell } from "./AppShell-DElWAt1-.mjs";
import { t as Skeleton } from "./skeleton-Bajl8Ani.mjs";
import { t as getProducts } from "./inventory-yJxyrm_w.mjs";
import { t as StatusBadge } from "./StatusBadge-BtbTAIu-.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CV4rJHJA.mjs";
import { n as categories, o as statusOf, s as suppliers } from "./mock-data-DisqNKjj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-DFl4_yg1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	name: "",
	category: categories[0],
	supplier: suppliers[0],
	currentStock: "0",
	reorderLevel: "0",
	unitPrice: "0"
};
function InventoryPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["products"],
		queryFn: getProducts
	});
	const { data: restockData } = useQuery({
		queryKey: ["ml-restock"],
		queryFn: getRestockRecommendations
	});
	const [rows, setRows] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [status, setStatus] = (0, import_react.useState)("all");
	const [supplier, setSupplier] = (0, import_react.useState)("all");
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [uploadOpen, setUploadOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
		if (data) setRows(data.map((p) => {
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
				status: restock?.status?.toLowerCase() ?? "healthy"
			};
		}));
	}, [data, restockData]);
	const filtered = (0, import_react.useMemo)(() => rows.filter((p) => {
		const q = query.trim().toLowerCase();
		if (q && !`${p.name} ${p.sku}`.toLowerCase().includes(q)) return false;
		if (category !== "all" && p.category !== category) return false;
		if (supplier !== "all" && p.supplier !== supplier) return false;
		if (status !== "all" && statusOf(p) !== status) return false;
		return true;
	}), [
		rows,
		query,
		category,
		supplier,
		status
	]);
	const openAdd = () => {
		setEditing(null);
		setForm(empty);
		setOpen(true);
	};
	const openEdit = (p) => {
		setEditing(p);
		setForm({
			name: p.name,
			category: p.category,
			supplier: p.supplier,
			currentStock: String(p.currentStock),
			reorderLevel: String(p.reorderLevel),
			unitPrice: String(p.unitPrice)
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
			unitPrice: Number(form.unitPrice) || 0
		};
		if (editing) {
			setRows((r) => r.map((p) => p.id === editing.id ? {
				...p,
				...base
			} : p));
			toast.success(`${base.name} updated`);
		} else {
			setRows((r) => [{
				id: `p${Date.now()}`,
				sku: `NEW-${String(r.length + 1).padStart(3, "0")}`,
				predictedDemand: Math.round(base.reorderLevel * 1.6),
				recommendedQty: Math.max(0, base.reorderLevel - base.currentStock),
				leadTimeDays: 5,
				safetyStock: Math.round(base.reorderLevel * .4),
				status: "healthy",
				...base
			}, ...r]);
			toast.success(`${base.name} added to inventory`);
		}
		setOpen(false);
	};
	const remove = (p) => {
		setRows((r) => r.filter((x) => x.id !== p.id));
		toast.success(`${p.name} removed`);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Inventory",
		subtitle: "Every product, stock level and reorder point in one place.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "crimson",
			onClick: openAdd,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Product"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "outlineCrimson",
			onClick: () => setUploadOpen(true),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "h-4 w-4" }), " Import CSV"]
		})] }),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel p-4 sm:p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 lg:grid-cols-[1.4fr_repeat(3,0.9fr)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search products...",
								className: "pl-9"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
							value: category,
							onChange: setCategory,
							label: "Category",
							options: categories
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
							value: status,
							onChange: setStatus,
							label: "Stock Status",
							options: [
								"critical",
								"restock",
								"healthy"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filter, {
							value: supplier,
							onChange: setSupplier,
							label: "Supplier",
							options: suppliers
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel mt-5 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[860px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "text-left text-xs uppercase tracking-wider text-subtle-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium sm:px-6",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Category"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Current Stock"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Reorder Level"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Unit Price"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 text-right font-medium sm:px-6",
									children: "Actions"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [isLoading && Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 7,
								className: "px-5 py-3 sm:px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" })
							})
						}, i)), !isLoading && filtered.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border hover:bg-card-hover",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-5 py-3.5 sm:px-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-subtle-foreground",
										children: [" ", p.sku]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: [" ", p.category]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: p.currentStock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 text-muted-foreground",
									children: [" ", p.reorderLevel]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5",
									children: [
										" ₹",
										p.unitPrice.toLocaleString("en-IN"),
										" "
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: statusOf(p) })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3.5 text-right sm:px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex gap-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => openEdit(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "h-4 w-4" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "ghost",
											onClick: () => remove(p),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4 text-primary" })
										})]
									})
								})
							]
						}, p.id))] })]
					})
				}), !isLoading && filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 px-6 py-16 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PackageX, { className: "h-8 w-8 text-subtle-foreground" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "No products match your filters"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-sm text-sm text-muted-foreground",
							children: "Try clearing the search or filters, or add a new product to your catalogue."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outlineCrimson",
							onClick: openAdd,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Add Product"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open,
				onOpenChange: setOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: editing ? "Edit product" : "Add product" }) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "name",
									children: "Product name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "name",
									className: "mt-1.5",
									value: form.name,
									onChange: (e) => setForm({
										...form,
										name: e.target.value
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.category,
								onValueChange: (v) => setForm({
									...form,
									category: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c,
									children: c
								}, c)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Supplier" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: form.supplier,
								onValueChange: (v) => setForm({
									...form,
									supplier: v
								}),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "mt-1.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: suppliers.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: s,
									children: s
								}, s)) })]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "stock",
								children: "Current stock"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "stock",
								type: "number",
								className: "mt-1.5",
								value: form.currentStock,
								onChange: (e) => setForm({
									...form,
									currentStock: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "reorder",
								children: "Reorder level"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "reorder",
								type: "number",
								className: "mt-1.5",
								value: form.reorderLevel,
								onChange: (e) => setForm({
									...form,
									reorderLevel: e.target.value
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "price",
									children: "Unit price (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "price",
									type: "number",
									className: "mt-1.5",
									value: form.unitPrice,
									onChange: (e) => setForm({
										...form,
										unitPrice: e.target.value
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: () => setOpen(false),
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "crimson",
						onClick: save,
						children: editing ? "Save changes" : "Add product"
					})] })
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
				open: uploadOpen,
				onOpenChange: setUploadOpen
			})
		]
	});
}
function Filter({ label, value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
		value,
		onValueChange: onChange,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: label }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
			value: "all",
			children: ["All ", label.toLowerCase()]
		}), options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
			value: o,
			className: "capitalize",
			children: o
		}, o))] })]
	});
}
//#endregion
export { InventoryPage as component };
