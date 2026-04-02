"use client"

import { motion, type Transition } from "framer-motion"

import { EASE_SPRING, fadeIn, fadeUp, growWidth, scaleIn, slideLeft, stagger } from "@/components/brandbook/motion"
import {
  STARTER_BRAND_ASSETS,
  STARTER_CONTACT_CHANNELS,
  STARTER_RUNTIME_LABELS,
  STARTER_SLIDE_IMAGERY,
} from "@/components/brandbook/data/starter-brand-data"
import {
  CornerMarks,
  FONT_MONO,
  FONT_SANS,
  SectionTag,
  SlideFooter,
  SlideLayout,
  Watermark,
} from "@/components/brandbook/slides/shared"

export function SlidePricingTable() {
  const plans = [
    { name: "STARTER", price: "R$ 2.900", period: "/mês", hl: false, features: ["1 canal ativo", "Relatórios mensais", "Reunião quinzenal", "Setup de tracking"] },
    { name: "GROWTH", price: "R$ 5.900", period: "/mês", hl: true, features: ["3 canais ativos", "Dashboard real-time", "Reunião semanal", "Criativos ilimitados", "Server-side tracking"] },
    { name: "SCALE", price: "R$ 12.900", period: "/mês", hl: false, features: ["Canais ilimitados", "Squad dedicado", "War room semanal", "Atribuição multi-touch", "CRO contínuo", "SLA 2h"] },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <div className="mb-14 text-center">
          <SectionTag label="[38] - Investimento" delay={0.1} />
          <motion.h2 style={FONT_SANS} className="mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
            PLANOS DE <span className="text-bb-accent">OPERAÇÃO</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} className={`flex flex-col border p-12 ${plan.hl ? "border-bb-accent bg-bb-accent/[0.04]" : "border-bb-border"}`} {...scaleIn(stagger(i, 0.3))}>
              {plan.hl && <span className="mb-4 font-bb-mono text-[11px] tracking-[0.3em] text-bb-accent" style={FONT_MONO}>RECOMENDADO</span>}
              <h3 style={FONT_SANS} className="font-bb-sans text-[28px] font-black">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span style={FONT_SANS} className="font-bb-sans text-[48px] font-black leading-none">
                  {plan.price}
                </span>
                <span className="font-bb-mono text-[18px] text-bb-dim" style={FONT_MONO}>{plan.period}</span>
              </div>
              <div className="my-8 h-[1px] w-full bg-bb-border" />
              <ul className="flex-1 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-3 font-bb-mono text-[17px] ${plan.hl ? "text-bb-cream" : "text-bb-dim"}`} style={FONT_MONO}>
                    <span className={plan.hl ? "text-bb-accent" : "text-bb-dim"}>[+]</span> {feature}
                  </li>
                ))}
              </ul>
              <div className={`mt-10 border-t pt-6 text-center font-bb-mono text-[13px] tracking-[0.3em] ${plan.hl ? "border-bb-accent/30 text-bb-accent" : "border-bb-border text-bb-dim"}`} style={FONT_MONO}>
                {plan.hl ? "MAIS POPULAR" : ""}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Investimento" number="37" />
    </SlideLayout>
  )
}

export function SlideClientLogos() {
  const clients = ["VERTEX CO", "NEXUS LABS", "ORBITAL", "SYNTHWAVE", "DARKFIELD", "PRISMATICS", "CORTEX AI", "IRONCLAD", "VOIDSPACE", "APEX GROUP", "STRATUM", "KINETIC IO"]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <SectionTag label="[39] - Parceiros" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-4 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          QUEM <span className="text-bb-accent">CONFIA</span> EM NÓS
        </motion.h2>
        <motion.p className="mb-16 font-bb-mono text-[18px] text-bb-dim" style={FONT_MONO} {...fadeUp(0.3)}>
          +40 empresas aceleradas
        </motion.p>
        <div className="grid w-[1200px] grid-cols-4 gap-0">
          {clients.map((client, i) => (
            <motion.div key={client} className="flex h-[140px] items-center justify-center border border-bb-border/40" {...fadeIn(stagger(i, 0.3))}>
              <span className="font-bb-mono text-[20px] tracking-[0.15em] text-bb-dim/60" style={FONT_MONO}>{client}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Parceiros" number="36" />
    </SlideLayout>
  )
}

export function SlideContactInfo() {
  const contacts = [
    { label: "EMAIL", value: STARTER_CONTACT_CHANNELS.email },
    { label: "WEBSITE", value: STARTER_CONTACT_CHANNELS.website },
    { label: "INSTAGRAM", value: STARTER_CONTACT_CHANNELS.instagramHandle },
    { label: "LINKEDIN", value: STARTER_CONTACT_CHANNELS.linkedinPath },
  ]

  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="relative h-full w-[800px]" {...fadeUp(0.1)}>
          <img src={STARTER_SLIDE_IMAGERY.contactPortrait.src} alt={STARTER_SLIDE_IMAGERY.contactPortrait.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, var(--bb-dark))" }} />
        </motion.div>
        <div className="flex flex-1 flex-col justify-center px-[80px]">
          <SectionTag label="[40] - Contato" delay={0.2} />
          <motion.h2 style={FONT_SANS} className="mt-6 font-bb-sans text-[56px] font-black leading-[0.95]" {...fadeUp(0.3)}>
            VAMOS
            <br />
            <span className="text-bb-accent">CONVERSAR</span>
          </motion.h2>
          <div className="mt-12 space-y-8">
            {contacts.map((contact, i) => (
              <motion.div key={contact.label} className="flex items-center gap-6" {...slideLeft(stagger(i, 0.4))}>
                <span className="w-[120px] font-bb-mono text-[12px] tracking-[0.3em] text-bb-dim" style={FONT_MONO}>{contact.label}</span>
                <motion.div className="h-[1px] w-8 origin-left bg-bb-accent" {...growWidth(stagger(i, 0.5))} />
                <span className="font-bb-mono text-[22px]" style={FONT_MONO}>{contact.value}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <SlideFooter section="Contato" number="38" />
    </SlideLayout>
  )
}

export function SlideClosingPhoto() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <div className="flex flex-1 flex-col justify-center px-[80px]">
          <motion.h2 className="font-bb-sans text-[44px] font-black uppercase italic leading-[1.1]" style={FONT_SANS} {...fadeUp(0.2)}>
            O futuro será dividido entre aqueles que constroem e os <span className="text-bb-accent">que apenas assistem.</span>
          </motion.h2>
          <motion.p className="mt-6 text-[24px] uppercase tracking-[0.3em] text-bb-dim" style={FONT_SANS} {...fadeUp(0.4)}>
            Escolha o seu lado.
          </motion.p>
          <motion.div className="mt-10 space-y-3" style={FONT_MONO} {...fadeUp(0.6)}>
            <span className="block text-[16px] text-bb-dim">{STARTER_CONTACT_CHANNELS.email}</span>
            <span className="block text-[16px] text-bb-dim">{STARTER_CONTACT_CHANNELS.website}</span>
            <span className="block text-[16px] text-bb-dim">{STARTER_CONTACT_CHANNELS.instagramHandle}</span>
          </motion.div>
          <motion.div className="mt-8 flex items-center gap-6" {...fadeIn(0.8)}>
            <span className="font-bb-mono text-[14px] tracking-[0.15em] text-bb-dim" style={FONT_MONO}>
              {STARTER_RUNTIME_LABELS.closingBrandLine}
            </span>
          </motion.div>
        </div>
        <motion.div className="relative h-full w-[640px]" {...slideLeft(0.3)}>
          <img src={STARTER_SLIDE_IMAGERY.closingPortrait.src} alt={STARTER_SLIDE_IMAGERY.closingPortrait.alt} className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </SlideLayout>
  )
}

export function SlideCTA() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.08]" style={{ background: "radial-gradient(ellipse at 50% 40%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarks opacity={0.15} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.h2 style={FONT_SANS} className="relative z-10 font-bb-sans text-[90px] font-black leading-[0.9] tracking-[-2px]" {...fadeUp(0.2)}>
          OBRIGADO.
        </motion.h2>
        <motion.div className="relative z-10 mt-10 flex items-center gap-6" {...fadeUp(0.4)}>
          <motion.div className="h-[2px] w-16 origin-left bg-bb-accent" {...growWidth(0.5)} />
          <span className="font-bb-mono text-[20px] tracking-[0.3em] text-bb-dim" style={FONT_MONO}>PERGUNTAS?</span>
          <motion.div className="h-[2px] w-16 origin-right bg-bb-accent" {...growWidth(0.5)} />
        </motion.div>
        <motion.div className="relative z-10 mt-16 flex flex-col items-center gap-3" {...fadeUp(0.7)}>
          <span className="font-bb-mono text-[16px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>{STARTER_CONTACT_CHANNELS.email}</span>
          <span className="font-bb-mono text-[16px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>{STARTER_CONTACT_CHANNELS.website}</span>
        </motion.div>
      </div>
      <Watermark />
    </SlideLayout>
  )
}

export function SlideTheEnd() {
  return (
    <SlideLayout className="!bg-[var(--bb-accent)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.h2
          className="font-bb-sans text-[160px] font-black leading-none"
          style={{ color: "var(--bb-dark)", ...FONT_SANS }}
          initial={{ opacity: 0, scale: 0.7, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_SPRING } as Transition}
        >
          FIM.
        </motion.h2>
        <motion.p className="mt-8 font-bb-mono text-[20px]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.5)" }} {...fadeUp(0.6)}>
          Obrigado por assistir.
        </motion.p>
        <motion.div className="mt-10 flex items-center gap-4" {...fadeIn(0.9)}>
          <div className="h-[1px] w-8" style={{ background: "rgba(5,5,5,0.2)" }} />
          <span className="font-bb-mono text-[12px] tracking-[0.4em]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.4)" }}>
            {STARTER_BRAND_ASSETS.slideFooterBrandLine}
          </span>
          <div className="h-[1px] w-8" style={{ background: "rgba(5,5,5,0.2)" }} />
        </motion.div>
      </div>
    </SlideLayout>
  )
}
