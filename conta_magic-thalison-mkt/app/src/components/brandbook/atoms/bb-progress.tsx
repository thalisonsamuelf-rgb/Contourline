import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: "sm" | "md" | "lg"
}

const heightMap = { sm: 4, md: 8, lg: 12 }

export function BbProgress({ value = 0, max = 100, size = "md", className, style, ...props }: BbProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const h = heightMap[size]
  return (
    <div
      className={cn(className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      style={{
        width: "100%",
        height: h,
        background: "var(--surface)",
        borderRadius: h / 2,
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          width: `${pct}%`,
          height: "100%",
          background: "var(--bb-accent)",
          borderRadius: h / 2,
          transition: "width 0.3s ease",
        }}
      />
    </div>
  )
}
