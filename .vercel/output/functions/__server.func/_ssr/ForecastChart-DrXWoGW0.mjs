import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Area, h as Tooltip, l as Line, m as ResponsiveContainer, o as YAxis, s as XAxis, t as ComposedChart, u as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ForecastChart-DrXWoGW0.js
var import_jsx_runtime = require_jsx_runtime();
function ForecastChart({ data, height = 340 }) {
	const rows = data.map((p) => ({
		...p,
		rangeBase: p.rangeLow,
		rangeSpan: p.rangeHigh !== null && p.rangeLow !== null ? p.rangeHigh - p.rangeLow : null
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: { height },
		className: "w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
				data: rows,
				margin: {
					top: 12,
					right: 12,
					bottom: 0,
					left: -14
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "forecastRange",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "var(--color-primary)",
							stopOpacity: .22
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "var(--color-primary)",
							stopOpacity: .03
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "var(--color-border)",
						strokeDasharray: "3 6",
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tickLine: false,
						axisLine: false,
						tick: {
							fill: "var(--color-subtle-foreground)",
							fontSize: 11
						},
						minTickGap: 16
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tickLine: false,
						axisLine: false,
						tick: {
							fill: "var(--color-subtle-foreground)",
							fontSize: 11
						},
						width: 46
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						cursor: { stroke: "var(--color-border)" },
						content: ({ active, payload, label }) => {
							if (!active || !payload || !payload.length) return null;
							const dataPoint = payload[0]?.payload;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-2 font-semibold text-foreground",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [
										dataPoint?.actual !== null && dataPoint?.actual !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-4 text-emerald-700",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-chart-2" }), "Actual Demand:"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold",
												children: [dataPoint.actual, " units"]
											})]
										}),
										dataPoint?.predicted !== null && dataPoint?.predicted !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-4 text-primary",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), "Predicted Demand:"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-bold",
												children: [dataPoint.predicted, " units"]
											})]
										}),
										dataPoint?.rangeLow !== null && dataPoint?.rangeHigh !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 flex items-center justify-between gap-4 border-t border-border pt-1 text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex items-center gap-1.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded bg-primary/30" }), "Forecast Range:"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "font-medium text-foreground",
												children: [
													dataPoint.rangeLow,
													" – ",
													dataPoint.rangeHigh,
													" units"
												]
											})]
										})
									]
								})]
							});
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "rangeBase",
						stackId: "range",
						stroke: "none",
						fill: "transparent",
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "rangeSpan",
						stackId: "range",
						stroke: "none",
						fill: "url(#forecastRange)",
						isAnimationActive: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "actual",
						stroke: "var(--color-chart-2)",
						strokeWidth: 2.2,
						dot: {
							r: 2,
							fill: "var(--color-chart-2)"
						},
						activeDot: { r: 5 },
						connectNulls: false,
						name: "Actual demand"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "predicted",
						stroke: "var(--color-primary)",
						strokeWidth: 2.4,
						strokeDasharray: "5 4",
						dot: false,
						activeDot: { r: 5 },
						name: "Predicted demand"
					})
				]
			})
		})
	});
}
function ChartLegend() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-center gap-5 text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-chart-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "Actual Demand"
					}),
					" (Historical)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-4 rounded bg-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "Predicted Demand"
					}),
					" (ML Model)"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-3 w-4 rounded border border-primary/30 bg-primary/15" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium text-foreground",
						children: "Forecast Range"
					}),
					" (Confidence Band)"
				]
			})
		]
	});
}
//#endregion
export { ForecastChart as n, ChartLegend as t };
