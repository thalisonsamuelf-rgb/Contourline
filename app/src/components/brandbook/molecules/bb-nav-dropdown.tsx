"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from "react"

export interface BbNavDropdownProps extends HTMLAttributes<HTMLDivElement> {
  trigger: ReactNode
}

export function BbNavDropdown({ trigger, children, className, style, ...props }: BbNavDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{ position: "relative", display: "inline-block", ...style }}
      {...props}
    >
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer" }}>
        {trigger}
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            minWidth: 180,
            background: "var(--dark)",
            border: "1px solid var(--border)",
            padding: "0.375rem 0",
            zIndex: 40,
          }}
        >
          {children}
        </div>
      )}
    </div>
  )
}
