import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbHintProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "default" | "error" | "success"
}

const variantColors: Record<string, string> = {
  default: "var(--dim)",
  error: "var(--error)",
  success: "var(--bb-accent)",
}

export function BbHint({ variant = "default", children, className, style, ...props }: BbHintProps) {
  return (
    <p
      className={cn(className)}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.6875rem",
        color: variantColors[variant],
        marginTop: "0.25rem",
        ...style,
      }}
      {...props}
    >
      {children}
    </p>
  )
}
