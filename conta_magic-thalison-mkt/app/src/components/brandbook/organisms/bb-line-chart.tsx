"use client"

import { lazy } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface BbLineChartLine {
  dataKey: string
  color?: string
  label?: string
  strokeWidth?: number
  strokeDasharray?: string
}

export interface BbLineChartProps {
  data: Record<string, unknown>[]
  lines: BbLineChartLine[]
  xAxisKey?: string
  yAxisFormat?: (value: number) => string
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

function buildConfig(lines: BbLineChartLine[]): ChartConfig {
  const config: ChartConfig = {}
  lines.forEach((line, i) => {
    config[line.dataKey] = {
      label: line.label || line.dataKey,
      color: line.color || CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BbLineChart({
  data,
  lines,
  xAxisKey = "name",
  yAxisFormat,
  showGrid = true,
  showLegend = false,
  height = 300,
  className,
}: BbLineChartProps) {
  const config = buildConfig(lines)

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
        )}
        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={yAxisFormat} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {lines.map((line, i) => {
          const color = line.color || CHART_COLORS[i % CHART_COLORS.length]
          return (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              stroke={`var(--color-${line.dataKey})`}
              strokeWidth={line.strokeWidth || 2}
              strokeDasharray={line.strokeDasharray}
              dot={{ fill: color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5, stroke: color, strokeWidth: 2, fill: "var(--bb-dark)" }}
            />
          )
        })}
      </LineChart>
    </ChartContainer>
  )
}

export const BbLineChartLazy = lazy(() =>
  import("./bb-line-chart").then((m) => ({ default: m.BbLineChart })),
)
