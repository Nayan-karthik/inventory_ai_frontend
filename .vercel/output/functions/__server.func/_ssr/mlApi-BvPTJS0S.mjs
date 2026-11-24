import { t as axios } from "../_libs/axios+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mlApi-BvPTJS0S.js
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
	return process.env.VITE_API_URL || "http://127.0.0.1:8000";
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
var getForecast = async () => {
	return (await mlApi.get("/forecast")).data;
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
//#endregion
export { getRestockOrders as a, getForecastTimeline as i, getForecast as n, getRestockRecommendations as o, getForecastMetrics as r, createRestockOrder as t };
