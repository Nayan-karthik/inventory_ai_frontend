import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-Y9N3DePz.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as Package, f as Search, m as Receipt, w as IndianRupee } from "../_libs/lucide-react.mjs";
import { s as Input, t as AppShell } from "./AppShell-DElWAt1-.mjs";
import { t as Skeleton } from "./skeleton-Bajl8Ani.mjs";
import { n as getSalesHistory } from "./inventory-yJxyrm_w.mjs";
import { t as StatCard } from "./StatCard-BQUWd9FJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales-BF_rC_lU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE_SIZE = 25;
function parseValue(raw) {
	const num = Number(raw.replace(/[^0-9.]/g, ""));
	return Number.isFinite(num) ? num : 0;
}
function normalizeCurrency(raw) {
	return raw.replace(/^â‚¹/, "₹");
}
function SalesPage() {
	const { data, isLoading } = useQuery({
		queryKey: ["sales"],
		queryFn: getSalesHistory
	});
	const [query, setQuery] = (0, import_react.useState)("");
	const [page, setPage] = (0, import_react.useState)(1);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		const list = data ?? [];
		if (!q) return list;
		return list.filter((s) => s.product.toLowerCase().includes(q) || s.when.toLowerCase().includes(q));
	}, [data, query]);
	const totals = (0, import_react.useMemo)(() => {
		let units = 0;
		let revenue = 0;
		for (const s of filtered) {
			units += s.qty;
			revenue += parseValue(s.value);
		}
		return {
			count: filtered.length,
			units,
			revenue
		};
	}, [filtered]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
	const safePage = Math.min(page, totalPages);
	const pageRows = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Sales History",
		subtitle: "The transaction ledger powering every demand prediction.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-6 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Transactions",
						value: isLoading ? "—" : totals.count.toLocaleString("en-IN"),
						icon: Receipt,
						loading: isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Units Sold",
						value: isLoading ? "—" : totals.units.toLocaleString("en-IN"),
						icon: Package,
						loading: isLoading
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total Revenue",
						value: isLoading ? "—" : `₹${Math.round(totals.revenue).toLocaleString("en-IN")}`,
						icon: IndianRupee,
						accent: true,
						loading: isLoading
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "panel mb-5 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => {
							setQuery(e.target.value);
							setPage(1);
						},
						placeholder: "Filter by product or date...",
						className: "pl-9"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "panel overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full min-w-[560px] text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "bg-secondary/40 text-left text-xs uppercase tracking-wider text-subtle-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium sm:px-6",
									children: "Product"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Quantity"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Value"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3 font-medium sm:px-6",
									children: "Date"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
							isLoading && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-t border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 4,
									className: "px-5 py-3 sm:px-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-full" })
								})
							}, i)),
							!isLoading && pageRows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
								className: "border-t border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 4,
									className: "px-6 py-12 text-center text-muted-foreground",
									children: "No matching sales records found."
								})
							}),
							pageRows.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border transition-colors hover:bg-card-hover",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3.5 font-medium sm:px-6",
										children: s.product
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-4 py-3.5 text-muted-foreground",
										children: ["×", s.qty]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3.5 font-medium text-primary",
										children: normalizeCurrency(s.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-3.5 text-subtle-foreground sm:px-6",
										children: s.when
									})
								]
							}, s.id))
						] })]
					})
				}), !isLoading && filtered.length > PAGE_SIZE && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-t border-border px-5 py-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Page ",
						safePage,
						" of ",
						totalPages,
						" (",
						filtered.length,
						" records)"
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: safePage <= 1,
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							children: "Previous"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							disabled: safePage >= totalPages,
							onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
							children: "Next"
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
export { SalesPage as component };
