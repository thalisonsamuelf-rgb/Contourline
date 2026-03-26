"use client"

import { motion } from "framer-motion"

import { fadeUp, growWidth, scaleIn, slideRight } from "@/components/brandbook/motion"
import {
  STARTER_BRAND_ASSETS,
  STARTER_SLIDE_IMAGERY,
} from "@/components/brandbook/data/starter-brand-data"
import {
  CornerMarks,
  FONT_MONO,
  FONT_SANS,
  MetaBar,
  SectionTag,
  SlideLayout,
  Watermark,
  WatermarkNumber,
} from "@/components/brandbook/slides/shared"

export function SlideTitleHero() {
  return (
    <SlideLayout>
      <CornerMarks />
      <WatermarkNumber n="01" className="right-[80px] top-[80px]" />
      <MetaBar
        left={STARTER_BRAND_ASSETS.brandName}
        center={STARTER_BRAND_ASSETS.confidentialityLabel}
        right={STARTER_BRAND_ASSETS.yearLabel}
      />
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <SectionTag label="[01] - Apresentação" delay={0.1} />
        <motion.h1
          style={FONT_SANS}
          className="mt-8 font-bb-sans text-[130px] font-black leading-[0.85] tracking-[-4px]"
          {...fadeUp(0.3)}
        >
          BRIEFING
          <br />
          <span className="text-bb-accent">ESTRATÉGICO</span>
        </motion.h1>
        <motion.div className="mt-14 flex items-center gap-4" {...fadeUp(0.6)}>
          <motion.div className="h-[2px] w-16 origin-left bg-bb-accent" {...growWidth(0.7)} />
          <p style={FONT_MONO} className="font-bb-mono text-[18px] tracking-[0.3em] text-bb-dim">{STARTER_BRAND_ASSETS.slideFooterBrandLine}</p>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-[56px] items-center justify-between border-t border-bb-border/30 px-[60px]">
        <span style={FONT_MONO} className="font-bb-mono text-[11px] uppercase tracking-[0.3em] text-bb-dim/40">{STARTER_BRAND_ASSETS.webDomain}</span>
        <span style={FONT_MONO} className="font-bb-mono text-[11px] uppercase tracking-[0.3em] text-bb-dim/40">Slide 01/44</span>
      </div>
    </SlideLayout>
  )
}

export function SlideTableOfContents() {
  const items = [
    { num: "01", title: "Introdução", page: "03" },
    { num: "02", title: "Quem somos", page: "05" },
    { num: "03", title: "Nossa história", page: "08" },
    { num: "04", title: "O que fazemos", page: "12" },
    { num: "05", title: "Serviços", page: "15" },
    { num: "06", title: "Nosso time", page: "18" },
    { num: "07", title: "Resultados", page: "20" },
    { num: "08", title: "Próximo passo", page: "22" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[13] - Índice" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mt-6 mb-12 font-bb-sans text-[64px] font-black" {...fadeUp(0.2)}>
          ÍNDICE DE
          <br />
          <span className="text-bb-accent">CONTEÚDO</span>
        </motion.h2>
        <div className="grid grid-cols-2 gap-x-16 gap-y-0">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              className="flex items-center justify-between border-b border-bb-border py-5"
              {...slideRight(0.3 + i * 0.08)}
            >
              <div className="flex items-center gap-4">
                <span style={FONT_MONO} className="font-bb-mono text-[20px] font-bold text-bb-accent">{item.num}</span>
                <span style={FONT_MONO} className="font-bb-mono text-[20px]">{item.title}</span>
              </div>
              <span style={FONT_MONO} className="font-bb-mono text-[16px] text-bb-dim">{item.page}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <Watermark />
    </SlideLayout>
  )
}

export function SlideCompanyProfile() {
  return (
    <SlideLayout>
      <CornerMarks />
      <MetaBar
        left={STARTER_BRAND_ASSETS.brandName}
        right={`${STARTER_BRAND_ASSETS.confidentialityLabel} // ${STARTER_BRAND_ASSETS.yearLabel}`}
      />
      <div className="absolute inset-0 flex flex-col justify-between p-[80px] pt-[162px] pb-[162px]">
        <motion.div {...fadeUp(0.2)}>
          <h1 style={FONT_SANS} className="font-bb-sans text-[160px] font-black leading-[0.8] tracking-[-6px]">
            PERFIL DA
            <br />
            <span className="text-bb-accent">EMPRESA</span>
          </h1>
        </motion.div>
        <motion.div className="flex items-end justify-between" {...fadeUp(0.6)}>
          <div className="flex flex-col gap-3">
            <motion.div className="h-[3px] w-[100px] origin-left bg-bb-accent" {...growWidth(0.7)} />
            <span style={FONT_MONO} className="font-bb-mono text-[16px] tracking-[0.3em] text-bb-dim">{`${STARTER_BRAND_ASSETS.brandName.toUpperCase()} // APRESENTAÇÃO`}</span>
          </div>
          <motion.span style={FONT_SANS} className="font-bb-sans text-[56px] font-black text-bb-accent" {...scaleIn(0.8)}>
            2026
          </motion.span>
        </motion.div>
      </div>
    </SlideLayout>
  )
}

export function SlideWelcomeMessage() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="h-full w-[800px]" {...slideRight(0.1)}>
          <img src={STARTER_SLIDE_IMAGERY.welcomeHero.src} alt={STARTER_SLIDE_IMAGERY.welcomeHero.alt} className="h-full w-full object-cover" />
        </motion.div>
        <div className="flex flex-1 flex-col justify-center px-[100px]">
          <SectionTag label={STARTER_BRAND_ASSETS.brandLabel} delay={0.2} />
          <motion.h2
            style={FONT_SANS}
            className="mt-6 font-bb-sans text-[72px] font-black leading-[0.9]"
            {...fadeUp(0.3)}
          >
            BEM-
            <br />
            <span className="text-bb-accent">VINDO</span> ++
          </motion.h2>
          <motion.p style={FONT_MONO} className="mt-8 max-w-[500px] font-bb-mono text-[20px] leading-relaxed text-bb-dim" {...fadeUp(0.5)}>
            Bem-vindo a uma nova era de produtividade. Descubra como orquestrar agentes IA para transformar sua
            operação.
          </motion.p>
          <motion.div className="mt-10 flex items-center gap-4" {...fadeUp(0.7)}>
            <motion.div className="h-[2px] w-12 origin-left bg-bb-accent" {...growWidth(0.8)} />
            <span style={FONT_MONO} className="font-bb-mono text-[14px] tracking-[0.2em] text-bb-dim">{`${STARTER_BRAND_ASSETS.brandName.toUpperCase()} // APRESENTAÇÃO`}</span>
          </motion.div>
        </div>
      </div>
      <Watermark />
    </SlideLayout>
  )
}

export function SlideLogoCentered() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.img
          src={STARTER_BRAND_ASSETS.logoLightSrc}
          alt={STARTER_BRAND_ASSETS.logoAlt}
          className="h-[72px] w-auto"
          {...scaleIn(0.2)}
        />
      </div>
    </SlideLayout>
  )
}
