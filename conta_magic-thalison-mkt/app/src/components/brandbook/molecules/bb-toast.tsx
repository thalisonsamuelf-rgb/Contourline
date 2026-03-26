"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, type HTMLAttributes } from "react"

export interface BbToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "error" | "warning" | "info"
  message: string
  duration?: number
  onDismiss?: () => void
}

const variantStyles: Record<string, React.CSSProperties> = {
  success: { borderColor: "var(--bb-accent)", color: "var(--bb-accent)" },
  error: { borderColor: "var(--error)", color: "var(--error)" },
  warning: { borderColor: "var(--warning)", color: "var(--warning)" },
  info: { borderColor: "var(--blue)", color: "var(--blue)" },
}

export function BbToast({ variant = "info", message, duration = 4000, onDismiss, className, style, ...props }: BbToastProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (duration <= 0) return
    const timer = setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  if (!visible) return null

  return (
    <div
      role="status"
      className={cn(className)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.75rem 1rem",
        background: "var(--surface)",
        border: "1px solid",
        fontFamily: "var(--font-mono)",
        fontSize: "0.675rem",
        ...variantStyles[variant],
        ...style,
      }}
      {...props}
    >
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => { setVisible(false); onDismiss?.() }}
        style={{
          minWidth: 44,
          minHeight: 44,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          color: "var(--dim)",
          cursor: "pointer",
          fontSize: "0.875rem",
          padding: 0,
        }}
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  )
}
