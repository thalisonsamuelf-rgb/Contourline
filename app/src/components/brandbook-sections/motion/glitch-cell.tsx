"use client"

import { motion } from "framer-motion"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"

/* ═══════════════════════════════════════════════════════════════════════════
   Glitch
   Starter wordmark with a glitch effect -- clipPath-driven horizontal slices,
   red and cyan color offset copies behind main text
   ═══════════════════════════════════════════════════════════════════════════ */

const textStyle: React.CSSProperties = {
  fontFamily: "var(--font-bb-display)",
  fontSize: "3.5rem",
  fontWeight: 800,
  letterSpacing: "-0.02em",
  position: "absolute",
  whiteSpace: "nowrap",
}

export function GlitchCell() {
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
      {/* Noise overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0] }}
        transition={{ delay: 0.4, duration: 0.96, ease: "linear" }}
        style={{
          position: "absolute",
          inset: -20,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(221, 209, 187,0.03) 2px, rgba(221, 209, 187,0.03) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* Scanline */}
      <motion.div
        initial={{ top: "-2px", opacity: 0 }}
        animate={{
          top: ["-2px", "100%", "-2px", "100%", "-2px", "100%"],
          opacity: [0, 0.9, 0.9, 0.9, 0.9, 0],
        }}
        transition={{ delay: 0.4, duration: 1.8, ease: "linear" }}
        style={{
          position: "absolute",
          left: -20,
          right: -20,
          height: 2,
          background: "var(--bb-accent)",
          pointerEvents: "none",
        }}
      />

      {/* Cyan offset copy */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0, 0.3, 0],
          x: [-6, 4, -3, 2, 0],
        }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "linear",
        }}
        style={{
          ...textStyle,
          color: "cyan",
          mixBlendMode: "screen",
        }}
      >
        {mark}
      </motion.span>

      {/* Red offset copy */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.4, 0, 0.3, 0],
          x: [6, -4, 3, -2, 0],
        }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "linear",
        }}
        style={{
          ...textStyle,
          color: "red",
          mixBlendMode: "screen",
        }}
      >
        {mark}
      </motion.span>

      {/* Main text with glitch entrance */}
      <motion.span
        initial={{ opacity: 0, x: -10, skewX: -8 }}
        animate={{
          opacity: [0, 1, 1, 1, 1],
          x: [
            -10, 0, -4, 3, -2, 0, 0,
          ],
          skewX: [-8, 0, -3, 2, 0, 0],
          filter: [
            "brightness(1)",
            "brightness(1.3) hue-rotate(90deg)",
            "brightness(0.8) hue-rotate(-60deg)",
            "brightness(1.5) hue-rotate(120deg)",
            "brightness(1.4) contrast(1.2)",
            "brightness(1) contrast(1)",
          ],
        }}
        transition={{
          delay: 0.4,
          duration: 1.4,
          ease: "linear",
          times: [0, 0.07, 0.3, 0.5, 0.7, 1],
        }}
        style={{
          ...textStyle,
          color: "var(--bb-accent)",
          position: "relative",
          zIndex: 2,
        }}
      >
        {mark}
      </motion.span>
    </div>
  )
}
