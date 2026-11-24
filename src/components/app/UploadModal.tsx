import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  previewCsvUpload,
  processCsvUpload,
  type UploadPreview,
} from "@/services/mlApi";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UploadModal({ open, onOpenChange, onSuccess }: UploadModalProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewData, setPreviewData] = useState<UploadPreview | null>(null);

  // Form mapping
  const [storeName, setStoreName] = useState("My POS Store");
  const [dateCol, setDateCol] = useState("");
  const [productCol, setProductCol] = useState("");
  const [quantityCol, setQuantityCol] = useState("");
  const [priceCol, setPriceCol] = useState("");

  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const handleFileSelect = async (selectedFile: File) => {
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

      // Auto-set mapped columns from detection
      if (preview.detected_mapping.date_col) setDateCol(preview.detected_mapping.date_col);
      else if (preview.columns.length > 0) setDateCol(preview.columns[0] || "");

      if (preview.detected_mapping.product_col) setProductCol(preview.detected_mapping.product_col);
      else if (preview.columns.length > 1) setProductCol(preview.columns[1] || "");

      if (preview.detected_mapping.quantity_col) setQuantityCol(preview.detected_mapping.quantity_col);
      else if (preview.columns.length > 2) setQuantityCol(preview.columns[2] || "");

      if (preview.detected_mapping.price_col) setPriceCol(preview.detected_mapping.price_col);
      else setPriceCol("");
    } catch (err: any) {
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
        price_col: priceCol || undefined,
        store_name: storeName.trim() || "My POS Store",
      });

      toast.success("POS Data Ingested & Models Retrained!", {
        description: `Imported ${res.num_products} products (${res.date_range}).`,
      });

      // Refresh all queries so charts, tables, dropdowns update immediately
      await queryClient.invalidateQueries();

      onOpenChange(false);
      resetState();
      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.response?.data?.detail || "Failed to process and train models. Please check columns.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        if (!processing) {
          onOpenChange(val);
          if (!val) resetState();
        }
      }}
    >
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-xl">Import Any POS Dataset (CSV)</DialogTitle>
              <DialogDescription>
                Square, Shopify, Toast, Clover, or custom POS receipt exports.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {errorMsg && (
          <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: UPLOAD DROPZONE */}
        {!previewData && (
          <div className="py-4">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
              }}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
              }}
              className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/80 bg-accent/30 p-10 text-center transition-all hover:border-primary/50 hover:bg-accent/50 cursor-pointer"
            >
              {loadingPreview ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                  <p className="text-sm font-medium">Scanning CSV columns & data types...</p>
                </div>
              ) : (
                <>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UploadCloud className="h-7 w-7" />
                  </div>
                  <h4 className="text-base font-semibold">Drop your POS Sales CSV here</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Or click to browse from your computer
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-md border border-border bg-card px-2 py-1">Receipt Line Items</span>
                    <span className="rounded-md border border-border bg-card px-2 py-1">Daily POS Summaries</span>
                    <span className="rounded-md border border-border bg-card px-2 py-1">Auto Calendar Resampling</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* STEP 2: COLUMN MAPPING & PREVIEW */}
        {previewData && (
          <div className="space-y-6 py-2">
            <div className="flex items-center justify-between rounded-xl border border-border bg-card p-3">
              <div className="flex items-center gap-3">
                <FileSpreadsheet className="h-6 w-6 text-primary" />
                <div>
                  <p className="text-sm font-medium">{file?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ~{previewData.total_rows_estimate} rows detected · {previewData.columns.length} columns
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetState}
                disabled={processing}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Change File
              </Button>
            </div>

            {/* Store Name */}
            <div className="grid gap-2">
              <Label htmlFor="store-name">Store Name / Label</Label>
              <Input
                id="store-name"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="e.g. My Cafe & Retail Store"
                disabled={processing}
              />
            </div>

            {/* Column Mapping Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Date Column <span className="text-destructive">*</span>
                </Label>
                <select
                  value={dateCol}
                  onChange={(e) => setDateCol(e.target.value)}
                  disabled={processing}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">-- Select Column --</option>
                  {previewData.columns.map((c) => (
                    <option key={c} value={c}>
                      {c} {c === previewData.detected_mapping.date_col ? "✓ (Auto-detected)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Product / Item Name <span className="text-destructive">*</span>
                </Label>
                <select
                  value={productCol}
                  onChange={(e) => setProductCol(e.target.value)}
                  disabled={processing}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">-- Select Column --</option>
                  {previewData.columns.map((c) => (
                    <option key={c} value={c}>
                      {c} {c === previewData.detected_mapping.product_col ? "✓ (Auto-detected)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Quantity Sold <span className="text-destructive">*</span>
                </Label>
                <select
                  value={quantityCol}
                  onChange={(e) => setQuantityCol(e.target.value)}
                  disabled={processing}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">-- Select Column --</option>
                  {previewData.columns.map((c) => (
                    <option key={c} value={c}>
                      {c} {c === previewData.detected_mapping.quantity_col ? "✓ (Auto-detected)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Unit Price / Total (Optional)
                </Label>
                <select
                  value={priceCol}
                  onChange={(e) => setPriceCol(e.target.value)}
                  disabled={processing}
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                >
                  <option value="">-- None (Use standard catalog prices) --</option>
                  {previewData.columns.map((c) => (
                    <option key={c} value={c}>
                      {c} {c === previewData.detected_mapping.price_col ? "✓ (Auto-detected)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PREVIEW TABLE */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Raw Data Preview (First 5 Rows)
              </p>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 text-muted-foreground">
                    <tr>
                      {previewData.columns.slice(0, 6).map((col) => (
                        <th key={col} className="px-3 py-2 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {previewData.preview_rows.map((row, i) => (
                      <tr key={i} className="hover:bg-muted/30">
                        {previewData.columns.slice(0, 6).map((col) => (
                          <td key={col} className="px-3 py-2 truncate max-w-[150px]">
                            {String(row[col] ?? "")}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* PROCESSING PROGRESS OR ACTION BUTTONS */}
            <div className="flex flex-col gap-3 pt-2">
              {processing ? (
                <div className="flex items-center justify-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <div className="text-sm">
                    <p className="font-semibold">Processing & Retraining Machine Learning Models...</p>
                    <p className="text-xs text-muted-foreground">
                      Aggregating receipts, filling calendar zero-sales gaps, and computing 30-day forecasts.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3">
                  <Button variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    Process & Retrain ML
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
