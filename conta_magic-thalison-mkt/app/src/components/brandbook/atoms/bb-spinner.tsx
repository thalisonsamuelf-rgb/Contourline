import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbSpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
}

const sizeMap = { sm: 16, md: 24, lg: 36 }

export function BbSpinner({ size = "md", className, style, ...props }: BbSpinnerProps) {
  const s = sizeMap[size]
  return (
    <div
      className={cn(className)}
      style={{
        width: s,
        height: s,
        border: "2px solid var(--border)",
        borderTopColor: "var(--bb-accent)",
        borderRadius: "50%",
        animation: "bb-spin 0.7s linear infinite",
        ...style,
      }}
      {...props}
    />
  )
}
