import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export interface BbListItemProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode
  title: string
  description?: string
  trailing?: ReactNode
}

export function BbListItem({ icon, title, description, trailing, className, style, ...props }: BbListItemProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 0",
        borderBottom: "1px solid var(--border)",
        ...style,
      }}
      {...props}
    >
      {icon && <span style={{ flexShrink: 0, color: "var(--dim)" }}>{icon}</span>}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 500, color: "var(--cream)", margin: 0 }}>
          {title}
        </p>
        {description && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--dim)", margin: "0.125rem 0 0" }}>
            {description}
          </p>
        )}
      </div>
      {trailing && <span style={{ flexShrink: 0 }}>{trailing}</span>}
    </div>
  )
}
