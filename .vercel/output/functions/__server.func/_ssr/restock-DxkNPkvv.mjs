import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { S as CircleCheck, a as TrendingUp, b as Clock, g as PackageCheck, l as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BDF5ErS7.mjs";
import { t as Skeleton } from "./skeleton-Dbr6o8-Y.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as StatusBadge } from "./StatusBadge-BD7idD-a.mjs";
import { t as Button } from "./button-CCxugsBO.mjs";
import { a as getRestockOrders, o as getRestockRecommendations, t as createRestockOrder } from "./mlApi-BvPTJS0S.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/restock-DxkNPkvv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RestockPage() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["ml-restock"],
		queryFn: getRestockRecommendations
	});
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
	const { data: savedOrders = [] } = useQuery({
		queryKey: ["restock-orders"],
		queryFn: getRestockOrders
	});
	const [pendingOrders, setPendingOrders] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		if (savedOrders.length > 0) setPendingOrders(new Set(savedOrders.map((order) => order.product_id)));
	}, [savedOrders]);
	const needs = (data ?? []).filter((product) => product.recommended_order > 0);
	const handleCreateOrder = (product) => {
		setSelectedProduct(product);
	};
	const handleConfirmOrder = async () => {
		if (!selectedProduct) return;
		try {
			await createRestockOrder({
				product_id: selectedProduct.product_id,
				product_name: selectedProduct.product_name,
				quantity: selectedProduct.recommended_order
			});
			setPendingOrders((current) => {
				const updated = new Set(current);
				updated.add(selectedProduct.product_id);
				return updated;
			});
			toast.success("Restock order created", { description: `${selectedProduct.recommended_order} × ${selectedProduct.product_name} is now pending.` });
			setSelectedProduct(null);
		} catch (error) {
			console.error(error);
			toast.error("Failed to create restock order", { description: "Make sure the FastAPI server is running." });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Smart Restocking",
		subtitle: "AI-generated recommendations based on predicted demand, current stock, safety stock and supplier lead time.",
		children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-60 w-full rounded-2xl" }, i))
		}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel flex flex-col items-center gap-3 px-6 py-20 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Unable to load restocking data"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-sm text-sm text-muted-foreground",
				children: "Make sure the FastAPI server is running on port 8000."
			})]
		}) : needs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "panel flex flex-col items-center gap-3 px-6 py-20 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-primary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "Everything is well stocked"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-sm text-sm text-muted-foreground",
					children: "No product is projected to require replenishment within the forecast window."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-5 lg:grid-cols-2",
			children: needs.map((product) => {
				const isPending = pendingOrders.has(product.product_id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "panel p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: product.product_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-subtle-foreground",
								children: [
									product.product_id,
									" · Lead time: ",
									product.supplier_lead_time_days,
									" days"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: product.status.toLowerCase() === "critical" ? "critical" : "restock" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									icon: PackageCheck,
									label: "Current Stock",
									value: product.current_stock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									icon: TrendingUp,
									label: "Predicted 7-Day",
									value: Math.round(product.predicted_7_day_demand)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									icon: ShieldCheck,
									label: "Safety Stock",
									value: product.safety_stock
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Metric, {
									icon: Clock,
									label: "Lead Time",
									value: `${product.supplier_lead_time_days} d`
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/35 bg-primary/8 px-5 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-widest text-subtle-foreground",
								children: "Recommended Order"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-display text-2xl font-bold text-primary",
								children: [product.recommended_order, " Units"]
							})] }), isPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								disabled: true,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "mr-2 h-4 w-4" }), "Order Pending"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "crimson",
								onClick: () => handleCreateOrder(product),
								children: "Create Restock Order"
							})]
						})
					]
				}, product.product_id);
			})
		}), selectedProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel w-full max-w-md p-6 shadow-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-semibold",
						children: "Confirm Restock Order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Are you sure you want to create a restock order for this product?"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 rounded-xl border border-border bg-secondary/50 p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: selectedProduct.product_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-subtle-foreground",
								children: selectedProduct.product_id
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-display text-xl font-bold text-primary",
								children: [selectedProduct.recommended_order, " Units"]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-end gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setSelectedProduct(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "crimson",
							onClick: handleConfirmOrder,
							children: "Confirm Order"
						})]
					})
				]
			})
		})]
	});
}
function Metric({ icon: Icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-secondary/50 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-subtle-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), label]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1.5 font-display text-lg font-semibold",
			children: value
		})]
	});
}
//#endregion
export { RestockPage as component };
