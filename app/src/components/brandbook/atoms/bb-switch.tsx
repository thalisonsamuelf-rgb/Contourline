"use client"

import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

export interface BbSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

export function BbSwitch({ label, className, checked, ...props }: BbSwitchProps) {
  return (
    <label
      className={cn("inline-flex items-center gap-2 cursor-pointer", className)}
      style={{ minHeight: 44 }}
    >
      <span
        style={{
          position: "relative",
          width: 40,
          height: 24,
          display: "inline-block",
        }}
      >
        <input type="checkbox" checked={checked} style={{ opacity: 0, width: 0, height: 0 }} {...props} />
        <span
          style={{
            position: "absolute",
            inset: 0,
            background: checked ? "var(--bb-accent-15)" : "var(--surface)",
            border: `1px solid ${checked ? "var(--bb-accent)" : "var(--border)"}`,
            borderRadius: 12,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              left: checked ? 20 : 4,
              top: 3,
              background: checked ? "var(--bb-accent)" : "var(--dim)",
              borderRadius: "50%",
              transition: "all 0.2s ease",
            }}
          />
        </span>
      </span>
      {label && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cream)" }}>
          {label}
        </span>
      )}
    </label>
  )
}
