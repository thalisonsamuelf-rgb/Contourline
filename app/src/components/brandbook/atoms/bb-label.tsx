import { cn } from "@/lib/utils"
import type { LabelHTMLAttributes } from "react"

export interface BbLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
}

export function BbLabel({ required, children, className, style, ...props }: BbLabelProps) {
  return (
    <label
      className={cn(className)}
      style={{
        display: "block",
        fontFamily: "var(--font-mono)",
        fontSize: "0.625rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        color: "var(--dim)",
        marginBottom: "0.375rem",
        ...style,
      }}
      {...props}
    >
      {children}
      {required && (
        <span style={{ color: "var(--error)", marginLeft: "0.25rem" }}>*</span>
      )}
    </label>
  )
}
