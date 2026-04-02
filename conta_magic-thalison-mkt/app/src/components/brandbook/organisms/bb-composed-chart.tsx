"use client"

import { lazy } from "react"
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface BbComposedChartSeries {
  dataKey: string
  type: "bar" | "line" | "area"
  color?: string
  label?: string
  strokeWidth?: number
}

export interface BbComposedChartProps {
  data: Record<string, unknown>[]
  series: BbComposedChartSeries[]
  xAxisKey?: string
  showGrid?: boolean
  showLegend?: boolean
  height?: number
  className?: string
}

const CHART_COLORS = [
  "var(--bb-chart-1)",
  "var(--bb-chart-2)",
  "var(--bb-chart-3)",
  "var(--bb-chart-4)",
  "var(--bb-chart-5)",
  "var(--bb-chart-6)",
]

function buildConfig(series: BbComposedChartSeries[]): ChartConfig {
  const config: ChartConfig = {}
  series.forEach((s, i) => {
    config[s.dataKey] = {
      label: s.label || s.dataKey,
      color: s.color || CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BbComposedChart({
  data,
  series,
  xAxisKey = "name",
  showGrid = true,
  showLegend = true,
  height = 300,
  className,
}: BbComposedChartProps) {
  const config = buildConfig(series)

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <ComposedChart
        data={data}
        margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
      >
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
        )}
        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {series.map((s) => {
          const colorVar = `var(--color-${s.dataKey})`
          switch (s.type) {
            case "bar":
              return (
                <Bar
                  key={s.dataKey}
                  dataKey={s.dataKey}
                  fill={colorVar}
                  radius={[2, 2, 0, 0]}
                  barSize={20}
                />
              )
            case "line":
              return (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  stroke={colorVar}
                  strokeWidth={s.strokeWidth || 2}
                  dot={{ fill: colorVar, strokeWidth: 0, r: 3 }}
                />
              )
            case "area":
              return (
                <Area
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  stroke={colorVar}
                  fill={colorVar}
                  fillOpacity={0.15}
                  strokeWidth={s.strokeWidth || 2}
                />
              )
          }
        })}
      </ComposedChart>
    </ChartContainer>
  )
}

export const BbComposedChartLazy = lazy(() =>
  import("./bb-composed-chart").then((m) => ({
    default: m.BbComposedChart,
  })),
)
