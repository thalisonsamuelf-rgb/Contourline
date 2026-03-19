"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

import {
  STARTER_BRAND_ASSETS,
  STARTER_FONT_FAMILIES,
} from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import { fadeIn, fadeUp } from "@/components/brandbook/motion"

/* ═══════════════════════════════════════════════════════════════════════════
   BACKWARDS COMPATIBILITY — Re-exports from motion/
   These re-exports allow existing consumers that import from shared.tsx
   to continue working. They will be removed in a future story.
   ═══════════════════════════════════════════════════════════════════════════ */
export {
  fadeUp,
  fadeIn,
  slideRight,
  slideLeft,
  scaleIn,
  growWidth,
  growHeight,
  stagger,
  staggerV2,
  EASE_SMOOTH,
  EASE_SPRING,
} from "@/components/brandbook/motion"

export type { Ease } from "@/components/brandbook/motion"

/* ═══════════════════════════════════════════════════════════════════════════
   FONT CONSTANTS
   ═══════════════════════════════════════════════════════════════════════════ */

export const FONT_SANS = { fontFamily: `var(--font-bb-sans, '${STARTER_FONT_FAMILIES.sans}', system-ui, sans-serif)` } as const
export const FONT_MONO = { fontFamily: `var(--font-bb-mono, '${STARTER_FONT_FAMILIES.mono}', "SFMono-Regular", ui-monospace, monospace)` } as const

/* ═══════════════════════════════════════════════════════════════════════════
   V1 LAYOUT COMPONENTS (Fixed 1920x1080)
   ═══════════════════════════════════════════════════════════════════════════ */

export function SlideLayout({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("relative h-[1080px] w-[1920px] overflow-hidden font-bb-sans", className)}
      style={{ background: "var(--bb-dark)", color: "var(--bb-cream)", ...FONT_SANS }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTag({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.span
      className="font-bb-mono text-[14px] uppercase tracking-[0.3em] text-bb-dim"
      style={FONT_MONO}
      {...fadeUp(delay)}
    >
      {label}
    </motion.span>
  )
}

export function ImagePlaceholder({
  className = "",
  label = "IMG",
  size = "1920 x 1080",
}: {
  className?: string
  label?: string
  size?: string
}) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-bb-surface", className)}>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full border border-bb-border">
          <span className="font-bb-mono text-[16px] tracking-wider text-bb-dim">{label}</span>
        </div>
        <span className="mt-4 font-bb-mono text-[13px] tracking-wider text-bb-dim/60">{size}</span>
      </div>
    </div>
  )
}

export function SlideFooter({ section, number }: { section: string; number: string }) {
  return (
    <div className="absolute bottom-[40px] left-[140px] right-[140px] flex items-center border-t border-bb-border/20 pt-3" style={FONT_MONO}>
      <span className="text-[11px] uppercase tracking-[0.15em] text-bb-dim/40">{section}</span>
      <span className="mx-4 h-px flex-1 bg-bb-border/10" />
      <span className="text-[11px] uppercase tracking-[0.15em] text-bb-dim/40">{number}</span>
      <span className="mx-4 h-px flex-1 bg-bb-border/10" />
      <span className="text-[11px] uppercase tracking-[0.15em] text-bb-dim/40">{STARTER_BRAND_ASSETS.brandName}.</span>
    </div>
  )
}

export function Watermark() {
  return (
    <motion.span
      className="absolute bottom-10 right-12 font-bb-mono text-[11px] uppercase tracking-[0.4em] text-bb-dim/40"
      style={FONT_MONO}
      {...fadeIn(1.2)}
    >
      {STARTER_BRAND_ASSETS.slideConfidentialLabel}
    </motion.span>
  )
}

export function CornerMarks({
  color = "var(--bb-accent)",
  opacity = 0.3,
}: {
  color?: string
  opacity?: number
}) {
  const mark = (pos: string) => (
    <div className={`absolute h-[20px] w-[20px] ${pos}`} style={{ opacity }}>
      <div className="absolute left-0 top-1/2 h-[1px] w-full" style={{ background: color }} />
      <div className="absolute left-1/2 top-0 h-full w-[1px]" style={{ background: color }} />
    </div>
  )

  return (
    <>
      {mark("left-[40px] top-[40px]")}
      {mark("right-[40px] top-[40px]")}
      {mark("bottom-[40px] left-[40px]")}
      {mark("bottom-[40px] right-[40px]")}
    </>
  )
}

export function WatermarkNumber({ n, className = "" }: { n: string; className?: string }) {
  return (
    <motion.span
      className={cn(
        "pointer-events-none absolute select-none font-bb-sans text-[16rem] font-black leading-[0.8]",
        className,
      )}
      style={{ color: "rgba(221, 209, 187, 0.04)", fontWeight: 900, ...FONT_SANS }}
      {...fadeIn(0.2)}
    >
      {n}
    </motion.span>
  )
}

export function MetaBar({
  left,
  center,
  right,
}: {
  left: string
  center?: string
  right: string
}) {
  return (
    <div className="flex h-[56px] items-center justify-between border-b border-bb-border/30 px-[60px]" style={FONT_MONO}>
      <span className="font-bb-mono text-[11px] uppercase tracking-[0.3em] text-bb-dim/60">{left}</span>
      {center && (
        <span className="font-bb-mono text-[11px] uppercase tracking-[0.3em] text-bb-accent/60">{center}</span>
      )}
      <span className="font-bb-mono text-[11px] uppercase tracking-[0.3em] text-bb-dim/60">{right}</span>
    </div>
  )
}

export function TechFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("relative", className)}
      style={{
        clipPath:
          "polygon(0 12px, 12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SLIDE DESIGN MANUAL v2.1 — V2 Components (Container Query based)
   ═══════════════════════════════════════════════════════════════════════════ */

export function useSlideMotion() {
  const shouldReduce = useReducedMotion()
  return { reducedMotion: !!shouldReduce }
}

export function SlideLayoutV2({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("slide-v2 relative w-full overflow-hidden font-bb-sans", className)}
      style={{
        aspectRatio: "16 / 9",
        background: "var(--bb-dark)",
        color: "var(--bb-cream)",
        ...FONT_SANS,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

export function PageFooter({
  section,
  number,
  brand = `${STARTER_BRAND_ASSETS.brandName}.`,
}: {
  section: string
  number: string
  brand?: string
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center border-t border-bb-border/20 pt-[0.6cqw]"
      style={{
        paddingLeft: "var(--slide-margin-x)",
        paddingRight: "var(--slide-margin-x)",
        paddingBottom: "var(--slide-margin-bottom)",
        ...FONT_MONO,
      }}
    >
      <span style={{ fontSize: "var(--slide-label)" }} className="uppercase tracking-[0.15em] text-bb-dim/40">
        {section}
      </span>
      <span className="mx-[1cqw] h-px flex-1 bg-bb-border/10" />
      <span style={{ fontSize: "var(--slide-label)" }} className="uppercase tracking-[0.15em] text-bb-dim/40">
        {number}
      </span>
      <span className="mx-[1cqw] h-px flex-1 bg-bb-border/10" />
      <span style={{ fontSize: "var(--slide-label)" }} className="uppercase tracking-[0.15em] text-bb-dim/40">
        {brand}
      </span>
    </div>
  )
}

export function MetaBarV2({
  left,
  center,
  right,
}: {
  left: string
  center?: string
  right: string
}) {
  return (
    <div
      className="flex items-center justify-between border-b border-bb-border/30"
      style={{
        height: "var(--slide-space-lg)",
        paddingLeft: "var(--slide-margin-x)",
        paddingRight: "var(--slide-margin-x)",
        ...FONT_MONO,
      }}
    >
      <span style={{ fontSize: "var(--slide-label)" }} className="font-bb-mono uppercase tracking-[0.3em] text-bb-dim/60">
        {left}
      </span>
      {center && (
        <span style={{ fontSize: "var(--slide-label)" }} className="font-bb-mono uppercase tracking-[0.3em] text-bb-accent/60">
          {center}
        </span>
      )}
      <span style={{ fontSize: "var(--slide-label)" }} className="font-bb-mono uppercase tracking-[0.3em] text-bb-dim/60">
        {right}
      </span>
    </div>
  )
}

export function WatermarkV2() {
  return (
    <motion.span
      className="absolute font-bb-mono uppercase tracking-[0.4em] text-bb-dim/40"
      style={{
        bottom: "var(--slide-margin-bottom)",
        right: "var(--slide-margin-x)",
        fontSize: "var(--slide-label)",
        ...FONT_MONO,
      }}
      {...fadeIn(1.2)}
    >
      {STARTER_BRAND_ASSETS.slideConfidentialLabel}
    </motion.span>
  )
}

export function SectionTagV2({ label, delay = 0 }: { label: string; delay?: number }) {
  return (
    <motion.span
      className="font-bb-mono uppercase tracking-[0.3em] text-bb-dim"
      style={{ fontSize: "var(--slide-label)", ...FONT_MONO }}
      {...fadeUp(delay)}
    >
      {label}
    </motion.span>
  )
}

export function CornerMarksV2({
  color = "var(--bb-accent)",
  opacity = 0.3,
}: {
  color?: string
  opacity?: number
}) {
  const size = "var(--slide-space-md)"
  const offset = "var(--slide-margin-bottom)"

  const mark = (pos: Record<string, string>) => (
    <div className="absolute" style={{ width: size, height: size, opacity, ...pos }}>
      <div className="absolute left-0 top-1/2 h-[1px] w-full" style={{ background: color }} />
      <div className="absolute left-1/2 top-0 h-full w-[1px]" style={{ background: color }} />
    </div>
  )

  return (
    <>
      {mark({ left: offset, top: offset })}
      {mark({ right: offset, top: offset })}
      {mark({ bottom: offset, left: offset })}
      {mark({ bottom: offset, right: offset })}
    </>
  )
}

export function WatermarkNumberV2({ n, className = "" }: { n: string; className?: string }) {
  return (
    <motion.span
      className={cn(
        "pointer-events-none absolute select-none font-bb-sans font-black leading-[0.8]",
        className,
      )}
      style={{ fontSize: "clamp(128px, 13cqw, 256px)", color: "rgba(221, 209, 187, 0.04)", fontWeight: 900, ...FONT_SANS }}
      {...fadeIn(0.2)}
    >
      {n}
    </motion.span>
  )
}
