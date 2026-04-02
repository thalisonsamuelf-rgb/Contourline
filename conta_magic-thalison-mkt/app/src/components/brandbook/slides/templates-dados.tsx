"use client"

import { motion, type Transition } from "framer-motion"

import { EASE_SMOOTH, EASE_SPRING, fadeIn, fadeUp, growHeight, growWidth, scaleIn, slideLeft, slideRight, stagger } from "@/components/brandbook/motion"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import {
  CornerMarks,
  FONT_MONO,
  FONT_SANS,
  SectionTag,
  SlideFooter,
  SlideLayout,
} from "@/components/brandbook/slides/shared"
import { cn } from "@/lib/utils"

export function SlideMetrics() {
  const metrics = [
    { value: "R$500K", label: "/ANO", desc: "Contrato de ex-CLT", source: "João Pedro // Anima", highlight: false },
    { value: "6 DIAS", label: "MVP", desc: "Antes: 3 meses", source: "Paulo Chaves", highlight: true },
    { value: "R$8K", label: "/CLIENTE", desc: "Zero código", source: "Karla Pazos", highlight: false },
    { value: "R$100K", label: "ECONOMIA", desc: "Integração interna", source: "@leoh4236", highlight: false },
    { value: "150+", label: "CRIADORES", desc: "Transformados", source: "Primeiro Grupo", highlight: false },
    { value: "R$1M+", label: "RESULTADOS", desc: "Reportados", source: "2 semanas", highlight: true },
  ]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.12} />
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <motion.div className="mb-2 border-t-[4px] border-bb-accent pt-4" {...fadeUp(0.1)}>
          <span className="font-bb-sans text-[52px] font-black" style={FONT_SANS}>
            14. EVIDÊNCIA.
          </span>
        </motion.div>
        <motion.span className="mb-12 font-bb-mono text-[14px] tracking-[0.2em] text-bb-dim" style={FONT_MONO} {...fadeIn(0.2)}>
          COMPRESSÃO DE TEMPO // RESULTADOS REAIS
        </motion.span>
        <div className="grid grid-cols-3 gap-[1px]" style={{ background: "var(--bb-cream)" }}>
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.value}
              className="p-8 text-center"
              style={{ background: metric.highlight ? "var(--bb-accent)" : "var(--bb-dark)" }}
              {...scaleIn(stagger(i, 0.25))}
            >
              <div
                className="font-bb-sans text-[48px] font-black leading-none"
                style={{
                  ...FONT_SANS,
                  color: metric.highlight ? "var(--bb-dark)" : "var(--bb-cream)",
                  letterSpacing: "-1px",
                }}
              >
                {metric.value}
              </div>
              <div
                className="mt-2 font-bb-mono text-[13px] font-bold uppercase"
                style={{ ...FONT_MONO, color: metric.highlight ? "var(--bb-dark)" : "var(--bb-cream)" }}
              >
                {metric.label}
              </div>
              <div
                className="mt-3 font-bb-sans text-[15px]"
                style={{ ...FONT_SANS, color: metric.highlight ? "rgba(5,5,5,0.6)" : "var(--bb-dim)" }}
              >
                {metric.desc}
              </div>
              <div
                className="mt-2 font-bb-mono text-[11px] uppercase"
                style={{
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
      <div className="absolute bottom-[40px] left-[140px] right-[140px] flex items-center border-t border-bb-border/20 pt-3" style={FONT_MONO}>
        <span className="text-[11px] uppercase tracking-[0.15em] text-bb-dim/40">Evidência</span>
        <span className="mx-4 h-px flex-1 bg-bb-border/10" />
        <span className="text-[11px] uppercase tracking-[0.15em] text-bb-dim/40">04</span>
        <span className="mx-4 h-px flex-1 bg-bb-border/10" />
        <span className="text-[11px] uppercase tracking-[0.15em] text-bb-dim/40">{STARTER_BRAND_ASSETS.brandName}.</span>
      </div>
    </SlideLayout>
  )
}

export function SlideBigNumber() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.08]" style={{ background: "radial-gradient(ellipse at 50% 40%, var(--bb-accent), transparent 60%)" }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.span className="font-bb-mono text-[16px] uppercase tracking-[0.3em] text-bb-dim" style={FONT_MONO} {...fadeUp(0.1)}>
          Velocidade de entrega
        </motion.span>
        <motion.span
          style={FONT_SANS}
          className="mt-4 font-bb-sans text-[240px] font-black leading-none tracking-tighter text-bb-accent"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_SPRING } as Transition}
        >
          10x
        </motion.span>
        <motion.span className="mt-6 font-bb-mono text-[24px]" style={FONT_MONO} {...fadeUp(0.6)}>
          Mais rápido que o processo manual
        </motion.span>
      </div>
      <SlideFooter section="Impacto" number="12" />
    </SlideLayout>
  )
}

export function SlideComparison() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <SectionTag label="[08] - Comparativo" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-12 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          ANTES <span className="text-bb-dim">&</span> <span className="text-bb-accent">DEPOIS</span>
        </motion.h2>
        <div className="grid grid-cols-2 gap-16">
          <motion.div className="border border-bb-border p-12" {...slideRight(0.3)}>
            <span className="font-bb-mono text-[14px] tracking-[0.3em] text-bb-flare" style={FONT_MONO}>ANTES</span>
            <ul className="mt-8 space-y-5">
              {[
                "Processos manuais e repetitivos",
                "Horas gastas em tarefas operacionais",
                "Sem padrão de qualidade",
                "Zero visibilidade de métricas",
              ].map((text, i) => (
                <motion.li key={text} className="flex items-center gap-4 font-bb-mono text-[20px] text-bb-dim" style={FONT_MONO} {...fadeUp(stagger(i, 0.4))}>
                  <span className="text-bb-flare">x</span> {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div className="border border-bb-accent/30 bg-bb-accent/[0.03] p-12" {...slideLeft(0.3)}>
            <span className="font-bb-mono text-[14px] tracking-[0.3em] text-bb-accent" style={FONT_MONO}>DEPOIS</span>
            <ul className="mt-8 space-y-5">
              {[
                "Agentes executam autonomamente",
                "Minutos para entregar resultados",
                "Verificação de qualidade automática",
                "Dashboard em tempo real",
              ].map((text, i) => (
                <motion.li key={text} className="flex items-center gap-4 font-bb-mono text-[20px]" style={FONT_MONO} {...fadeUp(stagger(i, 0.4))}>
                  <span className="text-bb-accent">+</span> {text}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
      <SlideFooter section="Comparativo" number="13" />
    </SlideLayout>
  )
}

export function SlideTimeline() {
  const phases = [
    { num: "01", title: "CONFIGURAÇÃO", desc: "Configuração do workspace", weeks: "Sem 1-2" },
    { num: "02", title: "TREINAMENTO", desc: "Treinamento dos agentes", weeks: "Sem 3-4" },
    { num: "03", title: "ATIVAÇÃO", desc: "Ativação do sistema", weeks: "Sem 5-6" },
    { num: "04", title: "ESCALA", desc: "Escalar a operação", weeks: "Sem 7+" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <SectionTag label="[11] - Jornada" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-16 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          ROADMAP DE <span className="text-bb-accent">EXECUÇÃO</span>
        </motion.h2>
        <div className="flex gap-0">
          {phases.map((phase, i) => (
            <motion.div key={phase.num} className="relative flex-1 border border-bb-border p-8" {...scaleIn(stagger(i, 0.3))}>
              {i < phases.length - 1 && <div className="absolute -right-[1px] top-1/2 h-[1px] w-[24px] bg-bb-accent" />}
              <span style={FONT_SANS} className="font-bb-sans text-[48px] font-black leading-none text-bb-accent">
                {phase.num}
              </span>
              <h3 style={FONT_SANS} className="mt-4 font-bb-sans text-[24px] font-black">
                {phase.title}
              </h3>
              <p className="mt-3 font-bb-mono text-[16px] text-bb-dim" style={FONT_MONO}>{phase.desc}</p>
              <span className="mt-4 inline-block font-bb-mono text-[12px] tracking-wider text-bb-accent/60" style={FONT_MONO}>{phase.weeks}</span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Jornada" number="14" />
    </SlideLayout>
  )
}

export function SlideHistoryGrid() {
  const items = [
    { n: "01", sub: "2023 - 2024", desc: "Primeiro grupo com 30 alunos e framework v1" },
    { n: "02", sub: "2024 - 2025", desc: "Expansão para 150+ alunos e lançamento da imersão" },
    { n: "03", sub: "2025 - 2026", desc: "Framework v3, dashboard premium e 17 businesses" },
    { n: "04", sub: "2026+", desc: "Escala global e plataforma SaaS" },
  ]

  return (
    <SlideLayout>
      <div className="grid h-full grid-cols-[480px_1fr] py-[162px]">
        <div className="flex flex-col justify-center border-r border-bb-border px-[80px]">
          <SectionTag label="[16] - História" />
          <motion.h2 style={FONT_SANS} className="mt-6 font-bb-sans text-[64px] font-black leading-[0.9]" {...fadeUp(0.2)}>
            NOSSA ++
            <br />
            <span className="text-bb-accent">HISTÓRIA</span>
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 grid-rows-2">
          {items.map((item, i) => (
            <motion.div key={item.n} className="flex flex-col justify-center border-b border-l border-bb-border px-[60px] py-[50px]" {...scaleIn(stagger(i, 0.3))}>
              <span style={FONT_SANS} className="font-bb-sans text-[36px] font-black leading-none text-bb-accent">
                {item.n}
              </span>
              <span className="mt-2 font-bb-mono text-[13px] tracking-[0.2em] text-bb-dim" style={FONT_MONO}>{item.sub}</span>
              <p className="mt-4 font-bb-mono text-[18px] leading-relaxed text-bb-cream" style={FONT_MONO}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="História" number="15" />
    </SlideLayout>
  )
}

export function SlideBarChart() {
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
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[180px]">
        <SectionTag label="[33] - Receita" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          CRESCIMENTO <span className="text-bb-accent">MENSAL</span>
        </motion.h2>
        <div className="mt-16 flex h-[420px] items-end gap-6">
          {data.map((item, i) => {
            const height = (item.value / max) * 100
            return (
              <motion.div key={item.label} className="flex flex-1 flex-col items-center gap-4" {...fadeUp(stagger(i, 0.3))}>
                <span className="font-bb-mono text-[18px] text-bb-accent" style={FONT_MONO}>{item.value}%</span>
                <div className="relative w-full origin-bottom" style={{ height: `${height * 3.6}px` }}>
                  <motion.div className="absolute inset-0 origin-bottom border border-bb-accent/40 bg-bb-accent/20" {...growHeight(stagger(i, 0.35), 1)} />
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 origin-bottom bg-bb-accent"
                    style={{ height: `${height * 0.7}px` }}
                    {...growHeight(stagger(i, 0.5), 0.8)}
                  />
                </div>
                <span className="font-bb-mono text-[14px] tracking-wider text-bb-dim" style={FONT_MONO}>{item.label}</span>
              </motion.div>
            )
          })}
        </div>
        <motion.div className="mt-2 h-[1px] w-full origin-left bg-bb-border" {...growWidth(0.3)} />
      </div>
      <SlideFooter section="Receita" number="16" />
    </SlideLayout>
  )
}

export function SlideHorizontalBar() {
  const data = [
    { label: "META ADS", value: 42, color: "var(--bb-accent)" },
    { label: "GOOGLE ADS", value: 28, color: "var(--bb-flare)" },
    { label: "ORGÂNICO", value: 18, color: "var(--bb-blue)" },
    { label: "EMAIL", value: 8, color: "var(--bb-warning)" },
    { label: "DIRETO", value: 4, color: "var(--bb-dim)" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[34] - Canais" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-14 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          PARTICIPAÇÃO POR <span className="text-bb-accent">CANAL</span>
        </motion.h2>
        <div className="space-y-8">
          {data.map((item, i) => (
            <motion.div key={item.label} className="flex items-center gap-6" {...slideRight(stagger(i, 0.3))}>
              <span className="w-[160px] text-right font-bb-mono text-[16px] text-bb-dim" style={FONT_MONO}>{item.label}</span>
              <div className="relative h-[48px] flex-1 overflow-hidden border border-bb-border bg-bb-surface">
                <motion.div
                  className="absolute inset-y-0 left-0 origin-left"
                  style={{ width: `${item.value}%`, backgroundColor: item.color, opacity: 0.8 }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: stagger(i, 0.4), ease: EASE_SMOOTH } as Transition}
                />
              </div>
              <span className="w-[80px] font-bb-mono text-[22px]" style={{ ...FONT_MONO, color: item.color }}>
                {item.value}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Canais" number="17" />
    </SlideLayout>
  )
}

export function SlideDonutChart() {
  const segments = [
    { label: "SOCIAL PAGO", pct: 38, color: "var(--bb-accent)" },
    { label: "BUSCA", pct: 25, color: "var(--bb-flare)" },
    { label: "ORGÂNICO", pct: 20, color: "var(--bb-blue)" },
    { label: "OUTROS", pct: 17, color: "var(--bb-dim)" },
  ]
  let acc = 0
  const stops = segments.map((segment) => {
    const start = acc
    acc += segment.pct
    return `${segment.color} ${start}% ${acc}%`
  })

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex items-center px-[200px]">
        <div className="flex w-full items-center gap-24">
          <motion.div className="relative h-[440px] w-[440px] shrink-0" {...scaleIn(0.2)}>
            <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${stops.join(", ")})` }} />
            <div className="absolute inset-[80px] flex items-center justify-center rounded-full" style={{ background: "var(--bb-dark)" }}>
              <div className="text-center">
                <span style={FONT_SANS} className="font-bb-sans text-[56px] font-black leading-none">
                  100%
                </span>
                <span className="mt-2 block font-bb-mono text-[14px] tracking-wider text-bb-dim" style={FONT_MONO}>ORÇAMENTO</span>
              </div>
            </div>
          </motion.div>
          <div className="flex-1">
            <SectionTag label="[35] - Alocação" />
            <motion.h2 style={FONT_SANS} className="mb-12 mt-4 font-bb-sans text-[48px] font-black" {...fadeUp(0.3)}>
              DISTRIBUIÇÃO DE <span className="text-bb-accent">ORÇAMENTO</span>
            </motion.h2>
            <div className="space-y-6">
              {segments.map((segment, i) => (
                <motion.div key={segment.label} className="flex items-center gap-5" {...slideRight(stagger(i, 0.4))}>
                  <div className="h-[16px] w-[16px]" style={{ backgroundColor: segment.color }} />
                  <span className="flex-1 font-bb-mono text-[20px]" style={FONT_MONO}>{segment.label}</span>
                  <span className="font-bb-mono text-[28px]" style={{ ...FONT_MONO, color: segment.color }}>
                    {segment.pct}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SlideFooter section="Alocação" number="18" />
    </SlideLayout>
  )
}

export function SlideFunnel() {
  const stages = [
    { label: "TRÁFEGO", value: "120K", width: 100 },
    { label: "LEADS", value: "8.4K", width: 75 },
    { label: "MQLs", value: "2.1K", width: 50 },
    { label: "SQLs", value: "840", width: 35 },
    { label: "CLIENTES", value: "210", width: 20 },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[36] - Funil" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-14 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          FUNIL DE <span className="text-bb-accent">CONVERSÃO</span>
        </motion.h2>
        <div className="flex flex-col items-center gap-3">
          {stages.map((stage, i) => (
            <motion.div key={stage.label} className="flex items-center gap-8" {...fadeUp(stagger(i, 0.3))}>
              <span className="w-[100px] text-right font-bb-mono text-[16px] text-bb-dim" style={FONT_MONO}>{stage.label}</span>
              <div className="relative flex h-16 items-center justify-center" style={{ width: `${stage.width * 10}px` }}>
                <motion.div
                  className="absolute inset-0 origin-center bg-bb-accent"
                  style={{ opacity: 1 - i * 0.15, clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: stagger(i, 0.35), ease: EASE_SMOOTH } as Transition}
                />
                <span className="relative z-10 font-bb-sans text-[24px] font-black" style={{ color: "var(--bb-dark)", ...FONT_SANS }}>
                  {stage.value}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Funil" number="19" />
    </SlideLayout>
  )
}

export function SlideSWOT() {
  const quadrants = [
    { letter: "S", title: "FORÇAS", items: ["Equipe técnica senior", "Stack proprietária", "ROAS acima do mercado"], accent: true },
    { letter: "W", title: "FRAQUEZAS", items: ["Capacidade limitada de squads", "Dependência de plataformas"], accent: false },
    { letter: "O", title: "OPORTUNIDADES", items: ["Expansão para LATAM", "Novos canais (TikTok)", "AI para criativos"], accent: false },
    { letter: "T", title: "AMEAÇAS", items: ["Mudanças de privacidade", "Custo de mídia crescente", "Concorrência de preço"], accent: true },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[37] - Análise" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-12 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          ANÁLISE <span className="text-bb-accent">SWOT</span>
        </motion.h2>
        <div className="grid grid-cols-2 gap-4">
          {quadrants.map((item, i) => (
            <motion.div
              key={item.letter}
              className={cn("border border-bb-border p-10", item.accent ? "bg-[var(--bb-accent)]" : "bg-bb-surface")}
              {...scaleIn(stagger(i, 0.3))}
            >
              <div className="mb-6 flex items-center gap-4">
                <span
                  style={FONT_SANS}
                  className={cn(
                    "font-bb-sans text-[56px] font-black leading-none",
                    item.accent ? "text-[var(--bb-dark)]" : "text-bb-cream",
                  )}
                >
                  {item.letter}
                </span>
                <span className={cn("font-bb-mono text-[14px] tracking-[0.2em]", item.accent ? "text-[var(--bb-dark)]/60" : "text-bb-dim")} style={FONT_MONO}>
                  {item.title}
                </span>
              </div>
              <ul className="space-y-3">
                {item.items.map((text) => (
                  <li
                    key={text}
                    className={cn(
                      "flex items-center gap-3 font-bb-mono text-[17px]",
                      item.accent ? "text-[var(--bb-dark)]" : "text-bb-cream",
                    )}
                    style={FONT_MONO}
                  >
                    <span className="opacity-50">[+]</span> {text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Análise" number="20" />
    </SlideLayout>
  )
}

export function SlideStatsRow() {
  const stats = [
    { value: "2.945", label: "contas criadas" },
    { value: "2.630", label: "LLMs conectadas" },
    { value: "1.102", label: "agentes criados" },
    { value: "13.374", label: "mensagens enviadas" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <motion.h2 className="mb-[60px] font-bb-sans text-[64px] font-black leading-[1]" style={FONT_SANS} {...fadeUp(0.1)}>
          <span className="text-bb-accent">Resultados</span> das
          <br />
          primeiras 12 horas
        </motion.h2>
        <div className="grid grid-cols-4 gap-0">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="flex flex-col gap-2" {...fadeUp(stagger(i, 0.3))}>
              <span className="font-bb-sans text-[36px] font-black" style={FONT_SANS}>
                {stat.value}
              </span>
              <span className="text-[18px] text-bb-dim" style={FONT_SANS}>
                {stat.label}
              </span>
              <motion.div className="mt-2 h-[2px] w-full origin-left bg-bb-cream/20" {...growWidth(stagger(i, 0.4))} />
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Resultados" number="21" />
    </SlideLayout>
  )
}

export function SlideCaseStudyBold() {
  return (
    <SlideLayout>
      <div className="grid h-full grid-cols-[1fr_auto]">
        <div className="flex flex-col justify-center px-[140px]">
          <motion.div className="mb-[40px]" {...fadeUp(0.1)}>
            <span className="block font-bb-sans text-[64px] font-black leading-[0.95]" style={FONT_SANS}>
              AUMENTO DA CONVERSÃO
            </span>
            <span className="font-bb-sans text-[64px] font-black leading-[0.95]" style={FONT_SANS}>
              DE <span className="text-bb-accent">10,3%</span> PARA <span className="text-bb-accent">36,7%</span>
            </span>
          </motion.div>
          <motion.div {...fadeUp(0.3)}>
            <span className="block font-bb-sans text-[48px] font-black leading-[0.95] text-bb-dim" style={FONT_SANS}>
              RECUPERAÇÃO DE VENDAS
            </span>
            <span className="font-bb-sans text-[48px] font-black leading-[0.95] text-bb-dim" style={FONT_SANS}>
              EM <span className="text-bb-accent">30,4%</span>
            </span>
          </motion.div>
        </div>
        <motion.div className="flex w-[500px] flex-col justify-center gap-[60px] pr-[80px]" {...slideLeft(0.4)}>
          {[
            { title: "CASE VIVO", desc: "Conversão 3,5x superior" },
            { title: "CARRINHO ABANDONADO", desc: "Impacto +R$500.000" },
          ].map((item) => (
            <div key={item.title}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-[28px] w-[28px] items-center justify-center rounded-sm border border-bb-border">
                  <span className="font-bb-mono text-[10px] text-bb-accent" style={FONT_MONO}>
                    A
                  </span>
                </div>
                <span className="font-bb-sans text-[22px] font-black" style={FONT_SANS}>
                  {item.title}
                </span>
              </div>
              <span className="text-[20px] text-bb-dim" style={FONT_SANS}>
                {item.desc}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
      <SlideFooter section="Case" number="22" />
    </SlideLayout>
  )
}
