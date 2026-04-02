import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface BrutalistCardProps {
  children: ReactNode
  className?: string
  small?: boolean
}

export function BrutalistCard({ children, className, small }: BrutalistCardProps) {
  return (
    <div
      className={cn("border", className)}
      style={{
        borderColor: "var(--bb-border)",
        background: "var(--bb-dark)",
        padding: small ? "1rem 1.25rem" : "1.5rem 2rem",
      }}
    >
      {children}
    </div>
  )
}
