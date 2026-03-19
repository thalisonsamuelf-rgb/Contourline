"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbKpiCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
  draggable?: boolean
  dragHandleProps?: Record<string, unknown>
}

const trendClass: Record<string, string> = {
  up: "text-[var(--bb-accent)]",
  down: "text-[var(--bb-error)]",
  neutral: "text-[var(--bb-dim)]",
}

const trendIcon: Record<string, string> = {
  up: "↑",
  down: "↓",
  neutral: "→",
}

export function BbKpiCard({
  label,
  value,
  change,
  trend = "neutral",
  draggable = false,
  dragHandleProps,
  className,
  ...props
}: BbKpiCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-md p-5",
        "bg-[var(--bb-surface)] border border-[var(--bb-border)]",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <span className="font-bb-mono text-[0.5rem] font-medium uppercase tracking-widest text-[var(--bb-dim)]">
          {label}
        </span>
        {draggable && (
          <div
            className="cursor-grab touch-manipulation opacity-30 transition-opacity hover:opacity-100"
            aria-hidden="true"
            title="Arrastar para reordenar"
            {...dragHandleProps}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="5" r="1" /><circle cx="15" cy="5" r="1" />
              <circle cx="9" cy="12" r="1" /><circle cx="15" cy="12" r="1" />
              <circle cx="9" cy="19" r="1" /><circle cx="15" cy="19" r="1" />
            </svg>
          </div>
        )}
      </div>
      <span className="font-bb-display text-[1.75rem] font-bold leading-none text-[var(--bb-cream)]">
        {value}
      </span>
      {change && (
        <span className={cn("font-bb-mono text-[0.6rem]", trendClass[trend])}>
          {trendIcon[trend]} {change}
        </span>
      )}
    </div>
  )
}
