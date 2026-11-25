import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as cn } from "./button-Y9N3DePz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-BtbTAIu-.js
var import_jsx_runtime = require_jsx_runtime();
var map = {
	critical: {
		label: "Critical",
		className: "border-rose-200 bg-rose-50 text-rose-700"
	},
	restock: {
		label: "Restock",
		className: "border-amber-200 bg-amber-50 text-amber-700"
	},
	healthy: {
		label: "Healthy",
		className: "border-emerald-200 bg-emerald-50 text-emerald-700"
	}
};
function StatusBadge({ status }) {
	const s = map[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium", s.className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full", status === "critical" ? "bg-rose-500" : status === "restock" ? "bg-amber-500" : "bg-emerald-500") }), s.label]
	});
}
//#endregion
export { StatusBadge as t };
