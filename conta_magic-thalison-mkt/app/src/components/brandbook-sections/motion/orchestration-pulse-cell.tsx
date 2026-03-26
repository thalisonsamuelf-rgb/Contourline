"use client"

import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   Orchestration Pulse
   Seed dot scales up, then A-I-O-X letters appear staggered, background glow
   ═══════════════════════════════════════════════════════════════════════════ */

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 }

const letters = [
  { label: "A", delay: 0.6, x: -60 },
  { label: "I", delay: 0.75, x: -20 },
  { label: "O", delay: 0.9, x: 20 },
  { label: "X", delay: 1.05, x: 60 },
]

export function OrchestrationPulseCell() {
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
      {/* Background glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: [0, 0.25, 0], scale: [0.8, 1.15, 0.8] }}
        transition={{
          duration: 2.5,
          delay: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: 280,
          height: 120,
          borderRadius: "50%",
          background: "var(--bb-accent)",
          filter: "blur(60px)",
        }}
      />

      {/* Center seed dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4, ...SPRING }}
        style={{
          position: "absolute",
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: "var(--bb-accent)",
        }}
      />

      {/* Letters A-I-O-X */}
      {letters.map((l) => (
        <motion.span
          key={l.label}
          initial={{ opacity: 0, y: 25, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: l.delay, duration: 0.6, ...SPRING }}
          style={{
            position: "absolute",
            fontFamily: "var(--font-bb-display)",
            fontSize: "2.5rem",
            fontWeight: 800,
            color: "var(--bb-accent)",
            transform: `translateX(${l.x}px)`,
            left: `calc(50% + ${l.x}px)`,
            marginLeft: "-0.7rem",
          }}
        >
          {l.label}
        </motion.span>
      ))}

      {/* Trail lines */}
      {[1.4, 1.5, 1.6].map((delay, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.5, scaleX: 1 }}
          transition={{ delay, duration: 0.5, ease: [0, 0, 0.2, 1] }}
          style={{
            position: "absolute",
            left: 20,
            top: `${35 + i * 15}%`,
            width: 80,
            height: 1.5,
            background: "var(--bb-accent)",
            transformOrigin: "left",
          }}
        />
      ))}
    </div>
  )
}
