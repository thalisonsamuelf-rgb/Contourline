"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbTickerStripProps extends HTMLAttributes<HTMLDivElement> {
  items: string[]
  speed?: number
}

export function BbTickerStrip({
  items,
  className,
  style,
  ...props
}: BbTickerStripProps) {
  return (
    <div
      className={cn(className)}
      style={{
        overflow: "hidden",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "0.75rem 1rem",
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem 1.5rem",
        }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {i > 0 && (
              <span
                style={{
                  color: "var(--bb-accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                }}
                aria-hidden="true"
              >
                &#9670;
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                color: "var(--dim)",
              }}
            >
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
