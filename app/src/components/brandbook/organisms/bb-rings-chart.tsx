"use client"

import { lazy, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export interface BbRingsChartRing {
  label: string
  value: number
  maxValue: number
  color?: string
}

export interface BbRingsChartProps {
  rings: BbRingsChartRing[]
  size?: number
  strokeWidth?: number
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

export function BbRingsChart({
  rings,
  size = 200,
  strokeWidth = 14,
  className,
}: BbRingsChartProps) {
  const [animated, setAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const center = size / 2
  const ringGap = strokeWidth + 6

  return (
    <div ref={ref} className={cn("flex items-center gap-6", className)}>
      {/* SVG needs dynamic size via style — Tailwind can't do runtime numeric props */}
      <div className="flex-shrink-0" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          {rings.map((ring, i) => {
            const radius = center - strokeWidth / 2 - i * ringGap
            if (radius <= 0) return null
            const circumference = 2 * Math.PI * radius
            const percent = Math.min(ring.value / (ring.maxValue || 1), 1)
            const dashOffset = animated
              ? circumference * (1 - percent)
              : circumference
            const color = ring.color || CHART_COLORS[i % CHART_COLORS.length]

            return (
              <g key={i}>
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke="var(--bb-chart-ring-bg)"
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-[stroke-dashoffset] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ transitionDelay: `${i * 150}ms` }}
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="flex flex-col gap-2.5">
        {rings.map((ring, i) => {
          const color = ring.color || CHART_COLORS[i % CHART_COLORS.length]
          const percent = Math.round(
            Math.min(ring.value / (ring.maxValue || 1), 1) * 100,
          )
          return (
            <div key={i} className="flex items-center gap-2.5">
              <span
                className="inline-block w-2.5 h-2.5 flex-shrink-0"
                style={{ background: color }}
              />
              <span className="text-xs font-bb-mono text-bb-cream">
                {ring.label}
              </span>
              <span
                className="text-xs font-semibold font-bb-mono"
                style={{ color }}
              >
                {percent}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const BbRingsChartLazy = lazy(() =>
  import("./bb-rings-chart").then((m) => ({ default: m.BbRingsChart })),
)
