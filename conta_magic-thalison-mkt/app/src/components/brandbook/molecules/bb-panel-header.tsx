import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export interface BbPanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  actions?: ReactNode
}

export function BbPanelHeader({ title, subtitle, actions, className, style, ...props }: BbPanelHeaderProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: "1rem",
        borderBottom: "1px solid var(--border)",
        ...style,
      }}
      {...props}
    >
      <div>
        <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 600, color: "var(--cream)", textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", margin: "0.25rem 0 0" }}>
            {subtitle}
          </p>
        )}
      </div>
      {actions && <div style={{ display: "flex", gap: "0.5rem" }}>{actions}</div>}
    </div>
  )
}
