"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BlindsLoader } from "@/components/brandbook/loading/blinds-loader"

/* ═══════════════════════════════════════════════════════════════════════════
   Loading Page
   Full-screen BlindsLoader overlay, then reveals headline + status text
   after the blinds animation completes.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Easing matching the HTML source: cubic-bezier(0.4, 0, 0.2, 1) */
const EASE_SMOOTH: [number, number, number, number] = [0.4, 0, 0.2, 1]

export function LoadingPage() {
  const [loaderDone, setLoaderDone] = useState(false)

  return (
    <>
      {/* ── Loader overlay ── */}
      <BlindsLoader onComplete={() => setLoaderDone(true)} />

      {/* ── Page content (revealed after blinds complete) ── */}
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {loaderDone && (
          <>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_SMOOTH }}
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "clamp(3rem, 7vw, 6rem)",
                color: "var(--bb-cream)",
                textTransform: "uppercase",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                textAlign: "center",
              }}
            >
              The manual<br />work is dead.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_SMOOTH, delay: 0.4 }}
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.75rem",
                color: "var(--bb-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              [sys_status: online] &mdash; starter framework runtime
            </motion.p>
          </>
        )}
      </main>
    </>
  )
}
