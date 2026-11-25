import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as createFileRoute, b as useRouter, d as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, u as Scripts, v as createRootRouteWithContext, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CmgVTsSo.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BNX1PX97.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	const router = useRouter();
	console.error("Root Error Boundary caught error:", error);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "StockAI — AI-powered inventory intelligence" },
			{
				name: "description",
				content: "Predict demand, optimize inventory and restock smarter with machine learning."
			},
			{
				name: "author",
				content: "StockAI"
			},
			{
				property: "og:title",
				content: "StockAI — AI-powered inventory intelligence"
			},
			{
				property: "og:description",
				content: "Predict demand, optimize inventory and restock smarter with machine learning."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,700&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-right" })]
	});
}
var $$splitComponentImporter$7 = () => import("./routes-G4qnzEuQ.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "StockAI — Predict demand. Optimize inventory. Restock smarter." },
		{
			name: "description",
			content: "StockAI uses machine learning and time-series forecasting to predict inventory demand and recommend smarter restocking decisions."
		},
		{
			property: "og:title",
			content: "StockAI — AI-powered inventory intelligence"
		},
		{
			property: "og:description",
			content: "Turn historical sales data into accurate demand forecasts and smarter restocking decisions."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./analytics-BHSoCbl3.mjs");
var Route$6 = createFileRoute("/analytics")({
	head: () => ({ meta: [
		{ title: "Analytics — StockAI" },
		{
			name: "description",
			content: "Live sales and demand trends, top sellers, slow movers, inventory valuation and ML model accuracy."
		},
		{
			property: "og:title",
			content: "Analytics — StockAI"
		},
		{
			property: "og:description",
			content: "Understand what sells, what stalls and how accurate your ML forecasts are."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./dashboard-CYxnyeiW.mjs");
var Route$5 = createFileRoute("/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./forecasts-maLB9Ft7.mjs");
var Route$4 = createFileRoute("/forecasts")({
	head: () => ({ meta: [
		{ title: "Demand Forecasting — StockAI" },
		{
			name: "description",
			content: "Machine learning powered demand predictions with actual vs predicted demand comparison and forecast confidence ranges."
		},
		{
			property: "og:title",
			content: "Demand Forecasting — StockAI"
		},
		{
			property: "og:description",
			content: "Interactive actual sales and ML forecast comparison across months and years."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./inventory-DFl4_yg1.mjs");
var Route$3 = createFileRoute("/inventory")({
	head: () => ({ meta: [
		{ title: "Inventory — StockAI" },
		{
			name: "description",
			content: "Manage products, stock levels, reorder points and suppliers in one searchable inventory table."
		},
		{
			property: "og:title",
			content: "Inventory — StockAI"
		},
		{
			property: "og:description",
			content: "Search, filter, add and edit products across your whole catalogue."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./restock-QO-W1NQN.mjs");
var Route$2 = createFileRoute("/restock")({
	head: () => ({ meta: [
		{ title: "Smart Restocking — StockAI" },
		{
			name: "description",
			content: "AI-generated restock recommendations based on predicted demand, safety stock and supplier lead time."
		},
		{
			property: "og:title",
			content: "Smart Restocking — StockAI"
		},
		{
			property: "og:description",
			content: "Recommended order quantities for every product that needs replenishment."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./sales-BF_rC_lU.mjs");
var Route$1 = createFileRoute("/sales")({
	head: () => ({ meta: [
		{ title: "Sales History — StockAI" },
		{
			name: "description",
			content: "Recent sales transactions feeding the demand forecasting models."
		},
		{
			property: "og:title",
			content: "Sales History — StockAI"
		},
		{
			property: "og:description",
			content: "Every recorded sale, quantity and value in one ledger."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./settings-BicSdtcm.mjs");
var Route = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings — StockAI" },
		{
			name: "description",
			content: "Configure forecasting defaults, safety stock policy and low-stock alerting for StockAI."
		},
		{
			property: "og:title",
			content: "Settings — StockAI"
		},
		{
			property: "og:description",
			content: "Workspace, forecasting and alert preferences."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	AnalyticsRoute: Route$6.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => Route$8
	}),
	DashboardRoute: Route$5.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$8
	}),
	ForecastsRoute: Route$4.update({
		id: "/forecasts",
		path: "/forecasts",
		getParentRoute: () => Route$8
	}),
	InventoryRoute: Route$3.update({
		id: "/inventory",
		path: "/inventory",
		getParentRoute: () => Route$8
	}),
	RestockRoute: Route$2.update({
		id: "/restock",
		path: "/restock",
		getParentRoute: () => Route$8
	}),
	SalesRoute: Route$1.update({
		id: "/sales",
		path: "/sales",
		getParentRoute: () => Route$8
	}),
	SettingsRoute: Route.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
