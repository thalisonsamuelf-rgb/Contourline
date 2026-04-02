"use client"

import { cn } from "@/lib/utils"
import { useState, type HTMLAttributes, type ReactNode } from "react"

export interface BbTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: ReactNode
  position?: "top" | "bottom" | "left" | "right"
}

export function BbTooltip({ content, position = "top", children, className, ...props }: BbTooltipProps) {
  const [visible, setVisible] = useState(false)

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    bottom: { top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
    left: { right: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
    right: { left: "calc(100% + 8px)", top: "50%", transform: "translateY(-50%)" },
  }

  return (
    <div
      className={cn(className)}
      style={{ position: "relative", display: "inline-flex" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      {...props}
    >
      {children}
      {visible && (
        <div
          role="tooltip"
          style={{
            position: "absolute",
            ...positionStyles[position],
            background: "var(--surface)",
            color: "var(--dim)",
            border: "1px solid var(--border)",
            padding: "0.375rem 0.75rem",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            whiteSpace: "nowrap",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
