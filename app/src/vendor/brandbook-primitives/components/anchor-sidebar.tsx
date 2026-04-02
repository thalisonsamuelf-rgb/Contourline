"use client"

import type { HTMLAttributes } from "react"
import { cn } from "../lib/cn"

export interface AnchorSidebarProps extends HTMLAttributes<HTMLElement> {
  groups: {
    title: string
    items: { label: string; href: string; active?: boolean }[]
  }[]
}

export function AnchorSidebar({
  groups,
  className,
  style,
  ...props
}: AnchorSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-14 h-[calc(100vh-56px)] w-60 overflow-y-auto border-r border-[var(--bb-border)] py-6",
        className
      )}
      style={style}
      {...props}
    >
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mt-4 px-6 py-2 font-bb-mono text-[0.55rem] uppercase tracking-[0.1em] text-[var(--bb-dim)]">
            {group.title}
          </div>
          {group.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "block border-l-2 px-6 py-1.5 font-bb-mono text-[0.65rem] no-underline transition-colors",
                item.active
                  ? "border-[var(--bb-accent)] text-[var(--bb-accent)]"
                  : "border-transparent text-[var(--bb-dim)]"
              )}
            >
              {item.label}
            </a>
          ))}
        </div>
      ))}
    </aside>
  )
}
