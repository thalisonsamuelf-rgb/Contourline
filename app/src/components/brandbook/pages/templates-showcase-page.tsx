"use client"

import type { ReactNode } from "react"
import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import {
  STARTER_BRAND_ASSETS,
  STARTER_PAGE_CHROME,
} from "@/components/brandbook/data/starter-brand-data"

type TemplateMetaItem = {
  label: string
  value: string
}

type TemplateDefinition = {
  index: string
  title: string
  subtitle: string
  preview: ReactNode
  bullets: string[]
  code: string[]
  meta: TemplateMetaItem[]
}

const frameworkPrinciples = [
  {
    value: "Shell First",
    label: "Hierarchy",
    body: "Comece por header, divider e blocos principais. O resto encaixa depois.",
  },
  {
    value: "Grid Density",
    label: "Composition",
    body: "A malha precisa refletir prioridade informacional, não simetria por hábito.",
  },
  {
    value: "Reusable Parts",
    label: "Maintenance",
    body: "Cada template deve gerar seções reaproveitáveis, não páginas fechadas demais.",
  },
] as const

function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="bb-template-eyebrow">{children}</span>
}

function BodyCopy({ children }: { children: ReactNode }) {
  return <p className="bb-template-body">{children}</p>
}

function MicroStat({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="bb-template-micro-stat">
      <span className="bb-template-micro-stat__value">{value}</span>
      <span className="bb-template-micro-stat__label">{label}</span>
    </div>
  )
}

function MetaList({ items }: { items: TemplateMetaItem[] }) {
  return (
    <div className="bb-template-meta">
      {items.map((item) => (
        <div key={item.label} className="bb-template-meta__item">
          <span className="bb-template-meta__label">{item.label}</span>
          <span className="bb-template-meta__value">{item.value}</span>
        </div>
      ))}
    </div>
  )
}

function PreviewFrame({ children }: { children: ReactNode }) {
  return <div className="bb-template-preview">{children}</div>
}

function CodeBlock({ lines }: { lines: string[] }) {
  return (
    <div className="bb-template-code">
      {lines.map((line) => (
        <div
          key={line}
          className={line.startsWith("<") ? "bb-template-code__line bb-template-code__line--accent" : "bb-template-code__line"}
        >
          {line}
        </div>
      ))}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="bb-template-bullets">
      {items.map((item) => (
        <div key={item} className="bb-template-bullet">
          <span className="bb-template-bullet__dot" />
          <BodyCopy>{item}</BodyCopy>
        </div>
      ))}
    </div>
  )
}

function ShellPreview() {
  return (
    <PreviewFrame>
      <div className="grid gap-0">
        <div className="flex h-[26px] items-center gap-2 border-b border-bb-border bg-bb-surface-panel px-3">
          <img
            src={STARTER_BRAND_ASSETS.logoLightSrc}
            alt={STARTER_BRAND_ASSETS.logoAlt}
            className="h-[10px]"
          />
          <span className="ml-auto font-bb-mono text-[0.42rem] uppercase tracking-[0.12em] text-bb-dim">
            nav / header / sections / footer
          </span>
        </div>
        <div className="border-b border-bb-border bg-bb-surface px-4 py-4 text-center">
          <span className="font-bb-display text-[0.88rem] font-black uppercase text-bb-cream">
            Page <span className="text-bb-accent">Shell</span>
          </span>
        </div>
        {["01 // Hero", "02 // System", "03 // Footer"].map((label) => (
          <div key={label} className="border-b border-bb-border px-4 py-3">
            <div className="mb-2 font-bb-mono text-[0.45rem] uppercase tracking-[0.12em] text-bb-dim">
              {label}
            </div>
            <div className="h-7 border border-bb-border bg-bb-surface-alt" />
          </div>
        ))}
      </div>
    </PreviewFrame>
  )
}

function BentoPreview() {
  const cells = [
    { id: "hero-kpi", label: "Hero KPI", className: "col-span-2 min-h-[78px]" },
    { id: "stat", label: "Stat", className: "min-h-[38px]" },
    { id: "trend", label: "Trend", className: "min-h-[38px]" },
    { id: "chart", label: "Chart", className: "col-span-2 min-h-[44px]" },
    { id: "sidebar", label: "Sidebar", className: "row-span-2 min-h-[90px]" },
    { id: "panel-a", label: "Panel", className: "min-h-[44px]" },
    { id: "panel-b", label: "Panel", className: "min-h-[44px]" },
    { id: "feed", label: "Feed", className: "col-span-2 min-h-[44px]" },
  ] as const

  return (
    <PreviewFrame>
      <div className="grid grid-cols-3 gap-px bg-bb-border p-[0.65rem]">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`flex items-center justify-center bg-bb-surface font-bb-mono text-[0.45rem] uppercase tracking-[0.08em] text-bb-dim ${cell.className}`}
          >
            {cell.label}
          </div>
        ))}
      </div>
    </PreviewFrame>
  )
}

function ContentGridPreview() {
  return (
    <PreviewFrame>
      <div className="grid grid-cols-3 gap-px bg-bb-border p-[0.65rem]">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="grid gap-2 bg-bb-surface p-3">
            <div className="aspect-[4/3] border border-bb-border bg-bb-dark" />
            <div className="h-1 w-[78%] bg-bb-cream opacity-45" />
            <div className="h-1 w-[52%] bg-bb-cream opacity-20" />
          </div>
        ))}
      </div>
    </PreviewFrame>
  )
}

function TemplateCard({
  index,
  title,
  subtitle,
  preview,
  bullets,
  code,
  meta,
}: TemplateDefinition) {
  return (
    <article className="bb-template-card">
      <div className="bb-template-card__header">
        <Eyebrow>{index}</Eyebrow>
        <h2 className="bb-template-card__title">{title}</h2>
        <BodyCopy>{subtitle}</BodyCopy>
      </div>

      {preview}

      <div className="bb-template-card__content">
        <div className="bb-template-card__stack">
          <BulletList items={bullets} />
          <MetaList items={meta} />
        </div>
        <CodeBlock lines={code} />
      </div>
    </article>
  )
}

const templates: TemplateDefinition[] = [
  {
    index: "01 // Shell",
    title: "Page Shell",
    subtitle:
      "Estrutura-base para páginas institucionais e de documentação com header forte, divisores claros e ritmo vertical consistente.",
    preview: <ShellPreview />,
    bullets: [
      "Melhor para guidelines, foundations e páginas canônicas do brandbook.",
      "Cria uma cadência previsível entre header, divider e blocos de conteúdo.",
      "Evita páginas improvisadas com hierarquia visual inconsistente.",
    ],
    meta: [
      {
        label: "Best For",
        value: "Guidelines, foundations, documentation and canonical brandbook routes.",
      },
      {
        label: "Signal",
        value: "High clarity, low ambiguity, strong top-to-bottom reading order.",
      },
      {
        label: "Build Rule",
        value: "Compose sections vertically and keep each block semantically explicit.",
      },
    ],
    code: [
      "<BrandbookSiteNav />",
      "<PageHeader />",
      "<SectionDivider />",
      "<main>{sections}</main>",
      "<FooterBar />",
    ],
  },
  {
    index: "02 // Dense Grid",
    title: "Bento Dashboard",
    subtitle:
      "Grid assimétrico para superfícies com densidade informacional alta, combinando hero, KPI, chart e áreas auxiliares sem perder ordem.",
    preview: <BentoPreview />,
    bullets: [
      "Ideal para workspaces, dashboards de operação e páginas de showcase técnico.",
      "Permite células com span diferentes sem quebrar a leitura.",
      "Funciona melhor quando cada bloco tem prioridade visual explícita.",
    ],
    meta: [
      {
        label: "Best For",
        value: "Operational views, data-heavy surfaces and high-density dashboards.",
      },
      {
        label: "Signal",
        value: "Strong visual hierarchy with hero, side rails and priority modules.",
      },
      {
        label: "Build Rule",
        value: "Assign spans by importance, not by symmetry or equal card sizing.",
      },
    ],
    code: [
      "display: grid",
      "grid-template-columns: repeat(3, 1fr)",
      "hero -> grid-column: span 2",
      "sidebar -> grid-row: span 2",
      "cards -> blocks modulares",
    ],
  },
  {
    index: "03 // Adaptive Grid",
    title: "Content Grid",
    subtitle:
      "Grade adaptativa para catálogos, cards e módulos repetíveis, com foco em responsividade limpa e manutenção simples.",
    preview: <ContentGridPreview />,
    bullets: [
      "Bom para bibliotecas de componentes, listas de assets e showcases visuais.",
      "Escala bem entre desktop e mobile com auto-fit ou colunas pré-definidas.",
      "Mantém consistência sem exigir regras específicas por item.",
    ],
    meta: [
      {
        label: "Best For",
        value: "Component catalogs, asset libraries and modular editorial collections.",
      },
      {
        label: "Signal",
        value: "Balanced repetition, simpler maintenance and responsive elasticity.",
      },
      {
        label: "Build Rule",
        value: "Keep item anatomy stable so the grid can collapse without custom fixes.",
      },
    ],
    code: [
      "display: grid",
      "grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))",
      "gap: 1px",
      "cards -> preview + meta + actions",
    ],
  },
]

export function TemplatesShowcasePage() {
  const chrome = STARTER_PAGE_CHROME.templatesShowcase

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={
          <>
            Template <span className="text-bb-accent">Grid</span>
          </>
        }
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />

      <main>
        <SectionDivider
          num="01"
          label="Starter Templates"
          concept="Shells · Dashboards · Content Systems"
        />

        <section className="bb-template-shell">
          <div className="bb-template-intro">
            <Eyebrow>Framework Intent</Eyebrow>

            <div className="bb-template-intro-grid">
              <div className="grid gap-[0.85rem]">
                <BodyCopy>
                  Esta página agora funciona como um catálogo de estruturas, não como uma sequência
                  de blocos longos. O objetivo é mostrar rapidamente onde o starter é forte:
                  shell institucional, grids densos e composições de conteúdo reaproveitáveis.
                </BodyCopy>
                <BodyCopy>
                  Em vez de vender layouts prontos, ela mostra padrões estruturais que podem ser
                  remixados para brandbooks, documentação, dashboards e showcases sem reinventar
                  a base a cada página.
                </BodyCopy>
              </div>

              <div className="bb-template-micro-stats">
                <div className="bb-template-micro-grid">
                  {[
                    { value: "03", label: "Archetypes" },
                    { value: "12", label: "Cols Max" },
                    { value: "CSS", label: "Grid First" },
                  ].map((item) => (
                    <MicroStat key={item.label} value={item.value} label={item.label} />
                  ))}
                </div>

                <div className="bb-template-note">
                  <Eyebrow>Template Logic</Eyebrow>
                  <BodyCopy>
                    Use shell para páginas canônicas, bento para densidade e grid adaptativo para
                    bibliotecas. A escolha deve seguir o ritmo da informação, não só a estética.
                  </BodyCopy>
                </div>
              </div>
            </div>
          </div>

          <div className="bb-template-principles">
            {frameworkPrinciples.map((item) => (
              <div key={item.label} className="bb-template-principle">
                <Eyebrow>{item.label}</Eyebrow>
                <span className="bb-template-principle__title">{item.value}</span>
                <BodyCopy>{item.body}</BodyCopy>
              </div>
            ))}
          </div>

          <div className="bb-template-card-grid">
            {templates.map((template) => (
              <TemplateCard key={template.index} {...template} />
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
