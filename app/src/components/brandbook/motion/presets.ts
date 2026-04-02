/* ═══════════════════════════════════════════════════════════════════════════
   BRANDBOOK MOTION SYSTEM — PRESETS
   Reusable animation preset factories for Framer Motion.
   Each factory returns { initial, animate, transition } for spread usage.
   ═══════════════════════════════════════════════════════════════════════════ */

import type { Transition } from "framer-motion"

import {
  DUR_MEDIUM,
  DUR_SLOW,
  EASE_EXPO,
  EASE_SMOOTH,
  EASE_SPRING,
} from "./constants"

/* ── Basic Presets (migrated from shared.tsx) ── */

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: EASE_SMOOTH } as Transition,
})

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: DUR_MEDIUM, delay, ease: EASE_SMOOTH } as Transition,
})

export const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: EASE_SMOOTH } as Transition,
})

export const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, delay, ease: EASE_SMOOTH } as Transition,
})

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.88 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, delay, ease: EASE_SPRING } as Transition,
})

export const growWidth = (delay = 0) => ({
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  transition: { duration: DUR_SLOW, delay, ease: EASE_SMOOTH } as Transition,
})

export const growHeight = (delay = 0, duration = DUR_SLOW) => ({
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  transition: { duration, delay, ease: EASE_SMOOTH } as Transition,
})

/* ── Stagger Helpers (migrated from shared.tsx) ── */

/** V1 stagger: base + i * 0.08 */
export const stagger = (i: number, base = 0.1) => base + i * 0.08

/** V2 stagger: base + i * 0.08 (higher default base for container-query slides) */
export const staggerV2 = (i: number, base = 0.3) => base + i * 0.08

/* ═══════════════════════════════════════════════════════════════════════════
   CINEMATIC PRESETS (new — approved by @design-chief)
   Available for future slide usage. NOT applied to existing slides.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Clip-path reveal from bottom to top */
export const clipRevealUp = (delay = 0) => ({
  initial: { clipPath: "inset(100% 0 0 0)", opacity: 0 },
  animate: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  transition: { duration: 0.8, delay, ease: EASE_EXPO } as Transition,
})

/** Clip-path reveal from right to left */
export const clipRevealLeft = (delay = 0) => ({
  initial: { clipPath: "inset(0 0 0 100%)", opacity: 0 },
  animate: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  transition: { duration: 0.8, delay, ease: EASE_EXPO } as Transition,
})

/** Clip-path reveal from top to bottom */
export const clipRevealDown = (delay = 0) => ({
  initial: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  animate: { clipPath: "inset(0 0 0 0)", opacity: 1 },
  transition: { duration: 0.8, delay, ease: EASE_EXPO } as Transition,
})

/** Parallax upward drift — element rises with subtle parallax offset */
export const parallaxUp = (delay = 0) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: EASE_EXPO } as Transition,
})

/** Parallax leftward drift — element slides in from the right */
export const parallaxLeft = (delay = 0) => ({
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 1, delay, ease: EASE_EXPO } as Transition,
})

/** Cinematic zoom — scale from slightly larger with slow decel */
export const cinematicZoom = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.15 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 1.2, delay, ease: EASE_EXPO } as Transition,
})

/** Card fan — staggered scale+rotate for card layouts */
export const cardFan = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85, rotate: -4 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  transition: { duration: 0.7, delay, ease: EASE_SPRING } as Transition,
})

/** Number reveal — counter-style entrance for big numbers */
export const numberReveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40, scale: 0.7 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.6, delay, ease: EASE_SPRING } as Transition,
})

