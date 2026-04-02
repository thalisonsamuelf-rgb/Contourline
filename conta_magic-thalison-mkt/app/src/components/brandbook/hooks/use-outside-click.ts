"use client"

import { useEffect, type RefObject } from "react"

/**
 * Hook that calls a handler when a click occurs outside the referenced element.
 * Replaces shared.js dropdown outside-click detection.
 * SSR-safe: no-op on server (useEffect doesn't run).
 */
export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  ref: RefObject<T | null>,
  handler: () => void,
  enabled = true
): void {
  useEffect(() => {
    if (!enabled) return

    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler()
      }
    }

    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [ref, handler, enabled])
}
