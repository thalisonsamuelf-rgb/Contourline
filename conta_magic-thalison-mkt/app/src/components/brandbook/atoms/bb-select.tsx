import { cn } from "@/lib/utils"
import type { SelectHTMLAttributes } from "react"

export type BbSelectProps = SelectHTMLAttributes<HTMLSelectElement>

export function BbSelect({ className, style, children, ...props }: BbSelectProps) {
  return (
    <select
      className={cn(className)}
      style={{
        width: "100%",
        minHeight: 44,
        padding: "0.65rem 2.5rem 0.65rem 1rem",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--cream)",
        fontFamily: "var(--font-mono)",
        fontSize: "0.7rem",
        outline: "none",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%23696969' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
        cursor: "pointer",
        transition: "border-color 0.2s ease",
        ...style,
      }}
      {...props}
    >
      {children}
    </select>
  )
}
