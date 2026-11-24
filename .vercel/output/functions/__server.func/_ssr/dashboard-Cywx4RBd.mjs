import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./Logo-CzAim_X2.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as TriangleAlert, k as Boxes, s as Target, y as IndianRupee } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BDF5ErS7.mjs";
import { t as Skeleton } from "./skeleton-Dbr6o8-Y.mjs";
import { r as getProducts } from "./inventory-C3ekPwVO.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as Pie, m as ResponsiveContainer, p as Cell, r as PieChart } from "../_libs/recharts+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-BD7idD-a.mjs";
import { n as ForecastChart, t as ChartLegend } from "./ForecastChart-DWatYjVd.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CRInGcEu.mjs";
import { t as Button } from "./button-CCxugsBO.mjs";
import { n as getForecast, o as getRestockRecommendations } from "./mlApi-BvPTJS0S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Cywx4RBd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, delta, icon: Icon, accent, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium uppercase tracking-widest text-subtle-foreground",
					children: label
				}), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4", accent ? "text-primary" : "text-subtle-foreground") })]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mt-4 h-8 w-24" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 font-display text-3xl font-bold", accent && "text-primary"),
				children: value
			}),
			delta && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 text-xs text-muted-foreground",
				children: delta
			})
		]
	});
}
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
		queryFn: getForecast
	});
	const restockQ = useQuery({
		queryKey: ["ml-restock"],
		queryFn: getRestockRecommendations
	});
	const productsQ = useQuery({
		queryKey: ["inventory-products"],
		queryFn: getProducts
	});
	const forecastData = forecastQ.data ?? [];
	const restockData = restockQ.data ?? [];
	const products = (0, import_react.useMemo)(() => productsQ.data ?? [], [productsQ.data]);
	const activeProductId = selectedProduct || (products[0]?.product_id ?? "P001");
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
		"var(--color-primary)",
		"var(--color-chart-2)"
	];
	const isLoading = forecastQ.isLoading || restockQ.isLoading || productsQ.isLoading;
	const hasError = forecastQ.isError || restockQ.isError || productsQ.isError;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Inventory Dashboard",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-semibold tracking-tight",
					children: "Inventory Dashboard"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "AI-powered demand forecasting and smart inventory insights."
				})] }),
				hasError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive",
					children: "Unable to load dashboard data. Make sure the FastAPI server is running on port 8000."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Total Products",
							value: isLoading ? "—" : totalProducts,
							icon: Boxes
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Inventory Value",
							value: isLoading ? "—" : formatCurrency(inventoryValue),
							icon: IndianRupee
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Low Stock Items",
							value: isLoading ? "—" : lowStock,
							icon: TriangleAlert
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
							label: "Average Forecast",
							value: isLoading ? "—" : `${averageDemand.toFixed(1)} units/day`,
							icon: Target
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 xl:grid-cols-[1.7fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-5",
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
									className: "text-xs text-muted-foreground",
									children: [
										"Peak: ",
										peakDemand.toFixed(1),
										" units"
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
						className: "rounded-2xl border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-semibold",
									children: "Inventory Health"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Current stock status from the ML restocking engine."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[220px]",
								children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
										data: healthData,
										dataKey: "value",
										nameKey: "name",
										cx: "50%",
										cy: "50%",
										innerRadius: 55,
										outerRadius: 80,
										paddingAngle: 4,
										children: healthData.map((_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: healthColors[index] }, index))
									}) })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Critical"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-destructive",
											children: criticalCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Needs Restock"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-primary",
											children: restockCount
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Healthy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-chart-2",
											children: healthyCount
										})]
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Smart Restocking"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "AI-generated recommendations based on predicted demand, current stock,andsafetystock"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
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
								className: "border-b border-border text-xs text-muted-foreground",
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
								className: "border-b border-border/60 last:border-0",
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
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary",
											children: product.recommended_order
										}), " units"]
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
