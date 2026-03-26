"use client"

import { motion } from "framer-motion"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"

/* ═══════════════════════════════════════════════════════════════════════════
   Brand Reveal
   Black rectangle slides open from center (two halves move apart),
   reveals starter wordmark behind with scale-up animation,
   subtle glow appears around text
   ═══════════════════════════════════════════════════════════════════════════ */

export function BrandRevealCell() {
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
        overflow: "hidden",
      }}
    >
      {/* Glow behind text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          width: 300,
          height: 100,
          borderRadius: "50%",
          background: "var(--bb-accent)",
          filter: "blur(50px)",
        }}
      />

      {/* Starter wordmark revealed behind blinds */}
      <motion.span
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          delay: 0.6,
          duration: 1,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        style={{
          fontFamily: "var(--font-bb-display)",
          fontSize: "3.5rem",
          fontWeight: 800,
          color: "var(--bb-cream)",
          letterSpacing: "-0.02em",
          zIndex: 1,
        }}
      >
        {mark}
      </motion.span>

      {/* Left blind */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0, 0, 0.2, 1],
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: "50%",
          background: "var(--bb-dark)",
          zIndex: 2,
        }}
      />

      {/* Right blind */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: [0, 0, 0.2, 1],
        }}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: "50%",
          background: "var(--bb-dark)",
          zIndex: 2,
        }}
      />

      {/* Decorative lines */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 1.6, duration: 0.8, ease: [0, 0, 0.2, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          right: "calc(50% + 120px)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--bb-accent), transparent)",
          zIndex: 1,
        }}
      />
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: 80 }}
        transition={{ delay: 1.6, duration: 0.8, ease: [0, 0, 0.2, 1] }}
        style={{
          position: "absolute",
          top: "50%",
          left: "calc(50% + 120px)",
          height: 1,
          background:
            "linear-gradient(90deg, transparent, var(--bb-accent), transparent)",
          zIndex: 1,
        }}
      />

      {/* Tagline */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: [0, 0, 0.2, 1] }}
        style={{
          position: "absolute",
          bottom: 35,
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "var(--bb-dim)",
          zIndex: 1,
        }}
      >
        a ia e a seta. o x e seu.
      </motion.span>
    </div>
  )
}
