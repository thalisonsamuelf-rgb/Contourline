"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BentoGridProps {
  children: ReactNode
  className?: string
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4", className)}
      style={{
        gap: "1px",
        background: "var(--bb-border)",
        maxWidth: "1920px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  )
}
