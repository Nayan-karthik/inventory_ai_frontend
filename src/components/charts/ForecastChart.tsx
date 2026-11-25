import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ForecastPoint } from "@/lib/mock-data";

export function ForecastChart({ data, height = 340 }: { data: ForecastPoint[]; height?: number }) {
  const rows = data.map((p) => ({
    ...p,
    rangeBase: p.rangeLow,
    rangeSpan: p.rangeHigh !== null && p.rangeLow !== null ? p.rangeHigh - p.rangeLow : null,
  }));

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={rows} margin={{ top: 12, right: 12, bottom: 0, left: -14 }}>
          <defs>
            <linearGradient id="forecastRange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.22} />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-subtle-foreground)", fontSize: 11 }}
            minTickGap={16}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--color-subtle-foreground)", fontSize: 11 }}
            width={46}
          />
          <Tooltip
            cursor={{ stroke: "var(--color-border)" }}
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;
              const dataPoint = payload[0]?.payload as ForecastPoint & {
                rangeBase?: number;
                rangeSpan?: number;
              };
              return (
                <div className="rounded-xl border border-border bg-popover/95 p-3 text-xs shadow-lg backdrop-blur-sm">
                  <div className="mb-2 font-semibold text-foreground">{label}</div>
                  <div className="space-y-1.5">
                    {dataPoint?.actual !== null && dataPoint?.actual !== undefined && (
                      <div className="flex items-center justify-between gap-4 text-emerald-700">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-chart-2" />
                          Actual Demand:
                        </span>
                        <span className="font-bold">{dataPoint.actual} units</span>
                      </div>
                    )}
                    {dataPoint?.predicted !== null && dataPoint?.predicted !== undefined && (
                      <div className="flex items-center justify-between gap-4 text-primary">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded-full bg-primary" />
                          Predicted Demand:
                        </span>
                        <span className="font-bold">{dataPoint.predicted} units</span>
                      </div>
                    )}
                    {dataPoint?.rangeLow !== null && dataPoint?.rangeHigh !== null && (
                      <div className="mt-1 flex items-center justify-between gap-4 border-t border-border pt-1 text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <span className="h-2 w-2 rounded bg-primary/30" />
                          Forecast Range:
                        </span>
                        <span className="font-medium text-foreground">
                          {dataPoint.rangeLow} – {dataPoint.rangeHigh} units
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="rangeBase"
            stackId="range"
            stroke="none"
            fill="transparent"
            isAnimationActive={false}
          />
          <Area
            type="monotone"
            dataKey="rangeSpan"
            stackId="range"
            stroke="none"
            fill="url(#forecastRange)"
            isAnimationActive={false}
          />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="var(--color-chart-2)"
            strokeWidth={2.2}
            dot={{ r: 2, fill: "var(--color-chart-2)" }}
            activeDot={{ r: 5 }}
            connectNulls={false}
            name="Actual demand"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="var(--color-primary)"
            strokeWidth={2.4}
            strokeDasharray="5 4"
            dot={false}
            activeDot={{ r: 5 }}
            name="Predicted demand"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ChartLegend() {
  return (
    <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-chart-2" />
        <span className="font-medium text-foreground">Actual Demand</span> (Historical)
      </span>
      <span className="flex items-center gap-2">
        <span className="h-0.5 w-4 rounded bg-primary" />
        <span className="font-medium text-foreground">Predicted Demand</span> (ML Model)
      </span>
      <span className="flex items-center gap-2">
        <span className="h-3 w-4 rounded border border-primary/30 bg-primary/15" />
        <span className="font-medium text-foreground">Forecast Range</span> (Confidence Band)
      </span>
    </div>
  );
}
