import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./Logo-CzAim_X2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/StatusBadge-BD7idD-a.js
var import_jsx_runtime = require_jsx_runtime();
var map = {
	critical: {
		label: "Critical",
		className: "border-primary/45 bg-primary/15 text-primary"
	},
	restock: {
		label: "Restock",
		className: "border-warning/40 bg-warning/12 text-warning"
	},
	healthy: {
		label: "Healthy",
		className: "border-border bg-secondary text-muted-foreground"
	}
};
function StatusBadge({ status }) {
	const s = map[status];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", s.className),
		children: s.label
	});
}
//#endregion
export { StatusBadge as t };
