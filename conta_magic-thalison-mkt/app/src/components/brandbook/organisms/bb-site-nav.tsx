"use client"

import { cn } from "@/lib/utils"
import { useState, type HTMLAttributes, type ReactNode } from "react"
import { BbNavDropdown } from "../molecules/bb-nav-dropdown"

export interface BbSiteNavProps extends HTMLAttributes<HTMLElement> {
  logo: ReactNode
  groups: { label: string; links: { href: string; label: string }[] }[]
}

export function BbSiteNav({ logo, groups, className, style, ...props }: BbSiteNavProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav
      className={cn(
        "sticky top-0 z-50 min-h-14 border-b border-bb-border bg-bb-dark px-4 md:px-8 flex items-center gap-4 md:gap-8",
        className
      )}
      style={style}
      {...props}
    >
      <div className="shrink-0">{logo}</div>

      <button
        type="button"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        className="ml-auto inline-flex md:hidden items-center justify-center p-1 text-bb-cream text-xl leading-none"
      >
        {mobileOpen ? "\u2715" : "\u2630"}
      </button>

      <div className="hidden md:flex flex-1 gap-4 items-center">
        {groups.map((group) => (
          <BbNavDropdown
            key={group.label}
            trigger={
              <span
                className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-bb-dim cursor-pointer"
              >
                {group.label}
              </span>
            }
          >
            {group.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-1.5 font-mono text-[0.6rem] text-bb-dim no-underline hover:text-bb-cream transition-colors"
              >
                {link.label}
              </a>
            ))}
          </BbNavDropdown>
        ))}
      </div>

      {mobileOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 z-50 border-b border-bb-border bg-bb-dark px-4 py-4 flex flex-col"
        >
          {groups.map((group) => (
            <div key={group.label} className="mb-3">
              <span className="font-mono text-[0.55rem] text-bb-dim uppercase tracking-[0.1em]">
                {group.label}
              </span>
              {group.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-1.5 font-mono text-[0.6rem] text-bb-dim no-underline hover:text-bb-cream transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}
