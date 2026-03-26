import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   NARRATIVE SPREAD // Hero's journey + testimonials
   Server component. Left page shows narrative arc, right page shows voices.
   Dark variant — journey in cream, numbers in lime.
   ═══════════════════════════════════════════════════════════════════════════ */

interface NarrativeSpreadProps {
  className?: string
}

const journeySteps = [
  {
    num: "I",
    title: "O SONO",
    desc: "O Heroi (Voce) dorme na Matrix das ferramentas visuais e bloqueios mentais. Frustrado com drag-and-drops que quebram. Acredita que 'isso nao e para mim'.",
  },
  {
    num: "II",
    title: "O CHAMADO",
    desc: "A Pilula Vermelha e oferecida: o terminal e a metodologia AIOX. A verdade: voce nao precisa ser programador. Precisa saber onde quer chegar.",
  },
  {
    num: "III",
    title: "A TOCA DO COELHO",
    desc: "Aprendizado profundo, flow state, e resultados reais em dias nao meses. 'To parecendo crianca no playground.' A obsessao saudavel de quem esta VIVO criando.",
  },
  {
    num: "IV",
    title: "O DESPERTAR",
    desc: "'Neo' acorda. Transforma-se de espectador em criador poderoso. O poder de criar volta. A sindrome do impostor morre quando voce entrega resultado real.",
  },
]

const testimonials = [
  {
    quote: "Ha dois anos me levava 3 meses. Ha seis meses, 3 semanas. Ha dois dias, 3 horas.",
    author: "Rodrigo Faerman",
    type: "transformation",
  },
  {
    quote: "Pegou minha mentalidade, jogou no lixo e colocou uma semente nova.",
    author: "Lucas D.",
    type: "transformation",
  },
  {
    quote: "A sensacao que da e que parece que estamos aprendendo o mapa do tesouro.",
    author: "Joao da Passeios",
    type: "discovery",
  },
  {
    quote: "Estou me sentindo PODEROSAAAA DEMAAAAAIS!",
    author: "Betty Bonaparte",
    type: "empowerment",
  },
  {
    quote: "Meu sonho era ser programador. Agora e um sonho que se realiza com 47 anos.",
    author: "Claudio",
    type: "transformation",
  },
  {
    quote: "Essa parada nos da super poderes, ne?",
    author: "Pericles",
    type: "empowerment",
  },
]

export function NarrativeSpread({ className }: NarrativeSpreadProps) {
  return (
    <SpreadSection className={cn(className)} variant="dark">
      {/* LEFT PAGE // Hero's Journey */}
      <Page side="left" pageNumber={11} variant="dark" sectionName="Narrative">
        <SectionNumber variant="dark">12. A NARRATIVA.</SectionNumber>

        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--bb-dim)",
            marginBottom: "1.5rem",
          }}
        >
          JORNADA DO HEROI // 4 ATOS
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {journeySteps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "1.25rem",
                padding: "1rem 0",
                borderBottom: i < journeySteps.length - 1 ? "1px solid rgba(244, 244, 232, 0.1)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "var(--bb-dark)",
                  background: "var(--bb-accent)",
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {step.num}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    color: "var(--bb-cream)",
                    marginBottom: "0.35rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.7rem",
                    lineHeight: 1.5,
                    color: "rgba(244, 244, 232, 0.6)",
                  }}
                >
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Metaphor */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "var(--bb-accent)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--bb-dark)",
            }}
          >
            <strong>VOCE E NEO. O AIOX E MORPHEUS. O TERMINAL E A REALIDADE.</strong>
          </p>
        </div>
      </Page>

      {/* RIGHT PAGE // Voices / Testimonials */}
      <Page side="right" pageNumber={12} variant="dark" sectionName="Narrative">
        <HugeNumber variant="dark">06</HugeNumber>

        <SectionNumber variant="dark">13. AS VOZES.</SectionNumber>

        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--bb-dim)",
            marginBottom: "1.5rem",
          }}
        >
          TESTEMUNHOS REAIS // PROVA SOCIAL
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                borderLeft: `3px solid ${t.type === "empowerment" ? "var(--bb-accent)" : "rgba(244, 244, 232, 0.3)"}`,
                padding: "0.75rem 1rem",
                background: t.type === "empowerment" ? "var(--bb-accent-08)" : "transparent",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  color: "var(--bb-cream)",
                  marginBottom: "0.35rem",
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "var(--bb-dim)",
                }}
              >
                {"// "}
                {t.author}
              </span>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem",
            border: "1px dashed rgba(244, 244, 232, 0.15)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
            }}
          >
            Estas nao sao frases de marketing. Sao palavras reais de pessoas reais
            que descobriram que o poder de criar nunca saiu delas.
          </p>
        </div>
      </Page>
    </SpreadSection>
  )
}
