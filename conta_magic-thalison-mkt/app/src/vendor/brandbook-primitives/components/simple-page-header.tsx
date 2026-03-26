import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"
import { Badge } from "./badge"

export interface SimplePageHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  badge?: string
}

export function SimplePageHeader({
  title,
  subtitle,
  badge,
  className,
  style,
  ...props
}: SimplePageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 border-b border-[var(--bb-border)] pb-[clamp(1rem,3vw,2rem)] pt-[clamp(1.5rem,4vw,3rem)]",
        className
      )}
      style={style}
      {...props}
    >
      {badge && (
        <Badge variant="accent" className="mb-3">
          {badge}
        </Badge>
      )}
      <h1 className="m-0 font-bb-display text-[clamp(1.25rem,4vw,2rem)] font-bold text-[var(--bb-cream)]">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 font-bb-mono text-[0.7rem] text-[var(--bb-dim)]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
