"use client"

import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"

export interface BbPaginationProps extends HTMLAttributes<HTMLElement> {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
  siblingCount?: number
  showFirstLast?: boolean
}

function getVisiblePages(
  current: number,
  total: number,
  siblings: number,
  showFirstLast: boolean
): (number | "ellipsis")[] {
  if (total <= 1) return [1]

  const pages: (number | "ellipsis")[] = []
  const left = Math.max(2, current - siblings)
  const right = Math.min(total - 1, current + siblings)

  if (showFirstLast) pages.push(1)
  if (left > 2) pages.push("ellipsis")

  for (let i = left; i <= right; i++) {
    if (!pages.includes(i)) pages.push(i)
  }

  if (right < total - 1) pages.push("ellipsis")
  if (showFirstLast && total > 1 && !pages.includes(total)) pages.push(total)

  return pages
}

const cell =
  "inline-flex items-center justify-center size-9 shrink-0 font-mono text-xs font-medium tracking-wide border border-transparent text-muted-foreground transition-colors duration-150 cursor-pointer hover:border-border-medium"

const cellActive =
  "inline-flex items-center justify-center size-9 shrink-0 font-mono text-xs font-bold tracking-wide bg-primary text-primary-foreground border border-primary cursor-default"

const cellDisabled =
  "inline-flex items-center justify-center size-9 shrink-0 font-mono text-xs font-medium tracking-wide border border-transparent text-muted-foreground opacity-25 cursor-not-allowed"

export function BbPagination({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className,
  ...props
}: BbPaginationProps) {
  if (totalPages <= 1) return null

  const pages = getVisiblePages(page, totalPages, siblingCount, showFirstLast)

  return (
    <nav
      aria-label="Pagination"
      className={cn("inline-flex items-center gap-0.5", className)}
      {...props}
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        aria-label="Previous page"
        className={page <= 1 ? cellDisabled : cell}
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`e-${i}`} className={cn(cell, "cursor-default hover:border-transparent")} aria-hidden>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={page === p ? "page" : undefined}
            aria-label={`Page ${p}`}
            className={page === p ? cellActive : cell}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        aria-label="Next page"
        className={page >= totalPages ? cellDisabled : cell}
      >
        ›
      </button>
    </nav>
  )
}
