import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export interface BbCompCellProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  preview?: ReactNode
  status?: "stable" | "draft" | "deprecated"
}

const statusColors: Record<string, string> = {
  stable: "var(--bb-accent)",
  draft: "var(--warning)",
  deprecated: "var(--error)",
}

export function BbCompCell({ name, preview, status = "stable", children, className, style, ...props }: BbCompCellProps) {
  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid var(--border)",
        overflow: "hidden",
        ...style,
      }}
      {...props}
    >
      <div style={{ padding: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--surface)", minHeight: 120 }}>
        {preview ?? children}
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.625rem 0.75rem", borderTop: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", fontWeight: 500, color: "var(--cream)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {name}
        </span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColors[status] }} title={status} />
      </div>
    </div>
  )
}
