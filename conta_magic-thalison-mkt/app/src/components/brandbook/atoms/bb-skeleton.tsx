import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  rounded?: boolean
}

export function BbSkeleton({ width = "100%", height = 16, rounded = false, className, style, ...props }: BbSkeletonProps) {
  return (
    <div
      className={cn(className)}
      style={{
        width,
        height,
        background: "var(--surface)",
        borderRadius: rounded ? "50%" : 4,
        animation: "bb-pulse 1.5s ease-in-out infinite",
        ...style,
      }}
      {...props}
    />
  )
}
