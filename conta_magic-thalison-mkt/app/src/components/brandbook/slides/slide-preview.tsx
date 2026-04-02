"use client"

import type { ReactNode } from "react"
import { useEffect, useRef, useState } from "react"

export function SlidePreview({
  children,
  onClick,
}: {
  children: ReactNode
  onClick?: () => void
  version?: 1 | 2
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.2)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect
      setScale(Math.min(width / 1920, height / 1080))
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative cursor-pointer overflow-hidden border border-bb-border transition-colors hover:border-bb-accent/40"
      style={{ aspectRatio: "16/9", background: "var(--bb-dark)" }}
      onClick={onClick}
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: 1920,
          height: 1080,
          marginLeft: -960,
          marginTop: -540,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  )
}
