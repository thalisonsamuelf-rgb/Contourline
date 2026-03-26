import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   POSICIONAMENTO SECTION — 3-col info, polarity tags, WHY/HOW/WHAT pyramid
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const infoColumns = [
  {
    label: "Categoria",
    value: "AI Orchestration Experience",
  },
  {
    label: "Público",
    value: "Criadores e empreendedores com visão que bateram no teto do no-code",
  },
  {
    label: "Onlyness",
    value: "O único sistema que transforma leigos em operadores de IA com resultados profissionais em dias, não meses",
  },
]

const polarityE = [
  "Empoderador",
  "Profundo",
  "Provocativo",
  "Sistêmico",
  "Real",
]

const polarityNaoE = [
  "Paternalista",
  "Superficial",
  "Agressivo",
  "Fragmentado",
  "Teatral",
]

const pyramid = [
  {
    level: "WHY",
    text: "Libertar o potencial criativo humano das barreiras técnicas",
    color: "var(--bb-accent)",
  },
  {
    level: "HOW",
    text: "Sistema orquestrado de IA que comprime meses em dias",
    color: "var(--bb-blue)",
  },
  {
    level: "WHAT",
    text: "AI Orchestration Experience para criadores e empreendedores",
    color: "var(--bb-cream)",
  },
]

interface PosicionamentoSectionProps {
  className?: string
}

export function PosicionamentoSection({ className }: PosicionamentoSectionProps) {
  return (
    <section id="posicionamento" className={cn(className)}>
      <PanelHeader label="POSICIONAMENTO" concept="Brand Positioning" num="04" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* 3 column info grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {infoColumns.map((col) => (
            <div
              key={col.label}
              style={{
                background: "var(--bb-dark)",
                padding: "1.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.75rem",
                }}
              >
                {col.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.9rem",
                  lineHeight: 1.5,
                  color: "var(--bb-cream)",
                }}
              >
                {col.value}
              </div>
            </div>
          ))}
        </div>

        {/* Polarity tags */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "var(--bb-border)",
            marginTop: "2rem",
          }}
        >
          {/* E column */}
          <div style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              E
            </div>
            <div className="flex flex-wrap gap-2">
              {polarityE.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "0.35rem 0.75rem",
                    border: "1px solid var(--bb-accent)",
                    color: "var(--bb-accent)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* NAO E column */}
          <div style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-flare)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "1rem",
              }}
            >
              NÃO É
            </div>
            <div className="flex flex-wrap gap-2">
              {polarityNaoE.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    padding: "0.35rem 0.75rem",
                    border: "1px solid var(--bb-flare)",
                    color: "var(--bb-flare)",
                    opacity: 0.7,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* WHY / HOW / WHAT pyramid */}
        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Golden Circle
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            {pyramid.map((row, i) => (
              <div
                key={row.level}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  padding: "1.25rem 2rem",
                  background: "var(--bb-surface)",
                  borderLeft: `3px solid ${row.color}`,
                  marginLeft: `${i * 2}rem`,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "0.85rem",
                    textTransform: "uppercase",
                    color: row.color,
                    minWidth: "50px",
                  }}
                >
                  {row.level}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.85rem",
                    color: "var(--bb-cream)",
                    lineHeight: 1.4,
                  }}
                >
                  {row.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterBar left="Brand Positioning" center="Posicionamento" right="04" />
    </section>
  )
}
