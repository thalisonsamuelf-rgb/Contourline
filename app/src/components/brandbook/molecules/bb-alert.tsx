import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export interface BbAlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error"
  title?: string
  icon?: ReactNode
}

const variantStyles: Record<string, React.CSSProperties> = {
  info: { borderLeftColor: "var(--blue)", background: "rgba(0, 153, 255, 0.05)" },
  success: { borderLeftColor: "var(--bb-accent)", background: "rgba(221, 209, 187, 0.05)" },
  warning: { borderLeftColor: "var(--warning)", background: "var(--warning-bg)" },
  error: { borderLeftColor: "var(--error)", background: "rgba(239, 68, 68, 0.05)" },
}

export function BbAlert({ variant = "info", title, icon, children, className, style, ...props }: BbAlertProps) {
  return (
    <div
      role="alert"
      className={cn(className)}
      style={{
        display: "flex",
        gap: "0.75rem",
        padding: "1rem 1.25rem",
        borderLeft: "3px solid",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      {icon && <span style={{ flexShrink: 0, marginTop: "0.125rem" }}>{icon}</span>}
      <div style={{ flex: 1 }}>
        {title && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", fontWeight: 600, color: "var(--cream)", marginBottom: "0.25rem" }}>
            {title}
          </p>
        )}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", lineHeight: 1.5 }}>
          {children}
        </div>
      </div>
    </div>
  )
}
