"use client"

import { motion, type Transition } from "framer-motion"

import { EASE_SMOOTH, fadeUp, growWidth, scaleIn, slideLeft, slideRight, stagger } from "@/components/brandbook/motion"
import {
  STARTER_BRAND_ASSETS,
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

export function SlideImageText() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="relative h-full w-[960px]" {...slideRight(0.1)}>
          <img src={STARTER_SLIDE_IMAGERY.creativeHero.src} alt={STARTER_SLIDE_IMAGERY.creativeHero.alt} className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, var(--bb-dark))" }} />
        </motion.div>
        <div className="flex w-[960px] flex-col justify-center px-[100px]">
          <SectionTag label="[03] - Criativo" delay={0.3} />
          <motion.h2 style={FONT_SANS} className="mt-6 font-bb-sans text-[56px] font-black leading-[1.05]" {...slideLeft(0.4)}>
            IDENTIDADE
            <br />
            <span className="text-bb-accent">VISUAL</span>
          </motion.h2>
          <motion.p className="mt-8 text-[28px] leading-[1.3] text-bb-dim" style={FONT_SANS} {...fadeUp(0.6)}>
            Contraste agressivo.
            <br />
            Tipografia industrial.
            <br />
            Mensagem direta.
          </motion.p>
          <motion.div className="mt-10 flex gap-3" {...fadeUp(0.8)}>
            {["BRANDING", "CAMPANHA", "SOCIAL"].map((tag) => (
              <span key={tag} className="border border-bb-border px-4 py-2 font-bb-mono text-[12px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
      <SlideFooter section="Criativo" number="23" />
    </SlideLayout>
  )
}

export function SlideFullImage() {
  return (
    <SlideLayout>
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE_SMOOTH } as Transition}
      >
        <img src={STARTER_SLIDE_IMAGERY.fullBleedHero.src} alt={STARTER_SLIDE_IMAGERY.fullBleedHero.alt} className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, var(--bb-dark) 0%, var(--bb-dark)/60 40%, transparent 100%)" }} />
      <motion.div className="absolute bottom-[162px] left-[140px]" {...fadeUp(0.5)}>
        <SectionTag label="[07] - Impacto" delay={0.5} />
        <motion.h2 style={FONT_SANS} className="mt-4 font-bb-sans text-[72px] font-black leading-[0.95]" {...fadeUp(0.7)}>
          RESULTADOS
          <br />
          <span className="text-bb-accent">VISÍVEIS</span>
        </motion.h2>
      </motion.div>
      <SlideFooter section="Impacto" number="24" />
    </SlideLayout>
  )
}

export function SlideGalleryGrid() {
  const images = [
    "/starter/gallery-01.svg",
    "/starter/gallery-02.svg",
    "/starter/gallery-03.svg",
    "/starter/gallery-04.svg",
  ]

  return (
    <SlideLayout>
      <div className="grid h-full grid-cols-[400px_1fr]">
        <div className="flex flex-col justify-end border-r border-bb-border px-[60px] py-[162px]">
          <SectionTag label="[21] - Galeria" />
          <motion.h2 style={FONT_SANS} className="mt-4 font-bb-sans text-[56px] font-black leading-[0.95]" {...fadeUp(0.2)}>
            GALERIA
            <br />
            <span className="text-bb-accent">VISUAL</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 grid-rows-2">
          {images.map((src, i) => (
            <motion.div key={i} className="relative border-b border-l border-bb-border" {...scaleIn(stagger(i + 1, 0.3))}>
              <img src={src} alt={`Galeria ${i + 1}`} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Galeria" number="25" />
    </SlideLayout>
  )
}

export function SlideGalleryAsymmetric() {
  return (
    <SlideLayout>
      <div className="grid h-full grid-cols-2 grid-rows-2">
        <motion.div className="relative row-span-2 border-r border-bb-border" {...slideRight(0.2)}>
          <img src={STARTER_SLIDE_IMAGERY.asymmetricPortrait.src} alt={STARTER_SLIDE_IMAGERY.asymmetricPortrait.alt} className="h-full w-full object-cover" />
        </motion.div>
        <motion.div className="relative border-b border-bb-border" {...scaleIn(0.4)}>
          <img src={STARTER_SLIDE_IMAGERY.asymmetricDetail.src} alt={STARTER_SLIDE_IMAGERY.asymmetricDetail.alt} className="h-full w-full object-cover" />
        </motion.div>
        <motion.div className="relative" {...scaleIn(0.5)}>
          <img src={STARTER_SLIDE_IMAGERY.asymmetricBomber.src} alt={STARTER_SLIDE_IMAGERY.asymmetricBomber.alt} className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </SlideLayout>
  )
}

export function SlidePortfolio() {
  const works = [
    { title: "VERTEX CO", tag: "E-COMMERCE", img: "/starter/gallery-04.svg" },
    { title: "NEXUS LABS", tag: "SAAS B2B", img: "/starter/gallery-01.svg" },
    { title: "ORBITAL", tag: "EDTECH", img: "/starter/gallery-02.svg" },
  ]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <SectionTag label="[29] - Portfólio" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-14 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          NOSSOS <span className="text-bb-accent">CASES</span>
        </motion.h2>
        <div className="grid grid-cols-3 gap-8">
          {works.map((work, i) => (
            <motion.div key={work.title} className="group" {...scaleIn(stagger(i, 0.3))}>
              <div className="relative aspect-[4/3] overflow-hidden border border-bb-border">
                <img src={work.img} alt={work.title} className="h-full w-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2" style={{ background: "linear-gradient(to top, var(--bb-dark), transparent)" }} />
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="font-bb-mono text-[11px] tracking-[0.3em] text-bb-accent" style={FONT_MONO}>{work.tag}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <h3 style={FONT_SANS} className="font-bb-sans text-[22px] font-bold">
                  {work.title}
                </h3>
                <span className="font-bb-mono text-[12px] tracking-[0.2em] text-bb-accent" style={FONT_MONO}>{work.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Portfólio" number="26" />
    </SlideLayout>
  )
}

export function SlideCollaboration() {
  return (
    <SlideLayout>
      <div className="grid h-full grid-cols-2">
        <div className="relative">
          <img src={STARTER_SLIDE_IMAGERY.titleHeroBackdrop.src} alt={STARTER_SLIDE_IMAGERY.titleHeroBackdrop.alt} className="h-full w-full object-cover" />
          <motion.div className="absolute left-[60px] top-[60px] flex items-center gap-4" {...fadeUp(0.3)}>
            <span style={FONT_SANS} className="font-bb-sans text-[36px] font-black text-bb-accent">
              01/10
            </span>
            <motion.div className="h-[1px] w-[60px] origin-left bg-bb-accent" {...growWidth(0.5)} />
          </motion.div>
          <motion.div className="absolute bottom-[60px] left-[60px]" {...fadeUp(0.5)}>
            <h2 style={FONT_SANS} className="font-bb-sans text-[48px] font-black leading-[0.95]">
              {STARTER_BRAND_ASSETS.brandShortName.toUpperCase()}
              <br />
              Colaboração
            </h2>
          </motion.div>
        </div>
        <motion.div className="relative border-l border-bb-border" {...slideLeft(0.3)}>
          <img src={STARTER_SLIDE_IMAGERY.collaborationSecondary.src} alt={STARTER_SLIDE_IMAGERY.collaborationSecondary.alt} className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </SlideLayout>
  )
}

export function SlideDeviceMockup() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="flex h-full w-[720px] flex-col justify-center px-[80px]" style={{ background: "var(--bb-accent)" }} {...slideRight(0.1)}>
          <span className="font-bb-mono text-[14px] uppercase tracking-[0.3em]" style={{ ...FONT_MONO, color: "rgba(5,5,5,0.5)" }}>
            [23] - Dashboard
          </span>
          <h2 className="mt-6 font-bb-sans text-[56px] font-black leading-[0.95]" style={{ color: "var(--bb-dark)", ...FONT_SANS }}>
            DASHBOARD
            <br />
            EM TEMPO
            <br />
            REAL
          </h2>
        </motion.div>
        <div className="flex flex-1 items-center justify-center">
          <motion.div className="relative h-[440px] w-[640px] overflow-hidden rounded-xl border-[3px] border-bb-border/50 bg-bb-surface" {...scaleIn(0.4)}>
            <div className="flex h-[32px] items-center gap-2 border-b border-bb-border bg-bb-surface-alt px-4">
              <div className="h-[8px] w-[8px] rounded-full bg-bb-flare/50" />
              <div className="h-[8px] w-[8px] rounded-full bg-bb-warning/50" />
              <div className="h-[8px] w-[8px] rounded-full bg-bb-accent/50" />
              <div className="mx-4 h-[16px] flex-1 rounded-sm bg-bb-dark/50" />
            </div>
            <div className="grid grid-cols-3 gap-3 p-6">
              {["4.8x", "1,247", "3.2%"].map((value) => (
                <div key={value} className="h-[80px] border border-bb-border bg-bb-dark p-4">
                  <div className="mb-2 h-2 w-12 bg-bb-accent/30" />
                  <div style={FONT_SANS} className="font-bb-sans text-[24px] font-black text-bb-accent">
                    {value}
                  </div>
                </div>
              ))}
              <div className="col-span-2 h-[120px] border border-bb-border bg-bb-dark p-4">
                <div className="mt-6 flex h-[70px] items-end gap-2">
                  {[40, 65, 50, 80, 60, 90, 75, 95].map((height, i) => (
                    <div key={i} className="flex-1 bg-bb-accent/40" style={{ height: `${height}%` }} />
                  ))}
                </div>
              </div>
              <div className="flex h-[120px] items-center justify-center border border-bb-border bg-bb-dark p-4">
                <div className="h-[80px] w-[80px] rounded-full border-[6px] border-bb-accent/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Watermark />
    </SlideLayout>
  )
}

export function SlideDeviceMobile() {
  return (
    <SlideLayout className="!bg-[var(--bb-accent)]">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="mb-8 font-bb-mono text-[14px] uppercase tracking-[0.3em]"
          style={{ ...FONT_MONO, color: "rgba(5,5,5,0.5)" }}
          {...fadeUp(0.1)}
        >
          Experiência Mobile
        </motion.span>
        <div className="flex gap-10">
          {[1, 2, 3].map((i) => (
            <motion.div key={i} className="flex flex-col items-center" {...scaleIn(stagger(i, 0.2))}>
              <div className="w-[220px] rounded-[32px] border-[4px] p-[6px]" style={{ borderColor: "rgba(5,5,5,0.2)", background: "var(--bb-dark)" }}>
                <div className="aspect-[9/19] rounded-[26px] bg-bb-surface flex items-center justify-center">
                  <span className="font-bb-mono text-[16px] text-bb-dim" style={FONT_MONO}>TELA {String(i).padStart(2, "0")}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}

export function SlideSpeakerHero() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <div className="flex flex-1 flex-col justify-end px-[100px] pb-[162px]">
          <motion.span className="font-bb-mono text-[14px] uppercase tracking-[0.3em] text-bb-dim" style={FONT_MONO} {...fadeUp(0.1)}>
            {`ALAN NICOLAS, CEO | ${STARTER_BRAND_ASSETS.brandName.toUpperCase()}`}
          </motion.span>
          <motion.h1 className="mt-4 font-bb-sans text-[140px] font-black uppercase leading-[0.85] tracking-[-4px]" style={FONT_SANS} {...fadeUp(0.3)}>
            AGENTES
            <br />
            <span className="text-bb-accent">[IA]</span>
          </motion.h1>
        </div>
        <motion.div className="relative h-full w-[640px]" {...slideLeft(0.2)}>
          <img src="/starter/portrait-creative.svg" alt="Creative lead portrait placeholder" className="h-full w-full object-cover" />
        </motion.div>
      </div>
    </SlideLayout>
  )
}

export function SlideSocialProofCollage() {
  return (
    <SlideLayout>
      <motion.h1 className="pt-[162px] text-center font-bb-sans text-[80px] font-black leading-none tracking-[-2px]" style={FONT_SANS} {...fadeUp(0.1)}>
        +10 MIL ALUNOS ATIVOS
      </motion.h1>
      <div className="mt-[40px] flex items-center justify-center gap-6 px-[80px]">
        <motion.div className="h-[340px] w-[200px] overflow-hidden rounded-lg border border-bb-border bg-bb-surface" {...scaleIn(0.3)}>
          <img src="/starter/portrait-creative.svg" alt="Creative lead portrait placeholder" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div className="h-[340px] w-[520px] overflow-hidden rounded-lg border border-bb-border bg-bb-surface" {...scaleIn(0.4)}>
          <img src={STARTER_SLIDE_IMAGERY.socialProofStage.src} alt={STARTER_SLIDE_IMAGERY.socialProofStage.alt} className="h-full w-full object-cover" />
        </motion.div>
        <motion.div className="h-[340px] w-[280px] overflow-hidden rounded-lg border border-bb-border bg-bb-surface" {...scaleIn(0.5)}>
          <img src="/starter/portrait-systems.svg" alt="Systems lead portrait placeholder" className="h-full w-full object-cover" />
        </motion.div>
        <motion.div className="h-[340px] w-[280px] overflow-hidden rounded-lg border border-bb-border bg-bb-surface" {...scaleIn(0.6)}>
          <img src="/starter/gallery-03.svg" alt="Starter editorial placeholder" className="h-full w-full object-cover" />
        </motion.div>
      </div>
      <div className="absolute bottom-[40px] left-[80px] right-[80px] flex items-center justify-between" style={FONT_MONO}>
        <span className="text-[14px] tracking-[0.15em] text-bb-dim">{STARTER_RUNTIME_LABELS.communityLabel}</span>
        <span className="text-[14px] tracking-[0.15em] text-bb-dim">{STARTER_BRAND_ASSETS.webDomain}</span>
      </div>
    </SlideLayout>
  )
}

export function SlideClientsAvatarGrid() {
  const clients = ["Thiago Finch", "Carol Rache", "Giorgio Barone", "Leila Ama", "Marcos R.", "Gien Liu", "Bel Guerra", "Leticia F."]

  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 50% 40%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.h2 className="mb-[60px] font-bb-sans text-[72px] font-black tracking-[-2px]" style={FONT_SANS} {...fadeUp(0.1)}>
          CLIENTES
        </motion.h2>
        <div className="grid grid-cols-4 gap-x-[80px] gap-y-[40px]">
          {clients.map((name, i) => (
            <motion.div key={name} className="flex flex-col items-center gap-4" {...scaleIn(stagger(i, 0.2))}>
              <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full border border-bb-border bg-bb-surface">
                <span className="font-bb-sans text-[36px] font-black text-bb-accent" style={FONT_SANS}>
                  {name.split(" ").map((n) => n[0]).join("")}
                </span>
              </div>
              <span className="font-bb-sans text-[18px]" style={FONT_SANS}>
                {name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Comunidade" number="27" />
    </SlideLayout>
  )
}

export function SlideProductDemo() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 30% 50%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarks opacity={0.08} />
      <div className="flex h-full">
        <div className="flex w-[700px] flex-col justify-center px-[100px]">
          <motion.div className="mb-6 flex items-center gap-3" {...fadeUp(0.1)}>
            <div className="flex h-[40px] w-[40px] items-center justify-center bg-bb-accent">
              <span className="font-bb-sans text-[18px] font-black" style={{ ...FONT_SANS, color: "var(--bb-dark)" }}>
                A
              </span>
            </div>
            <span className="font-bb-sans text-[28px] font-bold" style={FONT_SANS}>
              {STARTER_RUNTIME_LABELS.navigationBrand}
            </span>
          </motion.div>
          <motion.h2 className="mb-8 font-bb-sans text-[48px] font-black leading-[1]" style={FONT_SANS} {...fadeUp(0.2)}>
            ORQUESTRE AGENTES
            <br />
            EM MINUTOS
          </motion.h2>
          <motion.div className="space-y-4" {...fadeUp(0.4)}>
            {["Interface intuitiva", "Modelos pré-treinados", "Deploy em 1 clique"].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="h-[8px] w-[8px] bg-bb-accent" />
                <span className="text-[24px] text-bb-dim" style={FONT_SANS}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        <motion.div className="flex flex-1 items-center justify-center pr-[60px]" {...slideLeft(0.3)}>
          <div className="w-[620px] overflow-hidden rounded-xl border-[3px] border-bb-border/50 bg-bb-surface">
            <div className="flex h-[32px] items-center gap-2 border-b border-bb-border bg-bb-surface-alt px-4">
              <div className="h-[8px] w-[8px] rounded-full bg-bb-flare/50" />
              <div className="h-[8px] w-[8px] rounded-full bg-bb-warning/50" />
              <div className="h-[8px] w-[8px] rounded-full bg-bb-accent/50" />
            </div>
            <div className="aspect-[16/10] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <span className="text-[48px] text-bb-accent/40">◈</span>
                <span className="font-bb-mono text-[14px] text-bb-dim" style={FONT_MONO}>
                  {STARTER_RUNTIME_LABELS.dashboardLabel}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <SlideFooter section="Produto" number="28" />
    </SlideLayout>
  )
}

export function SlideChatScreenshot() {
  return (
    <SlideLayout>
      <div className="grid h-full grid-cols-2">
        <div className="flex flex-col items-center justify-center">
          <motion.span
            className="mb-8 rounded-full border border-bb-border bg-bb-surface px-12 py-3 font-bb-sans text-[28px] font-black"
            style={FONT_SANS}
            {...fadeUp(0.1)}
          >
            ABERTURA ESTRATÉGICA
          </motion.span>
          <motion.div className="w-[320px] rounded-[32px] border-[3px] border-bb-border bg-bb-dark p-[6px]" {...scaleIn(0.3)}>
            <div className="aspect-[9/16] flex items-center justify-center rounded-[26px] bg-bb-surface">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[32px] text-bb-accent/40">◈</span>
                <span className="font-bb-mono text-[12px] text-bb-dim" style={FONT_MONO}>
                  Conversa IA
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <motion.span
            className="mb-8 rounded-full border border-bb-accent/20 bg-bb-surface px-12 py-3 font-bb-sans text-[28px] font-black"
            style={FONT_SANS}
            {...fadeUp(0.2)}
          >
            DIAGNÓSTICO PROFUNDO
          </motion.span>
          <motion.div className="w-[320px] rounded-[32px] border-[3px] border-bb-accent/20 bg-bb-dark p-[6px]" {...scaleIn(0.4)}>
            <div className="aspect-[9/16] flex items-center justify-center rounded-[26px] bg-bb-surface">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[32px] text-bb-accent/40">◈</span>
                <span className="font-bb-mono text-[12px] text-bb-dim" style={FONT_MONO}>
                  Conversa IA
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideLayout>
  )
}

export function SlideCaseClient() {
  return (
    <SlideLayout>
      <div className="flex h-full">
        <motion.div className="relative h-full w-[700px]" {...slideRight(0.1)}>
          <img src="/starter/portrait-systems.svg" alt="Systems case placeholder" className="h-full w-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent 60%, var(--bb-dark))" }} />
          <motion.div className="absolute left-[60px] top-[60px] bg-bb-accent px-6 py-3" {...scaleIn(0.4)}>
            <span className="font-bb-mono text-[12px] tracking-[0.3em]" style={{ ...FONT_MONO, color: "var(--bb-dark)" }}>
              ESTUDO DE CASO
            </span>
          </motion.div>
        </motion.div>
        <div className="flex flex-1 flex-col justify-center px-[80px]">
          <SectionTag label="[35] — Case" delay={0.3} />
          <motion.h2 className="mt-4 font-bb-sans text-[64px] font-black uppercase leading-[0.85] tracking-[-3px]" style={FONT_SANS} {...fadeUp(0.2)}>
            BRASIL
            <br />
            <span className="text-bb-accent">EM DOBRO</span>
          </motion.h2>
          <motion.p className="mt-3 font-bb-mono text-[14px] tracking-[0.2em] text-bb-dim" style={FONT_MONO} {...fadeUp(0.3)}>
            INFOPRODUTO — MARKETING DIGITAL
          </motion.p>
          <motion.div className="mt-10 space-y-6" {...fadeUp(0.4)}>
            <div className="border-l-2 border-bb-accent pl-6">
              <span className="font-bb-mono text-[12px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>DESAFIO</span>
              <p className="mt-1 font-bb-mono text-[18px]" style={FONT_MONO}>Escalar operação sem perder qualidade de entrega</p>
            </div>
            <div className="border-l-2 border-bb-accent pl-6">
              <span className="font-bb-mono text-[12px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>SOLUÇÃO</span>
              <p className="mt-1 font-bb-mono text-[18px]" style={FONT_MONO}>Clone IA + automação de fluxos + squad dedicado</p>
            </div>
          </motion.div>
          <motion.div className="mt-10 grid grid-cols-3 gap-4" {...fadeUp(0.6)}>
            {[
              { v: "3x", l: "RECEITA" },
              { v: "-60%", l: "TEMPO OP." },
              { v: "+240%", l: "ESCALA" },
            ].map((m) => (
              <div key={m.l} className="border border-bb-border p-4 text-center">
                <span className="font-bb-sans text-[36px] font-black text-bb-accent" style={FONT_SANS}>{m.v}</span>
                <span className="mt-1 block font-bb-mono text-[11px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>{m.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      <SlideFooter section="Case" number="29" />
    </SlideLayout>
  )
}
