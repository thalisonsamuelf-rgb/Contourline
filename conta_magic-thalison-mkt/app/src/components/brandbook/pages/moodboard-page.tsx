"use client"

import { PageHeader } from "../chrome/page-header"
import { SectionDivider } from "../chrome/section-divider"
import { BbBadge } from "../atoms/bb-badge"
import {
  STARTER_PAGE_CHROME,
  STARTER_PALETTE,
  STARTER_TYPOGRAPHY_DNA,
} from "@/components/brandbook/data/starter-brand-data"

interface MoodboardCard {
  title: string
  file: string
  desc: string
  tags: { label: string; variant?: "accent" | "blue" | "surface" }[]
  influences: string[]
}

interface MoodboardCategory {
  num: string
  label: string
  concept: string
  categoryLabel: string
  categoryTitle: string
  categoryDesc: string
  cards: MoodboardCard[]
  gridCols?: number
}

const categories: MoodboardCategory[] = [
  {
    num: "01",
    label: "Web UI & Product",
    concept: "Sites e interfaces reais que definem o tom do starter",
    categoryLabel: "Categoria 01",
    categoryTitle: "Web UI & Product Design",
    categoryDesc: "Interfaces web reais que inspiram a linguagem visual do starter — dark-first, accent gold, tipografia monospace e grids modulares.",
    cards: [
      {
        title: "Symbiotic.fi",
        file: "b2ec385e43a7d471f497f078fc382171.webp",
        desc: "DeFi protocol com landing page dark-first. Grid de fundo sutil com linhas accent, tipografia tech mono bold e CTAs de alto contraste.",
        tags: [{ label: "Dark Grid", variant: "accent" }, { label: "Accent CTA", variant: "accent" }, { label: "Monospace" }, { label: "Web3" }, { label: "Hero Pattern", variant: "blue" }],
        influences: ["Hero Section", "Button System", "Grid Background"],
      },
      {
        title: "Age Gate Form UI",
        file: "d8fd523c13b98c0023ca5301c3111b4b.webp",
        desc: "Formulario de verificacao de idade com estetica dark+accent. Select inputs com chevron pixelado, botao ENTER bold.",
        tags: [{ label: "Form Design", variant: "accent" }, { label: "Accent System", variant: "accent" }, { label: "Pixel Art" }, { label: "Select UI" }, { label: "CTA Bold", variant: "blue" }],
        influences: ["Form Elements", "Select Styling", "CTA Pattern"],
      },
    ],
  },
  {
    num: "02",
    label: "HUD & Dashboard",
    concept: "Interfaces cockpit que definem o dark cockpit editorial do starter",
    categoryLabel: "Categoria 02",
    categoryTitle: "HUD & Dashboard Interfaces",
    categoryDesc: "Interfaces de cockpit, paineis de dados e gaming UI que inspiram o layout de informacao densa, gauges, KPIs.",
    cards: [
      {
        title: "FX-D Tread Cockpit",
        file: "4ffdb5a2c3f3c3030293be3a1f66ce4a.webp",
        desc: "Dashboard estilo cockpit militar/industrial. Paineis de dados com labels monospace, gauges com indicadores de accent.",
        tags: [{ label: "Dark Control Room", variant: "accent" }, { label: "Data Panels", variant: "accent" }, { label: "Gauges" }, { label: "Tracking" }, { label: "KPI Cards", variant: "blue" }],
        influences: ["Tables", "KPI Cards", "Charts", "Section Dividers"],
      },
      {
        title: "Rise UI Design Pack",
        file: "d0082d3d1efefb26f112c5bfe7304f1d.webp",
        desc: "Gaming UI design pack com player stats card. Rank system, KD ratio, score display, skill meters.",
        tags: [{ label: "Gaming UI", variant: "accent" }, { label: "Stats Card", variant: "accent" }, { label: "Rank System" }, { label: "KPI Display" }, { label: "Badge System", variant: "blue" }],
        influences: ["Cards", "Badges", "Rankings", "Progress Bars"],
      },
    ],
  },
  {
    num: "03",
    label: "Graphic & Pattern",
    concept: "Texturas, patterns e elementos graficos que definem o DNA visual",
    categoryLabel: "Categoria 03",
    categoryTitle: "Graphic Design & Patterns",
    categoryDesc: "Patterns geometricos, texturas e elementos graficos que formam a base visual.",
    gridCols: 3,
    cards: [
      {
        title: "Micro-Pattern Grid",
        file: "7e22a29aaee06324da5997dbb4ba489c.webp",
        desc: "Grid de micro-icones geometricos (X, O, diamond, square) em accent sobre preto.",
        tags: [{ label: "Pattern", variant: "accent" }, { label: "Micro Icons", variant: "accent" }, { label: "Modular Grid" }],
        influences: ["Background Patterns", "Wallpapers"],
      },
      {
        title: "Crosshair Grid",
        file: "79c48c2b5c8c14ce48d002e6c5583062.webp",
        desc: "Background ultra-dark com grid de crosshairs sutis (+). Minimalismo maximo.",
        tags: [{ label: "Background", variant: "accent" }, { label: "Crosshair" }, { label: "Minimal" }],
        influences: ["Page Backgrounds", "Hero Sections"],
      },
      {
        title: "HUD Icons & Frames",
        file: "f7169e877d519078704d2e72af02b25a.webp",
        desc: "Colecao de icones geometricos, frames HUD, hazard stripes e elementos decorativos.",
        tags: [{ label: "Iconografia", variant: "accent" }, { label: "HUD Frames", variant: "accent" }, { label: "Hazard Stripes" }],
        influences: ["Icons", "Alert Borders", "Decorative Elements"],
      },
    ],
  },
  {
    num: "04",
    label: "Layout & Typography",
    concept: "Templates e composicoes que definem a estrutura e tipografia",
    categoryLabel: "Categoria 04",
    categoryTitle: "Layout & Typography",
    categoryDesc: "Templates de layout, composicoes tipograficas e referencias de estrutura visual.",
    cards: [
      {
        title: "Cyberpunk 2077 HUD",
        file: "3c8e04e9daf942e0a0ef6daec1340520.webp",
        desc: "Estetica cyberpunk — accent quente sobre preto, circuit lines, warning badges e tipografia angular bold.",
        tags: [{ label: "Cyberpunk", variant: "accent" }, { label: "HUD Design", variant: "accent" }, { label: "Circuit Lines" }, { label: "Warning Badges" }, { label: "Angular Type", variant: "blue" }],
        influences: ["Visual Language", "Alert Components", "Decorative Lines"],
      },
      {
        title: "Cyber Template System",
        file: "978df003eb81a987c41235f6af2b911b.webp",
        desc: "Sistema de templates futuristas — poster/banner layouts com tipografia bold comprimida, corner brackets.",
        tags: [{ label: "Template System", variant: "accent" }, { label: "Bold Typography", variant: "accent" }, { label: "Corner Brackets" }, { label: "Barcode" }, { label: "Layout Composition", variant: "blue" }],
        influences: ["Templates", "Section Headers", "Typography Scale", "Corner Details"],
      },
    ],
  },
]

const dnaSummary = [
  { icon: "\u25FC", title: "Dark-First", desc: "Background #121213 como base. Superficies #151517. Informacao emerge da escuridao." },
  { icon: "\u25C6", title: `${STARTER_PALETTE.accent.name} Accent`, desc: `${STARTER_PALETTE.accent.hex} como cor de destaque unica. CTAs, status ativo, dados positivos.`, color: "var(--bb-accent)" },
  { icon: "\u2318", title: "Monospace Voice", desc: STARTER_TYPOGRAPHY_DNA },
  { icon: "\u229E", title: "Grid Precision", desc: "Layouts baseados em grid com gap de 1px e border como separador." },
  { icon: "\u26A0", title: "HUD Language", desc: "Section dividers como cockpit readouts. Corner brackets. Hazard stripes.", color: "var(--error)" },
  { icon: "\u25CE", title: "Data-Dense", desc: "Otimizado para exibir informacao densa — KPIs, rankings, metricas.", color: "var(--blue)" },
]

function MoodboardCardComponent({ card }: { card: MoodboardCard }) {
  return (
    <div style={{ background: "var(--dark)", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          minHeight: 240,
          display: "grid",
          placeItems: "center",
          padding: "1.5rem",
          borderBottom: "1px solid var(--border)",
          background:
            "linear-gradient(135deg, var(--bb-surface), var(--bb-surface-alt))",
        }}
      >
        <div style={{ width: "100%", maxWidth: 360, display: "grid", gap: "0.75rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--bb-accent)",
            }}
          >
            Reference Preview
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.35rem",
              fontWeight: 800,
              textTransform: "uppercase",
              color: "var(--bb-cream)",
            }}
          >
            {card.title}
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.8rem",
              lineHeight: 1.5,
              color: "var(--bb-dim)",
            }}
          >
            {card.desc}
          </div>
        </div>
      </div>
      <div style={{ padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "0.8rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--cream)" }}>
            {card.title}
          </span>
          <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--bb-accent-40)", letterSpacing: "0.04em", overflowWrap: "anywhere", maxWidth: "100%" }}>
            {card.file}
          </span>
        </div>
        <p style={{ fontSize: "0.7rem", color: "var(--dim)", lineHeight: 1.55, marginBottom: "0.75rem" }}>{card.desc}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
          {card.tags.map((tag) => (
            <BbBadge key={tag.label} variant={tag.variant ?? "surface"} style={{ fontSize: "0.45rem", padding: "0.2rem 0.6rem" }}>
              {tag.label}
            </BbBadge>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", paddingTop: "0.75rem", borderTop: "1px solid var(--border)" }}>
          <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.45rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em", flexShrink: 0 }}>
            Influencia &rarr;
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {card.influences.map((inf) => (
              <span
                key={inf}
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-accent)",
                  padding: "0.15rem 0.5rem",
                  background: "var(--bb-accent-05)",
                  border: "1px solid var(--bb-accent-20)",
                }}
              >
                {inf}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function MoodboardPage() {
  const chrome = STARTER_PAGE_CHROME.moodboard

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={<>Mood<span style={{ color: "var(--bb-accent)" }}>board</span></>}
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />

      {/* Stats bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 0, background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        {[
          { value: "9", label: "Referencias", accent: true },
          { value: "4", label: "Categorias" },
          { value: STARTER_PALETTE.accent.hex, label: "Accent Dominante" },
          { value: STARTER_PALETTE.dark.hex, label: "Base Dominante" },
        ].map((stat) => (
          <div key={stat.label} style={{ padding: "1rem 1.5rem", borderRight: "1px solid var(--border)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: stat.accent ? "var(--bb-accent)" : "var(--cream)", letterSpacing: "-0.02em" }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <main>
        {categories.map((cat) => (
          <div key={cat.num}>
            <SectionDivider label={`${cat.label}`} />
            {/* Category header */}
            <div style={{ padding: "2.5rem 2rem 1rem" }}>
              <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.35rem" }}>
                {cat.categoryLabel}
              </div>
              <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.2rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "-0.02em", color: "var(--cream)" }}>
                {cat.categoryTitle}
              </div>
              <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--dim)", marginTop: "0.35rem", maxWidth: 600, lineHeight: 1.6 }}>
                {cat.categoryDesc}
              </div>
            </div>
            {/* Cards grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: cat.gridCols ? `repeat(${cat.gridCols}, minmax(0, 1fr))` : "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                gap: "1px",
                background: "var(--border)",
              }}
            >
              {cat.cards.map((card) => (
                <MoodboardCardComponent key={card.title} card={card} />
              ))}
            </div>
          </div>
        ))}

        {/* Design DNA Summary */}
        <SectionDivider label="Design Principles" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1px", background: "var(--border)" }}>
          {dnaSummary.map((item) => (
            <div key={item.title} style={{ background: "var(--dark)", padding: "1.5rem" }}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem", color: item.color }}>
                {item.icon}
              </div>
              <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "0.75rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.02em", color: "var(--cream)", marginBottom: "0.35rem" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "0.65rem", color: "var(--dim)", lineHeight: 1.5 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
