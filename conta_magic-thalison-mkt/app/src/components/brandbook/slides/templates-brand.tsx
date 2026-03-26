"use client"

import { motion } from "framer-motion"

import { fadeIn, fadeUp, growWidth, scaleIn, slideRight } from "@/components/brandbook/motion"
import {
  STARTER_BRAND_ASSETS,
  STARTER_SLIDE_PALETTE_SWATCHES,
  STARTER_TYPOGRAPHY,
} from "@/components/brandbook/data/starter-brand-data"
import {
  FONT_MONO,
  FONT_SANS,
  MetaBar,
  SectionTag,
  SlideFooter,
  SlideLayout,
} from "@/components/brandbook/slides/shared"
import { cn } from "@/lib/utils"

export function SlideAccentInverted() {
  return (
    <SlideLayout className="!bg-[var(--bb-accent)]">
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <motion.span className="font-bb-mono text-[14px] uppercase tracking-[0.3em]" style={{ ...FONT_MONO, color: "var(--bb-dark)", opacity: 0.5 }} {...fadeUp(0.1)}>
          [19] - MANIFESTO
        </motion.span>
        <motion.h1 className="mt-8 font-bb-sans text-[110px] font-black leading-[0.9] tracking-tight" style={{ color: "var(--bb-dark)", ...FONT_SANS }} {...fadeUp(0.3)}>
          RESULTADOS
          <br />
          QUE FALAM
          <br />
          POR SI.
        </motion.h1>
        <motion.div className="mt-14 flex items-center gap-4" {...fadeUp(0.6)}>
          <motion.div className="h-[2px] w-16 origin-left" style={{ background: "var(--bb-dark)" }} {...growWidth(0.7)} />
          <span className="font-bb-mono text-[16px] tracking-[0.3em]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.5)" }}>
            {STARTER_BRAND_ASSETS.slideFooterBrandLine}
          </span>
        </motion.div>
      </div>
    </SlideLayout>
  )
}

export function SlideAccentSplit() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="flex h-full w-[1000px] flex-col justify-center px-[100px]" style={{ background: "var(--bb-accent)" }} {...slideRight(0.1)}>
          <motion.h2 className="font-bb-sans text-[64px] font-black leading-[0.95]" style={{ color: "var(--bb-dark)", ...FONT_SANS }} {...fadeUp(0.3)}>
            NOSSA
            <br />
            MISSÃO
          </motion.h2>
          <motion.div className="mt-8 flex gap-3" {...fadeUp(0.5)}>
            <span className="h-[14px] w-[14px] rounded-full" style={{ background: "var(--bb-dark)" }} />
            <span className="h-[14px] w-[14px] rounded-full" style={{ background: "rgba(5,5,5,0.3)" }} />
            <span className="h-[14px] w-[14px] rounded-full" style={{ background: "rgba(5,5,5,0.3)" }} />
          </motion.div>
        </motion.div>
        <div className="flex flex-1 flex-col justify-center px-[80px]">
          <motion.p className="font-bb-mono text-[22px] leading-relaxed text-bb-dim" style={FONT_MONO} {...fadeUp(0.4)}>
            Devolver às pessoas o poder de criar através da orquestração inteligente de agentes IA especializados.
          </motion.p>
          <motion.div className="mt-12 flex gap-8" {...fadeUp(0.6)}>
            {[{ n: "01", t: "VISÃO" }, { n: "02", t: "MISSÃO" }].map((item) => (
              <div key={item.n} className="border-l-2 border-bb-accent pl-6">
                <span style={FONT_SANS} className="font-bb-sans text-[28px] font-black text-bb-accent">
                  {item.n}
                </span>
                <span className="mt-1 block font-bb-mono text-[13px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>{item.t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <SlideFooter section="Marca" number="33" />
    </SlideLayout>
  )
}

export function SlideTypography() {
  return (
    <SlideLayout>
      <MetaBar left={STARTER_BRAND_ASSETS.brandName} center="Diretrizes de Marca" right="Tipografia" />
      <div className="grid h-full grid-cols-2" style={{ marginTop: -56 }}>
        <motion.div className="relative flex flex-col justify-center border-r border-bb-border px-[80px]" style={{ background: "var(--bb-accent)" }} {...slideRight(0.1)}>
          <span className="font-bb-mono text-[14px] uppercase tracking-[0.3em]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.5)" }}>
            TIPOGRAFIA
          </span>
          <span className="mt-4 font-bb-sans text-[240px] font-black leading-none" style={{ color: "var(--bb-dark)", letterSpacing: "-8px", ...FONT_SANS }}>
            Aa
          </span>
          <motion.div className="absolute bottom-[40px] left-[80px] right-[80px] flex justify-between" {...fadeIn(0.6)}>
            <span className="font-bb-mono text-[11px] tracking-[0.2em]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.4)" }}>
              WEIGHT: 800
            </span>
            <span className="font-bb-mono text-[11px] tracking-[0.2em]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.4)" }}>
              KERNING: OPTICAL
            </span>
          </motion.div>
        </motion.div>
        <div className="flex flex-col justify-center gap-12 px-[80px] pt-[162px]">
          <motion.div {...fadeUp(0.3)}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[3px] w-[40px] bg-bb-accent" />
              <span className="font-bb-mono text-[13px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>DISPLAY / {STARTER_TYPOGRAPHY.display.family}</span>
            </div>
            <p style={FONT_SANS} className="font-bb-sans text-[52px] font-black leading-none">
              The quick brown fox
            </p>
            <p style={FONT_SANS} className="mt-2 font-bb-sans text-[28px] font-black text-bb-dim">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
          </motion.div>
          <motion.div {...fadeUp(0.5)}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[3px] w-[40px] bg-bb-accent" />
              <span className="font-bb-mono text-[13px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>SANS / {STARTER_TYPOGRAPHY.sans.family}</span>
            </div>
            <p className="font-bb-sans text-[28px]">The quick brown fox jumps over the lazy dog</p>
          </motion.div>
          <motion.div {...fadeUp(0.7)}>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[3px] w-[40px] bg-bb-accent" />
              <span className="font-bb-mono text-[13px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>MONO / {STARTER_TYPOGRAPHY.mono.family}</span>
            </div>
            <p className="font-bb-mono text-[22px]" style={FONT_MONO}>abcdefghijklmnopqrstuvwxyz 0123456789!@#$%</p>
          </motion.div>
        </div>
      </div>
      <SlideFooter section="Tipografia" number="34" />
    </SlideLayout>
  )
}

export function SlideColorPalette() {
  const swatches = STARTER_SLIDE_PALETTE_SWATCHES

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[26] - Cores" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-14 mt-6 font-bb-sans text-[64px] font-black" {...fadeUp(0.2)}>
          PALETA DE
          <br />
          <span className="text-bb-accent">CORES</span>
        </motion.h2>
        <div className="grid h-[400px] grid-cols-5 gap-6">
          {swatches.map((swatch, i) => (
            <motion.div
              key={`${swatch.name}-${swatch.hex}`}
              className={cn(
                "flex flex-col justify-end rounded-sm p-8",
                (swatch.bg === "var(--bb-dark)" || swatch.bg === "var(--bb-surface)") &&
                  "border border-bb-border"
              )}
              style={{ background: swatch.bg }}
              {...scaleIn(i * 0.08 + 0.3)}
            >
              <span className="font-bb-mono text-[20px] font-bold tracking-[0.1em]" style={{ ...FONT_MONO, color: swatch.textColor }}>
                {swatch.name.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Cores" number="35" />
    </SlideLayout>
  )
}
