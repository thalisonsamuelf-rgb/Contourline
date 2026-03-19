"use client"

import { motion } from "framer-motion"

import { fadeIn, fadeUp, growHeight, growWidth, scaleIn, slideLeft, slideRight, staggerV2 } from "@/components/brandbook/motion"
import {
  STARTER_BRAND_ASSETS,
  STARTER_SLIDE_IMAGERY,
} from "@/components/brandbook/data/starter-brand-data"
import {
  CornerMarksV2,
  FONT_MONO,
  FONT_SANS,
  MetaBarV2,
  PageFooter,
  SectionTagV2,
  SlideLayoutV2,
  WatermarkNumberV2,
  WatermarkV2,
} from "@/components/brandbook/slides/shared"

/* ═══════════════════════════════════════════════════════════════════════════
   1. SECTION-BREAK — SlideSectionBreakV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideSectionBreakV2() {
  return (
    <SlideLayoutV2>
      <img
        src={STARTER_SLIDE_IMAGERY.sectionBreakBackdrop.src}
        alt={STARTER_SLIDE_IMAGERY.sectionBreakBackdrop.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 50% 50%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarksV2 opacity={0.2} />
      <WatermarkNumberV2 n="02" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.div
          className="w-[1px] origin-top bg-bb-accent/40"
          style={{ height: "var(--slide-space-xl)" }}
          {...growHeight(0.1)}
        />
        <motion.span
          className="font-bb-mono uppercase tracking-[0.5em] text-bb-dim"
          style={{ fontSize: "var(--slide-caption)", marginTop: "var(--slide-space-md)", marginBottom: "var(--slide-space-md)", ...FONT_MONO }}
          {...fadeIn(0.3)}
        >
          Parte 02
        </motion.span>
        <motion.h2
          style={{ fontSize: "var(--slide-title-xl)", ...FONT_SANS }}
          className="font-bb-sans font-black leading-none tracking-[-0.15cqw]"
          {...scaleIn(0.4)}
        >
          FRAMEWORK
        </motion.h2>
        <motion.div
          className="w-[1px] origin-top bg-bb-accent/40"
          style={{ height: "var(--slide-space-xl)", marginTop: "var(--slide-space-md)" }}
          {...growHeight(0.7)}
        />
      </div>
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. STATEMENT — SlideStatementBoldV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideStatementBoldV2() {
  return (
    <SlideLayoutV2>
      <div
        className="absolute inset-0 flex items-center justify-center text-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <motion.h1
          className="font-bb-sans font-black uppercase leading-[0.9] tracking-[-0.15cqw]"
          style={{ fontSize: "clamp(40px, 5.7cqw, 110px)", ...FONT_SANS }}
          {...scaleIn(0.2)}
        >
          3 PROJETOS
          <br />
          <span className="text-bb-dim">+ 6 DIGITOS</span>
          <br />
          <span className="text-bb-accent">15 DIAS</span>
        </motion.h1>
      </div>
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. CLOSING — SlideCTAV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideCTAV2() {
  return (
    <SlideLayoutV2>
      <div className="absolute inset-0 opacity-[0.08]" style={{ background: "radial-gradient(ellipse at 50% 40%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarksV2 opacity={0.15} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.h2
          style={{ fontSize: "clamp(36px, 4.7cqw, 90px)", ...FONT_SANS }}
          className="relative z-10 font-bb-sans font-black leading-[0.9] tracking-[-0.1cqw]"
          {...fadeUp(0.2)}
        >
          OBRIGADO.
        </motion.h2>
        <motion.div className="relative z-10 flex items-center" style={{ marginTop: "var(--slide-space-lg)", gap: "var(--slide-space-md)" }} {...fadeUp(0.4)}>
          <motion.div className="h-[2px] origin-left bg-bb-accent" style={{ width: "4cqw" }} {...growWidth(0.5)} />
          <span className="font-bb-mono tracking-[0.3em] text-bb-dim" style={{ fontSize: "var(--slide-body)", ...FONT_MONO }}>PERGUNTAS?</span>
          <motion.div className="h-[2px] origin-right bg-bb-accent" style={{ width: "4cqw" }} {...growWidth(0.5)} />
        </motion.div>
        <motion.div className="relative z-10 flex flex-col items-center" style={{ marginTop: "var(--slide-space-xl)", gap: "var(--slide-space-sm)" }} {...fadeUp(0.7)}>
          <span className="font-bb-mono tracking-[0.2em] text-bb-dim" style={{ fontSize: "var(--slide-caption)", ...FONT_MONO }}>{STARTER_BRAND_ASSETS.contactEmail}</span>
          <span className="font-bb-mono tracking-[0.2em] text-bb-dim" style={{ fontSize: "var(--slide-caption)", ...FONT_MONO }}>{STARTER_BRAND_ASSETS.webDomain}</span>
        </motion.div>
      </div>
      <WatermarkV2 />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. TITLE — SlideTitleHeroV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideTitleHeroV2() {
  return (
    <SlideLayoutV2>
      <img
        src={STARTER_SLIDE_IMAGERY.titleHeroBackdrop.src}
        alt={STARTER_SLIDE_IMAGERY.titleHeroBackdrop.alt}
        className="absolute inset-0 h-full w-full object-cover opacity-[0.07]"
      />
      <CornerMarksV2 />
      <WatermarkNumberV2 n="01" className="top-[4cqw] right-[4cqw]" />
      <MetaBarV2
        left={STARTER_BRAND_ASSETS.brandName}
        center={STARTER_BRAND_ASSETS.confidentialityLabel}
        right={STARTER_BRAND_ASSETS.yearLabel}
      />
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <SectionTagV2 label="[01] - Apresentação" delay={0.1} />
        <motion.h1
          style={{ fontSize: "var(--slide-title-xl)", marginTop: "var(--slide-space-md)", ...FONT_SANS }}
          className="font-bb-sans font-black leading-[0.85] tracking-[-0.2cqw]"
          {...fadeUp(0.3)}
        >
          BRIEFING
          <br />
          <span className="text-bb-accent">ESTRATÉGICO</span>
        </motion.h1>
        <motion.div className="flex items-center" style={{ marginTop: "var(--slide-space-lg)", gap: "var(--slide-space-sm)" }} {...fadeUp(0.6)}>
          <motion.div className="h-[2px] origin-left bg-bb-accent" style={{ width: "4cqw" }} {...growWidth(0.7)} />
          <p className="font-bb-mono tracking-[0.3em] text-bb-dim" style={{ fontSize: "var(--slide-caption)", ...FONT_MONO }}>{STARTER_BRAND_ASSETS.slideFooterBrandLine}</p>
        </motion.div>
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-bb-border/30"
        style={{ height: "var(--slide-space-lg)", paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <span className="font-bb-mono uppercase tracking-[0.3em] text-bb-dim/40" style={{ fontSize: "var(--slide-label)", ...FONT_MONO }}>{STARTER_BRAND_ASSETS.webDomain}</span>
        <span className="font-bb-mono uppercase tracking-[0.3em] text-bb-dim/40" style={{ fontSize: "var(--slide-label)", ...FONT_MONO }}>Slide 01/44</span>
      </div>
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. QUOTE — SlideQuoteV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideQuoteV2() {
  return (
    <SlideLayoutV2>
      <div className="absolute inset-0 opacity-[0.03]" style={{ background: "radial-gradient(ellipse at 50% 30%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarksV2 opacity={0.2} />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ paddingLeft: "clamp(48px, 12.5cqw, 240px)", paddingRight: "clamp(48px, 12.5cqw, 240px)" }}
      >
        <motion.div
          style={{ fontSize: "var(--slide-title-xl)", ...FONT_SANS }}
          className="font-bb-sans font-black leading-none text-bb-accent"
          {...scaleIn(0.1)}
        >
          &ldquo;
        </motion.div>
        <motion.blockquote
          className="font-bb-mono leading-[1.3]"
          style={{ fontSize: "var(--slide-title-md)", marginTop: "-1.2cqw" }}
          {...fadeUp(0.3)}
        >
          Este starter mudou completamente a forma como estruturamos uma operação visual reutilizável.
          <span className="text-bb-accent"> O que antes exigia retrabalho manual, agora parte de uma base pronta.</span>
        </motion.blockquote>
        <motion.div className="flex items-center" style={{ marginTop: "var(--slide-space-lg)", gap: "var(--slide-space-sm)" }} {...fadeUp(0.6)}>
          <motion.div className="h-[1px] origin-left bg-bb-accent" style={{ width: "3cqw" }} {...growWidth(0.7)} />
          <span className="font-bb-mono uppercase tracking-[0.25em] text-bb-dim" style={{ fontSize: "var(--slide-caption)", ...FONT_MONO }}>Thiago Nishikata - Brasil em Dobro</span>
          <motion.div className="h-[1px] origin-right bg-bb-accent" style={{ width: "3cqw" }} {...growWidth(0.7)} />
        </motion.div>
        <motion.div className="flex" style={{ marginTop: "var(--slide-space-md)", gap: "var(--slide-space-xs)" }} {...fadeIn(0.8)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n} className="bg-bb-accent" style={{ width: "0.6cqw", height: "0.6cqw" }} />
          ))}
        </motion.div>
      </div>
      <WatermarkV2 />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. CONTENT — SlideBulletListV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideBulletListV2() {
  const items = [
    { num: "I", title: "CONFIGURAÇÃO", desc: "Workspace configurado com 10+ agentes especializados para cada domínio do seu negócio." },
    { num: "II", title: "INTEGRAÇÃO", desc: "Workflows de copy, design e desenvolvimento conectados ao seu stack existente." },
    { num: "III", title: "DASHBOARD", desc: "Métricas e performance em tempo real. Visibilidade total da operação." },
    { num: "IV", title: "ESCALA", desc: "Verificação de qualidade automática. Suporte contínuo. Atualizações do framework." },
  ]

  return (
    <SlideLayoutV2>
      <CornerMarksV2 opacity={0.12} />
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <motion.div className="border-t-[4px] border-bb-accent" style={{ paddingTop: "var(--slide-space-sm)", marginBottom: "var(--slide-space-xs)" }} {...fadeUp(0.1)}>
          <span className="font-bb-sans font-black" style={{ fontSize: "var(--slide-title-md)", ...FONT_SANS }}>
            6. O QUE VOCÊ RECEBE.
          </span>
        </motion.div>
        <motion.span
          className="font-bb-mono tracking-[0.2em] text-bb-dim"
          style={{ fontSize: "var(--slide-label)", marginBottom: "var(--slide-space-lg)", ...FONT_MONO }}
          {...fadeIn(0.2)}
        >
          JORNADA DE IMPLEMENTAÇÃO // 4 FASES
        </motion.span>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              className="flex"
              style={{
                gap: "var(--slide-space-md)",
                paddingTop: "var(--slide-space-md)",
                paddingBottom: "var(--slide-space-md)",
                borderBottom: i < items.length - 1 ? "1px solid rgba(244, 244, 232, 0.1)" : "none",
              }}
              {...slideRight(staggerV2(i, 0.3))}
            >
              <div
                className="flex shrink-0 items-center justify-center bg-bb-accent"
                style={{ width: "2.9cqw", height: "2.9cqw", ...FONT_MONO }}
              >
                <span className="font-bold" style={{ fontSize: "var(--slide-body)", color: "var(--bb-dark)" }}>
                  {item.num}
                </span>
              </div>
              <div>
                <h3 className="font-bb-sans font-black uppercase" style={{ fontSize: "var(--slide-body)", marginBottom: "var(--slide-space-xs)", ...FONT_SANS }}>
                  {item.title}
                </h3>
                <p className="leading-[1.3] text-bb-dim" style={{ fontSize: "var(--slide-body)", ...FONT_SANS }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <PageFooter section="Entrega" number="06" />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. COMPARISON — SlideComparisonV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideComparisonV2() {
  return (
    <SlideLayoutV2>
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <SectionTagV2 label="[08] - Comparativo" delay={0.1} />
        <motion.h2
          style={{ fontSize: "var(--slide-title-md)", marginTop: "var(--slide-space-md)", marginBottom: "var(--slide-space-lg)", ...FONT_SANS }}
          className="font-bb-sans font-black"
          {...fadeUp(0.2)}
        >
          ANTES <span className="text-bb-dim">&</span> <span className="text-bb-accent">DEPOIS</span>
        </motion.h2>
        <div className="grid grid-cols-2" style={{ gap: "var(--slide-space-lg)" }}>
          <motion.div className="border border-bb-border" style={{ padding: "var(--slide-space-lg)" }} {...slideRight(0.3)}>
            <span className="font-bb-mono tracking-[0.3em] text-bb-flare" style={{ fontSize: "var(--slide-label)", ...FONT_MONO }}>ANTES</span>
            <ul style={{ marginTop: "var(--slide-space-md)", gap: "var(--slide-space-sm)" }} className="flex flex-col">
              {[
                "Processos manuais e repetitivos",
                "Horas gastas em tarefas operacionais",
                "Sem padrão de qualidade",
                "Zero visibilidade de métricas",
              ].map((text, i) => (
                <motion.li key={text} className="flex items-center font-bb-mono text-bb-dim" style={{ fontSize: "var(--slide-body)", gap: "var(--slide-space-sm)" }} {...fadeUp(staggerV2(i, 0.4))}>
                  <span className="text-bb-flare">x</span> {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="border border-bb-accent/30 bg-bb-accent/[0.03]" style={{ padding: "var(--slide-space-lg)" }} {...slideLeft(0.3)}>
            <span className="font-bb-mono tracking-[0.3em] text-bb-accent" style={{ fontSize: "var(--slide-label)", ...FONT_MONO }}>DEPOIS</span>
            <ul style={{ marginTop: "var(--slide-space-md)", gap: "var(--slide-space-sm)" }} className="flex flex-col">
              {[
                "Agentes executam autonomamente",
                "Minutos para entregar resultados",
                "Verificação de qualidade automática",
                "Dashboard em tempo real",
              ].map((text, i) => (
                <motion.li key={text} className="flex items-center font-bb-mono" style={{ fontSize: "var(--slide-body)", gap: "var(--slide-space-sm)" }} {...fadeUp(staggerV2(i, 0.4))}>
                  <span className="text-bb-accent">+</span> {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      <WatermarkV2 />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. METRIC — SlideMetricsV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideMetricsV2() {
  const metrics = [
    { value: "R$500K", label: "/ANO", desc: "Contrato de ex-CLT", source: "João Pedro // Anima", highlight: false },
    { value: "6 DIAS", label: "MVP", desc: "Antes: 3 meses", source: "Paulo Chaves", highlight: true },
    { value: "R$8K", label: "/CLIENTE", desc: "Zero código", source: "Karla Pazos", highlight: false },
    { value: "R$100K", label: "ECONOMIA", desc: "Integração interna", source: "@leoh4236", highlight: false },
    { value: "150+", label: "CRIADORES", desc: "Transformados", source: "Primeiro Grupo", highlight: false },
    { value: "R$1M+", label: "RESULTADOS", desc: "Reportados", source: "2 semanas", highlight: true },
  ]

  return (
    <SlideLayoutV2>
      <CornerMarksV2 opacity={0.12} />
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <motion.div className="border-t-[4px] border-bb-accent" style={{ paddingTop: "var(--slide-space-sm)", marginBottom: "var(--slide-space-xs)" }} {...fadeUp(0.1)}>
          <span className="font-bb-sans font-black" style={{ fontSize: "var(--slide-title-md)", ...FONT_SANS }}>
            14. EVIDÊNCIA.
          </span>
        </motion.div>
        <motion.span
          className="font-bb-mono tracking-[0.2em] text-bb-dim"
          style={{ fontSize: "var(--slide-label)", marginBottom: "var(--slide-space-lg)", ...FONT_MONO }}
          {...fadeIn(0.2)}
        >
          COMPRESSÃO DE TEMPO // RESULTADOS REAIS
        </motion.span>
        <div className="grid grid-cols-3 gap-[1px]" style={{ background: "var(--bb-cream)" }}>
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.value}
              className="text-center"
              style={{ padding: "var(--slide-space-md)", background: metric.highlight ? "var(--bb-accent)" : "var(--bb-dark)" }}
              {...scaleIn(staggerV2(i, 0.25))}
            >
              <div
                className="font-bb-sans font-black leading-none"
                style={{
                  fontSize: "var(--slide-title-md)",
                  ...FONT_SANS,
                  color: metric.highlight ? "var(--bb-dark)" : "var(--bb-cream)",
                  letterSpacing: "-0.05cqw",
                }}
              >
                {metric.value}
              </div>
              <div
                className="font-bb-mono font-bold uppercase"
                style={{ fontSize: "var(--slide-label)", marginTop: "var(--slide-space-xs)", ...FONT_MONO, color: metric.highlight ? "var(--bb-dark)" : "var(--bb-cream)" }}
              >
                {metric.label}
              </div>
              <div
                className="font-bb-sans"
                style={{ fontSize: "var(--slide-label)", marginTop: "var(--slide-space-sm)", ...FONT_SANS, color: metric.highlight ? "rgba(5,5,5,0.6)" : "var(--bb-dim)" }}
              >
                {metric.desc}
              </div>
              <div
                className="font-bb-mono uppercase"
                style={{
                  fontSize: "var(--slide-label)",
                  marginTop: "var(--slide-space-xs)",
                  ...FONT_MONO,
                  color: metric.highlight ? "rgba(5,5,5,0.4)" : "rgba(244,244,232,0.25)",
                }}
              >
                {metric.source}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <PageFooter section="Evidência" number="04" />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. DATA-VIZ — SlideBarChartV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideBarChartV2() {
  const data = [
    { label: "JAN", value: 45 },
    { label: "FEV", value: 62 },
    { label: "MAR", value: 78 },
    { label: "ABR", value: 55 },
    { label: "MAI", value: 91 },
    { label: "JUN", value: 84 },
    { label: "JUL", value: 97 },
    { label: "AGO", value: 72 },
  ]
  const max = Math.max(...data.map((item) => item.value))

  return (
    <SlideLayoutV2>
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "clamp(48px, 9.4cqw, 180px)", paddingRight: "clamp(48px, 9.4cqw, 180px)" }}
      >
        <SectionTagV2 label="[33] - Receita" delay={0.1} />
        <motion.h2
          style={{ fontSize: "var(--slide-title-md)", marginTop: "var(--slide-space-md)", ...FONT_SANS }}
          className="font-bb-sans font-black"
          {...fadeUp(0.2)}
        >
          CRESCIMENTO <span className="text-bb-accent">MENSAL</span>
        </motion.h2>
        <div className="flex items-end" style={{ height: "clamp(160px, 22cqw, 420px)", marginTop: "var(--slide-space-lg)", gap: "var(--slide-space-md)" }}>
          {data.map((item, i) => {
            const height = (item.value / max) * 100
            return (
              <motion.div key={item.label} className="flex flex-1 flex-col items-center" style={{ gap: "var(--slide-space-sm)" }} {...fadeUp(staggerV2(i, 0.3))}>
                <span className="font-bb-mono text-bb-accent" style={{ fontSize: "var(--slide-caption)", ...FONT_MONO }}>{item.value}%</span>
                <div className="relative w-full origin-bottom" style={{ height: `${height}%` }}>
                  <motion.div className="absolute inset-0 origin-bottom border border-bb-accent/40 bg-bb-accent/20" {...growHeight(staggerV2(i, 0.35), 1)} />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 origin-bottom bg-bb-accent"
                    style={{ height: `${(height * 0.7 / 100) * 100}%` }}
                    {...growHeight(staggerV2(i, 0.5), 0.8)}
                  />
                </div>
                <span className="font-bb-mono tracking-wider text-bb-dim" style={{ fontSize: "var(--slide-label)", ...FONT_MONO }}>{item.label}</span>
              </motion.div>
            )
          })}
        </div>
        <motion.div className="h-[1px] w-full origin-left bg-bb-border" style={{ marginTop: "var(--slide-space-xs)" }} {...growWidth(0.3)} />
      </div>
      <WatermarkV2 />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. IMAGE — SlideImageTextV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideImageTextV2() {
  return (
    <SlideLayoutV2>
      <div className="flex h-full">
        <motion.div className="relative h-full w-1/2" {...slideRight(0.1)}>
          <img
            src="/starter/gallery-02.svg"
            alt={`${STARTER_BRAND_ASSETS.brandName} identity`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, transparent, var(--bb-dark))" }} />
        </motion.div>
        <div
          className="flex w-1/2 flex-col justify-center"
          style={{ paddingLeft: "var(--slide-space-xl)", paddingRight: "var(--slide-margin-x)" }}
        >
          <SectionTagV2 label="[03] - Criativo" delay={0.3} />
          <motion.h2
            style={{ fontSize: "var(--slide-title-lg)", marginTop: "var(--slide-space-md)", ...FONT_SANS }}
            className="font-bb-sans font-black leading-[1.05]"
            {...slideLeft(0.4)}
          >
            IDENTIDADE
            <br />
            <span className="text-bb-accent">VISUAL</span>
          </motion.h2>
          <motion.p
            className="leading-[1.3] text-bb-dim"
            style={{ fontSize: "var(--slide-body)", marginTop: "var(--slide-space-md)", ...FONT_SANS }}
            {...fadeUp(0.6)}
          >
            Contraste agressivo.
            <br />
            Tipografia industrial.
            <br />
            Mensagem direta.
          </motion.p>
          <motion.div className="flex" style={{ marginTop: "var(--slide-space-md)", gap: "var(--slide-space-sm)" }} {...fadeUp(0.8)}>
            {["BRANDING", "CAMPANHA", "SOCIAL"].map((tag) => (
              <span
                key={tag}
                className="border border-bb-border font-bb-mono tracking-[0.2em] text-bb-dim"
                style={{ fontSize: "var(--slide-label)", padding: "var(--slide-space-xs) var(--slide-space-sm)" }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
      <WatermarkV2 />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. BUILD — SlideTimelineV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideTimelineV2() {
  const phases = [
    { num: "01", title: "CONFIGURAÇÃO", desc: "Configuração do workspace", weeks: "Sem 1-2" },
    { num: "02", title: "TREINAMENTO", desc: "Treinamento dos agentes", weeks: "Sem 3-4" },
    { num: "03", title: "ATIVAÇÃO", desc: "Ativação do sistema", weeks: "Sem 5-6" },
    { num: "04", title: "ESCALA", desc: "Escalar a operação", weeks: "Sem 7+" },
  ]

  return (
    <SlideLayoutV2>
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <SectionTagV2 label="[11] - Jornada" delay={0.1} />
        <motion.h2
          style={{ fontSize: "var(--slide-title-md)", marginTop: "var(--slide-space-md)", marginBottom: "var(--slide-space-xl)", ...FONT_SANS }}
          className="font-bb-sans font-black"
          {...fadeUp(0.2)}
        >
          ROADMAP DE <span className="text-bb-accent">EXECUÇÃO</span>
        </motion.h2>
        <div className="flex gap-0">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              className="relative flex-1 border border-bb-border"
              style={{ padding: "var(--slide-space-md)" }}
              {...scaleIn(staggerV2(i, 0.3))}
            >
              {i < phases.length - 1 && <div className="absolute -right-[1px] top-1/2 h-[1px] bg-bb-accent" style={{ width: "1.2cqw" }} />}
              <span style={{ fontSize: "var(--slide-title-md)", ...FONT_SANS }} className="font-bb-sans font-black leading-none text-bb-accent">
                {phase.num}
              </span>
              <h3 style={{ fontSize: "var(--slide-body)", marginTop: "var(--slide-space-sm)", ...FONT_SANS }} className="font-bb-sans font-black">
                {phase.title}
              </h3>
              <p className="font-bb-mono text-bb-dim" style={{ fontSize: "var(--slide-caption)", marginTop: "var(--slide-space-sm)" }}>{phase.desc}</p>
              <span className="inline-block font-bb-mono tracking-wider text-bb-accent/60" style={{ fontSize: "var(--slide-label)", marginTop: "var(--slide-space-sm)" }}>{phase.weeks}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <WatermarkV2 />
    </SlideLayoutV2>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. CODE (novo) — SlideCodeV2
   ═══════════════════════════════════════════════════════════════════════════ */
export function SlideCodeV2() {
  const codeLines = [
    { indent: 0, text: 'import { Agent } from "@aiox/core"' },
    { indent: 0, text: "" },
    { indent: 0, text: "const architect = new Agent({" },
    { indent: 1, text: 'name: "architect",' },
    { indent: 1, text: 'model: "claude-opus-4",' },
    { indent: 1, text: "tools: [Read, Write, Bash]," },
    { indent: 0, text: "})" },
    { indent: 0, text: "" },
    { indent: 0, text: "const result = await architect.run({" },
    { indent: 1, text: 'task: "Design auth system",' },
    { indent: 1, text: "context: projectDocs," },
    { indent: 0, text: "})" },
  ]

  return (
    <SlideLayoutV2>
      <div
        className="absolute inset-0 flex flex-col justify-center"
        style={{ paddingLeft: "var(--slide-margin-x)", paddingRight: "var(--slide-margin-x)" }}
      >
        <SectionTagV2 label="[CODE] - Implementação" delay={0.1} />
        <motion.h2
          style={{ fontSize: "var(--slide-title-lg)", marginTop: "var(--slide-space-md)", marginBottom: "var(--slide-space-lg)", ...FONT_SANS }}
          className="font-bb-sans font-black"
          {...fadeUp(0.2)}
        >
          CONFIGURAÇÃO <span className="text-bb-accent">DO AGENTE</span>
        </motion.h2>
        <motion.div
          className="overflow-hidden border border-bb-border"
          style={{ background: "var(--bb-surface)" }}
          {...scaleIn(0.3)}
        >
          <div
            className="flex items-center border-b border-bb-border"
            style={{ padding: "var(--slide-space-xs) var(--slide-space-md)", gap: "var(--slide-space-xs)", background: "var(--bb-surface-alt)" }}
          >
            <div className="rounded-full bg-bb-flare/50" style={{ width: "0.4cqw", height: "0.4cqw" }} />
            <div className="rounded-full bg-bb-warning/50" style={{ width: "0.4cqw", height: "0.4cqw" }} />
            <div className="rounded-full bg-bb-accent/50" style={{ width: "0.4cqw", height: "0.4cqw" }} />
            <span className="font-bb-mono text-bb-dim/40" style={{ fontSize: "var(--slide-label)", marginLeft: "var(--slide-space-sm)", ...FONT_MONO }}>agent.ts</span>
          </div>
          <div style={{ padding: "var(--slide-space-md)" }}>
            {codeLines.map((line, i) => (
              <motion.div
                key={i}
                className="flex font-bb-mono"
                style={{ fontSize: "var(--slide-caption)", lineHeight: "1.8", ...FONT_MONO }}
                {...fadeUp(staggerV2(i, 0.35))}
              >
                <span className="select-none text-bb-dim/30" style={{ width: "2cqw", textAlign: "right", marginRight: "var(--slide-space-sm)" }}>
                  {i + 1}
                </span>
                <span style={{ paddingLeft: `${line.indent * 2}cqw` }}>
                  {line.text.split(/(["'].*?["']|\/\/.*$)/g).map((part, j) => {
                    if (/^["']/.test(part)) return <span key={j} className="text-bb-accent">{part}</span>
                    if (/^(import|from|const|new|await)$/.test(part.trim())) return <span key={j} className="text-bb-flare">{part}</span>
                    return <span key={j}>{part}</span>
                  })}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <PageFooter section="Código" number="—" />
    </SlideLayoutV2>
  )
}
