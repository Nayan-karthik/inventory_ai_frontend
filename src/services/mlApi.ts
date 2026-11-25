import axios from "axios";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return import.meta.env["VITE_API_URL"] || "http://localhost:8000";
  }
  return process.env["VITE_API_URL"] || "http://127.0.0.1:8000";
};

const mlApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

mlApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[mlApi Error]", error.config?.url, error.message, error.response?.data);
    return Promise.reject(error);
  }
);

export interface Forecast {
  product_id: string;
  product_name: string;
  date: string;
  predicted_demand: number;
  range_low?: number;
  range_high?: number;
}

export interface ForecastTimelinePoint {
  date: string;
  product_id: string;
  product_name: string;
  actual_demand: number | null;
  predicted_demand: number;
  range_low: number;
  range_high: number;
  is_future: boolean;
}

export interface ForecastMetric {
  product_id: string;
  product_name: string;
  mae: number;
  rmse: number;
  mape: number;
  accuracy: number;
}

export interface RestockRecommendation {
  product_id: string;
  product_name: string;
  current_stock: number;
  reorder_level: number;
  safety_stock: number;
  supplier_lead_time_days: number;
  unit_price: number;
  lead_time_demand: number;
  predicted_7_day_demand: number;
  reorder_point: number;
  recommended_order: number;
  status: string;
}

export interface RestockOrder {
  id: number;
  product_id: string;
  product_name: string;
  quantity: number;
  status: string;
  created_at: string;
}

export interface RestockOrderCreate {
  product_id: string;
  product_name: string;
  quantity: number;
}

export interface BackendHealth {
  message: string;
  status: string;
  active_dataset: DatasetStatus;
}

export const getBackendHealth = async (): Promise<BackendHealth> => {
  const response = await mlApi.get<BackendHealth>("/");
  return response.data;
};

export const getForecast = async (productId?: string): Promise<Forecast[]> => {
  const response = await mlApi.get<Forecast[]>("/forecast", {
    params: productId ? { product_id: productId } : undefined,
  });
  return response.data;
};

export const getForecastTimeline = async (params?: {
  product_id?: string;
  year?: string;
  month?: string;
}): Promise<ForecastTimelinePoint[]> => {
  const response = await mlApi.get<ForecastTimelinePoint[]>("/forecast/timeline", { params });
  return response.data;
};

export const getForecastMetrics = async (): Promise<ForecastMetric[]> => {
  const response = await mlApi.get<ForecastMetric[]>("/metrics");
  return response.data;
};

export const getRestockRecommendations = async (): Promise<RestockRecommendation[]> => {
  const response = await mlApi.get<RestockRecommendation[]>("/restock");
  return response.data;
};

export const getRestockOrders = async (): Promise<RestockOrder[]> => {
  const response = await mlApi.get<RestockOrder[]>("/restock-orders");
  return response.data;
};

export const createRestockOrder = async (
  order: RestockOrderCreate,
): Promise<RestockOrder> => {
  const response = await mlApi.post<RestockOrder>("/restock-orders", order);
  return response.data;
};

export interface DatasetStatus {
  mode: "demo" | "user";
  store_name: string;
  num_products: number;
  date_range: string;
  is_demo: boolean;
  updated_at?: string;
}

export interface UploadPreview {
  status: string;
  total_rows_estimate: number;
  columns: string[];
  detected_mapping: {
    date_col: string | null;
    product_col: string | null;
    quantity_col: string | null;
    price_col: string | null;
    category_col: string | null;
  };
  preview_rows: Record<string, any>[];
}

export interface IngestResponse {
  status: string;
  message: string;
  store_name: string;
  num_products: number;
  date_range: string;
  total_sales_rows: number;
}

export const getDatasetStatus = async (): Promise<DatasetStatus> => {
  const response = await mlApi.get<DatasetStatus>("/api/dataset/status");
  return response.data;
};

export const switchDataset = async (mode: "demo" | "user"): Promise<any> => {
  const response = await mlApi.post("/api/dataset/switch", { mode });
  return response.data;
};

export const resetToDemo = async (): Promise<any> => {
  const response = await mlApi.post("/api/dataset/reset-demo");
  return response.data;
};

export const previewCsvUpload = async (file: File): Promise<UploadPreview> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await mlApi.post<UploadPreview>("/api/upload/preview", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const processCsvUpload = async (
  file: File,
  mapping: {
    date_col: string;
    product_col: string;
    quantity_col: string;
    price_col?: string | undefined;
    store_name?: string | undefined;
  }
): Promise<IngestResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("date_col", mapping.date_col);
  formData.append("product_col", mapping.product_col);
  formData.append("quantity_col", mapping.quantity_col);
  if (mapping.price_col) formData.append("price_col", mapping.price_col);
  if (mapping.store_name) formData.append("store_name", mapping.store_name);

  const response = await mlApi.post<IngestResponse>("/api/upload/process", formData, {
    headers: { "Content-Type": "multipart/form-data" },
    timeout: 60000, // Allow up to 60s for training ML on large files
  });
  return response.data;
};

