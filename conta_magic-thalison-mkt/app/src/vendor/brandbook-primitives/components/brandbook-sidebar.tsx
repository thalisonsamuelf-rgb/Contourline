"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "../lib/cn"

export interface BrandbookSidebarNavItem {
  id: string
  label: string
  num?: string
}

export interface BrandbookSidebarNavGroup {
  label: string
  items: BrandbookSidebarNavItem[]
}

export interface BrandbookSidebarProps {
  groups: BrandbookSidebarNavGroup[]
  className?: string
}

function MenuIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function BrandbookSidebar({
  groups,
  className,
}: BrandbookSidebarProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const sections = groups
      .flatMap((group) => group.items)
      .map((item) => document.getElementById(item.id))
    const valid = sections.filter(Boolean) as HTMLElement[]

    if (valid.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    )

    for (const element of valid) observer.observe(element)
    return () => observer.disconnect()
  }, [groups])

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const navContent = (
    <div className="py-6 font-bb-mono text-[0.6rem] font-medium uppercase tracking-[0.06em]">
      {groups.map((group) => (
        <div key={group.label} className="mt-5">
          <div className="px-6 pb-2 text-[0.55rem] tracking-[0.1em] text-[var(--bb-dim)]">
            {group.label}
          </div>
          {group.items.map((item) => {
            const isActive = activeId === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "relative flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left font-bb-sans text-[0.8rem] normal-case tracking-normal transition-all duration-200",
                  isActive
                    ? "bg-[var(--bb-accent)] font-semibold text-[var(--bb-dark)]"
                    : "bg-transparent font-normal text-[var(--bb-dim)]"
                )}
              >
                {item.num && (
                  <span
                    className={cn(
                      "min-w-6 font-bb-mono text-[0.7rem]",
                      isActive ? "opacity-100 text-[var(--bb-dark)]" : "opacity-60"
                    )}
                  >
                    {item.num}
                  </span>
                )}
                {item.label}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="fixed left-4 top-12 z-50 flex h-11 w-11 items-center justify-center border border-[var(--bb-border)] bg-[var(--bb-surface)] text-[var(--bb-cream)] md:hidden"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed bottom-0 left-0 top-10 z-40 overflow-y-auto border-r border-[var(--bb-border)] bg-[var(--bb-surface)] md:translate-x-0",
          isOpen ? "block" : "hidden md:block",
          className
        )}
        style={{ width: 280 }}
      >
        {navContent}
      </aside>
    </>
  )
}
