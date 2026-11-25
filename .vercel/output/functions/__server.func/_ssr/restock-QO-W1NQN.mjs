import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Y9N3DePz.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as CircleCheck, D as Clock, O as ClipboardList, a as TrendingUp, u as ShieldCheck, y as PackageCheck } from "../_libs/lucide-react.mjs";
import { c as Label, h as getRestockRecommendations, m as getRestockOrders, s as Input, t as AppShell, u as createRestockOrder } from "./AppShell-DElWAt1-.mjs";
import { t as Skeleton } from "./skeleton-Bajl8Ani.mjs";
import { t as StatusBadge } from "./StatusBadge-BtbTAIu-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/restock-QO-W1NQN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RestockPage() {
	const queryClient = useQueryClient();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["ml-restock"],
		queryFn: getRestockRecommendations
	});
	const { data: savedOrders = [] } = useQuery({
		queryKey: ["restock-orders"],
		queryFn: getRestockOrders
	});
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
	const [orderQty, setOrderQty] = (0, import_react.useState)("");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [pendingOrders, setPendingOrders] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	(0, import_react.useEffect)(() => {
		setPendingOrders(new Set(savedOrders.map((order) => order.product_id)));
	}, [savedOrders]);
	const needs = (data ?? []).filter((product) => product.recommended_order > 0);
	const handleCreateOrder = (product) => {
		setSelectedProduct(product);
		setOrderQty(String(product.recommended_order));
	};
	const handleConfirmOrder = async () => {
		if (!selectedProduct) return;
		const quantity = Math.max(1, parseInt(orderQty, 10) || selectedProduct.recommended_order);
		setSubmitting(true);
		try {
			await createRestockOrder({
				product_id: selectedProduct.product_id,
				product_name: selectedProduct.product_name,
				quantity
			});
			setPendingOrders((current) => {
				const updated = new Set(current);
				updated.add(selectedProduct.product_id);
				return updated;
			});
			await queryClient.invalidateQueries({ queryKey: ["restock-orders"] });
			toast.success("Restock order created", { description: `${quantity} × ${selectedProduct.product_name} is now pending.` });
			setSelectedProduct(null);
		} catch (error) {
			console.error(error);
			toast.error("Failed to create restock order", { description: "Make sure the FastAPI server is running." });
		} finally {
			setSubmitting(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Smart Restocking",
		subtitle: "AI-generated recommendations based on predicted demand, current stock, safety stock and supplier lead time.",
		children: [
			isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8 text-emerald-600" }),
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
								className: "mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4",
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-8 overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-6 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-base font-semibold",
							children: "Restock Orders Ledger"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Orders persisted in the backend database."
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground",
						children: [savedOrders.length, " total"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[540px] text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-secondary/40 text-xs uppercase tracking-wider text-subtle-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 font-medium",
									children: "Order ID"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Quantity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-6 py-3 font-medium",
									children: "Created"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: savedOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-t border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 5,
								className: "px-6 py-10 text-center text-muted-foreground",
								children: "No restock orders created yet."
							})
						}) : savedOrders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border transition-colors hover:bg-card-hover",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-6 py-3.5 font-mono text-xs text-subtle-foreground",
									children: ["#", order.id]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 font-medium",
									children: [
										order.product_name,
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-xs text-subtle-foreground",
											children: [
												"(",
												order.product_id,
												")"
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3.5 font-semibold text-primary",
									children: [order.quantity, " units"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3.5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium capitalize text-amber-700",
										children: order.status
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-6 py-3.5 text-xs text-muted-foreground",
									children: order.created_at ? new Date(order.created_at).toLocaleString("en-IN", {
										dateStyle: "medium",
										timeStyle: "short"
									}) : "—"
								})
							]
						}, order.id)) })]
					})
				})]
			}),
			selectedProduct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 px-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel w-full max-w-md p-6 shadow-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Confirm Restock Order"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: "Review or adjust the order quantity before submitting to the backend."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-xl border border-border bg-secondary/50 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center justify-between gap-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: selectedProduct.product_name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-0.5 text-xs text-subtle-foreground",
									children: [
										selectedProduct.product_id,
										" · Recommended: ",
										selectedProduct.recommended_order,
										" units"
									]
								})] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "order-qty",
									className: "text-xs text-muted-foreground",
									children: "Order Quantity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "order-qty",
									type: "number",
									min: 1,
									className: "mt-1.5 bg-card",
									value: orderQty,
									onChange: (e) => setOrderQty(e.target.value)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setSelectedProduct(null),
								disabled: submitting,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "crimson",
								onClick: handleConfirmOrder,
								disabled: submitting,
								children: submitting ? "Submitting..." : "Confirm Order"
							})]
						})
					]
				})
			})
		]
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
