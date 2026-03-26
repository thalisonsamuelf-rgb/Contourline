"use client"

import { useEffect, useState } from "react"

export interface UseScrollSpyOptions {
  /** CSS selectors or element IDs to observe */
  sectionIds: string[]
  /** Offset from top in pixels (e.g. navbar height) */
  offset?: number
  /** Root margin for the observer */
  rootMargin?: string
}

/**
 * Hook that tracks which section is currently in the viewport.
 * Returns the ID of the active section for sidebar/nav highlighting.
 * SSR-safe: returns empty string on server.
 */
export function useScrollSpy(options: UseScrollSpyOptions): string {
  const { sectionIds, offset = 80, rootMargin } = options
  const [activeId, setActiveId] = useState("")

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const margin = rootMargin ?? `-${offset}px 0px -50% 0px`

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: margin, threshold: 0 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, offset, rootMargin])

  return activeId
}
