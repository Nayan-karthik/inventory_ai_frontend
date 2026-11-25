import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Logo, r as cn, t as Button } from "./button-Y9N3DePz.mjs";
import { f as useRouterState, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as ArrowLeftRight, C as Layers, E as CloudUpload, F as ChartLine, I as ChartColumn, L as Calendar, R as Boxes, S as LayoutDashboard, T as FileSpreadsheet, b as Menu, c as Store, d as Settings, j as CircleAlert, l as Sparkles, m as Receipt, n as UserRound, p as RotateCcw, t as X, x as LoaderCircle } from "../_libs/lucide-react.mjs";
import { t as axios } from "../_libs/axios+[...].mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppShell-DElWAt1-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var getBaseUrl = () => {
	if (typeof window !== "undefined") return {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_API_URL": "http://localhost:8000"
	}["VITE_API_URL"] || "http://localhost:8000";
	return process.env["VITE_API_URL"] || "http://127.0.0.1:8000";
};
var mlApi = axios.create({
	baseURL: getBaseUrl(),
	headers: { "Content-Type": "application/json" },
	timeout: 1e4
});
mlApi.interceptors.response.use((response) => response, (error) => {
	console.error("[mlApi Error]", error.config?.url, error.message, error.response?.data);
	return Promise.reject(error);
});
var getForecast = async (productId) => {
	return (await mlApi.get("/forecast", { params: productId ? { product_id: productId } : void 0 })).data;
};
var getForecastTimeline = async (params) => {
	return (await mlApi.get("/forecast/timeline", { params })).data;
};
var getForecastMetrics = async () => {
	return (await mlApi.get("/metrics")).data;
};
var getRestockRecommendations = async () => {
	return (await mlApi.get("/restock")).data;
};
var getRestockOrders = async () => {
	return (await mlApi.get("/restock-orders")).data;
};
var createRestockOrder = async (order) => {
	return (await mlApi.post("/restock-orders", order)).data;
};
var getDatasetStatus = async () => {
	return (await mlApi.get("/api/dataset/status")).data;
};
var switchDataset = async (mode) => {
	return (await mlApi.post("/api/dataset/switch", { mode })).data;
};
var resetToDemo = async () => {
	return (await mlApi.post("/api/dataset/reset-demo")).data;
};
var previewCsvUpload = async (file) => {
	const formData = new FormData();
	formData.append("file", file);
	return (await mlApi.post("/api/upload/preview", formData, { headers: { "Content-Type": "multipart/form-data" } })).data;
};
var processCsvUpload = async (file, mapping) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("date_col", mapping.date_col);
	formData.append("product_col", mapping.product_col);
	formData.append("quantity_col", mapping.quantity_col);
	if (mapping.price_col) formData.append("price_col", mapping.price_col);
	if (mapping.store_name) formData.append("store_name", mapping.store_name);
	return (await mlApi.post("/api/upload/process", formData, {
		headers: { "Content-Type": "multipart/form-data" },
		timeout: 6e4
	})).data;
};
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = Root.displayName;
function UploadModal({ open, onOpenChange, onSuccess }) {
	const queryClient = useQueryClient();
	const fileInputRef = (0, import_react.useRef)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [loadingPreview, setLoadingPreview] = (0, import_react.useState)(false);
	const [previewData, setPreviewData] = (0, import_react.useState)(null);
	const [storeName, setStoreName] = (0, import_react.useState)("My POS Store");
	const [dateCol, setDateCol] = (0, import_react.useState)("");
	const [productCol, setProductCol] = (0, import_react.useState)("");
	const [quantityCol, setQuantityCol] = (0, import_react.useState)("");
	const [priceCol, setPriceCol] = (0, import_react.useState)("");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [errorMsg, setErrorMsg] = (0, import_react.useState)(null);
	const resetState = () => {
		setFile(null);
		setPreviewData(null);
		setDateCol("");
		setProductCol("");
		setQuantityCol("");
		setPriceCol("");
		setErrorMsg(null);
		setProcessing(false);
	};
	const handleFileSelect = async (selectedFile) => {
		if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
			setErrorMsg("Please upload a valid CSV file (.csv).");
			return;
		}
		setFile(selectedFile);
		setErrorMsg(null);
		setLoadingPreview(true);
		try {
			const preview = await previewCsvUpload(selectedFile);
			setPreviewData(preview);
			if (preview.detected_mapping.date_col) setDateCol(preview.detected_mapping.date_col);
			else if (preview.columns.length > 0) setDateCol(preview.columns[0] || "");
			if (preview.detected_mapping.product_col) setProductCol(preview.detected_mapping.product_col);
			else if (preview.columns.length > 1) setProductCol(preview.columns[1] || "");
			if (preview.detected_mapping.quantity_col) setQuantityCol(preview.detected_mapping.quantity_col);
			else if (preview.columns.length > 2) setQuantityCol(preview.columns[2] || "");
			if (preview.detected_mapping.price_col) setPriceCol(preview.detected_mapping.price_col);
			else setPriceCol("");
		} catch (err) {
			console.error(err);
			setErrorMsg(err.response?.data?.detail || "Could not read CSV file. Please verify format.");
		} finally {
			setLoadingPreview(false);
		}
	};
	const handleSubmit = async () => {
		if (!file) return;
		if (!dateCol || !productCol || !quantityCol) {
			setErrorMsg("Please map Date, Product, and Quantity columns.");
			return;
		}
		setProcessing(true);
		setErrorMsg(null);
		try {
			const res = await processCsvUpload(file, {
				date_col: dateCol,
				product_col: productCol,
				quantity_col: quantityCol,
				price_col: priceCol || void 0,
				store_name: storeName.trim() || "My POS Store"
			});
			toast.success("POS Data Ingested & Models Retrained!", { description: `Imported ${res.num_products} products (${res.date_range}).` });
			await queryClient.invalidateQueries();
			onOpenChange(false);
			resetState();
			onSuccess?.();
		} catch (err) {
			console.error(err);
			setErrorMsg(err.response?.data?.detail || "Failed to process and train models. Please check columns.");
		} finally {
			setProcessing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (val) => {
			if (!processing) {
				onOpenChange(val);
				if (!val) resetState();
			}
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-3xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl",
						children: "Import Any POS Dataset (CSV)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Square, Shopify, Toast, Clover, or custom POS receipt exports." })] })]
				}) }),
				errorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: errorMsg })]
				}),
				!previewData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileInputRef,
						type: "file",
						accept: ".csv",
						className: "hidden",
						onChange: (e) => {
							if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						onClick: () => fileInputRef.current?.click(),
						onDragOver: (e) => e.preventDefault(),
						onDrop: (e) => {
							e.preventDefault();
							if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
						},
						className: "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-accent/30 p-10 text-center transition-all hover:border-primary/50 hover:bg-accent/50 cursor-pointer",
						children: loadingPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Scanning CSV columns & data types..."
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-7 w-7" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-base font-semibold",
								children: "Drop your POS Sales CSV here"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Or click to browse from your computer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-card px-2 py-1",
										children: "Receipt Line Items"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-card px-2 py-1",
										children: "Daily POS Summaries"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-card px-2 py-1",
										children: "Auto Calendar Resampling"
									})
								]
							})
						] })
					})]
				}),
				previewData && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border border-border bg-card p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: file?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [
										"~",
										previewData.total_rows_estimate,
										" rows detected · ",
										previewData.columns.length,
										" columns"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: resetState,
								disabled: processing,
								className: "text-xs text-muted-foreground hover:text-foreground",
								children: "Change File"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "store-name",
								children: "Store Name / Label"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "store-name",
								value: storeName,
								onChange: (e) => setStoreName(e.target.value),
								placeholder: "e.g. My Cafe & Retail Store",
								disabled: processing
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: ["Date Column ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: dateCol,
									onChange: (e) => setDateCol(e.target.value),
									disabled: processing,
									className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "-- Select Column --"
									}), previewData.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c,
										children: [
											c,
											" ",
											c === previewData.detected_mapping.date_col ? "✓ (Auto-detected)" : ""
										]
									}, c))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: ["Product / Item Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: productCol,
									onChange: (e) => setProductCol(e.target.value),
									disabled: processing,
									className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "-- Select Column --"
									}), previewData.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c,
										children: [
											c,
											" ",
											c === previewData.detected_mapping.product_col ? "✓ (Auto-detected)" : ""
										]
									}, c))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: ["Quantity Sold ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: quantityCol,
									onChange: (e) => setQuantityCol(e.target.value),
									disabled: processing,
									className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "-- Select Column --"
									}), previewData.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c,
										children: [
											c,
											" ",
											c === previewData.detected_mapping.quantity_col ? "✓ (Auto-detected)" : ""
										]
									}, c))]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Unit Price / Total (Optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: priceCol,
									onChange: (e) => setPriceCol(e.target.value),
									disabled: processing,
									className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "-- None (Use standard catalog prices) --"
									}), previewData.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c,
										children: [
											c,
											" ",
											c === previewData.detected_mapping.price_col ? "✓ (Auto-detected)" : ""
										]
									}, c))]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Raw Data Preview (First 5 Rows)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "overflow-x-auto rounded-lg border border-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
								className: "w-full text-left text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
									className: "bg-muted/50 text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: previewData.columns.slice(0, 6).map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-2 font-medium",
										children: col
									}, col)) })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
									className: "divide-y divide-border",
									children: previewData.preview_rows.map((row, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
										className: "hover:bg-muted/30",
										children: previewData.columns.slice(0, 6).map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-3 py-2 truncate max-w-[150px]",
											children: String(row[col] ?? "")
										}, col))
									}, i))
								})]
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-3 pt-2",
							children: processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-5 w-5 animate-spin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold",
										children: "Processing & Retraining Machine Learning Models..."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Aggregating receipts, filling calendar zero-sales gaps, and computing 30-day forecasts."
									})]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-end gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => onOpenChange(false),
									children: "Cancel"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: handleSubmit,
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4" }), "Process & Retrain ML"]
								})]
							})
						})
					]
				})
			]
		})
	});
}
function DatasetBanner() {
	const queryClient = useQueryClient();
	const [uploadOpen, setUploadOpen] = (0, import_react.useState)(false);
	const [resetting, setResetting] = (0, import_react.useState)(false);
	const [switching, setSwitching] = (0, import_react.useState)(false);
	const { data: status, isError } = useQuery({
		queryKey: ["dataset-status"],
		queryFn: getDatasetStatus,
		refetchInterval: 1e4
	});
	const handleResetToDemo = async () => {
		setResetting(true);
		try {
			await resetToDemo();
			toast.success("Restored Seasonal Demo Store", { description: "Back to the seasonal retail demo catalog." });
			await queryClient.invalidateQueries();
		} catch (err) {
			toast.error("Failed to reset dataset", { description: err.response?.data?.detail || err.message });
		} finally {
			setResetting(false);
		}
	};
	const handleSwitchMode = async (targetMode) => {
		setSwitching(true);
		try {
			await switchDataset(targetMode);
			toast.success(targetMode === "user" ? "Switched to Uploaded POS Store" : "Switched to Demo Store");
			await queryClient.invalidateQueries();
		} catch (err) {
			const msg = err.response?.data?.detail || err.message;
			if (targetMode === "user") {
				toast.info("No uploaded POS dataset yet", { description: "Upload a CSV file first to use your own store data." });
				setUploadOpen(true);
			} else toast.error("Failed to switch dataset", { description: msg });
		} finally {
			setSwitching(false);
		}
	};
	const isDemo = status?.is_demo ?? true;
	const storeName = status?.store_name ?? "Demo Store (Seasonal Retail)";
	const numProducts = status?.num_products ?? 8;
	const dateRange = status?.date_range ?? "2024-01-01 to 2026-02-28";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 p-3.5 shadow-xs backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-foreground",
							children: storeName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "secondary",
							className: isDemo ? "border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium" : "border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-medium",
							children: isDemo ? "Demo Catalog" : "Uploaded POS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${isError ? "bg-rose-50 text-rose-700 border border-rose-200" : "bg-emerald-50/80 text-emerald-700 border border-emerald-200/80"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${isError ? "bg-rose-500" : "bg-emerald-500"}` }), isError ? "API Offline" : "ML API Live"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-0.5 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "h-3 w-3" }),
								numProducts,
								" ",
								numProducts === 1 ? "Product" : "Products"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }), dateRange]
						})
					]
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: () => handleSwitchMode(isDemo ? "user" : "demo"),
					disabled: switching,
					className: "h-8 gap-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, { className: `h-3.5 w-3.5 ${switching ? "animate-spin" : ""}` }), isDemo ? "Use Uploaded POS" : "Switch to Demo"]
				}),
				!isDemo && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					size: "sm",
					onClick: handleResetToDemo,
					disabled: resetting,
					className: "h-8 gap-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: `h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}` }), "Reset Demo"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "crimson",
					onClick: () => setUploadOpen(true),
					className: "h-8 gap-1.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-3.5 w-3.5" }), isDemo ? "Upload POS CSV" : "Upload New CSV"]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UploadModal, {
		open: uploadOpen,
		onOpenChange: setUploadOpen
	})] });
}
var nav = [
	{
		label: "Dashboard",
		to: "/dashboard",
		icon: LayoutDashboard
	},
	{
		label: "Inventory",
		to: "/inventory",
		icon: Boxes
	},
	{
		label: "Forecasting",
		to: "/forecasts",
		icon: ChartLine
	},
	{
		label: "Smart Restocking",
		to: "/restock",
		icon: Sparkles
	},
	{
		label: "Sales History",
		to: "/sales",
		icon: Receipt
	},
	{
		label: "Analytics",
		to: "/analytics",
		icon: ChartColumn
	},
	{
		label: "Settings",
		to: "/settings",
		icon: Settings
	}
];
function NavList({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "grid gap-1",
		children: nav.map((item) => {
			const active = pathname === item.to;
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all", active ? "bg-primary/10 font-medium text-primary shadow-[inset_0_0_0_1px_color-mix(in_oklab,var(--primary)_22%,transparent)]" : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("h-4 w-4", active ? "text-primary" : "text-subtle-foreground") }), item.label]
			}, item.to);
		})
	});
}
function UserCard() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-3 rounded-xl border border-sidebar-border bg-secondary/60 px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary/12 text-xs font-semibold text-primary",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "h-4 w-4" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-sm font-medium text-foreground",
				children: "Store Manager"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs text-subtle-foreground",
				children: "admin@stockai.io"
			})]
		})]
	});
}
function AppShell({ title, subtitle, actions, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background lg:flex",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 lg:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "px-1 py-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCard, {})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-w-0 flex-1 flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur-md lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "Toggle navigation",
						className: "rounded-lg p-2 text-muted-foreground hover:bg-secondary",
						onClick: () => setOpen((v) => !v),
						children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
					})]
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-card p-4 lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavList, { onNavigate: () => setOpen(false) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCard, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatasetBanner, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: "mb-7 flex flex-wrap items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold text-foreground sm:text-3xl",
								children: title
							}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1.5 text-sm text-muted-foreground",
								children: subtitle
							})] }), actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: actions
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-in fade-in duration-300",
							children
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { DialogHeader as a, Label as c, getForecast as d, getForecastMetrics as f, getRestockRecommendations as h, DialogFooter as i, UploadModal as l, getRestockOrders as m, Dialog as n, DialogTitle as o, getForecastTimeline as p, DialogContent as r, Input as s, AppShell as t, createRestockOrder as u };
