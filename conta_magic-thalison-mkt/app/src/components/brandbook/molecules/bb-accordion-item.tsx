"use client"

import { cn } from "@/lib/utils"
import { useState, type HTMLAttributes, type ReactNode } from "react"

export interface BbAccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  defaultOpen?: boolean
  icon?: ReactNode
}

export function BbAccordionItem({ title, defaultOpen = false, icon, children, className, style, ...props }: BbAccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(className)}
      style={{ borderBottom: "1px solid var(--border)", ...style }}
      {...props}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "1rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          textAlign: "left",
          gap: "0.5rem",
        }}
        aria-expanded={open}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {icon}
          {title}
        </span>
        <span style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", fontSize: "0.6rem" }}>
          ▼
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: "1rem", color: "var(--dim)", fontFamily: "var(--font-mono)", fontSize: "0.675rem", lineHeight: 1.6 }}>
          {children}
        </div>
      )}
    </div>
  )
}
