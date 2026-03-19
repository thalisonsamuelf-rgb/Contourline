"use client"

import { lazy } from "react"
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface BbRadialBarChartDataItem {
  name: string
  value: number
  fill?: string
}

export interface BbRadialBarChartProps {
  data: BbRadialBarChartDataItem[]
  maxValue?: number
  innerRadius?: number
  outerRadius?: number
  showLabel?: boolean
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

function buildConfig(data: BbRadialBarChartDataItem[]): ChartConfig {
  const config: ChartConfig = {}
  data.forEach((item, i) => {
    config[item.name] = {
      label: item.name,
      color: item.fill || CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BbRadialBarChart({
  data,
  maxValue = 100,
  innerRadius = 30,
  outerRadius = 110,
  showLabel = true,
  height = 300,
  className,
}: BbRadialBarChartProps) {
  const config = buildConfig(data)
  const chartData = data.map((item, i) => ({
    ...item,
    fill: item.fill || CHART_COLORS[i % CHART_COLORS.length],
  }))

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <RadialBarChart
        data={chartData}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, maxValue]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          dataKey="value"
          background={{ fill: "var(--bb-chart-ring-bg)" }}
          cornerRadius={4}
          label={
            showLabel
              ? {
                  position: "insideStart",
                  fill: "var(--bb-cream)",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                }
              : false
          }
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent nameKey="name" />}
        />
      </RadialBarChart>
    </ChartContainer>
  )
}

export const BbRadialBarChartLazy = lazy(() =>
  import("./bb-radial-bar-chart").then((m) => ({
    default: m.BbRadialBarChart,
  })),
)
