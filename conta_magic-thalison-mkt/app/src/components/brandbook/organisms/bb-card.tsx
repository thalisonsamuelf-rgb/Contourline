import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"
import { BbPanelHeader } from "../molecules/bb-panel-header"

export interface BbCardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  actions?: ReactNode
  footer?: ReactNode
  variant?: "default" | "elevated" | "outlined"
}

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
  },
  elevated: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.3)",
  },
  outlined: {
    background: "transparent",
    border: "1px solid var(--border)",
  },
}

export function BbCard({
  title,
  subtitle,
  actions,
  footer,
  variant = "default",
  className,
  children,
  style,
  ...props
}: BbCardProps) {
  return (
    <div
      className={cn(className)}
      style={{
        overflow: "hidden",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {title && (
        <div style={{ padding: "1.25rem 1.25rem 0" }}>
          <BbPanelHeader title={title} subtitle={subtitle} actions={actions} />
        </div>
      )}
      <div style={{ padding: "1.25rem" }}>{children}</div>
      {footer && (
        <div
          style={{
            borderTop: "1px solid var(--border)",
            padding: "0.75rem 1.25rem",
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
