"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface BbAnimatedNumberProps {
  value: number
  duration?: number
  format?: (n: number) => string
  prefix?: string
  suffix?: string
  className?: string
  triggerOnView?: boolean
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function BbAnimatedNumber({
  value,
  duration = 1200,
  format,
  prefix,
  suffix,
  className,
  triggerOnView = false,
}: BbAnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(triggerOnView ? 0 : value)
  const [hasTriggered, setHasTriggered] = useState(!triggerOnView)
  const previousValueRef = useRef(triggerOnView ? 0 : value)
  const rafRef = useRef<number>(0)
  const elementRef = useRef<HTMLSpanElement>(null)

  const animate = useCallback(
    (from: number, to: number) => {
      const startTime = performance.now()
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(progress)
        const current = from + (to - from) * easedProgress
        setDisplayValue(current)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          setDisplayValue(to)
          previousValueRef.current = to
        }
      }
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(step)
    },
    [duration],
  )

  useEffect(() => {
    if (!triggerOnView || !elementRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true)
          animate(0, value)
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(elementRef.current)
    return () => observer.disconnect()
  }, [triggerOnView, value, hasTriggered, animate])

  useEffect(() => {
    if (!hasTriggered) return
    if (previousValueRef.current !== value) {
      animate(previousValueRef.current, value)
    }
    return () => cancelAnimationFrame(rafRef.current)
  }, [value, hasTriggered, animate])

  const formatted = format ? format(displayValue) : String(Math.round(displayValue))

  return (
    <span
      ref={elementRef}
      className={cn("tabular-nums font-bb-display", className)}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
