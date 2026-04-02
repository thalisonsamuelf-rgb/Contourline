import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   NAMING SPREAD // Brand name breakdown + tribe definition
   Server component. Left page shows A-I-O-X flow, right page shows tribe.
   ═══════════════════════════════════════════════════════════════════════════ */

interface NamingSpreadProps {
  className?: string
}

const namingItems = [
  {
    letter: "A",
    title: "ARTIFICIAL",
    desc: "O ponto de partida. A IA como meio, não como fim. A seta que aponta o caminho.",
    highlight: true,
  },
  {
    letter: "I",
    title: "INTELLIGENCE",
    desc: "A inteligência que potencializa. O motor que transforma intenção em execução.",
    highlight: false,
  },
  {
    letter: "O",
    title: "ORCHESTRATION",
    desc: "A orquestração entre agentes, processos e pipelines. O sistema que opera por você.",
    highlight: false,
  },
  {
    letter: "X",
    title: "EXPERIENCE",
    desc: '"X marks the spot". O destino no mapa. A experiência final que é sua.',
    highlight: true,
  },
]

const tribeSegments = [
  { name: "O Reinventor Tardio", pct: 25, desc: "40-55 anos. Nunca abriram um terminal. Buscam uma segunda chance. O AIOX é permissão existencial." },
  { name: "O Empreendedor-Construtor", pct: 25, desc: "30-45 anos. Querem parar de depender de devs e agências. Verticalizar a execução." },
  { name: "O Dev Renascido", pct: 20, desc: "28-45 anos. Devs com 5-15 anos que perderam o prazer de programar. O AIOX os eleva." },
  { name: "O Obsessivo-Produtivo", pct: 15, desc: "25-40 anos. O motor da comunidade. Testam tudo primeiro, ficam até as 4h." },
  { name: "A Empresária-Estrategista", pct: 10, desc: "35-50 anos. Já faturam com IA. Menor segmento, maior ticket médio." },
  { name: "O Explorador-Evangelista", pct: 5, desc: "30-45 anos. O sistema imunológico da comunidade. Criam pontes para os mais novos." },
]

export function NamingSpread({ className }: NamingSpreadProps) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // Naming Flow A->IO->X */}
      <Page side="left" pageNumber={9} sectionName="Naming">
        <SectionNumber>10. NAMING & CONCEITO.</SectionNumber>

        {/* Letter flow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            marginBottom: "2rem",
            padding: "1.5rem 0",
            borderBottom: "2px solid var(--bb-dark)",
          }}
        >
          {namingItems.map((item, i) => (
            <span key={item.letter} style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "3.5rem",
                  fontWeight: 800,
                  color: item.highlight ? "var(--bb-dark)" : "rgba(5, 5, 5, 0.25)",
                  lineHeight: 1,
                }}
              >
                {item.letter}
              </span>
              {i < namingItems.length - 1 && (
                <span
                  style={{
                    fontSize: "1.5rem",
                    color: "rgba(5, 5, 5, 0.25)",
                    margin: "0 0.25rem",
                  }}
                >
                  →
                </span>
              )}
            </span>
          ))}
        </div>

        {/* Descriptions */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {namingItems.map((item) => (
            <div
              key={item.letter}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: "0.75rem",
                background: item.highlight ? "var(--bb-accent)" : "transparent",
                border: item.highlight ? "none" : "1px solid var(--bb-dark)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: item.highlight ? "var(--bb-dark)" : "var(--bb-dark)",
                  minWidth: "2rem",
                }}
              >
                {item.letter}
              </span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    color: "var(--bb-dark)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
                    color: item.highlight ? "var(--bb-dark)" : "rgba(5, 5, 5, 0.6)",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hidden Layers — wordplay easter eggs */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "var(--bb-dark)",
            color: "var(--bb-cream)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--bb-dim)",
              marginBottom: "0.75rem",
            }}
          >
            CAMADAS OCULTAS DO NOME
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {/* A → X: O Mapa */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "var(--bb-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                A → X
              </span>
              <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.65rem", lineHeight: 1.5 }}>
                O mapa. De A até X. A IA é a seta. O X é seu destino.
              </p>
            </div>

            {/* I/O: Input/Output */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  color: "var(--bb-accent)",
                  whiteSpace: "nowrap",
                }}
              >
                I/O
              </span>
              <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.65rem", lineHeight: 1.5 }}>
                Input/Output. Você entra com a intenção, o AIOX entrega o resultado.
              </p>
            </div>

            {/* AI·IOX — shared I */}
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
              <span
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "0.85rem",
                  fontWeight: 800,
                  whiteSpace: "nowrap",
                  display: "inline-flex",
                }}
              >
                <span style={{ color: "var(--bb-accent)" }}>A</span>
                <span style={{
                  color: "var(--bb-accent)",
                  background: "rgba(206, 255, 0, 0.15)",
                  padding: "0 0.1rem",
                  borderRadius: "2px",
                }}>I</span>
                <span style={{ color: "var(--bb-cream)" }}>OX</span>
              </span>
              <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.65rem", lineHeight: 1.5 }}>
                O mesmo <strong style={{ color: "var(--bb-accent)" }}>I</strong> fecha{" "}
                <strong style={{ color: "var(--bb-accent)" }}>AI</strong> e abre{" "}
                <strong style={{ color: "var(--bb-cream)" }}>IOX</strong>.
                Artificial Intelligence 10x.
              </p>
            </div>
          </div>
        </div>
      </Page>

      {/* RIGHT PAGE // Tribe Definition */}
      <Page side="right" pageNumber={10} sectionName="Naming">
        <HugeNumber>05</HugeNumber>

        <SectionNumber>11. A TRIBO: OS LENDÁRIOS.</SectionNumber>

        <div
          style={{
            fontFamily: "var(--font-bb-sans)",
            fontSize: "0.8rem",
            lineHeight: 1.6,
            color: "rgba(5, 5, 5, 0.7)",
            marginBottom: "1.5rem",
          }}
        >
          &ldquo;A gente tá numa bolha e num grupo extremamente seleto.
          As coisas que a gente faz aqui, as mais simples, são bizarras.&rdquo;
          <strong> Nata da Nata. Malucos do Claude Code. Madrugas.</strong>
        </div>

        {/* Tribe Segments */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {tribeSegments.map((seg, i) => (
            <div
              key={seg.name}
              style={{
                display: "flex",
                gap: "1rem",
                alignItems: "flex-start",
                padding: "0.75rem",
                background: i === 0 ? "var(--bb-accent)" : "transparent",
                border: i === 0 ? "none" : "1px solid rgba(5,5,5,0.15)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--bb-dark)",
                  minWidth: "3rem",
                  textAlign: "right",
                }}
              >
                {seg.pct}%
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    color: "var(--bb-dark)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {seg.name}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.65rem",
                    lineHeight: 1.5,
                    color: i === 0 ? "var(--bb-dark)" : "rgba(5, 5, 5, 0.6)",
                  }}
                >
                  {seg.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <div
          style={{
            marginTop: "1.5rem",
            borderLeft: "3px solid var(--bb-accent)",
            paddingLeft: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontWeight: 600,
              fontSize: "0.85rem",
              fontStyle: "italic",
              color: "var(--bb-dark)",
            }}
          >
            &ldquo;Meu sonho era ser programador. Agora é um sonho que se realiza com 47 anos.&rdquo;
          </p>
          <span
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              color: "rgba(5, 5, 5, 0.4)",
              textTransform: "uppercase",
            }}
          >
            {"// Claudio Camozzi, O Reinventor Tardio"}
          </span>
        </div>
      </Page>
    </SpreadSection>
  )
}
