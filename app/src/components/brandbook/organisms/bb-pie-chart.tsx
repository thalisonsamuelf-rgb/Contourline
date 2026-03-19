"use client"

import { lazy } from "react"
import type { PieLabelRenderProps } from "recharts"
import { PieChart, Pie, Cell } from "recharts"
import { cn } from "@/lib/utils"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface BbPieChartDataItem {
  name: string
  value: number
  color?: string
}

export interface BbPieChartProps {
  data: BbPieChartDataItem[]
  innerRadius?: number
  showLabels?: boolean
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

const RADIAN = Math.PI / 180

function renderLabel(props: PieLabelRenderProps) {
  const cx = Number(props.cx ?? 0)
  const cy = Number(props.cy ?? 0)
  const midAngle = props.midAngle ?? 0
  const innerRadius = Number(props.innerRadius ?? 0)
  const outerRadius = Number(props.outerRadius ?? 0)
  const percent = props.percent ?? 0

  if (percent < 0.05) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="var(--bb-cream)"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-[11px] font-semibold font-bb-mono"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

function buildConfig(data: BbPieChartDataItem[]): ChartConfig {
  const config: ChartConfig = {}
  data.forEach((item, i) => {
    config[item.name] = {
      label: item.name,
      color: item.color || CHART_COLORS[i % CHART_COLORS.length],
    }
  })
  return config
}

export function BbPieChart({
  data,
  innerRadius = 0,
  showLabels = false,
  showLegend = true,
  height = 300,
  className,
}: BbPieChartProps) {
  const config = buildConfig(data)

  return (
    <ChartContainer
      config={config}
      className={cn("w-full", className)}
      style={{ height }}
    >
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={innerRadius}
          outerRadius={height * 0.3}
          dataKey="value"
          nameKey="name"
          labelLine={false}
          label={showLabels ? renderLabel : false}
          stroke="var(--bb-dark)"
          strokeWidth={2}
        >
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.color || CHART_COLORS[i % CHART_COLORS.length]}
            />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        {showLegend && (
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
        )}
      </PieChart>
    </ChartContainer>
  )
}

export const BbPieChartLazy = lazy(() =>
  import("./bb-pie-chart").then((m) => ({ default: m.BbPieChart })),
)
