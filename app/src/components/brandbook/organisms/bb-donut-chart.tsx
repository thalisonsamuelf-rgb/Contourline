import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbDonutChartProps extends HTMLAttributes<HTMLDivElement> {
  segments: { label: string; value: number; color?: string }[]
  size?: number
  strokeWidth?: number
}

const defaultColors = [
  "var(--bb-accent)",
  "var(--blue)",
  "var(--error)",
  "var(--warning)",
  "var(--dim)",
]

export function BbDonutChart({
  segments,
  size = 160,
  strokeWidth = 24,
  className,
  style,
  ...props
}: BbDonutChartProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0)
  const center = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  const arcs = segments.reduce<{
    accumulatedOffset: number
    values: Array<{
      label: string
      value: number
      color: string
      dashArray: string
      dashOffset: number
    }>
  }>(
    (state, seg, i) => {
      const fraction = total > 0 ? seg.value / total : 0
      const dashLength = fraction * circumference
      const dashOffset = circumference - state.accumulatedOffset

      return {
        accumulatedOffset: state.accumulatedOffset + dashLength,
        values: [
          ...state.values,
          {
            ...seg,
            color: seg.color ?? defaultColors[i % defaultColors.length],
            dashArray: `${dashLength} ${circumference - dashLength}`,
            dashOffset,
          },
        ],
      }
    },
    { accumulatedOffset: 0, values: [] }
  ).values

  return (
    <div
      className={cn(className)}
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        ...style,
      }}
      {...props}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {arcs.map((arc, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={arc.color}
            strokeWidth={strokeWidth}
            strokeDasharray={arc.dashArray}
            strokeDashoffset={arc.dashOffset}
          />
        ))}
        <text
          x={center}
          y={center}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--cream)"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: size * 0.15,
            fontWeight: 700,
            transform: "rotate(90deg)",
            transformOrigin: `${center}px ${center}px`,
          }}
        >
          {total}
        </text>
      </svg>

      {/* Legend */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          justifyContent: "center",
        }}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.375rem",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background:
                  seg.color ?? defaultColors[i % defaultColors.length],
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--dim)",
              }}
            >
              {seg.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
