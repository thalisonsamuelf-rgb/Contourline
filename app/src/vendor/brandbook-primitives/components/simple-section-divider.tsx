import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export interface SimpleSectionDividerProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
}

export function SimpleSectionDivider({
  label,
  className,
  style,
  ...props
}: SimpleSectionDividerProps) {
  return (
    <div
      className={cn("flex items-center gap-4 py-8", className)}
      style={style}
      {...props}
    >
      <div className="h-px flex-1 bg-[var(--bb-border)]" />
      {label && (
        <span className="whitespace-nowrap font-bb-mono text-[0.55rem] uppercase tracking-[0.1em] text-[var(--bb-dim)]">
          {label}
        </span>
      )}
      {label && <div className="h-px flex-1 bg-[var(--bb-border)]" />}
    </div>
  )
}
