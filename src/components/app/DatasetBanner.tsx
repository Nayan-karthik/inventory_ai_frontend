import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sparkles,
  UploadCloud,
  RotateCcw,
  Store,
  Layers,
  Calendar,
  CheckCircle2,
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

  const { data: status, isLoading } = useQuery<DatasetStatus>({
    queryKey: ["dataset-status"],
    queryFn: getDatasetStatus,
    refetchInterval: 10000,
  });

  const handleResetToDemo = async () => {
    setResetting(true);
    try {
      await resetToDemo();
      toast.success("Restored Seasonal Demo Store!", {
        description: "Back to 8 seasonal retail products with 2-year timeline.",
      });
      await queryClient.invalidateQueries();
    } catch (err: any) {
      toast.error("Failed to reset dataset", {
        description: err.message,
      });
    } finally {
      setResetting(false);
    }
  };

  const isDemo = status?.is_demo ?? true;
  const storeName = status?.store_name ?? "Demo Store (Seasonal Retail)";
  const numProducts = status?.num_products ?? 8;
  const dateRange = status?.date_range ?? "2024-01-01 to 2026-02-28";

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/80 bg-card/60 p-3.5 backdrop-blur shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Store className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {storeName}
                </span>
                <Badge
                  variant={isDemo ? "secondary" : "default"}
                  className={
                    isDemo
                      ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-medium"
                      : "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs font-medium"
                  }
                >
                  {isDemo ? "Demo Catalog" : "Uploaded POS"}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
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

        <div className="flex items-center gap-2">
          {!isDemo && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetToDemo}
              disabled={resetting}
              className="gap-1.5 text-xs h-8 border-border hover:bg-muted"
            >
              <RotateCcw className={`h-3.5 w-3.5 ${resetting ? "animate-spin" : ""}`} />
              Reset to Demo Store
            </Button>
          )}

          <Button
            size="sm"
            onClick={() => setUploadOpen(true)}
            className="gap-1.5 text-xs h-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            {isDemo ? "Upload POS CSV" : "Upload Another POS CSV"}
          </Button>
        </div>
      </div>

      <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </>
  );
}
