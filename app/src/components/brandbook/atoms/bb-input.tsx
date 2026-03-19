import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

export interface BbInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function BbInput({ error, className, disabled, style, ...props }: BbInputProps) {
  return (
    <input
      className={cn(className)}
      disabled={disabled}
      style={{
        width: "100%",
        minHeight: 44,
        padding: "0.65rem 1rem",
        background: "var(--surface)",
        border: `1px solid ${error ? "var(--error)" : "var(--border)"}`,
        color: "var(--cream)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        outline: "none",
        transition: "border-color 0.2s ease",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "auto",
        ...style,
      }}
      {...props}
    />
  )
}
