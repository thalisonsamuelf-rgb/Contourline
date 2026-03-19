import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbStepperStepProps extends HTMLAttributes<HTMLDivElement> {
  step: number
  label: string
  status?: "pending" | "active" | "completed"
}

const statusColors: Record<string, { bg: string; border: string; text: string }> = {
  pending: { bg: "transparent", border: "var(--border)", text: "var(--dim)" },
  active: { bg: "rgba(221, 209, 187, 0.1)", border: "var(--bb-accent)", text: "var(--bb-accent)" },
  completed: { bg: "var(--bb-accent)", border: "var(--bb-accent)", text: "var(--dark)" },
}

export function BbStepperStep({ step, label, status = "pending", className, style, ...props }: BbStepperStepProps) {
  const colors = statusColors[status]
  return (
    <div
      className={cn(className)}
      style={{ display: "flex", alignItems: "center", gap: "0.75rem", ...style }}
      {...props}
    >
      <span
        style={{
          width: 28,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: `2px solid ${colors.border}`,
          background: colors.bg,
          color: colors.text,
          fontFamily: "var(--font-mono)",
          fontSize: "0.625rem",
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        {status === "completed" ? "✓" : step}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          fontWeight: status === "active" ? 600 : 400,
          color: status === "pending" ? "var(--dim)" : "var(--cream)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </span>
    </div>
  )
}
