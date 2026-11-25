import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as cn } from "./button-Y9N3DePz.mjs";
import { t as Skeleton } from "./skeleton-Bajl8Ani.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatCard-BQUWd9FJ.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, delta, icon: Icon, accent, loading }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-medium uppercase tracking-widest text-subtle-foreground",
					children: label
				}), Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("flex h-8 w-8 items-center justify-center rounded-xl", accent ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
				})]
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
//#endregion
export { StatCard as t };
