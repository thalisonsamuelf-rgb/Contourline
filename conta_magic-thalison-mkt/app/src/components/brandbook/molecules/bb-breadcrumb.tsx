"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"

export interface BbBreadcrumbItem {
  label: string
  href?: string
  icon?: ReactNode
}

export interface BbBreadcrumbProps extends HTMLAttributes<HTMLElement> {
  items: BbBreadcrumbItem[]
  separator?: ReactNode
  maxLabelLength?: number
}

function HomeIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function BbBreadcrumb({
  items,
  separator,
  maxLabelLength = 30,
  className,
  ...props
}: BbBreadcrumbProps) {
  const isLast = (index: number) => index === items.length - 1
  const sep = separator ?? (
    <span className="text-muted-foreground text-[0.625rem] select-none" aria-hidden>/</span>
  )

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center gap-2 font-mono text-[0.625rem] uppercase tracking-widest", className)}
      {...props}
    >
      <ol className="flex items-center gap-2 list-none m-0 p-0">
        {items.map((item, index) => {
          const truncated =
            item.label.length > maxLabelLength
              ? `${item.label.slice(0, maxLabelLength)}…`
              : item.label
          const needsTooltip = item.label.length > maxLabelLength

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && sep}

              {isLast(index) ? (
                <span
                  aria-current="page"
                  title={needsTooltip ? item.label : undefined}
                  className="inline-flex items-center gap-1.5 text-foreground font-medium"
                >
                  {item.icon ?? (index === 0 ? <HomeIcon /> : null)}
                  {truncated}
                </span>
              ) : (
                <a
                  href={item.href ?? "#"}
                  title={needsTooltip ? item.label : undefined}
                  className="inline-flex items-center gap-1.5 text-muted-foreground no-underline transition-colors duration-200 hover:text-foreground"
                >
                  {item.icon ?? (index === 0 ? <HomeIcon /> : null)}
                  {truncated}
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
