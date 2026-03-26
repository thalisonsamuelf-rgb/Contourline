import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   JORNADA SECTION — Hero's Journey, 6 steps with quotes
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const journeySteps = [
  {
    num: "I",
    title: "O Mundo Ordinário (A Matrix)",
    description:
      "Frustrado com ferramentas visuais que quebram. Lovable passando raiva, tudo quebrado, tokens infinitos.",
    quote:
      "Realmente eu me achei nessa barulheira toda de IA pelo mundo",
    author: "Genesis Henrique",
  },
  {
    num: "II",
    title: "O Chamado (A Pílula Vermelha)",
    description:
      "Alguém mostra que existe outro caminho. Terminal não é o fim -- é o começo.",
    quote: "Terminal não é o fim. É o começo.",
    author: "Filosofia AIOX",
  },
  {
    num: "III",
    title: "A Toca do Coelho (Descida)",
    description:
      "Primeiro contato com terminal. Medo, confusão, mas também fascinação.",
    quote: "Agora que perdemos o medo do terminal...",
    author: "Rogerio Chinen",
  },
  {
    num: "IV",
    title: "Testes e Revelações (Treinamento)",
    description:
      "Criando os primeiros projetos. Erros, iterações, descobertas. Flow state.",
    quote:
      "A sensação que dá é que parece que estamos aprendendo o mapa do tesouro",
    author: "joaodapasseiosco",
  },
  {
    num: "V",
    title: "A Transformação (Neo Desperta)",
    description:
      "O momento em que sente o poder. De não consigo para posso tudo.",
    quote: "Estou me sentindo PODEROSAAAA DEMAAAAAIS!!!!",
    author: "Betty Bonaparte",
  },
  {
    num: "VI",
    title: "O Retorno (O Herói Completo)",
    description:
      "Mostra projetos, fecha clientes, ajuda outros. Ciclo se repete.",
    quote:
      "Há dois anos me levava 3 meses. Há seis meses, 3 semanas. Há dois dias, 3 horas.",
    author: "Rodrigo Faerman",
  },
]

interface JornadaSectionProps {
  className?: string
}

export function JornadaSection({ className }: JornadaSectionProps) {
  return (
    <section id="jornada" className={cn(className)}>
      <PanelHeader label="A JORNADA DO HERÓI" concept="Hero's Journey" num="09" />

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
            09. Jornada
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
            A Jornada do Herói
          </h2>
        </div>

        {/* Journey steps */}
        <div>
          {journeySteps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "flex",
                gap: "1.5rem",
                padding: "1.5rem 0",
                borderBottom:
                  i < journeySteps.length - 1
                    ? "1px solid var(--bb-border)"
                    : "none",
              }}
            >
              {/* Number column */}
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--bb-accent)",
                  lineHeight: 1,
                  minWidth: "3rem",
                }}
              >
                {step.num}
              </span>

              {/* Content column */}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "var(--bb-cream)",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  {step.title}
                </h4>
                <p
                  style={{
                    color: "var(--bb-dim)",
                    fontSize: "0.9rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {step.description}
                </p>

                {/* Quote box */}
                <div
                  style={{
                    borderLeft: "2px solid var(--bb-accent)",
                    padding: "0.8rem 1rem",
                    background: "var(--bb-accent-02)",
                  }}
                >
                  <p
                    style={{
                      fontStyle: "italic",
                      color: "var(--bb-cream)",
                      fontSize: "0.9rem",
                    }}
                  >
                    &ldquo;{step.quote}&rdquo;
                  </p>
                  <span
                    style={{
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.7rem",
                      color: "var(--bb-dim)",
                      textTransform: "uppercase",
                      fontStyle: "normal",
                    }}
                  >
                    -- {step.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FooterBar left="Story Arc" center="Transformation" right="09" />
    </section>
  )
}
