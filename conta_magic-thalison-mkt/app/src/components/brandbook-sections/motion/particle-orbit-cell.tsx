"use client"

import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   Particle Orbit
   Core "X" element in center, 4 small particles orbit around it
   ═══════════════════════════════════════════════════════════════════════════ */

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 }

function VerticalParticle({
  popDelay,
  floatDelay,
  style,
}: {
  popDelay: number
  floatDelay: number
  style: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ rotate: 45, scale: 0 }}
      animate={{ rotate: 45, scale: 1, marginTop: [0, -6, 0] }}
      transition={{
        scale: { delay: popDelay, duration: 0.5, ...SPRING },
        marginTop: {
          delay: floatDelay,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        background: "var(--bb-accent)",
        borderRadius: 2,
        ...style,
      }}
    />
  )
}

function HorizontalParticle({
  popDelay,
  floatDelay,
  style,
}: {
  popDelay: number
  floatDelay: number
  style: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ rotate: 45, scale: 0 }}
      animate={{ rotate: 45, scale: 1, marginLeft: [0, -6, 0] }}
      transition={{
        scale: { delay: popDelay, duration: 0.5, ...SPRING },
        marginLeft: {
          delay: floatDelay,
          duration: 2,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        },
      }}
      style={{
        position: "absolute",
        width: 14,
        height: 14,
        background: "var(--bb-accent)",
        borderRadius: 2,
        ...style,
      }}
    />
  )
}

export function ParticleOrbitCell() {
  return (
    <div
      style={{
        position: "relative",
        width: 180,
        height: 180,
      }}
    >
      {/* Top particle (vertical float) */}
      <VerticalParticle
        popDelay={0.7}
        floatDelay={1.2}
        style={{ top: 0, left: "calc(50% - 7px)" }}
      />

      {/* Right particle (horizontal float) */}
      <HorizontalParticle
        popDelay={0.85}
        floatDelay={1.4}
        style={{ right: 0, top: "calc(50% - 7px)" }}
      />

      {/* Bottom particle (vertical float) */}
      <VerticalParticle
        popDelay={1.0}
        floatDelay={1.6}
        style={{ bottom: 0, left: "calc(50% - 7px)" }}
      />

      {/* Left particle (horizontal float) */}
      <HorizontalParticle
        popDelay={1.15}
        floatDelay={1.8}
        style={{ left: 0, top: "calc(50% - 7px)" }}
      />

      {/* Core X element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ...SPRING }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="70" height="70" viewBox="0 0 301 320" fill="none">
          <path
            d="M301 9.4H263.4L150.5 122.35L37.6 9.4H0V47.05L112.9 160L0 272.95V310.6H37.6L150.5 197.65L263.4 310.6H301V272.95L188.1 160L301 47.05V9.4Z"
            fill="var(--bb-accent)"
          />
        </svg>
      </motion.div>
    </div>
  )
}
