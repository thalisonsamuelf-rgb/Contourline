"use client"

import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   Morphing Square
   A square morphs through shapes: square -> rounded -> circle -> back
   Uses borderRadius animation: 0 -> 12px -> 50% -> 0
   ═══════════════════════════════════════════════════════════════════════════ */

export function MorphingSquareCell() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Morphing shape */}
      <motion.div
        initial={{
          width: 80,
          height: 80,
          borderRadius: 0,
          rotate: 0,
        }}
        animate={{
          borderRadius: ["0%", "15%", "50%", "15%", "0%"],
          rotate: [0, 45, 90, 135, 180],
          scale: [1, 1.1, 1.2, 1.1, 1],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
        style={{
          width: 80,
          height: 80,
          background: "var(--bb-accent)",
        }}
      />

      {/* Subtle glow echo */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.15, 0],
          borderRadius: ["0%", "15%", "50%", "15%", "0%"],
          scale: [1.2, 1.4, 1.6, 1.4, 1.2],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.5,
        }}
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          background: "var(--bb-accent)",
          filter: "blur(20px)",
        }}
      />
    </div>
  )
}
