"use client"

import { motion } from "framer-motion"

/* ═══════════════════════════════════════════════════════════════════════════
   Stagger Text
   Letters A, I, O, X enter from bottom with 3D perspective, each rotates
   slightly on X axis. Underline draws left to right after letters complete.
   ═══════════════════════════════════════════════════════════════════════════ */

const SPRING = { type: "spring" as const, stiffness: 300, damping: 20 }

const letters = [
  { char: "A", delay: 0.3, width: 62, viewBox: "0 0 377 320", path: "M0 310.6H376.464L188.219 9.4L0 310.6ZM96.0472 257.35L188.219 109.875L280.392 257.35H96.0472Z" },
  { char: "I", delay: 0.45, width: 10, viewBox: "0 0 54 320", path: "M53.249 9.4H0V310.575H53.249V9.4Z" },
  { char: "O", delay: 0.6, width: 52, viewBox: "0 0 320 320", path: "M160 0C71.627 0 0 71.625 0 160C0 248.375 71.627 320 160 320C248.372 320 320 248.375 320 160C320 71.625 248.372 0 160 0ZM160 266.75C101.126 266.75 53.253 218.85 53.253 160C53.253 101.15 101.151 53.25 160 53.25C218.848 53.25 266.746 101.15 266.746 160C266.746 218.85 218.848 266.75 160 266.75Z" },
  { char: "X", delay: 0.75, width: 50, viewBox: "0 0 301 320", path: "M301 9.4H263.4L150.5 122.35L37.6 9.4H0V47.05L112.9 160L0 272.95V310.6H37.6L150.5 197.65L263.4 310.6H301V272.95L188.1 160L301 47.05V9.4Z" },
]

export function StaggerTextCell() {
  return (
    <div
      style={{
        perspective: 600,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 8,
        position: "relative",
        paddingBottom: 16,
      }}
    >
      {letters.map((l) => (
        <motion.div
          key={l.char}
          initial={{ opacity: 0, y: 30, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: l.delay, duration: 0.6, ...SPRING }}
          style={{ transformOrigin: "bottom center" }}
        >
          <svg width={l.width} height={52} viewBox={l.viewBox} fill="none">
            <path d={l.path} fill="var(--bb-cream)" />
          </svg>
        </motion.div>
      ))}

      {/* Underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          delay: 1.1,
          duration: 0.5,
          ease: [0, 0, 0.2, 1],
        }}
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 2,
          background: "var(--bb-accent)",
          transformOrigin: "left center",
        }}
      />
    </div>
  )
}
