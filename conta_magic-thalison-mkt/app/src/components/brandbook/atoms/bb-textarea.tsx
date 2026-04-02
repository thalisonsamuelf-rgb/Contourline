import { cn } from "@/lib/utils"
import type { TextareaHTMLAttributes } from "react"

export interface BbTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
}

export function BbTextarea({ error, className, style, ...props }: BbTextareaProps) {
  return (
    <textarea
      className={cn(className)}
      style={{
        width: "100%",
        padding: "0.75rem 1rem",
        background: "var(--surface)",
        border: `1px solid ${error ? "var(--error)" : "var(--border)"}`,
        color: "var(--cream)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        outline: "none",
        resize: "vertical",
        minHeight: "80px",
        transition: "border-color 0.2s ease",
        ...style,
      }}
      {...props}
    />
  )
}
