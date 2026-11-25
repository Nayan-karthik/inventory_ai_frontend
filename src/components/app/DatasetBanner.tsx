import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  UploadCloud,
  RotateCcw,
  Store,
  Layers,
  Calendar,
  ArrowLeftRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  getDatasetStatus,
  resetToDemo,
  switchDataset,
  type DatasetStatus,
} from "@/services/mlApi";
import { UploadModal } from "./UploadModal";

export function DatasetBanner() {
  const queryClient = useQueryClient();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [switching, setSwitching] = useState(false);

  const { data: status, isError } = useQuery<DatasetStatus>({
    queryKey: ["dataset-status"],
    queryFn: getDatasetStatus,
    refetchInterval: 10000,
  });

  const handleResetToDemo = async () => {
    setResetting(true);
    try {
      await resetToDemo();
      toast.success("Restored Seasonal Demo Store", {
        description: "Back to the seasonal retail demo catalog.",
      });
      await queryClient.invalidateQueries();
    } catch (err: any) {
      toast.error("Failed to reset dataset", {
        description: err.response?.data?.detail || err.message,
      });
    } finally {
      setResetting(false);
    }
  };

  const handleSwitchMode = async (targetMode: "demo" | "user") => {
    setSwitching(true);
    try {
      await switchDataset(targetMode);
      toast.success(
        targetMode === "user" ? "Switched to Uploaded POS Store" : "Switched to Demo Store",
      );
      await queryClient.invalidateQueries();
    } catch (err: any) {
      const msg = err.response?.data?.detail || err.message;
      if (targetMode === "user") {
        toast.info("No uploaded POS dataset yet", {
          description: "Upload a CSV file first to use your own store data.",
        });
        setUploadOpen(true);
      } else {
        toast.error("Failed to switch dataset", { description: msg });
      }
    } finally {
      setSwitching(false);
    }
  };

  const isDemo = status?.is_demo ?? true;
  const storeName = status?.store_name ?? "Demo Store (Seasonal Retail)";
  const numProducts = status?.num_products ?? 8;
  const dateRange = status?.date_range ?? "2024-01-01 to 2026-02-28";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border bg-card/90 p-3.5 shadow-xs backdrop-blur-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Store className="h-4 w-4" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">{storeName}</span>
                <Badge
                  variant="secondary"
                  className={
                    isDemo
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium"
                      : "border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-medium"
                  }
                >
                  {isDemo ? "Demo Catalog" : "Uploaded POS"}
                </Badge>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    isError
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-emerald-50/80 text-emerald-700 border border-emerald-200/80"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isError ? "bg-rose-500" : "bg-emerald-500"
                    }`}
                  />
                  {isError ? "API Offline" : "ML API Live"}
                </span>
              </div>
              <div className="mt-0.5 flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Layers className="h-3 w-3" />
                  {numProducts} {numProducts === 1 ? "Product" : "Products"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {dateRange}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwitchMode(isDemo ? "user" : "demo")}
            disabled={switching}
            className="h-8 gap-1.5 text-xs"
          >
            <ArrowLeftRight className={`h-3.5 w-3.5 ${switching ? "animate-spin" : ""}`} />
            {isDemo ? "Use Uploaded POS" : "Switch to Demo"}
          </Button>

          {!isDemo && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetToDemo}
              disabled={resetting}
              className="h-8 gap-1.5 text-xs"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
              Reset Demo
            </Button>
          )}

          <Button
            size="sm"
            variant="crimson"
            onClick={() => setUploadOpen(true)}
            className="h-8 gap-1.5 text-xs"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            {isDemo ? "Upload POS CSV" : "Upload New CSV"}
          </Button>
        </div>
      </div>

      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </>
  );
}
