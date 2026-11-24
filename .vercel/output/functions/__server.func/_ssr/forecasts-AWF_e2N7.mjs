import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { O as Calendar, S as CircleCheck, a as TrendingUp, c as Sparkles } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./AppShell-BDF5ErS7.mjs";
import { t as Skeleton } from "./skeleton-Dbr6o8-Y.mjs";
import { r as getProducts } from "./inventory-C3ekPwVO.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as ForecastChart, t as ChartLegend } from "./ForecastChart-DWatYjVd.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-CRInGcEu.mjs";
import { t as Button } from "./button-CCxugsBO.mjs";
import { i as getForecastTimeline, r as getForecastMetrics } from "./mlApi-BvPTJS0S.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/forecasts-AWF_e2N7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MONTHS = [
	{
		value: "all",
		label: "All Months"
	},
	{
		value: "1",
		label: "Jan (Term Start)"
	},
	{
		value: "2",
		label: "Feb"
	},
	{
		value: "3",
		label: "Mar"
	},
	{
		value: "4",
		label: "Apr"
	},
	{
		value: "5",
		label: "May (School Reopen Kickoff)"
	},
	{
		value: "6",
		label: "Jun (School Reopen Peak)"
	},
	{
		value: "7",
		label: "Jul (School Reopen)"
	},
	{
		value: "8",
		label: "Aug"
	},
	{
		value: "9",
		label: "Sep (Forecast Horizon)"
	},
	{
		value: "10",
		label: "Oct (Festive / Diwali)"
	},
	{
		value: "11",
		label: "Nov (Cyber Week)"
	},
	{
		value: "12",
		label: "Dec (Holiday Rush)"
	}
];
function ForecastsPage() {
	const [productId, setProductId] = (0, import_react.useState)("P001");
	const [yearFilter, setYearFilter] = (0, import_react.useState)("all");
	const [monthFilter, setMonthFilter] = (0, import_react.useState)("all");
	const [viewPreset, setViewPreset] = (0, import_react.useState)("future30");
	const productsQ = useQuery({
		queryKey: ["inventory-products"],
		queryFn: getProducts
	});
	const metricsQ = useQuery({
		queryKey: ["ml-forecast-metrics"],
		queryFn: getForecastMetrics
	});
	const timelineQ = useQuery({
		queryKey: [
			"ml-forecast-timeline",
			productId,
			yearFilter,
			monthFilter
		],
		queryFn: () => getForecastTimeline({
			product_id: productId,
			year: yearFilter,
			month: monthFilter
		})
	});
	const products = productsQ.data ?? [];
	const allMetrics = metricsQ.data ?? [];
	const rawTimeline = timelineQ.data ?? [];
	const selectedMetric = allMetrics.find((item) => item.product_id === productId);
	const currentProduct = products.find((p) => p.product_id === productId);
	const chartData = (0, import_react.useMemo)(() => {
		if (!rawTimeline.length) return [];
		let filtered = rawTimeline;
		if (viewPreset === "future30") {
			const futureItems = rawTimeline.filter((item) => item.is_future);
			filtered = [...rawTimeline.filter((item) => !item.is_future).slice(-14), ...futureItems];
		}
		return filtered.map((item) => {
			return {
				label: new Date(item.date).toLocaleDateString("en-IN", {
					day: "2-digit",
					month: "short"
				}),
				actual: item.actual_demand !== null ? item.actual_demand : null,
				predicted: item.predicted_demand,
				rangeLow: item.range_low,
				rangeHigh: item.range_high
			};
		});
	}, [rawTimeline, viewPreset]);
	const stats = (0, import_react.useMemo)(() => {
		let actualSum = 0;
		let actualCount = 0;
		let predictedSum = 0;
		for (const pt of chartData) {
			if (pt.actual !== null) {
				actualSum += pt.actual;
				actualCount++;
			}
			if (pt.predicted !== null) predictedSum += pt.predicted;
		}
		return {
			totalActual: actualSum,
			hasActuals: actualCount > 0,
			totalPredicted: Math.round(predictedSum),
			pointCount: chartData.length
		};
	}, [chartData]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Demand Forecasting",
		subtitle: "Machine learning powered predictions comparing actual sales, predicted demand, and confidence bands.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
							children: "Product SKU"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: productId,
							onValueChange: setProductId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5 h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select product" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: products.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: product.product_id,
								children: product.product_name
							}, product.product_id)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
							children: "Year"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: yearFilter,
							onValueChange: (val) => {
								setYearFilter(val);
								if (val !== "all") setViewPreset("filtered");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5 h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Years (2025–2026)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "2026",
									children: "2026 (Current Year)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "2025",
									children: "2025 (Historical)"
								})
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
							children: "Month / Season"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: monthFilter,
							onValueChange: (val) => {
								setMonthFilter(val);
								if (val !== "all") setViewPreset("filtered");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "mt-1.5 h-9",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: MONTHS.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: m.value,
								children: m.label
							}, m.value)) })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-3.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
							children: "Timeline View"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1.5 flex gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: viewPreset === "future30" ? "default" : "outline",
								className: "h-9 flex-1 text-xs",
								onClick: () => {
									setViewPreset("future30");
									setYearFilter("all");
									setMonthFilter("all");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1 h-3.5 w-3.5" }), "Next 30D"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								size: "sm",
								variant: viewPreset === "filtered" ? "default" : "outline",
								className: "h-9 flex-1 text-xs",
								onClick: () => setViewPreset("filtered"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "mr-1 h-3.5 w-3.5" }), "Filtered"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "panel mt-4 p-5 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-3 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold tracking-tight",
							children: currentProduct?.product_name ?? "Demand Forecast"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary",
							children: "Random Forest Regressor"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: viewPreset === "future30" ? "Recent 14-day actual demand transitioning into the 30-day forecast with confidence interval." : `Showing ${stats.pointCount} daily demand data points for Year: ${yearFilter.toUpperCase()}, Month: ${monthFilter === "all" ? "ALL" : MONTHS.find((m) => m.value === monthFilter)?.label}.`
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: timelineQ.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[360px] w-full rounded-xl" }) : timelineQ.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-[360px] items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center text-sm text-destructive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: "Unable to load forecast timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted-foreground text-xs",
								children: "Verify the FastAPI backend is running on port 8000."
							})]
						})
					}) : chartData.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-[360px] items-center justify-center rounded-xl border border-dashed border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No data points found for the selected filter combination."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastChart, {
						data: chartData,
						height: 360
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
								children: "Model Accuracy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-2xl font-bold text-primary",
									children: selectedMetric ? `${selectedMetric.accuracy.toFixed(1)}%` : "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-chart-2 flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " High Confidence"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Trained on back-to-school & holiday historical sales."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
								children: "Actual Demand (Period)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-2xl font-bold text-chart-2",
									children: stats.hasActuals ? `${stats.totalActual.toLocaleString()} units` : "—"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "Real Historical"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Recorded daily sales units in selected window."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
								children: "Predicted Demand (Period)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-2xl font-bold text-foreground",
									children: [stats.totalPredicted.toLocaleString(), " units"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-primary flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-3.5 w-3.5" }), " Model Output"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Sum of model predicted demand over period."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "panel p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-wider text-subtle-foreground font-medium",
								children: "Error Margins (MAE / RMSE)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-2xl font-bold text-foreground",
									children: [
										"±",
										selectedMetric?.mae.toFixed(1) ?? "—",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-normal text-muted-foreground",
											children: "units/day"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground",
									children: ["RMSE: ", selectedMetric?.rmse.toFixed(1) ?? "—"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Defines the shaded forecast confidence range."
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ForecastsPage as component };
