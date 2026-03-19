"use client"

import { cn } from "@/lib/utils"

interface TickerStripProps {
  items: string[]
  speed?: number
  className?: string
}

export function TickerStrip({ items, className }: TickerStripProps) {
  return (
    <div
      className={cn("border-y", className)}
      style={{
        borderColor: "var(--bb-border)",
        background: "var(--bb-dark)",
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.6rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "var(--bb-dim)",
        padding: "0.75rem 1rem",
      }}
    >
      <div
        className="flex flex-wrap items-center justify-center"
        style={{
          gap: "0.75rem 1.5rem",
        }}
      >
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center"
            style={{ gap: "0.75rem" }}
          >
            {index > 0 && <span aria-hidden="true">—</span>}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
