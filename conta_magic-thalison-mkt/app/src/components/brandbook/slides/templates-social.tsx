"use client"

import { motion } from "framer-motion"

import { fadeIn, fadeUp, growWidth, scaleIn, stagger } from "@/components/brandbook/motion"
import { STARTER_RUNTIME_LABELS } from "@/components/brandbook/data/starter-brand-data"
import {
  CornerMarks,
  FONT_MONO,
  FONT_SANS,
  SectionTag,
  SlideFooter,
  SlideLayout,
} from "@/components/brandbook/slides/shared"

export function SlideQuote() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "radial-gradient(ellipse at 50% 30%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarks opacity={0.2} />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-[240px] text-center">
        <motion.div style={FONT_SANS} className="font-bb-sans text-[140px] font-black leading-none text-bb-accent" {...scaleIn(0.1)}>
          &ldquo;
        </motion.div>
        <motion.blockquote className="mt-[-24px] font-bb-mono text-[44px] leading-[1.3]" style={FONT_MONO} {...fadeUp(0.3)}>
          Este starter organizou completamente a forma como estruturamos a operação visual.
          <span className="text-bb-accent"> O que antes exigia retrabalho espalhado, agora nasce de uma base única.</span>
        </motion.blockquote>
        <motion.div className="mt-14 flex items-center gap-4" {...fadeUp(0.6)}>
          <motion.div className="h-[1px] w-12 origin-left bg-bb-accent" {...growWidth(0.7)} />
          <span className="font-bb-mono text-[16px] uppercase tracking-[0.25em] text-bb-dim" style={FONT_MONO}>Thiago Nishikata - Brasil em Dobro</span>
          <motion.div className="h-[1px] w-12 origin-right bg-bb-accent" {...growWidth(0.7)} />
        </motion.div>
        <motion.div className="mt-10 flex gap-2" {...fadeIn(0.8)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="h-[12px] w-[12px] bg-bb-accent" />
          ))}
        </motion.div>
      </div>
      <SlideFooter section="Depoimento" number="30" />
    </SlideLayout>
  )
}

export function SlideTeam() {
  const members = [
    { name: "Alan Nicolas", role: "CEO & ARQUITETO IA", initials: "AN" },
    { name: "Pedro Valerio", role: "CTO & AUTOMAÇÃO", initials: "PV" },
    { name: "Thiago Finch", role: "LÍDER DE CRESCIMENTO", initials: "TF" },
    { name: "Carolina Rache", role: "DIRETORA CRIATIVA", initials: "CR" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <SectionTag label="[10] - Time" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-14 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          NOSSO <span className="text-bb-accent">TIME</span>
        </motion.h2>
        <div className="grid grid-cols-4 gap-10">
          {members.map((member, i) => (
            <motion.div key={member.name} className="flex flex-col items-center text-center" {...scaleIn(stagger(i, 0.3))}>
              <div className="mb-6 flex h-[200px] w-[200px] items-center justify-center border border-bb-border bg-bb-surface">
                <span style={FONT_SANS} className="font-bb-sans text-[48px] font-black text-bb-accent">
                  {member.initials}
                </span>
              </div>
              <h3 style={FONT_SANS} className="font-bb-sans text-[22px] font-black">
                {member.name}
              </h3>
              <span className="mt-2 font-bb-mono text-[13px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>{member.role}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Time" number="31" />
    </SlideLayout>
  )
}

export function SlideExpert() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="flex h-full w-[720px] flex-col justify-center px-[80px]" style={{ background: "var(--bb-accent)" }} {...fadeUp(0.1)}>
          <motion.h2 className="font-bb-sans text-[56px] font-black leading-[0.95]" style={{ color: "var(--bb-dark)", ...FONT_SANS }} {...fadeUp(0.3)}>
            NOSSO EXPERT ++
          </motion.h2>
          <motion.p className="mt-6 font-bb-mono text-[18px] leading-relaxed" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.6)" }} {...fadeUp(0.5)}>
            Especialistas com experiência real em orquestração de agentes IA
          </motion.p>
        </motion.div>
        <div className="flex flex-1 flex-col justify-center px-[60px]">
          <motion.span style={FONT_SANS} className="font-bb-sans text-[36px] font-black text-bb-accent" {...fadeIn(0.3)}>
            06
          </motion.span>
          {[
            { n: "01", t: "Formação", d: "10+ anos em tech e AI" },
            { n: "02", t: "Experiência", d: "150+ projetos entregues" },
            { n: "03", t: "Metodologia", d: STARTER_RUNTIME_LABELS.expertMethodology },
          ].map((item, i) => (
            <motion.div key={item.n} className="mt-6 flex flex-col gap-1" {...fadeUp(stagger(i, 0.4))}>
              <span className="font-bb-mono text-[14px] font-bold text-bb-accent" style={FONT_MONO}>{item.n}</span>
              <h3 style={FONT_SANS} className="font-bb-sans text-[20px] font-black">
                {item.t}
              </h3>
              <p className="font-bb-mono text-[15px] text-bb-dim" style={FONT_MONO}>{item.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Especialista" number="32" />
    </SlideLayout>
  )
}

export function SlideStatementBold() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 flex items-center justify-center px-[120px] text-center">
        <motion.h1
          className="font-bb-sans text-[110px] font-black uppercase leading-[0.9] tracking-[-3px]"
          style={FONT_SANS}
          {...scaleIn(0.2)}
        >
          3 PROJETOS
          <br />
          <span className="text-bb-dim">+ 6 DIGITOS</span>
          <br />
          <span className="text-bb-accent">15 DIAS</span>
        </motion.h1>
      </div>
    </SlideLayout>
  )
}
