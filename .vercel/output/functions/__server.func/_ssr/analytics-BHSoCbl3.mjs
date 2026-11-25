import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { f as getForecastMetrics, h as getRestockRecommendations, p as getForecastTimeline, t as AppShell } from "./AppShell-DElWAt1-.mjs";
import { t as Skeleton } from "./skeleton-Bajl8Ani.mjs";
import { t as getProducts } from "./inventory-yJxyrm_w.mjs";
import { a as LineChart, d as Bar, h as Tooltip, i as BarChart, l as Line, m as ResponsiveContainer, o as YAxis, p as Cell, s as XAxis, u as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BHSoCbl3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tooltipStyle = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 12,
	color: "var(--color-foreground)",
	fontSize: 12,
	boxShadow: "0 10px 25px -8px oklch(0.2 0.02 260 / 0.12)"
};
function AnalyticsPage() {
	const timelineQ = useQuery({
		queryKey: ["ml-forecast-timeline", "all"],
		queryFn: () => getForecastTimeline({})
	});
	const metricsQ = useQuery({
		queryKey: ["ml-forecast-metrics"],
		queryFn: getForecastMetrics
	});
	const restockQ = useQuery({
		queryKey: ["ml-restock"],
		queryFn: getRestockRecommendations
	});
	const productsQ = useQuery({
		queryKey: ["inventory-products"],
		queryFn: getProducts
	});
	const monthlyTrend = (0, import_react.useMemo)(() => {
		const timeline = timelineQ.data ?? [];
		const buckets = /* @__PURE__ */ new Map();
		for (const pt of timeline) {
			if (!pt.date) continue;
			const key = pt.date.slice(0, 7);
			const existing = buckets.get(key) ?? {
				month: key,
				actual: 0,
				predicted: 0
			};
			if (pt.actual_demand !== null && pt.actual_demand !== void 0) existing.actual += pt.actual_demand;
			existing.predicted += pt.predicted_demand ?? 0;
			buckets.set(key, existing);
		}
		return Array.from(buckets.values()).sort((a, b) => a.month.localeCompare(b.month)).slice(-12).map((b) => ({
			month: (/* @__PURE__ */ new Date(`${b.month}-01`)).toLocaleDateString("en-IN", {
				month: "short",
				year: "2-digit"
			}),
			actual: Math.round(b.actual),
			predicted: Math.round(b.predicted)
		}));
	}, [timelineQ.data]);
	const productValuation = (0, import_react.useMemo)(() => {
		return (productsQ.data ?? []).map((p) => ({
			name: p.product_name.length > 16 ? `${p.product_name.slice(0, 15)}…` : p.product_name,
			value: Math.round(p.current_stock * p.unit_price)
		})).sort((a, b) => b.value - a.value).slice(0, 8);
	}, [productsQ.data]);
	const modelSummary = (0, import_react.useMemo)(() => {
		const metrics = metricsQ.data ?? [];
		if (metrics.length === 0) return {
			accuracy: "—",
			mape: "—",
			mae: "—",
			rmse: "—"
		};
		const avgAcc = metrics.reduce((s, m) => s + (m.accuracy ?? 0), 0) / metrics.length;
		const avgMape = metrics.reduce((s, m) => s + (m.mape ?? 0), 0) / metrics.length;
		const avgMae = metrics.reduce((s, m) => s + (m.mae ?? 0), 0) / metrics.length;
		const avgRmse = metrics.reduce((s, m) => s + (m.rmse ?? 0), 0) / metrics.length;
		return {
			accuracy: `${avgAcc.toFixed(1)}%`,
			mape: `${avgMape.toFixed(1)}%`,
			mae: `${avgMae.toFixed(2)}`,
			rmse: `${avgRmse.toFixed(2)}`
		};
	}, [metricsQ.data]);
	const topDemanded = (0, import_react.useMemo)(() => {
		return [...restockQ.data ?? []].sort((a, b) => b.predicted_7_day_demand - a.predicted_7_day_demand).slice(0, 5);
	}, [restockQ.data]);
	const slowMoving = (0, import_react.useMemo)(() => {
		return [...restockQ.data ?? []].sort((a, b) => a.predicted_7_day_demand - b.predicted_7_day_demand).slice(0, 5);
	}, [restockQ.data]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Analytics",
		subtitle: "Live sales, demand trends, inventory valuation, and ML model performance.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Actual vs Predicted Demand Trends"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Aggregated monthly demand across all products from the ML timeline."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-5 rounded bg-chart-2" }), " Actual Sales"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-5 rounded bg-primary" }), " Predicted Demand"]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 h-[320px]",
					children: timelineQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
							data: monthlyTrend,
							margin: {
								left: -12,
								right: 8,
								top: 8
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									strokeDasharray: "3 6",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "month",
									tickLine: false,
									axisLine: false,
									tick: {
										fill: "var(--color-subtle-foreground)",
										fontSize: 11
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tickLine: false,
									axisLine: false,
									tick: {
										fill: "var(--color-subtle-foreground)",
										fontSize: 11
									},
									width: 50
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									contentStyle: tooltipStyle,
									cursor: { stroke: "var(--color-border)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "actual",
									name: "Actual Units",
									stroke: "var(--color-chart-2)",
									strokeWidth: 2.5,
									dot: {
										r: 2.5,
										fill: "var(--color-chart-2)"
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
									type: "monotone",
									dataKey: "predicted",
									name: "Predicted Units",
									stroke: "var(--color-primary)",
									strokeWidth: 2.2,
									strokeDasharray: "6 4",
									dot: false
								})
							]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Inventory Value by Product (₹)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Current stock multiplied by unit price for top SKUs."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 h-[280px]",
							children: productsQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
								width: "100%",
								height: "100%",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
									data: productValuation,
									margin: {
										left: -6,
										right: 8,
										top: 8
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
											stroke: "var(--color-border)",
											strokeDasharray: "3 6",
											vertical: false
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
											dataKey: "name",
											tickLine: false,
											axisLine: false,
											tick: {
												fill: "var(--color-subtle-foreground)",
												fontSize: 10
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
											tickLine: false,
											axisLine: false,
											tick: {
												fill: "var(--color-subtle-foreground)",
												fontSize: 11
											},
											width: 54
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
											contentStyle: tooltipStyle,
											cursor: { fill: "var(--color-muted)" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
											dataKey: "value",
											name: "Stock Value (₹)",
											radius: [
												8,
												8,
												0,
												0
											],
											children: productValuation.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: i < 2 ? "var(--color-primary)" : "var(--color-chart-3)" }, i))
										})
									]
								})
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "ML Model Evaluation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Live evaluation metrics averaged across all trained product models."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 grid gap-3 sm:grid-cols-2",
							children: [
								[
									"Avg Accuracy",
									modelSummary.accuracy,
									true
								],
								[
									"Mean MAPE",
									modelSummary.mape,
									false
								],
								[
									"Mean MAE",
									`${modelSummary.mae} u/day`,
									false
								],
								[
									"Mean RMSE",
									`${modelSummary.rmse} u/day`,
									false
								]
							].map(([label, val, accent]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-secondary/50 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-wider text-subtle-foreground",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-1.5 font-display text-2xl font-bold ${accent ? "text-primary" : "text-foreground"}`,
									children: val
								})]
							}, label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 max-h-[130px] overflow-y-auto rounded-xl border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-secondary/70 text-subtle-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "Product"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "Accuracy"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
											className: "px-3 py-2 font-medium",
											children: "MAE"
										})
									] })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: (metricsQ.data ?? []).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 font-medium",
											children: m.product_name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2 text-primary font-semibold",
											children: [m.accuracy.toFixed(1), "%"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "px-3 py-2 text-muted-foreground",
											children: ["±", m.mae.toFixed(2)]
										})
									] }, m.product_id))
								})]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Highest Forecasted Demand (7 Days)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2.5",
						children: restockQ.isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i)) : topDemanded.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: p.product_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-xs text-subtle-foreground",
								children: ["Stock: ", p.current_stock]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-primary",
								children: [Math.round(p.predicted_7_day_demand), " units / 7d"]
							})]
						}, p.product_id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Slowest Moving Products (7 Days)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-2.5",
						children: restockQ.isLoading ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-12 w-full" }, i)) : slowMoving.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: p.product_name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 text-xs text-subtle-foreground",
								children: ["Stock: ", p.current_stock]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-muted-foreground",
								children: [Math.round(p.predicted_7_day_demand), " units / 7d"]
							})]
						}, p.product_id))
					})]
				})]
			})
		]
	});
}
//#endregion
export { AnalyticsPage as component };
