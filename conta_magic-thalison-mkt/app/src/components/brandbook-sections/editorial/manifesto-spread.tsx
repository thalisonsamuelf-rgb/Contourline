import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   MANIFESTO SPREAD // Core belief + positioning
   Server component. Left page shows manifesto, right page shows positioning.
   Dark variant — text in cream, highlights in lime.
   ═══════════════════════════════════════════════════════════════════════════ */

interface ManifestoSpreadProps {
  className?: string
}

const positioningCards = [
  {
    label: "O INIMIGO",
    title: "A COMPLEXIDADE QUE ROUBA",
    desc: "O sistema invisivel que convenceu o mundo de que criar e 'dificil demais para voce'. Ferramentas visuais que PARECEM faceis mas quebram. A narrativa de que 'programar e assustador'.",
    style: { border: "2px solid var(--bb-accent)" } as React.CSSProperties,
    titleColor: "var(--bb-cream)",
    labelColor: "var(--bb-dim)",
  },
  {
    label: "AUDIENCIA",
    title: "OS LEGENDARIOS",
    desc: "Criadores que reconhecem que o poder de construir nunca saiu deles. So estava escondido atras de complexidade desnecessaria. E escolheram tomar a pilula vermelha.",
    style: { background: "var(--bb-accent)", color: "var(--bb-dark)" } as React.CSSProperties,
    titleColor: "var(--bb-dark)",
    labelColor: "rgba(0,0,0,0.5)",
  },
  {
    label: "CATEGORIA",
    title: "AI ORCHESTRATION EXPERIENCE",
    desc: "CLI First. A CLI e a fonte da verdade. Dashboards apenas observam. Funcionalidades novas devem funcionar 100% via CLI antes de ter UI.",
    style: { background: "var(--bb-surface)", color: "var(--bb-cream)" } as React.CSSProperties,
    titleColor: "var(--bb-accent)",
    labelColor: "var(--bb-dim)",
  },
]

export function ManifestoSpread({ className }: ManifestoSpreadProps) {
  return (
    <SpreadSection className={cn(className)} variant="dark">
      {/* LEFT PAGE // The Manifesto */}
      <Page side="left" pageNumber={7} variant="dark" sectionName="Manifesto">
        <SectionNumber variant="dark">8. O MANIFESTO.</SectionNumber>

        <div
          style={{
            padding: "1.5rem 0",
            borderBottom: "2px solid var(--bb-accent)",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
              fontWeight: 800,
              lineHeight: 1.2,
              color: "var(--bb-cream)",
              textTransform: "uppercase",
              letterSpacing: "-0.5px",
            }}
          >
            &ldquo;TODO MUNDO ESTA VENDENDO IA.
            <br />
            <span style={{ color: "var(--bb-dark)", background: "var(--bb-accent)", padding: "0.1em 0.3em" }}>
              E VOCE? CADE VOCE NESSA HISTORIA?
            </span>&rdquo;
          </p>
        </div>

        <div
          style={{
            fontSize: "0.8rem",
            lineHeight: 1.65,
            color: "var(--bb-cream)",
            fontFamily: "var(--font-bb-sans)",
            marginBottom: "1.5rem",
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            Enquanto o mercado te vende promessas de facilidade que entregam frustracao.
            Plataformas visuais que quebram, workflows que engessam,
            drag-and-drops que te deixam mais longe do que perto.
            <strong style={{ color: "var(--bb-accent)" }}>Nos te entregamos uma coisa diferente: O controle.</strong>
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Nos acreditamos que <strong style={{ color: "var(--bb-accent)" }}>a IA nao e o heroi. Voce e.</strong> Acreditamos que hackear nao e destruir. E saber quais regras
            quebrar, quais manter e quais reforcar.
          </p>
          <p>
            A pessoa mais poderosa na sala nao e a que tem a melhor ferramenta.
            <strong style={{ color: "var(--bb-accent)" }}>E a que tem coragem de fazer diferente.</strong>
          </p>
        </div>

        {/* Core Values Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.75rem",
          }}
        >
          {[
            { name: "EMPODERAMENTO", desc: "Devolver poder, nunca fazer por." },
            { name: "PROFUNDIDADE", desc: "Terminal, nao drag-and-drop." },
            { name: "AUTENTICIDADE", desc: "Resultados reais, sem hype." },
            { name: "CLAREZA", desc: "Cortar a barulheira. Revelar, nao complicar." },
            { name: "PAIXAO", desc: "A energia de quem nao quer mais dormir." },
            { name: "CORAGEM", desc: "Hackear barreiras. Soberania." },
          ].map((value) => (
            <div
              key={value.name}
              style={{
                border: "1px solid rgba(244, 244, 232, 0.15)",
                padding: "0.75rem",
              }}
            >
              <h4
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: "var(--bb-accent)",
                  marginBottom: "0.25rem",
                }}
              >
                {value.name}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.7rem",
                  color: "rgba(244, 244, 232, 0.6)",
                }}
              >
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </Page>

      {/* RIGHT PAGE // Positioning */}
      <Page side="right" pageNumber={8} variant="dark" sectionName="Manifesto">
        <HugeNumber variant="dark">04</HugeNumber>

        <SectionNumber variant="dark">9. POSICIONAMENTO.</SectionNumber>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {positioningCards.map((card) => (
            <div
              key={card.label}
              style={{
                padding: "1.25rem",
                ...card.style,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: card.labelColor || "var(--bb-dim)",
                  marginBottom: "0.5rem",
                  opacity: 0.6,
                }}
              >
                {card.label}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  color: card.titleColor,
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "-0.5px",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                }}
              >
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Archetype Mix */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            border: "2px solid var(--bb-accent)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--bb-dim)",
              marginBottom: "0.75rem",
            }}
          >
            ARCHETYPE MIX
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <div style={{ flex: 1, background: "var(--bb-surface)", padding: "0.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--bb-accent)" }}>50%</span>
              <span style={{ display: "block", fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--bb-dim)", textTransform: "uppercase" }}>Outlaw</span>
            </div>
            <div style={{ flex: 1, background: "var(--bb-accent)", padding: "0.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--bb-dark)" }}>35%</span>
              <span style={{ display: "block", fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "rgba(5,5,5,0.6)", textTransform: "uppercase" }}>Magician</span>
            </div>
            <div style={{ flex: 1, border: "1px solid rgba(244, 244, 232, 0.2)", padding: "0.5rem", textAlign: "center" }}>
              <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--bb-cream)" }}>15%</span>
              <span style={{ display: "block", fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--bb-dim)", textTransform: "uppercase" }}>Explorer</span>
            </div>
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
}
