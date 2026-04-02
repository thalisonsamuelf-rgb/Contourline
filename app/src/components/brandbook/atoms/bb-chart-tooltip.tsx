"use client"

import { cn } from "@/lib/utils"

export interface BbChartTooltipItem {
  name: string
  value: number
  color: string
}

export interface BbChartTooltipProps {
  label?: string
  items: BbChartTooltipItem[]
  formatter?: (value: number) => string
  className?: string
  active?: boolean
  payload?: Array<{
    value: number
    name?: string
    dataKey?: string
    color?: string
    stroke?: string
  }>
}

export function BbChartTooltip({
  label,
  items,
  formatter,
  className,
  active,
  payload,
}: BbChartTooltipProps) {
  const resolvedItems =
    payload && active
      ? payload.map((p) => ({
          name: p.name || p.dataKey || "",
          value: typeof p.value === "number" ? p.value : 0,
          color: p.color || p.stroke || "var(--bb-chart-1)",
        }))
      : items

  if (!resolvedItems || resolvedItems.length === 0) return null

  return (
    <div
      className={cn(
        "px-3 py-2 text-xs shadow-lg border font-bb-mono",
        "bg-[var(--bb-chart-tooltip-bg)] border-[var(--bb-chart-tooltip-border)] text-[var(--bb-chart-tooltip-text)]",
        className,
      )}
    >
      {label && (
        <p className="mb-1.5 text-[0.65rem] uppercase tracking-wider text-bb-dim">
          {label}
        </p>
      )}
      {resolvedItems.map((item, i) => (
        <div key={i} className="flex items-center gap-2 py-0.5">
          <span
            className="inline-block w-2 h-2 flex-shrink-0"
            style={{ background: item.color }}
          />
          <span className="text-bb-dim">{item.name}:</span>
          <span className="font-semibold" style={{ color: item.color }}>
            {formatter ? formatter(item.value) : item.value}
          </span>
        </div>
      ))}
    </div>
  )
}
