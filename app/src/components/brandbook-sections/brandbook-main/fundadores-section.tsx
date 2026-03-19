import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   FUNDADORES SECTION — Founders grid: Alan, Pedro, complementary dynamic
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const founders = [
  {
    initials: "AN",
    name: "ALAN NICOLAS",
    role: "Founder / Morpheus Humano",
    bio: "A voz, a paixao e a face do movimento. O mentor de pulso firme que guia os Criadores da visao a execucao focando em impacto real, ancorado pela metodologia AIOX e Story-Driven Development.",
  },
  {
    initials: "PV",
    name: "PEDRO VALERIO",
    role: "Co-Founder / Arquiteto Sistemico",
    bio: "O cerebro arquitetonico por tras da esteira operacional. Responsavel pelas estruturas de automacao maduras e logicas rigorosas que tornam o AIOX escalavel para o mundo corporativo inteiro.",
  },
]

interface FundadoresSectionProps {
  className?: string
}

export function FundadoresSection({ className }: FundadoresSectionProps) {
  return (
    <section id="fundadores" className={cn(className)}>
      <PanelHeader label="OS FUNDADORES" concept="People" num="13" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Section header */}
        <div style={{ marginBottom: "2rem" }}>
          <span
            style={{
              fontFamily: "var(--font-bb-mono)",
              color: "var(--bb-accent)",
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            13. Os Fundadores
          </span>
          <h2
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "2.5rem",
              fontWeight: 800,
              color: "var(--bb-cream)",
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              marginTop: "0.5rem",
            }}
          >
            A Lideranca
          </h2>
        </div>

        {/* 3-col grid: Alan | Pedro | Dynamic block */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {/* Founder columns */}
          {founders.map((founder) => (
            <div
              key={founder.initials}
              style={{
                background: "var(--bb-dark)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              {/* Photo placeholder */}
              <div
                style={{
                  aspectRatio: "1",
                  background: "var(--bb-surface)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--bb-dim)",
                  letterSpacing: "0.05em",
                }}
              >
                {founder.initials}
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.15rem",
                  fontWeight: 800,
                  color: "var(--bb-cream)",
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {founder.name}
              </h3>

              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.7rem",
                  color: "var(--bb-dim)",
                  textTransform: "uppercase",
                }}
              >
                {founder.role}
              </span>

              <p
                style={{
                  color: "var(--bb-dim)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {founder.bio}
              </p>
            </div>
          ))}

          {/* Dynamic complementary block */}
          <div
            style={{
              background: "var(--bb-accent)",
              color: "var(--bb-dark)",
              padding: "2.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "2.5rem",
                fontWeight: 800,
                color: "var(--bb-dark)",
                lineHeight: 1,
                marginBottom: "1.2rem",
                textTransform: "uppercase",
              }}
            >
              DINAMICA COMPLEMENTAR.
            </h3>

            <p
              style={{
                fontSize: "0.95rem",
                maxWidth: "80%",
                color: "rgba(0,0,0,0.7)",
                lineHeight: 1.6,
                margin: 0,
              }}
            >
              Alan vende o sonho e a provocacao. Pedro constroi a realidade e a
              estabilidade. Juntos, materializam a Seta para que o criador
              alcance o seu X.
            </p>

            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.65rem",
                borderTop: "1px solid rgba(0,0,0,0.15)",
                paddingTop: "0.8rem",
                marginTop: "2rem",
                color: "rgba(0,0,0,0.5)",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              VISAO + ENGENHARIA = EXECUCAO
            </div>
          </div>
        </div>
      </div>

      <FooterBar left="Leadership" center="Complementary Forces" right="13" />
    </section>
  )
}
