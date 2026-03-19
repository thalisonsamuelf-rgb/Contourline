"use client"

import { cn } from "@/lib/utils"
import type { InputHTMLAttributes } from "react"

export interface BbCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string
}

export function BbCheckbox({ label, className, ...props }: BbCheckboxProps) {
  return (
    <label
      className={cn("inline-flex items-center gap-2 cursor-pointer", className)}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "0.65rem",
        color: "var(--cream)",
        minHeight: 44,
      }}
    >
      <input
        type="checkbox"
        style={{
          appearance: "none",
          width: 44,
          height: 44,
          padding: 12,
          boxSizing: "border-box",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          backgroundClip: "content-box",
          cursor: "pointer",
          flexShrink: 0,
          transition: "all 0.2s ease",
        }}
        {...props}
      />
      {label && <span>{label}</span>}
    </label>
  )
}
