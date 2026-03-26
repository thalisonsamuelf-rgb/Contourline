"use client"

import { motion } from "framer-motion"

import { fadeIn, fadeUp, growHeight, scaleIn, slideLeft, slideRight, stagger } from "@/components/brandbook/motion"
import { STARTER_RUNTIME_LABELS } from "@/components/brandbook/data/starter-brand-data"
import {
  CornerMarks,
  FONT_MONO,
  FONT_SANS,
  SectionTag,
  SlideFooter,
  SlideLayout,
  WatermarkNumber,
} from "@/components/brandbook/slides/shared"

export function SlideTextOnly() {
  return (
    <SlideLayout>
      <CornerMarks opacity={0.12} />
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[02] - Contexto" delay={0.1} />
        <motion.div className="mb-6 mt-8 border-b-[3px] border-bb-accent pb-6" {...fadeUp(0.2)}>
          <h2 style={FONT_SANS} className="font-bb-sans text-[64px] font-black leading-[1.05]">
            &ldquo;O mercado não espera.
            <br />
            <span style={{ background: "var(--bb-accent)", color: "var(--bb-dark)", padding: "0.05em 0.2em" }}>
              Nós também não.
            </span>
            &rdquo;
          </h2>
        </motion.div>
        <motion.p className="max-w-[900px] text-[32px] leading-[1.4] text-bb-dim" style={FONT_SANS} {...fadeUp(0.5)}>
          Velocidade de execução.
          <br />
          Precisão cirúrgica.
        </motion.p>
      </div>
      <SlideFooter section="Contexto" number="02" />
    </SlideLayout>
  )
}

export function SlideBulletList() {
  const items = [
    { num: "I", title: "CONFIGURAÇÃO", desc: "Workspace configurado com 10+ agentes especializados para cada domínio do seu negócio." },
    { num: "II", title: "INTEGRAÇÃO", desc: "Workflows de copy, design e desenvolvimento conectados ao seu stack existente." },
    { num: "III", title: "DASHBOARD", desc: "Métricas e performance em tempo real. Visibilidade total da operação." },
    { num: "IV", title: "ESCALA", desc: "Verificação de qualidade automática. Suporte contínuo. Atualizações do framework." },
  ]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.12} />
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <motion.div className="mb-2 border-t-[4px] border-bb-accent pt-4" {...fadeUp(0.1)}>
          <span className="font-bb-sans text-[52px] font-black" style={FONT_SANS}>
            6. O QUE VOCÊ RECEBE.
          </span>
        </motion.div>
        <motion.span className="mb-10 font-bb-mono text-[14px] tracking-[0.2em] text-bb-dim" style={FONT_MONO} {...fadeIn(0.2)}>
          JORNADA DE IMPLEMENTAÇÃO // 4 FASES
        </motion.span>
        <div className="flex flex-col">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              className="flex gap-6 py-6"
              style={{ borderBottom: i < items.length - 1 ? "1px solid rgba(244, 244, 232, 0.1)" : "none" }}
              {...slideRight(stagger(i, 0.3))}
            >
              <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center bg-bb-accent" style={FONT_MONO}>
                <span className="text-[22px] font-bold" style={{ color: "var(--bb-dark)" }}>
                  {item.num}
                </span>
              </div>
              <div>
                <h3 className="mb-2 font-bb-sans text-[26px] font-black uppercase" style={FONT_SANS}>
                  {item.title}
                </h3>
                <p className="text-[24px] leading-[1.3] text-bb-dim" style={FONT_SANS}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Entrega" number="06" />
    </SlideLayout>
  )
}

export function SlideWhatWeDo() {
  const cols = [
    {
      n: "01",
      title: "ORQUESTRAÇÃO",
      desc: "Coordenação de agentes IA para workflows complexos de desenvolvimento, marketing e estratégia",
    },
    {
      n: "02",
      title: "AUTOMAÇÃO",
      desc: "Processos repetitivos eliminados com agentes autônomos que operam 24/7 sem intervenção",
    },
    {
      n: "03",
      title: "ESTRATÉGIA",
      desc: "Decisões baseadas em dados com advisory boards IA e análise multi-dimensional",
    },
  ]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <div className="mb-auto flex items-start justify-between pt-[162px]">
          <div>
            <SectionTag label="[17] - Serviços" delay={0.1} />
            <motion.h2 style={FONT_SANS} className="mt-4 font-bb-sans text-[64px] font-black" {...fadeUp(0.2)}>
              O QUE
              <br />
              <span className="text-bb-accent">FAZEMOS?</span> ++
            </motion.h2>
          </div>
          <motion.span style={FONT_SANS} className="font-bb-sans text-[48px] font-black text-bb-accent" {...fadeIn(0.3)}>
            04
          </motion.span>
        </div>
        <div className="mb-[100px] grid grid-cols-3 gap-12">
          {cols.map((col, i) => (
            <motion.div key={col.n} className="flex flex-col gap-4" {...fadeUp(stagger(i, 0.4))}>
              <span style={FONT_SANS} className="font-bb-sans text-[36px] font-black text-bb-accent">
                {col.n}
              </span>
              <h3 style={FONT_SANS} className="font-bb-sans text-[24px] font-black">
                {col.title}
              </h3>
              <p className="font-bb-mono text-[17px] leading-relaxed text-bb-dim" style={FONT_MONO}>{col.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Serviços" number="04" />
    </SlideLayout>
  )
}

export function SlideNumberedList() {
  const items = [
    { n: "01", title: "QUALIDADE", desc: "Frameworks testados e validados em produção real" },
    { n: "02", title: "CONSULTORIA", desc: "Suporte direto dos criadores do sistema" },
    { n: "03", title: "SUSTENTABILIDADE", desc: "Modelo de operação escalável e sustentável" },
  ]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <SectionTag label="[18] - Diferenciais" delay={0.1} />
        <motion.span className="mt-8 font-bb-mono text-[14px] text-bb-dim" style={FONT_MONO} {...fadeIn(0.15)}>
          ++
        </motion.span>
        <div className="mt-12 space-y-8">
          {items.map((item, i) => (
            <motion.div key={item.n} className="flex items-start gap-8" {...slideRight(stagger(i, 0.3))}>
              <span style={FONT_SANS} className="w-[80px] shrink-0 font-bb-sans text-[48px] font-black leading-none text-bb-accent">
                {item.n}
              </span>
              <div className="flex flex-1 flex-col gap-2 border-b border-bb-border pb-8">
                <h3 style={FONT_SANS} className="font-bb-sans text-[28px] font-black">
                  {item.title}
                </h3>
                <p className="font-bb-mono text-[18px] text-bb-dim" style={FONT_MONO}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Diferenciais" number="05" />
    </SlideLayout>
  )
}

export function SlideMissionDots() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 50% 40%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex flex-col justify-center px-[200px]">
        <motion.div className="mb-8 flex gap-3" {...fadeUp(0.1)}>
          <span className="h-[16px] w-[16px] rounded-full bg-bb-accent" />
          <span className="h-[16px] w-[16px] rounded-full bg-bb-accent/40" />
          <span className="h-[16px] w-[16px] rounded-full bg-bb-accent/40" />
        </motion.div>
        <motion.h2 style={FONT_SANS} className="mb-12 font-bb-sans text-[64px] font-black" {...fadeUp(0.2)}>
          NOSSA <span className="text-bb-accent">MISSÃO</span>
        </motion.h2>
        <div className="grid grid-cols-2 gap-16">
          <motion.p className="font-bb-mono text-[20px] leading-relaxed text-bb-dim" style={FONT_MONO} {...slideRight(0.4)}>
            Criar um ecossistema onde qualquer pessoa pode orquestrar agentes IA para automatizar processos complexos
            sem precisar de conhecimento técnico profundo.
          </motion.p>
          <motion.p className="font-bb-mono text-[20px] leading-relaxed text-bb-dim" style={FONT_MONO} {...slideLeft(0.4)}>
            Transformar a relação entre humanos e inteligência artificial, tornando a automação acessível, previsível
            e centrada no resultado do negócio.
          </motion.p>
        </div>
      </div>
      <SlideFooter section="Missão" number="03" />
    </SlideLayout>
  )
}

export function SlideIconGrid() {
  const items = [
    { icon: "//", title: "AUTOMAÇÃO", desc: "Workflows autônomos 24/7" },
    { icon: "><", title: "PRECISÃO", desc: "Verificação de qualidade integrada" },
    { icon: "[]", title: "DADOS", desc: "Métricas em tempo real" },
    { icon: "<>", title: "ITERAÇÃO", desc: "Melhoria contínua" },
    { icon: "##", title: "SEGURANÇA", desc: "Padrões enterprise" },
    { icon: "^^", title: "ESCALA", desc: "Sem limites operacionais" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 50% 40%, var(--bb-accent), transparent 60%)" }} />
      <div className="absolute inset-0 flex flex-col justify-center px-[140px]">
        <SectionTag label="[28] - Capacidades" delay={0.1} />
        <motion.h2 style={FONT_SANS} className="mb-14 mt-6 font-bb-sans text-[52px] font-black" {...fadeUp(0.2)}>
          O QUE O SISTEMA <span className="text-bb-accent">FAZ</span>
        </motion.h2>
        <div className="grid grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div key={item.title} className="border border-bb-border p-10" {...scaleIn(stagger(i, 0.3))}>
              <span className="font-bb-mono text-[32px] font-bold leading-none text-bb-accent" style={FONT_MONO}>{item.icon}</span>
              <h3 style={FONT_SANS} className="mt-4 font-bb-sans text-[22px] font-black">
                {item.title}
              </h3>
              <p className="mt-3 font-bb-mono text-[16px] text-bb-dim" style={FONT_MONO}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Capacidades" number="07" />
    </SlideLayout>
  )
}

export function SlideEcosystem() {
  const items = ["COPY", "DESIGN", "DEV", "DADOS", "OPS", "ESTRATÉGIA", "TRÁFEGO", "PESQUISA"]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative h-[700px] w-[700px]" {...scaleIn(0.2)}>
          <div className="absolute inset-0 rounded-full border border-bb-border/30" />
          <div className="absolute inset-[80px] rounded-full border border-bb-border/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bb-mono text-[28px] tracking-[0.3em] text-bb-dim" style={FONT_MONO}>
              {STARTER_RUNTIME_LABELS.workspaceLabel.toUpperCase()}
            </span>
          </div>
          {items.map((item, i) => {
            const angle = (i / items.length) * 360 - 90
            const rad = (angle * Math.PI) / 180
            const x = 50 + 42 * Math.cos(rad)
            const y = 50 + 42 * Math.sin(rad)

            return (
              <motion.div
                key={item}
                className="absolute flex h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bb-border bg-bb-surface"
                style={{ left: `${x}%`, top: `${y}%` }}
                {...scaleIn(stagger(i, 0.3))}
              >
                <span className="font-bb-mono text-[11px] tracking-[0.15em] text-bb-cream" style={FONT_MONO}>
                  {item}
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
      <SlideFooter section="Ecossistema" number="08" />
    </SlideLayout>
  )
}

export function SlideVsComparison() {
  return (
    <SlideLayout>
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-[162px]">
        <motion.h1 className="text-center font-bb-sans text-[80px] font-black tracking-[-2px]" style={FONT_SANS} {...fadeUp(0.1)}>
          ASSISTENTES <span className="text-bb-accent">vs</span> AGENTES
        </motion.h1>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-[220px] grid grid-cols-2 gap-[2px]">
        <motion.div className="flex flex-col items-center justify-center" {...slideRight(0.3)}>
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-2xl border border-bb-border bg-bb-surface">
            <span className="font-bb-mono text-[16px] text-bb-dim" style={FONT_MONO}>
              ASSISTENTE
            </span>
          </div>
          <span className="mt-6 text-[20px] text-bb-dim" style={FONT_SANS}>
            Reativo. Limitado.
          </span>
        </motion.div>
        <motion.div className="flex flex-col items-center justify-center" {...slideLeft(0.3)}>
          <div className="flex h-[300px] w-[300px] items-center justify-center rounded-2xl border border-bb-accent/30 bg-bb-surface">
            <span className="font-bb-mono text-[16px] text-bb-accent" style={FONT_MONO}>
              AGENTE IA
            </span>
          </div>
          <span className="mt-6 text-[20px] text-bb-cream" style={FONT_SANS}>
            Autônomo. Conectado.
          </span>
        </motion.div>
      </div>
      <SlideFooter section="Comparativo" number="09" />
    </SlideLayout>
  )
}

export function SlideMindMap() {
  const branches = [
    { name: "O X", desc: "Definir destino e meta do cliente" },
    { name: "A SETA", desc: "IA como força propulsora do resultado" },
    { name: "O TERMINAL", desc: "Base técnica real, sem abstração" },
    { name: "A CLAREZA", desc: "Verdade através da complexidade" },
    { name: "A JORNADA", desc: "Do diagnóstico à escala" },
    { name: "O RESULTADO", desc: "Números que comprovam a tese" },
  ]

  return (
    <SlideLayout>
      <CornerMarks opacity={0.08} />
      <div className="absolute inset-0 flex items-center px-[100px] py-[162px]">
        <motion.div className="mr-[40px] shrink-0" {...slideRight(0.1)}>
          <span className="block border border-bb-border bg-bb-surface px-6 py-4 font-bb-sans text-[36px] font-black leading-[1]" style={FONT_SANS}>
            FRAMEWORK
            <br />
            {STARTER_RUNTIME_LABELS.workspaceLabel.toUpperCase()}
          </span>
        </motion.div>
        <div className="flex flex-1 flex-col gap-[20px]">
          {branches.map((branch, i) => (
            <motion.div key={branch.name} className="flex items-center gap-4" {...slideRight(stagger(i, 0.2))}>
              <div className="h-[1px] w-[60px] bg-bb-border" />
              <span className="border border-bb-border bg-bb-surface/80 px-5 py-3 font-bb-sans text-[22px] font-black" style={FONT_SANS}>
                {branch.name}
              </span>
              <div className="h-[1px] w-[40px] bg-bb-border" />
              <span className="text-[18px] text-bb-dim" style={FONT_SANS}>
                {branch.desc}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Método" number="10" />
    </SlideLayout>
  )
}

export function SlideStepsBento() {
  const steps = [
    { n: "1", title: "DIAGNÓSTICO", desc: "Mapeamos seu negócio", icon: "↑" },
    { n: "2", title: "ARQUITETURA", desc: "Desenhamos os agentes", icon: "◈" },
    { n: "3", title: "ATIVAÇÃO", desc: "Deploy do squad completo", icon: "▶" },
    { n: "4", title: "ESCALA", desc: "Métricas e otimização", icon: "◎" },
  ]

  return (
    <SlideLayout>
      <div className="absolute inset-0 flex flex-col px-[100px] py-[162px]">
        <motion.h2 className="mb-3 text-center font-bb-sans text-[48px] font-black" style={FONT_SANS} {...fadeUp(0.1)}>
          SEU AGENTE PRONTO EM 4 PASSOS
        </motion.h2>
        <motion.p className="mb-[40px] text-center text-[20px] text-bb-dim" style={FONT_SANS} {...fadeUp(0.15)}>
          SEM PROGRAMAÇÃO. DO ZERO AO DEPLOY.
        </motion.p>
        <div className="grid flex-1 grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              className="flex flex-col rounded-lg border border-bb-border bg-bb-surface p-6"
              {...scaleIn(stagger(i, 0.2))}
            >
              <span className="font-bb-sans text-[16px] font-black" style={FONT_SANS}>
                {step.n}. {step.title}
              </span>
              <span className="mt-2 text-[14px] text-bb-dim" style={FONT_SANS}>
                {step.desc}
              </span>
              <div className="mt-4 flex flex-1 items-center justify-center rounded border border-bb-border bg-bb-dark">
                <span className="text-[40px] text-bb-accent/60">
                  {step.icon}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <SlideFooter section="Passos" number="11" />
    </SlideLayout>
  )
}

export function SlideSectionBreak() {
  return (
    <SlideLayout>
      <div className="absolute inset-0 opacity-[0.04]" style={{ background: "radial-gradient(ellipse at 50% 50%, var(--bb-accent), transparent 60%)" }} />
      <CornerMarks opacity={0.2} />
      <WatermarkNumber n="02" className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <motion.div className="h-[100px] w-[1px] origin-top bg-bb-accent/40" {...growHeight(0.1)} />
        <motion.span className="my-8 font-bb-mono text-[16px] uppercase tracking-[0.5em] text-bb-dim" style={FONT_MONO} {...fadeIn(0.3)}>
          Parte 02
        </motion.span>
        <motion.h2 style={FONT_SANS} className="font-bb-sans text-[140px] font-black leading-none tracking-[-3px]" {...scaleIn(0.4)}>
          FRAMEWORK
        </motion.h2>
        <motion.div className="mt-8 h-[100px] w-[1px] origin-top bg-bb-accent/40" {...growHeight(0.7)} />
      </div>
    </SlideLayout>
  )
}
