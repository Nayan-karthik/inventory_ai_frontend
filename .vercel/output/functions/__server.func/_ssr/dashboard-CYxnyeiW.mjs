import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Y9N3DePz.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { O as ClipboardList, R as Boxes, i as TriangleAlert, s as Target, w as IndianRupee, z as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as getForecast, f as getForecastMetrics, h as getRestockRecommendations, m as getRestockOrders, t as AppShell } from "./AppShell-DElWAt1-.mjs";
import { t as Skeleton } from "./skeleton-Bajl8Ani.mjs";
import { t as getProducts } from "./inventory-yJxyrm_w.mjs";
import { f as Pie, h as Tooltip, m as ResponsiveContainer, p as Cell, r as PieChart } from "../_libs/recharts+[...].mjs";
import { t as StatCard } from "./StatCard-BQUWd9FJ.mjs";
import { t as StatusBadge } from "./StatusBadge-BtbTAIu-.mjs";
import { n as ForecastChart, t as ChartLegend } from "./ForecastChart-DrXWoGW0.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CV4rJHJA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CYxnyeiW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function formatCurrency(value) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(value);
}
function getStatus(status) {
	if (status === "Critical" || status === "critical") return "critical";
	if (status === "Restock" || status === "restock") return "restock";
	return "healthy";
}
function DashboardPage() {
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)("");
	const [period, setPeriod] = (0, import_react.useState)("7");
	const forecastQ = useQuery({
		queryKey: ["ml-forecast"],
		queryFn: () => getForecast()
	});
	const restockQ = useQuery({
		queryKey: ["ml-restock"],
		queryFn: getRestockRecommendations
	});
	const productsQ = useQuery({
		queryKey: ["inventory-products"],
		queryFn: getProducts
	});
	const metricsQ = useQuery({
		queryKey: ["ml-forecast-metrics"],
		queryFn: getForecastMetrics
	});
	const ordersQ = useQuery({
		queryKey: ["restock-orders"],
		queryFn: getRestockOrders
	});
	const forecastData = forecastQ.data ?? [];
	const restockData = restockQ.data ?? [];
	const metricsData = metricsQ.data ?? [];
	const ordersData = ordersQ.data ?? [];
	const products = (0, import_react.useMemo)(() => productsQ.data ?? [], [productsQ.data]);
	const activeProductId = products.find((p) => p.product_id === selectedProduct)?.product_id ?? products[0]?.product_id ?? "P001";
	(0, import_react.useEffect)(() => {
		const firstProduct = products[0];
		if (firstProduct && !selectedProduct) setSelectedProduct(firstProduct.product_id);
	}, [products, selectedProduct]);
	const selectedForecast = forecastData.filter((item) => item.product_id === activeProductId).slice(0, Number(period));
	const forecastPoints = selectedForecast.map((item) => ({
		label: new Date(item.date).toLocaleDateString("en-IN", {
			day: "2-digit",
			month: "short"
		}),
		actual: null,
		predicted: item.predicted_demand,
		rangeLow: item.range_low ?? Math.max(0, Math.round(item.predicted_demand - 3)),
		rangeHigh: item.range_high ?? Math.round(item.predicted_demand + 3)
	}));
	const totalProducts = products.length;
	const inventoryValue = products.reduce((total, product) => total + product.current_stock * product.unit_price, 0);
	const lowStock = restockData.filter((product) => product.current_stock <= product.reorder_level || product.recommended_order > 0).length;
	const averageDemand = selectedForecast.length > 0 ? selectedForecast.reduce((sum, item) => sum + item.predicted_demand, 0) / selectedForecast.length : 0;
	const peakDemand = selectedForecast.length > 0 ? Math.max(...selectedForecast.map((item) => item.predicted_demand)) : 0;
	const avgAccuracy = metricsData.length > 0 ? metricsData.reduce((sum, m) => sum + (m.accuracy ?? 0), 0) / metricsData.length : null;
	const criticalCount = restockData.filter((product) => getStatus(product.status) === "critical").length;
	const restockCount = restockData.filter((product) => getStatus(product.status) === "restock").length;
	const healthyCount = restockData.filter((product) => getStatus(product.status) === "healthy").length;
	const healthData = [
		{
			name: "Critical",
			value: criticalCount
		},
		{
			name: "Restock",
			value: restockCount
		},
		{
			name: "Healthy",
			value: healthyCount
		}
	];
	const healthColors = [
		"var(--color-destructive)",
		"var(--color-warning)",
		"var(--color-chart-2)"
	];
	const isLoading = forecastQ.isLoading || restockQ.isLoading || productsQ.isLoading;
	const hasError = forecastQ.isError || restockQ.isError || productsQ.isError;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Inventory Dashboard",
		subtitle: "AI-powered demand forecasting and smart inventory insights.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			size: "sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/forecasts",
				children: ["Full Timeline ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
			})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700",
					children: "Unable to load dashboard data. Make sure the FastAPI server is running on port 8000."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total Products",
							value: isLoading ? "—" : totalProducts,
							delta: `${ordersData.length} restock orders logged`,
							icon: Boxes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Inventory Value",
							value: isLoading ? "—" : formatCurrency(inventoryValue),
							delta: "Across active catalog",
							icon: IndianRupee
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Needs Attention",
							value: isLoading ? "—" : lowStock,
							delta: `${criticalCount} critical · ${restockCount} restock`,
							icon: TriangleAlert,
							accent: lowStock > 0
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Model Accuracy",
							value: isLoading ? "—" : avgAccuracy !== null ? `${avgAccuracy.toFixed(1)}%` : `${averageDemand.toFixed(1)} u/day`,
							delta: `Selected SKU avg: ${averageDemand.toFixed(1)} units/day`,
							icon: Target,
							accent: true
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 xl:grid-cols-[1.7fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Demand Forecast"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Predicted demand from the ML forecasting model."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: activeProductId,
										onValueChange: setSelectedProduct,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "w-[190px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select product" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: product.product_id,
											children: product.product_name
										}, product.product_id)) })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										value: period,
										onValueChange: setPeriod,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
											className: "w-[110px]",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Period" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "7",
											children: "7 Days"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
											value: "30",
											children: "30 Days"
										})] })]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: [
										"Forecast Period: ",
										period,
										" days"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-medium text-foreground",
									children: [
										"Peak: ",
										peakDemand.toFixed(1),
										" units/day"
									]
								})]
							}),
							isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[300px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" })
							}) : forecastPoints.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastChart, { data: forecastPoints }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {})
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-[300px] items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground",
								children: "No forecast data available."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel flex flex-col justify-between p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: "Inventory Health"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground",
								children: "Current stock status from the ML restocking engine."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-[220px]",
							children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
									data: healthData,
									dataKey: "value",
									nameKey: "name",
									cx: "50%",
									cy: "50%",
									innerRadius: 56,
									outerRadius: 82,
									paddingAngle: 4,
									stroke: "none",
									children: healthData.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: healthColors[index] }, index))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-popover)",
									border: "1px solid var(--color-border)",
									borderRadius: 12,
									fontSize: 12
								} })] })
							})
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 border-t border-border pt-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-destructive" }), "Critical"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-rose-700",
										children: criticalCount
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-warning" }), "Needs Restock"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-amber-700",
										children: restockCount
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-chart-2" }), "Healthy"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-emerald-700",
										children: healthyCount
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-xl bg-secondary/70 px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1.5 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-3.5 w-3.5 text-primary" }), "Pending Restock Orders"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/restock",
										className: "font-semibold text-primary hover:underline",
										children: [ordersData.length, " orders →"]
									})]
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Smart Restocking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "AI-generated recommendations based on predicted demand, current stock, and safety stock."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/restock",
								children: "View All"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[760px] text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-xs uppercase tracking-wider text-subtle-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Product"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Current Stock"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "7-Day Demand"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Reorder Level"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Recommended"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Status"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "px-4 py-8 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-5 w-40" })
								})
							}) }) : restockData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								colSpan: 6,
								className: "px-4 py-8 text-center text-muted-foreground",
								children: "No restocking recommendations available."
							}) }) : restockData.slice(0, 6).map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/60 transition-colors last:border-0 hover:bg-card-hover",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 font-medium",
										children: product.product_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-muted-foreground",
										children: product.current_stock
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-muted-foreground",
										children: Math.round(product.predicted_7_day_demand)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 text-muted-foreground",
										children: product.reorder_level
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-primary",
												children: product.recommended_order
											}),
											" ",
											"units"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: getStatus(product.status) })
									})
								]
							}, product.product_id)) })]
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { DashboardPage as component };
