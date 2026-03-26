import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   DEPOIMENTOS SECTION — Proof points, stat cards, categorized quotes
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const statCards = [
  {
    number: "R$500K/ano",
    label: "Criação de Valor",
    desc: "Joao Pedro -- contrato Anima Educação",
    bg: "var(--bb-dark)",
    numberColor: "var(--bb-accent)",
    labelColor: "var(--bb-dim)",
    descColor: "var(--bb-dim)",
  },
  {
    number: "R$8K/cliente",
    label: "Resultado",
    desc: "Karla Pazos -- sem saber programar",
    bg: "var(--bb-accent)",
    numberColor: "var(--bb-dark)",
    labelColor: "rgba(0,0,0,0.5)",
    descColor: "var(--bb-dark)",
  },
  {
    number: "MVP em 6 dias",
    label: "Compressão",
    desc: "Paulo Chaves -- normalmente 3 meses",
    bg: "var(--bb-dark)",
    numberColor: "var(--bb-accent)",
    labelColor: "var(--bb-dim)",
    descColor: "var(--bb-dim)",
  },
  {
    number: "R$100K economizado",
    label: "Economia",
    desc: "@leoh4236 -- integração que custaria 100K",
    bg: "var(--bb-surface)",
    numberColor: "var(--bb-accent)",
    labelColor: "var(--bb-dim)",
    descColor: "var(--bb-dim)",
  },
]

const proofCategories = [
  {
    label: "Renascimento Criativo",
    proofs: [
      {
        quote:
          "Pegou minha mentalidade, jogou no lixo e colocou uma semente nova.",
        author: "Lucas D",
      },
      {
        quote:
          "Meu sonho era ser programador. Agora é um sonho que se realiza com 47 anos.",
        author: "Claudio",
      },
    ],
  },
  {
    label: "Empoderamento",
    proofs: [
      {
        quote: "Estou me sentindo PODEROSAAAA DEMAAAAAIS!",
        author: "Betty Bonaparte",
      },
      {
        quote: "Essa parada nos dá super poderes, né?",
        author: "Péricles",
      },
    ],
  },
  {
    label: "Compressão Temporal",
    proofs: [
      {
        quote:
          "Há dois anos me levava 3 meses. Há seis meses, 3 semanas. Há dois dias, 3 horas.",
        author: "Rodrigo Faerman",
      },
      {
        quote: "Uma semana aqui parece que passou 6 meses.",
        author: "Bruno Silva",
      },
    ],
  },
]

interface DepoimentosSectionProps {
  className?: string
}

export function DepoimentosSection({ className }: DepoimentosSectionProps) {
  return (
    <section id="depoimentos" className={cn(className)}>
      <PanelHeader
        label="DEPOIMENTOS & PROOF POINTS"
        concept="Evidence"
        num="10"
      />

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
            10. Depoimentos
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
            Depoimentos & Proof Points
          </h2>
        </div>

        {/* Stat cards - 4 col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1px",
            background: "var(--bb-border)",
            marginBottom: "3rem",
          }}
        >
          {statCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: card.bg,
                textAlign: "center",
                padding: "2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: card.numberColor,
                }}
              >
                {card.number}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.7rem",
                  color: card.labelColor,
                  textTransform: "uppercase",
                  marginTop: "0.5rem",
                }}
              >
                {card.label}
              </div>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: card.descColor,
                  marginTop: "0.5rem",
                }}
              >
                {card.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Proof categories */}
        {proofCategories.map((category) => (
          <div key={category.label}>
            {/* Category label */}
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.7rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                margin: "2rem 0 1rem",
              }}
            >
              {category.label}
            </div>

            {/* 2-col proof cards grid */}
            <div
              className="grid grid-cols-2"
              style={{ gap: "1px", background: "var(--bb-border)" }}
            >
              {category.proofs.map((proof) => (
                <div
                  key={proof.author}
                  style={{
                    background: "var(--bb-accent-02)",
                    border: "1px solid var(--bb-border)",
                    borderLeft: "2px solid var(--bb-accent)",
                    padding: "2rem",
                    transition: "background 0.2s, transform 0.2s",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 500,
                      color: "var(--bb-cream)",
                      marginBottom: "1rem",
                    }}
                  >
                    &ldquo;{proof.quote}&rdquo;
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.75rem",
                      color: "var(--bb-dim)",
                      textTransform: "uppercase",
                    }}
                  >
                    -- {proof.author}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <FooterBar left="Validated Results" center="Real Evidence" right="10" />
    </section>
  )
}
