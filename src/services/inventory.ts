import axios from "axios";
import {
  categoryPerformance,
  monthlySales,
  recentSales,
  slowMoving,
  topSelling,
  type Product,
} from "@/lib/mock-data";

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return import.meta.env["VITE_API_URL"] || "http://localhost:8000";
  }
  return process.env["VITE_API_URL"] || "http://127.0.0.1:8000";
};

const inventoryApi = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

inventoryApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[inventoryApi Error]", error.config?.url, error.message, error.response?.data);
    return Promise.reject(error);
  }
);

export interface SalesRecord {
  id: number;
  product: string;
  qty: number;
  value: string;
  when: string;
}

export interface InventoryProduct {
  product_id: string;
  product_name: string;
  current_stock: number;
  reorder_level: number;
  safety_stock: number;
  supplier_lead_time_days: number;
  unit_price: number;
}

/**
 * Real inventory data from FastAPI ML backend
 */
export const getProducts = async (): Promise<InventoryProduct[]> => {
  const response = await inventoryApi.get<InventoryProduct[]>("/products");
  return response.data;
};

/**
 * Temporary mock-data functions.
 *
 * Analytics and Sales pages still use these until we connect
 * those pages to the real backend.
 */
export const getMonthlySales = async () => {
  return monthlySales;
};

export const getCategoryPerformance = async () => {
  return categoryPerformance;
};

export const getTopSelling = async () => {
  return topSelling;
};

export const getSlowMoving = async () => {
  return slowMoving;
};

export const getRecentSales = async () => {
  return recentSales;
};

export const getSalesHistory = async (): Promise<SalesRecord[]> => {
  const response = await inventoryApi.get<SalesRecord[]>("/sales");
  return response.data;
};
