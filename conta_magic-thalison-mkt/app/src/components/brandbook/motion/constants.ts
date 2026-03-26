/* ═══════════════════════════════════════════════════════════════════════════
   BRANDBOOK MOTION SYSTEM — CONSTANTS
   Easing curves, durations, and type definitions.
   Single source of truth for all animation timing in the brandbook.
   ═══════════════════════════════════════════════════════════════════════════ */

/** Cubic-bezier tuple: [x1, y1, x2, y2] */
export type Ease = [number, number, number, number]

/* ── Easing Curves ── */

/** Smooth deceleration — general purpose entrance/exit */
export const EASE_SMOOTH: Ease = [0.25, 0.1, 0.25, 1]

/** Spring overshoot — playful scale/bounce */
export const EASE_SPRING: Ease = [0.34, 1.56, 0.64, 1]

/** Expo deceleration — cinematic reveals, high-impact entrances */
export const EASE_EXPO: Ease = [0.16, 1, 0.3, 1]

/** Decelerate only — elements settling into position */
export const EASE_DECEL: Ease = [0, 0, 0.2, 1]

/** Accelerate only — elements leaving the viewport */
export const EASE_ACCEL: Ease = [0.4, 0, 1, 1]

/* ── Duration Tokens (seconds) ── */

/** Fast — micro-interactions, toggles (0.2s) */
export const DUR_FAST = 0.2

/** Medium — standard transitions (0.4s) */
export const DUR_MEDIUM = 0.4

/** Slow — dramatic reveals, hero entrances (0.7s) */
export const DUR_SLOW = 0.7
