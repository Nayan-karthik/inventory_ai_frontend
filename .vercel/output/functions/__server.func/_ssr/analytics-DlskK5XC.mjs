import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as AppShell } from "./AppShell-BDF5ErS7.mjs";
import { t as Skeleton } from "./skeleton-Dbr6o8-Y.mjs";
import { a as getSlowMoving, n as getMonthlySales, o as getTopSelling, t as getCategoryPerformance } from "./inventory-C3ekPwVO.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as LineChart, d as Bar, h as Tooltip, i as BarChart, l as Line, m as ResponsiveContainer, o as YAxis, p as Cell, s as XAxis, u as CartesianGrid } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-DlskK5XC.js
var import_jsx_runtime = require_jsx_runtime();
var tooltipStyle = {
	background: "var(--color-popover)",
	border: "1px solid var(--color-border)",
	borderRadius: 12,
	color: "var(--color-foreground)",
	fontSize: 12
};
function AnalyticsPage() {
	const monthly = useQuery({
		queryKey: ["monthly"],
		queryFn: getMonthlySales
	});
	const cats = useQuery({
		queryKey: ["cats"],
		queryFn: getCategoryPerformance
	});
	const top = useQuery({
		queryKey: ["top"],
		queryFn: getTopSelling
	});
	const slow = useQuery({
		queryKey: ["slow"],
		queryFn: getSlowMoving
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Analytics",
		subtitle: "Sales, demand and forecast performance across your catalogue.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "panel p-5 sm:p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold",
					children: "Sales & Demand Trends"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-5 rounded bg-primary" }), " Sales"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-0.5 w-5 rounded bg-chart-2" }), " Demand"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 h-[320px]",
				children: monthly.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
						data: monthly.data ?? [],
						margin: {
							left: -18,
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
								width: 46
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								contentStyle: tooltipStyle,
								cursor: { stroke: "var(--color-border)" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "sales",
								stroke: "var(--color-primary-bright)",
								strokeWidth: 2.5,
								dot: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "demand",
								stroke: "var(--color-chart-2)",
								strokeWidth: 2,
								strokeDasharray: "6 4",
								dot: false
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Category Performance"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 h-[280px]",
						children: cats.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-full w-full rounded-xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
								data: cats.data ?? [],
								margin: {
									left: -18,
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
										dataKey: "category",
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
										width: 46
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
										contentStyle: tooltipStyle,
										cursor: { fill: "var(--color-muted)" }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										dataKey: "revenue",
										radius: [
											8,
											8,
											0,
											0
										],
										children: (cats.data ?? []).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: i < 2 ? "var(--color-primary-bright)" : "var(--color-muted)" }, i))
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Forecast Accuracy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Rolling accuracy of the active ML model across the last nine months."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-3",
							children: [
								[
									"Accuracy",
									"94.8%",
									true
								],
								[
									"MAPE",
									"5.2%",
									false
								],
								[
									"Bias",
									"-0.8%",
									false
								]
							].map(([l, v, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-border bg-secondary/50 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-wider text-subtle-foreground",
									children: l
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-1.5 font-display text-2xl font-bold ${a ? "text-primary" : ""}`,
									children: v
								})]
							}, l))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid gap-3",
							children: (monthly.data ?? []).slice(-5).map((m) => {
								const acc = Math.round(100 - Math.abs(m.sales - m.demand) / (m.demand / 100));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-10 text-xs text-subtle-foreground",
											children: m.month
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-2 flex-1 overflow-hidden rounded-full bg-secondary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block h-full rounded-full bg-primary",
												style: { width: `${acc}%` }
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "w-12 text-right text-xs",
											children: [acc, "%"]
										})
									]
								}, m.month);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Top Selling Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [(top.data ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 py-2 text-sm last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-primary",
								children: [t.units, " units"]
							})]
						}, t.name)), top.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-xl" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "panel p-5 sm:p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold",
						children: "Slow Moving Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2",
						children: [(slow.data ?? []).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border/60 py-2 text-sm last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: t.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: [t.units, " units"]
							})]
						}, t.name)), slow.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-40 w-full rounded-xl" })]
					})]
				})
			]
		})]
	});
}
//#endregion
export { AnalyticsPage as component };
