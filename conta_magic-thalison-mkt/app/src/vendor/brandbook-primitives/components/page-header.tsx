import type { ReactNode } from "react"
import { cn } from "../lib/cn"

export interface PageHeaderProps {
  navLeft?: string
  navCenter?: string
  navRight?: string
  title: ReactNode
  subtitle?: string
  footerLeft?: string
  footerCenter?: string
  footerRight?: string
  className?: string
}

export function PageHeader({
  navLeft,
  navCenter,
  navRight,
  title,
  subtitle,
  footerLeft,
  footerCenter,
  footerRight,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "border-b border-[var(--bb-border)] bg-[var(--bb-surface)]",
        className
      )}
    >
      {(navLeft || navCenter || navRight) && (
        <div className="flex flex-col justify-between gap-2 border-b border-[var(--bb-border)] px-[var(--bb-gutter,1.5rem)] py-[0.7rem] text-center font-bb-mono text-[0.65rem] font-medium uppercase text-[var(--bb-dim)] md:flex-row md:items-center">
          <span>{navLeft}</span>
          {navCenter && <span>{navCenter}</span>}
          <span>{navRight}</span>
        </div>
      )}

      <div className="px-[var(--bb-gutter,clamp(1rem,3vw,2rem))] pb-[clamp(1rem,3vw,2rem)] pt-[clamp(1.5rem,4vw,3rem)] text-center">
        <h1 className="font-bb-display text-[clamp(1.5rem,4vw,2.5rem)] font-extrabold uppercase tracking-[-0.03em]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 font-bb-mono text-[0.65rem] uppercase tracking-[0.12em] text-[var(--bb-dim)]">
            {subtitle}
          </p>
        )}
      </div>

      {(footerLeft || footerCenter || footerRight) && (
        <div className="flex flex-col justify-between gap-2 border-t border-[var(--bb-border)] px-[var(--bb-gutter,1.5rem)] py-[0.7rem] text-center font-bb-mono text-[0.65rem] font-medium uppercase text-[var(--bb-dim)] md:flex-row md:items-center">
          <span>{footerLeft}</span>
          {footerCenter && <span className="text-[var(--bb-accent)]">{footerCenter}</span>}
          <span>{footerRight}</span>
        </div>
      )}
    </header>
  )
}
