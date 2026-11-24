import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Logo } from "./Logo-CzAim_X2.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as ArrowRight, E as ChartLine, _ as Menu, a as TrendingUp, g as PackageCheck, j as Activity, k as Boxes, t as X, x as CircleDot } from "../_libs/lucide-react.mjs";
import { i as inventoryHealth, l as statusOf, o as products, s as recentSales, t as buildForecast } from "./mock-data-DfDrCxBt.mjs";
import { c as Area, d as Bar, f as Pie, i as BarChart, m as ResponsiveContainer, n as AreaChart, p as Cell, r as PieChart } from "../_libs/recharts+[...].mjs";
import { t as StatusBadge } from "./StatusBadge-BD7idD-a.mjs";
import { n as ForecastChart, t as ChartLegend } from "./ForecastChart-DWatYjVd.mjs";
import { t as Button } from "./button-CCxugsBO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-8MOtIc9V.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var links = [
	{
		label: "Product",
		to: "/"
	},
	{
		label: "Forecasting",
		to: "/forecasts"
	},
	{
		label: "Inventory",
		to: "/inventory"
	},
	{
		label: "Analytics",
		to: "/analytics"
	},
	{
		label: "Solutions",
		to: "/restock"
	},
	{
		label: "Docs",
		to: "/settings"
	}
];
function SiteNav() {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "fixed inset-x-0 top-4 z-50 px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "glass-nav mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-1 lg:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground",
						children: l.label
					}, l.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 sm:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Log In"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						variant: "crimson",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Start Free"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "Toggle menu",
					className: "rounded-lg p-2 text-muted-foreground sm:hidden",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
				})
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "glass-nav mx-auto mt-2 max-w-6xl rounded-2xl p-3 sm:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-1",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					onClick: () => setOpen(false),
					className: "rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
					children: l.label
				}, l.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "crimson",
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/dashboard",
						children: "Start Free"
					})
				})]
			})
		})]
	});
}
var heroStats = [
	{
		label: "Total Inventory",
		value: "₹24.8L",
		accent: false
	},
	{
		label: "Products",
		value: "1,284",
		accent: false
	},
	{
		label: "Low Stock",
		value: "24",
		accent: true
	},
	{
		label: "Forecast Accuracy",
		value: "94.8%",
		accent: true
	}
];
var spark = buildForecast(7, 2).map((p) => ({ v: p.actual ?? p.predicted ?? 0 }));
var healthColors = [
	"var(--color-chart-5)",
	"var(--color-warning)",
	"var(--color-primary-bright)"
];
function Landing() {
	const forecast = buildForecast(30, 1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteNav, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "radial-crimson relative overflow-hidden px-4 pt-36 pb-16 sm:pt-44",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/forecasts",
							className: "inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-4 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-primary/18",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDot, { className: "h-3.5 w-3.5 text-primary" }),
								"AI-Powered Inventory Intelligence",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5 text-primary" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-8 text-5xl leading-[1.05] font-bold sm:text-6xl md:text-7xl",
							children: [
								"Predict ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Demand"
								}),
								".",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Restock With ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-primary",
									children: "Confidence"
								}),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg",
							children: "Turn historical sales data into accurate demand forecasts and smarter inventory decisions with machine learning."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-9 flex flex-wrap justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "crimson",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/forecasts",
									children: ["Start Forecasting ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "lg",
								variant: "outlineCrimson",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dashboard",
									children: "View Dashboard"
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto mt-16 max-w-6xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-3xl border border-border bg-surface/80 p-3 shadow-[0_60px_140px_-60px_var(--primary)] sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: heroStats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-card p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs uppercase tracking-widest text-subtle-foreground",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `mt-2 font-display text-2xl font-bold ${s.accent ? "text-primary" : ""}`,
									children: s.value
								})]
							}, s.label))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-2xl border border-border bg-card p-4 sm:p-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-semibold",
									children: "Demand Forecast"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartLegend, {})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForecastChart, {
								data: forecast,
								height: 320
							})]
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold sm:text-4xl",
							children: "Everything you need to make smarter inventory decisions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground",
							children: "StockAI combines historical demand, machine learning and real-time inventory data into one intelligent platform."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel flex flex-col justify-between p-8",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-2xl font-bold leading-tight sm:text-3xl",
								children: "From raw sales data to intelligent restocking decisions."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-sm leading-relaxed text-muted-foreground",
								children: "Analyze historical demand, identify trends, forecast future requirements and automatically calculate recommended reorder quantities."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "crimson",
								className: "mt-8 w-fit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/restock",
									children: ["Explore Intelligence ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-3xl border border-border bg-surface p-4 sm:p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPanel, {
										title: "Inventory Overview",
										icon: Boxes,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-2 gap-3",
											children: [
												["Products", "1,284"],
												["Categories", "6"],
												["Suppliers", "4"],
												["Low stock", "24"]
											].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "rounded-xl bg-secondary/60 p-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] uppercase tracking-wider text-subtle-foreground",
													children: k
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 font-display text-lg font-semibold",
													children: v
												})]
											}, k))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPanel, {
										title: "Stock Health",
										icon: Activity,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-28 w-28",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
													width: "100%",
													height: "100%",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
														data: inventoryHealth,
														dataKey: "value",
														innerRadius: 34,
														outerRadius: 52,
														paddingAngle: 3,
														stroke: "none",
														children: inventoryHealth.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: healthColors[i] }, i))
													}) })
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-2 text-xs",
												children: inventoryHealth.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "h-2 w-2 rounded-full",
															style: { background: healthColors[i] }
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-muted-foreground",
															children: h.name
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "font-medium",
															children: [h.value, "%"]
														})
													]
												}, h.name))
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MiniPanel, {
										title: "Demand Forecast",
										icon: ChartLine,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-24",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
												width: "100%",
												height: "100%",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
													data: spark,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
														id: "sparkFill",
														x1: "0",
														y1: "0",
														x2: "0",
														y2: "1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "0%",
															stopColor: "var(--color-primary)",
															stopOpacity: .45
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "100%",
															stopColor: "var(--color-primary)",
															stopOpacity: 0
														})]
													}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
														type: "monotone",
														dataKey: "v",
														stroke: "var(--color-primary-bright)",
														strokeWidth: 2,
														fill: "url(#sparkFill)"
													})]
												})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-xs text-muted-foreground",
											children: [
												"Next 7 days: ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary",
													children: "+18.4%"
												}),
												" expected demand"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPanel, {
										title: "Restock Recommendations",
										icon: PackageCheck,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid gap-2",
											children: products.slice(0, 3).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-2 rounded-xl bg-secondary/60 px-3 py-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "truncate text-xs",
													children: p.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: statusOf(p) })]
											}, p.id))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniPanel, {
											title: "Recent Sales",
											icon: TrendingUp,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "grid gap-1.5",
												children: recentSales.slice(0, 4).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between gap-3 border-b border-border/60 pb-1.5 text-xs last:border-0",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "truncate text-muted-foreground",
															children: s.product
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "shrink-0 text-subtle-foreground",
															children: ["×", s.qty]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "shrink-0 font-medium",
															children: s.value
														})
													]
												}, s.id))
											})
										})
									})
								]
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-4 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-6 lg:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-semibold",
									children: "AI Demand Forecasting"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Predict future product demand using machine learning and time-series forecasting."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 h-28",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
											data: spark,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "cardFill",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "0%",
													stopColor: "var(--color-primary)",
													stopOpacity: .5
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "100%",
													stopColor: "var(--color-primary)",
													stopOpacity: 0
												})]
											}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "v",
												stroke: "var(--color-primary-bright)",
												strokeWidth: 2,
												fill: "url(#cardFill)"
											})]
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-semibold",
									children: "Smart Restocking"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Automatically identify products that need replenishment and calculaterecommendedorderquantities."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 h-28",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BarChart, {
											data: products.slice(0, 6).map((p) => ({ v: p.recommendedQty || 4 })),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "v",
												radius: [
													6,
													6,
													0,
													0
												],
												children: products.slice(0, 6).map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: p.recommendedQty > 0 ? "var(--color-primary-bright)" : "var(--color-muted)" }, i))
											})
										})
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "panel p-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-semibold",
									children: "Inventory Intelligence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground",
									children: "Monitor stock levels, demand trends and inventory health from one unified dashboard."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-6 h-28",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PieChart, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
											data: inventoryHealth,
											dataKey: "value",
											innerRadius: 36,
											outerRadius: 54,
											paddingAngle: 3,
											stroke: "none",
											children: inventoryHealth.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: healthColors[i] }, i))
										}) })
									})
								})
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border px-4 py-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-subtle-foreground",
						children: "Predict demand. Optimize inventory. Restock smarter."
					})]
				})
			})
		]
	});
}
function MiniPanel({ title, icon: Icon, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-border bg-card p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-3 flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: title
			})]
		}), children]
	});
}
//#endregion
export { Landing as component };
