"use client"

import { lazy } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface BbAreaChartArea {
  dataKey: string
  color?: string
  fillOpacity?: number
  label?: string
}

export interface BbAreaChartProps {
  data: Record<string, unknown>[]
  areas: BbAreaChartArea[]
  xAxisKey?: string
  curveType?: "monotone" | "linear"
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

function buildConfig(areas: BbAreaChartArea[]): ChartConfig {
  const config: ChartConfig = {}
  areas.forEach((area, i) => {
    config[area.dataKey] = {
      label: area.label || area.dataKey,
      color: area.color || CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BbAreaChart({
  data,
  areas,
  xAxisKey = "name",
  curveType = "monotone",
  showGrid = true,
  showLegend = false,
  height = 300,
  className,
}: BbAreaChartProps) {
  const config = buildConfig(areas)

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
        <defs>
          {areas.map((area) => (
            <linearGradient
              key={area.dataKey}
              id={`bb-area-gradient-${area.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="5%"
                stopColor={`var(--color-${area.dataKey})`}
                stopOpacity={area.fillOpacity ?? 0.4}
              />
              <stop
                offset="95%"
                stopColor={`var(--color-${area.dataKey})`}
                stopOpacity={0.02}
              />
            </linearGradient>
          ))}
        </defs>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
        )}
        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && (
          <ChartLegend content={<ChartLegendContent />} />
        )}
        {areas.map((area) => (
          <Area
            key={area.dataKey}
            type={curveType}
            dataKey={area.dataKey}
            stroke={`var(--color-${area.dataKey})`}
            strokeWidth={2}
            fill={`url(#bb-area-gradient-${area.dataKey})`}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  )
}

export const BbAreaChartLazy = lazy(() =>
  import("./bb-area-chart").then((m) => ({ default: m.BbAreaChart })),
)
