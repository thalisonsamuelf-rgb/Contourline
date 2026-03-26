"use client"

import { lazy } from "react"
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface BbRadarChartAxis {
  dataKey: string
  label?: string
}

export interface BbRadarChartSeries {
  dataKey: string
  color?: string
  fillOpacity?: number
  label?: string
}

export interface BbRadarChartProps {
  data: Record<string, unknown>[]
  axes: BbRadarChartAxis[]
  series: BbRadarChartSeries[]
  height?: number
  className?: string
  domain?: [number, number]
}

const CHART_COLORS = [
  "var(--bb-chart-1)",
  "var(--bb-chart-2)",
  "var(--bb-chart-3)",
  "var(--bb-chart-4)",
  "var(--bb-chart-5)",
  "var(--bb-chart-6)",
]

function buildConfig(series: BbRadarChartSeries[]): ChartConfig {
  const config: ChartConfig = {}
  series.forEach((s, i) => {
    config[s.dataKey] = {
      label: s.label || s.dataKey,
      color: s.color || CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BbRadarChart({
  data,
  axes,
  series,
  height = 300,
  className,
  domain = [0, 100],
}: BbRadarChartProps) {
  const angleKey = axes[0]?.dataKey || "name"
  const config = buildConfig(series)

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <RadarChart
        data={data}
        outerRadius="72%"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <PolarGrid gridType="polygon" />
        <PolarAngleAxis dataKey={angleKey} />
        <PolarRadiusAxis
          angle={30}
          domain={domain}
          tick={false}
          axisLine={false}
        />
        {series.map((s) => (
          <Radar
            key={s.dataKey}
            dataKey={s.dataKey}
            stroke={`var(--color-${s.dataKey})`}
            fill={`var(--color-${s.dataKey})`}
            fillOpacity={s.fillOpacity ?? 0.2}
            strokeWidth={2}
            dot={{ r: 3, strokeWidth: 0 }}
          />
        ))}
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

export const BbRadarChartLazy = lazy(() =>
  import("./bb-radar-chart").then((m) => ({ default: m.BbRadarChart })),
)
