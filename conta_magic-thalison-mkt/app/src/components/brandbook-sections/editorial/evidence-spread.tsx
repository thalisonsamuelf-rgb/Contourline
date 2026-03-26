import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   EVIDENCE SPREAD // Stats + voice vocabulary
   Server component. Left page shows evidence, right page shows voice.
   ═══════════════════════════════════════════════════════════════════════════ */

interface EvidenceSpreadProps {
  className?: string
}

const stats = [
  {
    value: "R$500K",
    label: "/ANO",
    desc: "Contrato de ex-CLT",
    source: "João Pedro // Anima Educação",
  },
  {
    value: "6 DIAS",
    label: "MVP",
    desc: "Antes: 3 meses",
    source: "Paulo Chaves",
    highlight: true,
  },
  {
    value: "R$8K",
    label: "/CLIENTE",
    desc: "Zero código",
    source: "Karla Pazos",
  },
  {
    value: "R$100K",
    label: "ECONOMIA",
    desc: "Integração in-house",
    source: "@leoh4236",
  },
  {
    value: "150+",
    label: "CRIADORES",
    desc: "Transformados",
    source: "Primeiro Cohort",
  },
  {
    value: "R$1M+",
    label: "RESULTADOS",
    desc: "Reportados",
    source: "2 semanas",
    highlight: true,
  },
]

const vocabAlways = ["Criar/Criador", "Poder/Empoderamento", "Seta/Flecha", "X/Destino", "Terminal", "Clareza", "Jornada", "Despertar", "Hackear"]
const vocabAvoid = ["Mágico/Magia", "Revolucionário", "Disruptivo", "Fácil/Simples", "Game-changer", "Em dash (—)"]

export function EvidenceSpread({ className }: EvidenceSpreadProps) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // Evidence & Stats */}
      <Page side="left" pageNumber={13} sectionName="Evidence">
        <SectionNumber>14. EVIDENCIA.</SectionNumber>

        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(5, 5, 5, 0.4)",
            marginBottom: "1.5rem",
          }}
        >
          COMPRESSÃO DE TEMPO // RESULTADOS REAIS
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1px",
            background: "var(--bb-dark)",
            marginBottom: "1.5rem",
          }}
        >
          {stats.map((stat) => (
            <div
              key={stat.value}
              style={{
                background: stat.highlight ? "var(--bb-accent)" : "var(--bb-cream)",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.5rem",
                  fontWeight: 800,
                  color: "var(--bb-dark)",
                  letterSpacing: "-1px",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--bb-dark)",
                  marginTop: "0.25rem",
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.6rem",
                  color: stat.highlight ? "rgba(5,5,5,0.7)" : "rgba(5, 5, 5, 0.5)",
                  marginTop: "0.35rem",
                }}
              >
                {stat.desc}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.45rem",
                  color: stat.highlight ? "rgba(5,5,5,0.5)" : "rgba(5, 5, 5, 0.3)",
                  marginTop: "0.35rem",
                  textTransform: "uppercase",
                }}
              >
                {stat.source}
              </div>
            </div>
          ))}
        </div>

        {/* Open Source Badge */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              flex: 1,
              border: "2px solid var(--bb-dark)",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--bb-dark)",
              }}
            >
              MIT
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5, 5, 5, 0.5)",
                textTransform: "uppercase",
              }}
            >
              Open Source
            </div>
          </div>
          <div
            style={{
              flex: 1,
              background: "var(--bb-dark)",
              padding: "1rem",
              textAlign: "center",
              color: "var(--bb-cream)",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--bb-accent)",
              }}
            >
              12+
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-dim)",
                textTransform: "uppercase",
              }}
            >
              Agentes
            </div>
          </div>
          <div
            style={{
              flex: 1,
              border: "2px solid var(--bb-dark)",
              padding: "1rem",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--bb-dark)",
              }}
            >
              6+
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5, 5, 5, 0.5)",
                textTransform: "uppercase",
              }}
            >
              IDEs
            </div>
          </div>
        </div>

        {/* Morpheus reference */}
        <div
          style={{
            background: "var(--bb-dark)",
            padding: "1rem",
            color: "var(--bb-cream)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.8rem",
              lineHeight: 1.5,
            }}
          >
            Se o AIOX fosse uma pessoa, seria{" "}
            <strong style={{ color: "var(--bb-accent)" }}>Morpheus</strong>: digital, profundo, direto, que não faz por você, mas revela o caminho.
          </p>
        </div>
      </Page>

      {/* RIGHT PAGE // Voice & Vocabulary */}
      <Page side="right" pageNumber={14} sectionName="Evidence">
        <HugeNumber>07</HugeNumber>

        <SectionNumber>15. VOZ DA MARCA.</SectionNumber>

        {/* Signature Phrases */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(5, 5, 5, 0.4)",
              marginBottom: "0.75rem",
            }}
          >
            FRASES ASSINATURA
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              "Agora o controle é seu.",
              "A IA não é o herói. Você é.",
              "Terminal não é o fim.",
              "X marks the spot.",
            ].map((phrase) => (
              <div
                key={phrase}
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "var(--bb-dark)",
                  padding: "0.5rem 0.75rem",
                  background: "var(--bb-accent-20)",
                  borderLeft: "3px solid var(--bb-accent)",
                }}
              >
                {phrase}
              </div>
            ))}
          </div>
        </div>

        {/* Always Use */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--bb-dark)",
              marginBottom: "0.75rem",
            }}
          >
            SEMPRE USE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {vocabAlways.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.4rem 0.8rem",
                  background: "var(--bb-accent-20)",
                  border: "1px solid var(--bb-accent-40)",
                  color: "var(--bb-dark)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Avoid */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(204, 0, 0, 0.6)",
              marginBottom: "0.75rem",
            }}
          >
            NUNCA USE
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {vocabAvoid.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.4rem 0.8rem",
                  border: "1px solid rgba(204, 0, 0, 0.4)",
                  color: "rgba(204, 0, 0, 0.7)",
                  textDecoration: "line-through",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Note about Hack */}
        <div
          style={{
            padding: "1rem",
            border: "2px solid var(--bb-dark)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.75rem",
              lineHeight: 1.5,
              color: "var(--bb-dark)",
            }}
          >
            <strong>&ldquo;Hack/Hackear&rdquo;</strong> NÃO é proibido. É palavra <strong>obrigatória</strong> da marca.
            Hackear = saber quais regras quebrar, quais manter e quais reforçar. Soberania sobre as regras.
          </p>
        </div>
      </Page>
    </SpreadSection>
  )
}
