import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

export interface BbTabTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function BbTabTrigger({ active = false, children, className, style, ...props }: BbTabTriggerProps) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      className={cn(className)}
      style={{
        minWidth: 44,
        minHeight: 44,
        padding: "0.75rem 1rem",
        background: "none",
        border: "none",
        borderBottom: active ? "2px solid var(--bb-accent)" : "2px solid transparent",
        color: active ? "var(--cream)" : "var(--dim)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.625rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        cursor: "pointer",
        transition: "all 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
