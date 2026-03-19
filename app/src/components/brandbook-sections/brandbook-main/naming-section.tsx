import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   NAMING SECTION — A→I→O→X letter flow, score table, naming architecture
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const letters = [
  { letter: "A", meaning: "Seta, AI", description: "O ponto de partida. A inteligência artificial como ferramenta, a seta que aponta." },
  { letter: "I", meaning: "Input", description: "Você. Sua visão, sua intenção, seu comando. Sem input humano, a IA não tem direção." },
  { letter: "O", meaning: "Output, Orquestração", description: "O resultado orquestrado. A IA trabalhando em sistema, não em fragmentos." },
  { letter: "X", meaning: "Destino, X marks the spot", description: "Onde você quer chegar. O X é seu -- e só seu. A marca no mapa." },
]

const scores = [
  { criteria: "Pronunciabilidade", score: 9 },
  { criteria: "Memorabilidade", score: 9 },
  { criteria: "Semântica", score: 10 },
  { criteria: "Internacional", score: 10 },
  { criteria: "Domínio", score: 7 },
  { criteria: "Diferenciação", score: 9 },
  { criteria: "Escalabilidade", score: 9 },
  { criteria: "Proteção Legal", score: 8 },
]

const totalScore = "89%"

const architecture = [
  { level: "Master Brand", name: "AIOX", description: "O sistema completo" },
  { level: "Sub-brand", name: "AIOX Studio", description: "Ambiente de criação" },
  { level: "Sub-brand", name: "AIOX Academy", description: "Educação e formação" },
  { level: "Produto", name: "AIOX Terminal", description: "Interface de comando" },
]

interface NamingSectionProps {
  className?: string
}

export function NamingSection({ className }: NamingSectionProps) {
  return (
    <section id="naming" className={cn(className)}>
      <PanelHeader label="NAMING" concept="Brand Name" num="07" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Letter flow: A → I → O → X */}
        <div
          className="flex flex-wrap items-center justify-center gap-0"
          style={{ marginBottom: "3rem" }}
        >
          {letters.map((l, i) => (
            <div key={l.letter} className="flex items-center">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1.5rem 2rem",
                  minWidth: "120px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "3rem",
                    color: l.letter === "O" ? "var(--bb-accent)" : "var(--bb-cream)",
                    lineHeight: 1,
                  }}
                >
                  {l.letter}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.6rem",
                    color: "var(--bb-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {l.meaning}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.7rem",
                    color: "var(--bb-dim)",
                    textAlign: "center",
                    maxWidth: "180px",
                    lineHeight: 1.4,
                  }}
                >
                  {l.description}
                </span>
              </div>
              {i < letters.length - 1 && (
                <span
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "1.5rem",
                    color: "var(--bb-dim)",
                    padding: "0 0.5rem",
                  }}
                >
                  →
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Score table */}
        <div
          style={{
            border: "1px solid var(--bb-border)",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              padding: "0.75rem 1.25rem",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderBottom: "1px solid var(--bb-border)",
              background: "var(--bb-surface)",
            }}
          >
            Name Score
          </div>
          {scores.map((row) => (
            <div
              key={row.criteria}
              className="flex justify-between items-center"
              style={{
                padding: "0.6rem 1.25rem",
                borderBottom: "1px solid var(--bb-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.8rem",
                  color: "var(--bb-cream)",
                }}
              >
                {row.criteria}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: row.score >= 9 ? "var(--bb-accent)" : "var(--bb-cream)",
                }}
              >
                {row.score}/10
              </span>
            </div>
          ))}
          {/* Total */}
          <div
            className="flex justify-between items-center"
            style={{
              padding: "0.75rem 1.25rem",
              background: "var(--bb-accent-05)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "0.85rem",
                textTransform: "uppercase",
                color: "var(--bb-cream)",
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "1.2rem",
                color: "var(--bb-accent)",
              }}
            >
              {totalScore}
            </span>
          </div>
        </div>

        {/* Naming architecture table */}
        <div style={{ border: "1px solid var(--bb-border)" }}>
          <div
            style={{
              padding: "0.75rem 1.25rem",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              borderBottom: "1px solid var(--bb-border)",
              background: "var(--bb-surface)",
            }}
          >
            Arquitetura de Naming
          </div>
          {architecture.map((row) => (
            <div
              key={row.name}
              className="flex items-center gap-4"
              style={{
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid var(--bb-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-dim)",
                  textTransform: "uppercase",
                  minWidth: "90px",
                }}
              >
                {row.level}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "var(--bb-cream)",
                  minWidth: "120px",
                }}
              >
                {row.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.8rem",
                  color: "var(--bb-dim)",
                }}
              >
                {row.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      <FooterBar left="Brand Name" center="Naming" right="07" />
    </section>
  )
}
