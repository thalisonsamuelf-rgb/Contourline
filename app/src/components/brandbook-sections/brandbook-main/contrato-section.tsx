import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   CONTRATO SECTION — Brand contract: promises + demands + definitive frame
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const promises = [
  "Transformação tangível, não marketing vazio.",
  "Clareza extrema: processamos a barulheira para entregar o caminho.",
  "Estrutura sistêmica: Story-Driven Development, Quality Gates.",
  "Resultados práticos: MVPs de meses em dias.",
]

const demands = [
  "Visão clara: o X é responsabilidade sua.",
  "Coragem ao terminal: disposição para abandonar o conforto visual.",
  "Dedicação intensa: a curva exige suor.",
  "Execução: produzir, não apenas consumir.",
]

interface ContratoSectionProps {
  className?: string
}

export function ContratoSection({ className }: ContratoSectionProps) {
  return (
    <section id="contrato" className={cn(className)}>
      <PanelHeader label="O CONTRATO DA MARCA" concept="Promise" num="12" />

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
            12. Compromisso
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
            O Contrato da Marca
          </h2>
        </div>

        {/* 2-col grid: Promises + Demands */}
        <div
          className="grid grid-cols-2"
          style={{ gap: "1.5rem" }}
        >
          {/* LEFT -- Nossas Promessas */}
          <div
            style={{
              background: "var(--bb-accent)",
              color: "var(--bb-dark)",
              padding: "2rem",
              border: "1px solid var(--bb-accent)",
            }}
          >
            <h3
              style={{
                fontSize: "1.15rem",
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "var(--bb-dark)",
                marginBottom: "1.25rem",
              }}
            >
              Nossas Promessas
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {promises.map((item) => (
                <li
                  key={item}
                  style={{
                    paddingLeft: "1.5rem",
                    position: "relative",
                    marginBottom: "1rem",
                    color: "rgba(0,0,0,0.7)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      fontWeight: 700,
                      color: "var(--bb-dark)",
                    }}
                  >
                    {"\u2713"}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT -- O que Exigimos do Criador */}
          <div
            style={{
              background: "var(--bb-dark)",
              border: "1px solid var(--bb-border)",
              padding: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "1.15rem",
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                color: "var(--bb-cream)",
                marginBottom: "1.25rem",
              }}
            >
              O que Exigimos do Criador
            </h3>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {demands.map((item) => (
                <li
                  key={item}
                  style={{
                    paddingLeft: "1.5rem",
                    position: "relative",
                    marginBottom: "1rem",
                    color: "var(--bb-dim)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      fontWeight: 700,
                      color: "var(--bb-accent)",
                    }}
                  >
                    {"\u2192"}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Definitive frame */}
        <div
          style={{
            background: "var(--bb-accent-02)",
            border: "1px solid var(--bb-border)",
            borderLeft: "2px solid var(--bb-accent)",
            padding: "2.5rem",
            marginTop: "3rem",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.2rem",
              fontWeight: 400,
              color: "var(--bb-dim)",
              lineHeight: 2,
              margin: 0,
              whiteSpace: "pre-line",
            }}
          >
            Eu não preciso ser programador para criar.{"\n"}
            Eu preciso saber onde quero chegar.{"\n"}
            <span style={{ fontWeight: 700, color: "var(--bb-accent)" }}>
              A IA é a seta. O X é meu.
            </span>
            {"\n"}
            O terminal não é o fim. É o começo.{"\n"}
            A complexidade não me define. Minha visão me define.{"\n"}
            <span style={{ fontWeight: 700, color: "var(--bb-accent)" }}>
              Eu sou um Criador AIOX.
            </span>
          </p>
        </div>
      </div>

      <FooterBar left="Brand Contract" center="Mutual Promise" right="12" />
    </section>
  )
}
