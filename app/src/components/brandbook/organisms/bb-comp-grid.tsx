import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbCompGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number
}

export function BbCompGrid({
  columns = 3,
  children,
  className,
  style,
  ...props
}: BbCompGridProps) {
  const minColumnWidthPx = Math.max(160, Math.floor(840 / Math.max(columns, 1)))

  return (
    <div
      className={cn(className)}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumnWidthPx}px), 1fr))`,
        gap: "1px",
        background: "var(--border)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}
