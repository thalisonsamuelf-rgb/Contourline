"use client"

import { motion } from "framer-motion"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"

/* ═══════════════════════════════════════════════════════════════════════════
   Speed Lines
   Starter wordmark fades in at center, horizontal speed lines animate L->R staggered
   ═══════════════════════════════════════════════════════════════════════════ */

const lines = [
  { y: "18%", width: 100, delay: 0.8 },
  { y: "30%", width: 70, delay: 0.9 },
  { y: "45%", width: 110, delay: 1.0 },
  { y: "58%", width: 60, delay: 1.1 },
  { y: "72%", width: 95, delay: 1.2 },
  { y: "38%", width: 50, delay: 1.3 },
  { y: "62%", width: 80, delay: 1.4 },
]

export function SpeedLinesCell() {
  const mark = STARTER_BRAND_ASSETS.brandShortName.toUpperCase()

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Speed lines */}
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.6, scaleX: 1 }}
          transition={{
            delay: line.delay,
            duration: 0.5,
            ease: [0, 0, 0.2, 1],
          }}
          style={{
            position: "absolute",
            left: 10,
            top: line.y,
            width: line.width,
            height: i % 2 === 0 ? 2 : 1.5,
            background: "var(--bb-accent)",
            transformOrigin: "left center",
          }}
        />
      ))}

      {/* Starter wordmark */}
      <motion.span
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8, ease: [0, 0, 0.2, 1] }}
        style={{
          fontFamily: "var(--font-bb-display)",
          fontSize: "3rem",
          fontWeight: 800,
          color: "var(--bb-cream)",
          letterSpacing: "-0.02em",
          zIndex: 1,
        }}
      >
        {mark}
      </motion.span>
    </div>
  )
}
