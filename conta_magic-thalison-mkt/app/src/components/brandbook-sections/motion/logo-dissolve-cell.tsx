"use client"

import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   Logo Dissolve
   AIOX text starts solid, then "dissolves" -- individual letter opacity
   fluctuates randomly using staggered animations
   ═══════════════════════════════════════════════════════════════════════════ */

const letters = [
  { char: "A", flickerDelay: 1.2, flickerDuration: 0.3 },
  { char: "I", flickerDelay: 1.0, flickerDuration: 0.25 },
  { char: "O", flickerDelay: 1.4, flickerDuration: 0.35 },
  { char: "X", flickerDelay: 0.8, flickerDuration: 0.2 },
]

export function LogoDissolveCell() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
      }}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 1 }}
          animate={{
            opacity: [1, 1, 0.3, 0.8, 0.1, 0.6, 0.05, 0.4, 0.02, 0],
          }}
          transition={{
            delay: l.flickerDelay,
            duration: 2.5,
            ease: "linear",
            times: [0, 0.3, 0.35, 0.45, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          }}
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "3.5rem",
            fontWeight: 800,
            color: "var(--bb-cream)",
            display: "inline-block",
            letterSpacing: "-0.02em",
          }}
        >
          {l.char}
        </motion.span>
      ))}
    </div>
  )
}
