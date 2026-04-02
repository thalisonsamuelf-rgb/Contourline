"use client"

import type { ReactNode } from "react"
import { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import { EASE_SMOOTH, FONT_MONO } from "@/components/brandbook/slides/shared"

export function SlideFullscreen({
  slides,
  initialIndex,
  onClose,
  versions,
}: {
  slides: ReactNode[]
  initialIndex: number
  onClose: () => void
  versions?: (1 | 2)[]
}) {
  const [index, setIndex] = useState(initialIndex)
  const [direction, setDirection] = useState(0)
  const [scale, setScale] = useState(1)

  const currentVersion = versions?.[index] ?? 1

  useEffect(() => {
    const calc = () => setScale(Math.min(window.innerWidth / 1920, window.innerHeight / 1080))
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setIndex((current) => Math.max(0, current - 1))
  }, [])

  const next = useCallback(() => {
    setDirection(1)
    setIndex((current) => Math.min(slides.length - 1, current + 1))
  }, [slides.length])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft") prev()
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault()
        next()
      }
    }

    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [next, onClose, prev])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 400 : -400, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -400 : 400, opacity: 0, scale: 0.92 }),
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "var(--bb-dark)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentVersion === 2 ? (
        <div
          className="relative overflow-hidden"
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "calc(100vh * 16 / 9)",
            maxHeight: "calc(100vw * 9 / 16)",
            margin: "auto",
          }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE_SMOOTH }}
              className="h-full w-full"
            >
              {slides[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <div
          className="absolute left-1/2 top-1/2 overflow-hidden"
          style={{
            width: 1920,
            height: 1080,
            marginLeft: -960,
            marginTop: -540,
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: EASE_SMOOTH }}
            >
              {slides[index]}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      <motion.button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 text-bb-dim transition-colors hover:text-bb-cream"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <X className="h-6 w-6" />
      </motion.button>

      <motion.div
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-4 border border-bb-border px-6 py-3 backdrop-blur-sm"
        style={{ background: "var(--bb-surface)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, ease: EASE_SMOOTH }}
      >
        <button
          onClick={prev}
          disabled={index === 0}
          className="text-bb-dim transition-opacity hover:text-bb-cream disabled:opacity-20"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="min-w-[60px] text-center font-bb-mono text-[11px] tracking-widest text-bb-dim" style={FONT_MONO}>
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
        <button
          onClick={next}
          disabled={index === slides.length - 1}
          className="text-bb-dim transition-opacity hover:text-bb-cream disabled:opacity-20"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </motion.div>

      <div className="absolute left-0 right-0 top-0 z-10 h-[2px] bg-bb-border/30">
        <motion.div
          className="h-full bg-bb-accent"
          initial={{ width: "0%" }}
          animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.4, ease: EASE_SMOOTH }}
        />
      </div>
    </motion.div>
  )
}
