"use client"

import { cn } from "@/lib/utils"
import { FlowDiagram, type FlowNode, type FlowEdge } from "@/components/brandbook-sections/user-flow/flow-diagram"
import { IconFlowDiagram, type IconFlowNode, type IconFlowEdge } from "@/components/brandbook-sections/user-flow/icon-flow-diagram"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

/* ═══════════════════════════════════════════════════════════════════════════
   BROWNFIELD DISCOVERY WORKFLOW — Brandbook visualization
   Multi-agent technical debt assessment workflow (10 phases, 6 agents)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Shared inline patterns ─────────────────────────────────────────────── */

function SectionIntro({
  label,
  title,
  details,
}: {
  label: string
  title: string
  details: string[]
}) {
  return (
    <div className="px-8 pb-6 flex justify-between items-end border-b border-[var(--bb-border)] mb-8">
      <div>
        <div className="font-[var(--font-bb-mono)] text-[0.6rem] text-[var(--bb-accent)] uppercase tracking-widest mb-2">
          {label}
        </div>
        <div className="font-[var(--font-bb-display)] text-[clamp(1rem,2.5vw,1.4rem)] font-bold text-[var(--bb-cream)] tracking-tight">
          {title}
        </div>
      </div>
      <div className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-wider text-right">
        {details.map((line, i) => (
          <span key={i}>
            {line}
            {i < details.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  )
}

function ExampleBlock({ title, meta, children }: { title: string; meta: string; children: React.ReactNode }) {
  return (
    <div className="px-8 mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest">{title}</span>
        <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">{meta}</span>
      </div>
      {children}
    </div>
  )
}

function DescriptionBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 mb-8 font-[var(--font-bb-mono)] text-[0.6rem] text-[var(--bb-dim)] leading-relaxed max-w-3xl">
      {children}
    </div>
  )
}

function InfoGrid({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--bb-border)] mx-8 mb-8">
      {items.map((item) => (
        <div key={item.label} className="bg-[var(--bb-dark)] p-3 flex flex-col gap-1">
          <span className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-accent)] uppercase tracking-wider">
            {item.label}
          </span>
          <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-cream)]">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 01 — Main Workflow (FlowDiagram)
   16 nodes mapping the 10 phases + decision points + start/end
   ═══════════════════════════════════════════════════════════════════════════ */

const workflowNodes: FlowNode[] = [
  // FASES 1-3: Coleta de Dados
  { id: "start",     label: "Início",            sublabel: "brownfield discovery", x: 215, y: 10,  type: "start" },
  { id: "arch-doc",  label: "@architect",         sublabel: "Doc. do Sistema",     x: 215, y: 62,  type: "action" },
  { id: "has-db",    label: "Tem Database?",                                       x: 215, y: 124, type: "decision" },
  { id: "db-audit",  label: "@data-engineer",     sublabel: "Schema + Audit",      x: 50,  y: 195, type: "action" },
  { id: "ux-spec",   label: "@ux-expert",         sublabel: "Frontend Spec",       x: 380, y: 195, type: "action" },
  // FASE 4: Consolidação Inicial
  { id: "draft",     label: "@architect",         sublabel: "Consolida DRAFT",     x: 215, y: 268, type: "action", active: true },
  // FASES 5-7: Validação dos Especialistas
  { id: "val-db",    label: "@data-engineer",     sublabel: "Valida seção DB",     x: 215, y: 333, type: "action" },
  { id: "val-ux",    label: "@ux-expert",         sublabel: "Valida seção UX",     x: 215, y: 393, type: "action" },
  { id: "qa-review", label: "@qa",                sublabel: "Quality Gate",        x: 215, y: 453, type: "action" },
  { id: "qa-gate",   label: "QA Gate?",                                            x: 215, y: 518, type: "decision" },
  { id: "rework",    label: "Retrabalho",         sublabel: "Aplicar correções",   x: 415, y: 448, type: "action" },
  // FASES 8-9: Relatórios Finais
  { id: "assess",    label: "@architect",         sublabel: "Assessment Final",    x: 215, y: 595, type: "action" },
  { id: "report",    label: "@analyst",           sublabel: "Relatório Executivo", x: 215, y: 653, type: "action" },
  // FASE 10: Planning
  { id: "epic",      label: "@pm",                sublabel: "Criar Epic",          x: 215, y: 711, type: "action" },
  { id: "stories",   label: "@pm",                sublabel: "Criar Stories",       x: 215, y: 769, type: "action" },
  { id: "done",      label: "Discovery Completo",                                  x: 215, y: 830, type: "end" },
]

const workflowEdges: FlowEdge[] = [
  // Fases 1-3
  { from: "start",     to: "arch-doc" },
  { from: "arch-doc",  to: "has-db" },
  { from: "has-db",    to: "db-audit",  label: "sim" },
  { from: "has-db",    to: "ux-spec",   label: "não" },
  { from: "db-audit",  to: "ux-spec" },
  { from: "ux-spec",   to: "draft" },
  // Fases 5-7
  { from: "draft",     to: "val-db" },
  { from: "val-db",    to: "val-ux" },
  { from: "val-ux",    to: "qa-review" },
  { from: "qa-review", to: "qa-gate" },
  { from: "qa-gate",   to: "rework",    label: "needs work" },
  { from: "rework",    to: "draft" },
  // Fases 8-10
  { from: "qa-gate",   to: "assess",    label: "approved" },
  { from: "assess",    to: "report" },
  { from: "report",    to: "epic" },
  { from: "epic",      to: "stories" },
  { from: "stories",   to: "done" },
]

/* ─── Collapsible phase detail list ──────────────────────────────────────── */

const phases = [
  { num: "1",  name: "Coleta: Sistema",     agent: "@architect",     action: "*document-project",          output: "system-architecture.md",
    desc: "Analisa stack tecnológico, estrutura de pastas, dependências, padrões de código, pontos de integração e configurações. Identifica débitos como dependências desatualizadas, código duplicado, falta de testes e acoplamento excessivo." },
  { num: "2",  name: "Coleta: Database",    agent: "@data-engineer", action: "*db-schema-audit",           output: "SCHEMA.md + DB-AUDIT.md",
    desc: "Audita schema completo, relacionamentos, foreign keys, índices, RLS policies, views e functions. Identifica tabelas sem RLS, índices faltantes, normalização inadequada e migrations não versionadas. Condição: apenas se o projeto tem database." },
  { num: "3",  name: "Coleta: Frontend",    agent: "@ux-expert",     action: "*create-front-end-spec",     output: "frontend-spec.md",
    desc: "Documenta componentes UI, design system/tokens, padrões de layout, fluxos de usuário, responsividade, acessibilidade e performance percebida. Identifica inconsistências visuais, componentes duplicados e estados de loading/error faltando." },
  { num: "4",  name: "Consolidação",        agent: "@architect",     action: "consolidate_findings_draft", output: "technical-debt-DRAFT.md",
    desc: "Consolida todos os achados das Fases 1-3 em um DRAFT único. Cria matriz preliminar de débitos (ID, Área, Impacto, Esforço, Prioridade) e levanta perguntas para especialistas validarem nas fases seguintes." },
  { num: "5",  name: "Validação: DB",       agent: "@data-engineer", action: "review_and_validate",        output: "db-specialist-review.md",
    desc: "Valida débitos identificados, ajusta severidade, estima custos (horas + complexidade), prioriza pela perspectiva de risco de segurança e impacto em performance, e responde perguntas do @architect." },
  { num: "6",  name: "Validação: UX",       agent: "@ux-expert",     action: "review_and_validate",        output: "ux-specialist-review.md",
    desc: "Valida débitos de UX, estima custos (impacto visual vs funcional), prioriza por impacto na experiência do usuário, acessibilidade e consistência visual, e sugere soluções de design." },
  { num: "7",  name: "Validação: QA",       agent: "@qa",            action: "review_assessment",          output: "qa-review.md",
    desc: "Identifica gaps não cobertos, avalia riscos de segurança/regressão/integração, valida dependências entre débitos, sugere testes pós-resolução. Quality Gate: decide APPROVED (seguir) ou NEEDS WORK (retrabalhar DRAFT)." },
  { num: "8",  name: "Assessment Final",    agent: "@architect",     action: "finalize_assessment",        output: "technical-debt-assessment.md",
    desc: "Incorpora ajustes do @data-engineer e @ux-expert, endereça gaps do @qa, recalcula prioridades com inputs dos especialistas e define ordem final de resolução. Gera inventário completo com matriz de priorização final." },
  { num: "9",  name: "Relatório Executivo", agent: "@analyst",       action: "create_awareness_report",    output: "TECHNICAL-DEBT-REPORT.md",
    desc: "Cria documento para stakeholders com executive summary, análise de custos (resolver vs. não resolver), impacto no negócio (performance, segurança, UX, manutenibilidade), timeline recomendado (quick wins, fundação, otimização) e ROI da resolução." },
  { num: "10", name: "Planning",            agent: "@pm",            action: "*brownfield-create-epic",    output: "epic + stories",
    desc: "Cria epic com objetivo, escopo, critérios de sucesso, timeline e budget. Cada story inclui tasks claras, critérios de aceite específicos, testes requeridos (do QA review), estimativa validada e Definition of Done." },
]

function CollapsiblePhaseDetails() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2 w-full px-8 py-2 font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest cursor-pointer hover:text-[var(--bb-cream)] transition-colors">
        <span className="text-[var(--bb-accent)]">&#9656;</span> Fases Detalhadas (10 Fases)
        <span className="ml-auto text-[0.45rem]">click to toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-px bg-[var(--bb-border)] mx-8 mb-8">
          {phases.map((p) => (
            <div key={p.num} className="bg-[var(--bb-dark)] p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-accent)] uppercase font-bold">
                  Fase {p.num}
                </span>
                <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-cream)]">
                  {p.name}
                </span>
              </div>
              <span className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-cream)] opacity-70">
                {p.agent} &middot; {p.action}
              </span>
              <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)] leading-relaxed">
                {p.desc}
              </span>
              <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-accent)] opacity-50 mt-1">
                Output: {p.output}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function MainWorkflowSection() {
  return (
    <>
      <SectionIntro
        label="Workflow Principal"
        title="Fluxo de 10 Fases"
        details={[
          "16 nodes -- 17 edges",
          "2 decision points",
          "loop de retrabalho QA",
        ]}
      />

      <DescriptionBlock>
        <p className="mb-3 text-[var(--bb-cream)] text-[0.65rem]">
          O <strong>Brownfield Discovery</strong> é um workflow multi-agente completo para avaliação de
          débito técnico em projetos existentes. Projetado para projetos migrando de plataformas como
          Lovable, v0.dev, ou codebases legados.
        </p>
        <p className="mb-3">
          O workflow documenta o sistema de forma abrangente, identifica débitos técnicos em todas as
          camadas (sistema, database, frontend), valida achados com especialistas de domínio, gera
          relatórios executivos para stakeholders, e cria epics e stories prontas para desenvolvimento.
        </p>
        <p className="mb-3">
          O fluxo se organiza em 5 grupos de fases: <strong className="text-[var(--bb-cream)]">Fases 1-3</strong> (Coleta
          de Dados por 3 agentes especializados), <strong className="text-[var(--bb-cream)]">Fase 4</strong> (Consolidação
          inicial pelo @architect), <strong className="text-[var(--bb-cream)]">Fases 5-7</strong> (Validação por
          especialistas + Quality Gate com loop de retrabalho), <strong className="text-[var(--bb-cream)]">Fases
          8-9</strong> (Assessment Final + Relatório Executivo), e <strong className="text-[var(--bb-cream)]">Fase
          10</strong> (Planning com criação de Epic e Stories).
        </p>
      </DescriptionBlock>

      <InfoGrid
        items={[
          { label: "ID", value: "brownfield-discovery" },
          { label: "Versão", value: "2.0" },
          { label: "Tipo", value: "Brownfield" },
          { label: "Fases", value: "10" },
          { label: "Agentes", value: "6 especializados" },
          { label: "Decisions", value: "2 (DB + QA Gate)" },
          { label: "Loop", value: "QA retrabalho" },
          { label: "Output Final", value: "Epic + Stories" },
        ]}
      />

      <ExampleBlock
        title="Brownfield Discovery -- Fluxo Completo"
        meta="16 nodes / 17 edges / active: Consolida DRAFT"
      >
        <FlowDiagram
          nodes={workflowNodes}
          edges={workflowEdges}
          canvasWidth={560}
          canvasHeight={880}
          nodeWidth={130}
        />
      </ExampleBlock>

      <CollapsiblePhaseDetails />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 02 — Agent Map (IconFlowDiagram)
   6 agents connected to central "Brownfield Discovery" node
   ═══════════════════════════════════════════════════════════════════════════ */

const ICON_BUILDING = "M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4"
const ICON_DATABASE = "M12 2c5 0 9 1.3 9 3v14c0 1.7-4 3-9 3s-9-1.3-9-3V5c0-1.7 4-3 9-3ZM3 5c0 1.7 4 3 9 3s9-1.3 9-3M3 12c0 1.7 4 3 9 3s9-1.3 9-3"
const ICON_LAYOUT = "M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM3 9h18M9 21V9"
const ICON_SHIELD = "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10ZM9 12l2 2 4-4"
const ICON_CHART = "M18 20V10M12 20V4M6 20v-6"
const ICON_LIST = "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
const ICON_HUB = "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"

const agentMapNodes: IconFlowNode[] = [
  // Central hub
  { id: "center",  label: "Brownfield",    sublabel: "Discovery",          x: 290, y: 170, icon: ICON_HUB,      type: "primary", active: true },
  // Coleta (left)
  { id: "arch",    label: "@architect",     sublabel: "Aria · Visionary",  x: 40,  y: 20,  icon: ICON_BUILDING },
  { id: "data",    label: "@data-engineer", sublabel: "Dara · Sage",       x: 40,  y: 170, icon: ICON_DATABASE },
  { id: "ux",      label: "@ux-expert",     sublabel: "Uma · Empathizer",  x: 40,  y: 320, icon: ICON_LAYOUT },
  // Validação + Finalização (right)
  { id: "qa",      label: "@qa",            sublabel: "Quinn · Guardian",  x: 540, y: 20,  icon: ICON_SHIELD },
  { id: "analyst", label: "@analyst",       sublabel: "Atlas · Decoder",   x: 540, y: 170, icon: ICON_CHART },
  { id: "pm",      label: "@pm",            sublabel: "Morgan · Strategist", x: 540, y: 320, icon: ICON_LIST },
]

const agentMapEdges: IconFlowEdge[] = [
  { from: "center", to: "arch",    label: "Sistema & Consolidação" },
  { from: "center", to: "data",    label: "Database & Validação" },
  { from: "center", to: "ux",      label: "Frontend & UX" },
  { from: "center", to: "qa",      label: "Quality Gate" },
  { from: "center", to: "analyst", label: "Relatório Executivo" },
  { from: "center", to: "pm",      label: "Epic & Stories" },
]

/* ─── Agent profiles table ────────────────────────────────────────────────── */

const agentProfiles = [
  { id: "@architect",     name: "Aria",   archetype: "Visionary",   specialty: "Arquitetura de sistemas, design holístico",                   phases: "1, 4, 8" },
  { id: "@data-engineer", name: "Dara",   archetype: "Sage",        specialty: "PostgreSQL, Supabase, RLS, migrations",                       phases: "2, 5" },
  { id: "@ux-expert",     name: "Uma",    archetype: "Empathizer",  specialty: "Atomic Design, design tokens, acessibilidade",                phases: "3, 6" },
  { id: "@qa",            name: "Quinn",  archetype: "Guardian",    specialty: "Quality gates, testes, rastreabilidade",                      phases: "7" },
  { id: "@analyst",       name: "Atlas",  archetype: "Decoder",     specialty: "Pesquisa, análise, ROI, relatórios executivos",               phases: "9" },
  { id: "@pm",            name: "Morgan", archetype: "Strategist",  specialty: "PRDs, epics, priorização, story creation",                    phases: "10" },
]

function AgentMapSection() {
  return (
    <>
      <SectionIntro
        label="Mapa de Agentes"
        title="6 Agentes Especializados"
        details={[
          "7 nodes -- 6 edges",
          "coleta / validação / finalização",
          "cada agente com arquétipo único",
        ]}
      />

      <DescriptionBlock>
        <p className="mb-3 text-[var(--bb-cream)] text-[0.65rem]">
          O workflow é executado por 6 agentes especializados, cada um com um arquétipo e domínio
          de expertise distintos. Os agentes atuam em 3 grupos funcionais:
        </p>
        <p className="mb-2">
          <strong className="text-[var(--bb-cream)]">Coleta</strong> (esquerda) &mdash; @architect
          documenta o sistema, @data-engineer audita o banco de dados, e @ux-expert especifica o frontend.
          As Fases 1-3 podem ser parcialmente paralelizadas.
        </p>
        <p className="mb-2">
          <strong className="text-[var(--bb-cream)]">Validação</strong> (centro) &mdash; Cada especialista
          revisa e valida os débitos da sua área no DRAFT consolidado. O @qa atua como Quality Gate
          decidindo APPROVED ou NEEDS WORK.
        </p>
        <p className="mb-3">
          <strong className="text-[var(--bb-cream)]">Finalização</strong> (direita) &mdash; @architect
          produz o assessment final, @analyst cria o relatório executivo para stakeholders, e @pm
          transforma tudo em epic e stories prontas para desenvolvimento.
        </p>
      </DescriptionBlock>

      {/* Agent profiles grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-px bg-[var(--bb-border)] mx-8 mb-8">
        {agentProfiles.map((a) => (
          <div key={a.id} className="bg-[var(--bb-dark)] p-3 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-accent)] uppercase font-bold">
                {a.id}
              </span>
              <span className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-cream)]">
                {a.name} &middot; {a.archetype}
              </span>
            </div>
            <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)] leading-relaxed">
              {a.specialty}
            </span>
            <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-accent)] opacity-50">
              Fases: {a.phases}
            </span>
          </div>
        ))}
      </div>

      <ExampleBlock
        title="Brownfield Discovery -- Mapa de Agentes"
        meta="7 nodes / 6 edges / active: Hub Central"
      >
        <IconFlowDiagram
          nodes={agentMapNodes}
          edges={agentMapEdges}
          canvasWidth={700}
          canvasHeight={420}
        />
      </ExampleBlock>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 03 — Artifact Pipeline (FlowDiagram, horizontal)
   Entradas → Fases 1-3 → Fase 4 → Fases 5-7 → Fases 8-10
   ═══════════════════════════════════════════════════════════════════════════ */

const artifactNodes: FlowNode[] = [
  // Entradas
  { id: "e1", label: "Código Fonte",    sublabel: "entrada",  x: 20,  y: 25,  type: "start" },
  { id: "e2", label: "DB Schema",       sublabel: "entrada",  x: 20,  y: 85,  type: "start" },
  { id: "e3", label: "UI/Componentes",  sublabel: "entrada",  x: 20,  y: 145, type: "start" },
  { id: "e4", label: "Configurações",   sublabel: "entrada",  x: 20,  y: 205, type: "start" },
  // Fases 1-3
  { id: "a1", label: "system-arch",     sublabel: "fase 1",   x: 190, y: 25,  type: "action" },
  { id: "a2", label: "SCHEMA.md",       sublabel: "fase 2",   x: 190, y: 85,  type: "action" },
  { id: "a3", label: "DB-AUDIT.md",     sublabel: "fase 2",   x: 190, y: 145, type: "action" },
  { id: "a4", label: "frontend-spec",   sublabel: "fase 3",   x: 190, y: 205, type: "action" },
  // Fase 4
  { id: "b1", label: "tech-debt-DRAFT", sublabel: "fase 4",   x: 380, y: 112, type: "default", active: true },
  // Fases 5-7
  { id: "c1", label: "db-review",       sublabel: "fase 5",   x: 555, y: 50,  type: "action" },
  { id: "c2", label: "ux-review",       sublabel: "fase 6",   x: 555, y: 120, type: "action" },
  { id: "c3", label: "qa-review",       sublabel: "fase 7",   x: 555, y: 190, type: "action" },
  // Fases 8-10
  { id: "d1", label: "assessment",      sublabel: "fase 8",   x: 730, y: 25,  type: "action" },
  { id: "d2", label: "DEBT-REPORT",     sublabel: "fase 9",   x: 730, y: 90,  type: "action" },
  { id: "d3", label: "epic-debt",       sublabel: "fase 10",  x: 730, y: 155, type: "action" },
  { id: "d4", label: "story-*.md",      sublabel: "fase 10",  x: 730, y: 220, type: "end" },
]

const artifactEdges: FlowEdge[] = [
  // Entradas → Fases 1-3
  { from: "e1", to: "a1" },
  { from: "e2", to: "a2" },
  { from: "e2", to: "a3" },
  { from: "e3", to: "a4" },
  { from: "e4", to: "a1" },
  // Fases 1-3 → Fase 4
  { from: "a1", to: "b1" },
  { from: "a2", to: "b1" },
  { from: "a3", to: "b1" },
  { from: "a4", to: "b1" },
  // Fase 4 → Fases 5-7
  { from: "b1", to: "c1" },
  { from: "b1", to: "c2" },
  // Reviews → QA
  { from: "c1", to: "c3" },
  { from: "c2", to: "c3" },
  // Fases 5-7 → Fases 8-10
  { from: "c1", to: "d1" },
  { from: "c2", to: "d1" },
  { from: "c3", to: "d1" },
  // Sequência final
  { from: "d1", to: "d2" },
  { from: "d2", to: "d3" },
  { from: "d3", to: "d4" },
]

function ArtifactPipelineSection() {
  return (
    <>
      <SectionIntro
        label="Pipeline de Artefatos"
        title="Mapa de Dependências"
        details={[
          "16 nodes -- 19 edges",
          "entradas → fases → outputs",
          "layout horizontal LR",
        ]}
      />

      <DescriptionBlock>
        <p className="mb-3 text-[var(--bb-cream)] text-[0.65rem]">
          Cada fase do workflow produz artefatos .md específicos que alimentam as fases seguintes.
          O pipeline mostra o fluxo de dependências da esquerda para a direita, desde as entradas
          brutas até os outputs finais.
        </p>
        <p className="mb-2">
          <strong className="text-[var(--bb-cream)]">Entradas</strong> &mdash; Código fonte,
          database schema, UI/componentes e configurações do projeto existente.
        </p>
        <p className="mb-2">
          <strong className="text-[var(--bb-cream)]">Fases 1-3</strong> &mdash; Produzem
          system-architecture.md, SCHEMA.md, DB-AUDIT.md e frontend-spec.md. Todos convergem para
          a Fase 4.
        </p>
        <p className="mb-2">
          <strong className="text-[var(--bb-cream)]">Fase 4</strong> (ponto central) &mdash; O DRAFT
          consolida todos os achados e alimenta as validações especializadas.
        </p>
        <p className="mb-2">
          <strong className="text-[var(--bb-cream)]">Fases 5-7</strong> &mdash; Reviews de DB e UX
          convergem no qa-review.md que atua como quality gate.
        </p>
        <p className="mb-3">
          <strong className="text-[var(--bb-cream)]">Fases 8-10</strong> &mdash; Assessment final
          gera o relatório para stakeholders, que informa a criação de epic e stories prontas para
          desenvolvimento.
        </p>
      </DescriptionBlock>

      {/* File structure collapsible */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center gap-2 w-full px-8 py-2 font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest cursor-pointer hover:text-[var(--bb-cream)] transition-colors">
          <span className="text-[var(--bb-accent)]">&#9656;</span> Estrutura Final de Artefatos
          <span className="ml-auto text-[0.45rem]">click to toggle</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <pre className="mx-8 mb-8 p-4 bg-[var(--bb-surface)] border border-[var(--bb-border)] rounded-lg font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] leading-relaxed overflow-x-auto">
{`docs/
├── architecture/
│   └── system-architecture.md         [FASE 1]
├── frontend/
│   └── frontend-spec.md               [FASE 3]
├── reviews/
│   ├── db-specialist-review.md        [FASE 5]
│   ├── ux-specialist-review.md        [FASE 6]
│   └── qa-review.md                   [FASE 7]
├── prd/
│   ├── technical-debt-DRAFT.md        [FASE 4]
│   └── technical-debt-assessment.md   [FASE 8]
├── reports/
│   └── TECHNICAL-DEBT-REPORT.md       [FASE 9] ← Stakeholders
└── stories/
    ├── epic-technical-debt.md         [FASE 10]
    ├── story-1.1-*.md
    └── story-1.2-*.md

supabase/
└── docs/
    ├── SCHEMA.md                      [FASE 2]
    └── DB-AUDIT.md                    [FASE 2]`}
          </pre>
        </CollapsibleContent>
      </Collapsible>

      <ExampleBlock
        title="Brownfield Discovery -- Artefatos"
        meta="16 nodes / 19 edges / active: tech-debt-DRAFT"
      >
        <FlowDiagram
          nodes={artifactNodes}
          edges={artifactEdges}
          canvasWidth={900}
          canvasHeight={290}
          nodeWidth={120}
        />
      </ExampleBlock>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 04 — Decision Points (3 mini FlowDiagrams in grid)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Decision 1: Projeto tem Database? ──────────────────────────────────── */

const dec1Nodes: FlowNode[] = [
  { id: "q1", label: "Tem Database?",   x: 80,  y: 10,  type: "decision" },
  { id: "a1", label: "Executar FASE 2", sublabel: "@data-engineer", x: 10,  y: 100, type: "action" },
  { id: "a2", label: "Pular FASE 2",    sublabel: "ir para FASE 3", x: 150, y: 100, type: "action" },
  { id: "b1", label: "FASE 3: Frontend", sublabel: "@ux-expert",    x: 80,  y: 175, type: "default" },
]

const dec1Edges: FlowEdge[] = [
  { from: "q1", to: "a1", label: "sim" },
  { from: "q1", to: "a2", label: "não" },
  { from: "a1", to: "b1" },
  { from: "a2", to: "b1" },
]

/* ─── Decision 2: QA Gate ────────────────────────────────────────────────── */

const dec2Nodes: FlowNode[] = [
  { id: "q2", label: "QA Gate?",    x: 90,  y: 10,  type: "decision" },
  { id: "a3", label: "Prosseguir",  sublabel: "FASE 8",      x: 10,  y: 100, type: "action" },
  { id: "a4", label: "Retornar",    sublabel: "FASE 4",      x: 180, y: 100, type: "action" },
  { id: "a5", label: "Incorporar",  sublabel: "feedback QA",  x: 180, y: 168, type: "action" },
]

const dec2Edges: FlowEdge[] = [
  { from: "q2", to: "a3", label: "approved" },
  { from: "q2", to: "a4", label: "needs work" },
  { from: "a4", to: "a5" },
  { from: "a5", to: "q2" },
]

/* ─── Decision 3: Escopo do Epic ─────────────────────────────────────────── */

const dec3Nodes: FlowNode[] = [
  { id: "q3", label: "Escopo do Epic",  x: 100, y: 10,  type: "decision" },
  { id: "a7", label: "1-3 Stories",     sublabel: "simples",      x: 5,   y: 108, type: "action" },
  { id: "a8", label: "4+ Stories",      sublabel: "PRD completo", x: 110, y: 108, type: "action" },
  { id: "a9", label: "Arq. Nova",       sublabel: "greenfield",   x: 215, y: 108, type: "action" },
]

const dec3Edges: FlowEdge[] = [
  { from: "q3", to: "a7", label: "1-3" },
  { from: "q3", to: "a8", label: "4+" },
  { from: "q3", to: "a9", label: "nova arq." },
]

function DecisionPointsSection() {
  return (
    <>
      <SectionIntro
        label="Decision Points"
        title="3 Pontos de Decisão"
        details={[
          "3 mini-diagramas",
          "branching logic",
          "loop de QA feedback",
        ]}
      />

      <DescriptionBlock>
        <p className="mb-3 text-[var(--bb-cream)] text-[0.65rem]">
          O workflow possui 3 pontos de decisão que controlam o fluxo de execução. Cada decision point
          avalia critérios específicos para determinar qual caminho seguir.
        </p>
      </DescriptionBlock>

      <div className="px-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Decision 1 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest">Decision 01 -- Projeto tem Database?</span>
              <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">4 nodes</span>
            </div>
            <FlowDiagram
              nodes={dec1Nodes}
              edges={dec1Edges}
              canvasWidth={270}
              canvasHeight={220}
              nodeWidth={100}
              nodeHeight={32}
            />
            <div className="mt-3 font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] leading-relaxed space-y-1">
              <p className="text-[var(--bb-cream)] text-[0.55rem] font-bold mb-1">Critérios:</p>
              <p>&bull; Existe pasta supabase/ ou similar?</p>
              <p>&bull; Há arquivos de migration?</p>
              <p>&bull; Projeto usa Supabase, PostgreSQL, ou outro DB?</p>
              <p className="mt-2 opacity-70">Se não houver database, a FASE 2 é pulada e o fluxo segue direto para a FASE 3 (Frontend).</p>
            </div>
          </div>

          {/* Decision 2 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest">Decision 02 -- QA Gate</span>
              <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">4 nodes / loop</span>
            </div>
            <FlowDiagram
              nodes={dec2Nodes}
              edges={dec2Edges}
              canvasWidth={290}
              canvasHeight={220}
              nodeWidth={100}
              nodeHeight={32}
            />
            <div className="mt-3 font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] leading-relaxed space-y-1">
              <p className="text-[var(--bb-cream)] text-[0.55rem] font-bold mb-1">APPROVED quando:</p>
              <p>&bull; Todos os débitos validados por especialistas</p>
              <p>&bull; Nenhum gap crítico identificado</p>
              <p>&bull; Dependências fazem sentido</p>
              <p>&bull; Riscos estão mapeados</p>
              <p className="text-[var(--bb-cream)] text-[0.55rem] font-bold mt-2 mb-1">NEEDS WORK quando:</p>
              <p>&bull; Gaps não endereçados</p>
              <p>&bull; Débitos faltando validação</p>
              <p>&bull; Riscos cruzados não mitigados</p>
              <p>&bull; Dependências inconsistentes</p>
            </div>
          </div>

          {/* Decision 3 */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest">Decision 03 -- Escopo do Epic</span>
              <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">4 nodes / 3 saídas</span>
            </div>
            <FlowDiagram
              nodes={dec3Nodes}
              edges={dec3Edges}
              canvasWidth={310}
              canvasHeight={180}
              nodeWidth={100}
              nodeHeight={32}
            />
            <div className="mt-3 font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] leading-relaxed space-y-1">
              <p className="text-[var(--bb-cream)] text-[0.55rem] font-bold mb-1">3 caminhos possíveis:</p>
              <p><strong className="text-[var(--bb-cream)]">1-3 Stories</strong> &mdash; Usar brownfield-create-epic. Workflow simples, escopo contido.</p>
              <p><strong className="text-[var(--bb-cream)]">4+ Stories</strong> &mdash; Considerar PRD completo. Workflow extenso com mais planejamento.</p>
              <p><strong className="text-[var(--bb-cream)]">Arquitetura nova</strong> &mdash; Usar greenfield workflow. O escopo excedeu modernização e requer reescrita.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   EXPORTED SECTION COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

interface SectionProps {
  className?: string
}

export function BrownfieldWorkflowSection({ className }: SectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <MainWorkflowSection />
    </section>
  )
}

export function BrownfieldAgentMapSection({ className }: SectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <AgentMapSection />
    </section>
  )
}

export function BrownfieldArtifactSection({ className }: SectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <ArtifactPipelineSection />
    </section>
  )
}

export function BrownfieldDecisionSection({ className }: SectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <DecisionPointsSection />
    </section>
  )
}
