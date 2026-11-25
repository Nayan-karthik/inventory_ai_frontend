import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-yJxyrm_w.js
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
var inventoryApi = axios.create({
	baseURL: getBaseUrl(),
	headers: { "Content-Type": "application/json" },
	timeout: 1e4
});
inventoryApi.interceptors.response.use((response) => response, (error) => {
	console.error("[inventoryApi Error]", error.config?.url, error.message, error.response?.data);
	return Promise.reject(error);
});
/**
* Real inventory data from FastAPI ML backend
*/
var getProducts = async () => {
	return (await inventoryApi.get("/products")).data;
};
var getSalesHistory = async () => {
	return (await inventoryApi.get("/sales")).data;
};
//#endregion
export { getSalesHistory as n, getProducts as t };
