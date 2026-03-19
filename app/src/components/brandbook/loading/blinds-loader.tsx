"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   AIOX Blinds Loader
   Lime-green overlay with staggered AIOX logo reveal, progress bar,
   and vertical-blinds exit animation.
   ═══════════════════════════════════════════════════════════════════════════ */

const BLIND_COUNT = 8
const LOADING_DURATION = 4 // seconds before blinds start
const BLINDS_DURATION = 0.8 // seconds for blinds to complete
const BLINDS_STAGGER = 0.05 // stagger between each blind column

/** Easing matching the HTML source: cubic-bezier(0.4, 0, 0.2, 1) */
const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1]

/* ── SVG path data for each AIOX letter ── */
const LOGO_PATHS = {
  A: "M0 310.6H376.464L188.219 9.4L0 310.6ZM96.0472 257.35L188.219 109.875L280.392 257.35H96.0472Z",
  I: "M448.537 9.4H395.288V310.575H448.537V9.4Z",
  O: "M627.332 0C538.959 0 467.336 71.625 467.336 160C467.336 248.375 538.959 320 627.332 320C715.704 320 787.327 248.375 787.327 160C787.327 71.625 715.704 0 627.332 0ZM627.332 266.75C568.458 266.75 520.585 218.85 520.585 160C520.585 101.15 568.483 53.25 627.332 53.25C686.18 53.25 734.078 101.15 734.078 160C734.078 218.85 686.18 266.75 627.332 266.75Z",
  X: "M1088.49 9.4H1050.87L937.922 122.35L824.976 9.4H787.327V47.05L900.273 160L787.327 272.95V310.6H824.976L937.922 197.65L1050.87 310.6H1088.49V272.95L975.571 160L1088.49 47.05V9.4Z",
} as const

/** Stagger delays matching HTML source (0.3, 0.5, 0.7, 0.9s) */
const LETTER_DELAYS = { A: 0.3, I: 0.5, O: 0.7, X: 0.9 }

interface BlindsLoaderProps {
  onComplete?: () => void
}

export function BlindsLoader({ onComplete }: BlindsLoaderProps) {
  const [phase, setPhase] = useState<"loading" | "blinds" | "done">("loading")

  const handleBlindsComplete = useCallback(() => {
    setPhase("done")
    onComplete?.()
  }, [onComplete])

  /* After LOADING_DURATION, switch to blinds phase */
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("blinds")
    }, LOADING_DURATION * 1000)
    return () => clearTimeout(timer)
  }, [])

  /* After blinds animation completes, mark done */
  useEffect(() => {
    if (phase !== "blinds") return
    const totalBlindsTime =
      BLINDS_DURATION + BLINDS_STAGGER * (BLIND_COUNT - 1) + 0.1
    const timer = setTimeout(() => {
      handleBlindsComplete()
    }, totalBlindsTime * 1000)
    return () => clearTimeout(timer)
  }, [phase, handleBlindsComplete])

  if (phase === "done") return null

  return (
    <AnimatePresence>
      {phase === "loading" && (
        <motion.div
          key="overlay"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--layer-nav)",
            background: "var(--bb-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "3rem",
          }}
        >
          {/* ── AIOX Logo ── */}
          <div style={{ width: "min(60vw, 380px)" }}>
            <svg
              viewBox="0 0 1089 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}
            >
              {/* A */}
              <motion.g
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: EASE_SMOOTH,
                  delay: LETTER_DELAYS.A,
                }}
              >
                <path d={LOGO_PATHS.A} fill="#050505" />
              </motion.g>

              {/* I */}
              <motion.g
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: EASE_SMOOTH,
                  delay: LETTER_DELAYS.I,
                }}
              >
                <path d={LOGO_PATHS.I} fill="#050505" />
              </motion.g>

              {/* O */}
              <motion.g
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: EASE_SMOOTH,
                  delay: LETTER_DELAYS.O,
                }}
              >
                <path d={LOGO_PATHS.O} fill="#050505" />
              </motion.g>

              {/* X — staggered reveal + continuous 90deg-step rotation */}
              <motion.g
                style={{ originX: "937.9px", originY: "160px" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: EASE_SMOOTH,
                  delay: LETTER_DELAYS.X,
                }}
              >
                <motion.g
                  style={{ originX: "937.9px", originY: "160px" }}
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{
                    duration: 2.4,
                    ease: EASE_SMOOTH,
                    delay: 1.6,
                    repeat: Infinity,
                  }}
                >
                  <path d={LOGO_PATHS.X} fill="#050505" />
                </motion.g>
              </motion.g>
            </svg>
          </div>

          {/* ── Status bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: EASE_SMOOTH,
              delay: 1.8,
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
            {/* Progress track */}
            <div
              style={{
                width: "80px",
                height: "2px",
                background: "rgba(0, 0, 0, 0.15)",
                borderRadius: 0,
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 3,
                  ease: EASE_SMOOTH,
                  delay: 1,
                }}
                style={{
                  height: "100%",
                  background: "var(--bb-dark)",
                  borderRadius: 0,
                }}
              />
            </div>

            {/* Status text */}
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--bb-dark)",
                opacity: 0.5,
              }}
            >
              Loading
            </span>
          </motion.div>
        </motion.div>
      )}

      {phase === "blinds" && (
        <div
          key="blinds"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--layer-nav)",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: BLIND_COUNT }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{
                duration: BLINDS_DURATION,
                ease: EASE_SMOOTH,
                delay: i * BLINDS_STAGGER,
              }}
              style={{
                position: "absolute",
                top: 0,
                left: `${(i / BLIND_COUNT) * 100}%`,
                width: `${100 / BLIND_COUNT}%`,
                height: "100%",
                background: "var(--bb-accent)",
                transformOrigin: "top center",
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}
