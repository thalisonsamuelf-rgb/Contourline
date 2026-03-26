import { cn } from "@/lib/utils"
import type { SVGAttributes } from "react"

export interface BbBarChartProps extends SVGAttributes<SVGSVGElement> {
  data: {
    label: string
    value: number
    color?: string
  }[]
  maxValue?: number
  height?: number
}

export function BbBarChart({ data, maxValue, height = 200, className, style, ...props }: BbBarChartProps) {
  const chartWidth = 600
  const paddingTop = 20
  const paddingBottom = 30
  const drawHeight = height - paddingTop - paddingBottom

  const max = maxValue ?? Math.max(...data.map((d) => d.value), 1)
  const slotWidth = chartWidth / data.length
  const barWidth = slotWidth * 0.6
  const gap = slotWidth * 0.2

  return (
    <svg
      className={cn(className)}
      viewBox={`0 0 ${chartWidth} ${height}`}
      width="100%"
      height={height}
      style={style}
      {...props}
    >
      {data.map((d, i) => {
        const barHeight = (d.value / max) * drawHeight
        const x = i * slotWidth + gap
        const y = paddingTop + drawHeight - barHeight

        return (
          <g key={i}>
            {/* Bar */}
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={d.color ?? "var(--bb-accent)"}
              rx={2}
            />

            {/* Value label above bar */}
            <text
              x={x + barWidth / 2}
              y={y - 6}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                fill: "var(--cream)",
              }}
            >
              {d.value}
            </text>

            {/* Label below bar */}
            <text
              x={x + barWidth / 2}
              y={height - 8}
              textAnchor="middle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                fill: "var(--dim)",
              }}
            >
              {d.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
