import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"
import { FounderPhoto } from "./founder-photo"

/* ═══════════════════════════════════════════════════════════════════════════
   FOUNDERS SPREAD // Alan Nicolas & Pedro Valério
   Server component. Left page shows Alan, right page shows Pedro.
   Photos have grayscale → color on hover effect.
   ═══════════════════════════════════════════════════════════════════════════ */

interface FoundersSpreadProps {
  className?: string
}

export function FoundersSpread({ className }: FoundersSpreadProps) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // Alan Nicolas */}
      <Page side="left" pageNumber={17} sectionName="Founders">
        <SectionNumber>18. OS FUNDADORES.</SectionNumber>

        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(5, 5, 5, 0.4)",
            marginBottom: "1rem",
          }}
        >
          FACE 1 // VISÃO E CHAMADA
        </div>

        {/* Alan Header */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <FounderPhoto
            src="/starter/portrait-creative.svg"
            alt="Alan Nicolas"
            size={140}
          />
          <div>
            <h3
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--bb-dark)",
                marginBottom: "0.25rem",
                textTransform: "uppercase",
              }}
            >
              ALAN NICOLAS
            </h3>
            <p
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "rgba(5, 5, 5, 0.5)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              O CONSTRUTOR-RADICAL
            </p>
            <p
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.8rem",
                lineHeight: 1.5,
                color: "rgba(5, 5, 5, 0.7)",
              }}
            >
              De Guajuviras pra linha de frente da revolução da IA.
              <br />
              Não ensina o que leu... ensina o que construiu.
            </p>
          </div>
        </div>

        {/* Origin Story */}
        <div
          style={{
            background: "var(--bb-accent-10)",
            padding: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(5, 5, 5, 0.4)",
              marginBottom: "0.75rem",
            }}
          >
            ORIGEM
          </div>
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              color: "var(--bb-dark)",
            }}
          >
            Cresceu em Guajuviras, RS. Bairro onde a energia e a água eram cortadas.
            Trabalhou 8 anos a 15h/dia, 7 dias/semana. Declarou: &ldquo;Vou trabalhar
            até sangrar, mas nunca voltar à vida que tínhamos antes.&rdquo;
            Antes dos 30, independência financeira. CEO de uma das empresas de marketing
            direto mais premiadas do Brasil. Faturamento de múltiplos 9 dígitos.
          </p>
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
              color: "var(--bb-dark)",
              marginTop: "0.75rem",
            }}
          >
            Criou o Movimento Lendário e Fundou a Academia
            Lendár<span style={{ color: "var(--bb-accent)", background: "var(--bb-dark)", padding: "0 0.15em" }}>[IA]</span>.
            Agora constrói o que o mercado ainda está tentando entender.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "var(--bb-dark)",
            marginBottom: "1.5rem",
          }}
        >
          {[
            { value: "R$200M+", label: "Faturados" },
            { value: "20.000+", label: "Alunos" },
            { value: "200+", label: "Clones IA Criados" },
            { value: "600+", label: "Livros Lidos" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--bb-cream)",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--bb-dark)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  textTransform: "uppercase",
                  color: "rgba(5, 5, 5, 0.5)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Phrases */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(5, 5, 5, 0.4)",
              marginBottom: "0.75rem",
            }}
          >
            MANTRAS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              "Honre o conhecimento com a prática.",
              "Clareza gera ação.",
              "Menos é mais.",
              "Não contrate. Crie seus colaboradores.",
            ].map((phrase) => (
              <div
                key={phrase}
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--bb-dark)",
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid var(--bb-accent)",
                }}
              >
                &ldquo;{phrase}&rdquo;
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* RIGHT PAGE // Pedro Valério */}
      <Page side="right" pageNumber={18} sectionName="Founders">
        <HugeNumber>09</HugeNumber>

        {/* Spacer to align with SectionNumber on left page */}
        <div
          style={{
            height: "1.25rem",
            marginBottom: "2.5rem",
            borderBottom: "4px solid transparent",
            paddingBottom: "0.5rem",
          }}
        />

        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(5, 5, 5, 0.4)",
            marginBottom: "1rem",
          }}
        >
          FACE 2 // SISTEMA E EXECUÇÃO
        </div>

        {/* Pedro Header */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            alignItems: "flex-start",
            marginBottom: "1.5rem",
          }}
        >
          <FounderPhoto
            src="/starter/portrait-systems.svg"
            alt="Pedro Valerio"
            size={140}
          />
          <div>
            <h3
              style={{
                fontFamily: "var(--font-bb-display)",
                fontWeight: 800,
                fontSize: "1.5rem",
                color: "var(--bb-dark)",
                marginBottom: "0.25rem",
                textTransform: "uppercase",
              }}
            >
              PEDRO VALÉRIO
            </h3>
            <p
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "rgba(5, 5, 5, 0.5)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              O ARQUITETO DE PROCESSOS
            </p>
            <p
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.8rem",
                lineHeight: 1.5,
                color: "rgba(5, 5, 5, 0.7)",
              }}
            >
              CEO da Alfluence (#6 global, #1 LATAM no TikTok Creative Exchange).
              Faz 45 pessoas operarem como 200.
            </p>
          </div>
        </div>

        {/* Origin Story */}
        <div
          style={{
            background: "var(--bb-dark)",
            padding: "1.25rem",
            marginBottom: "1.5rem",
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
            ORIGEM
          </div>
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.8rem",
              lineHeight: 1.6,
            }}
          >
            De Maricá, RJ. Era do Teatro. Estrelou Dzi Croquettes, Rock in Rio Musical,
            Ayrton Senna Musical. Neurodivergente (Autismo Nível 1) que transformou
            o &ldquo;bug&rdquo; em superpoder de gestão sistêmica. Escolheu
            responsabilidade sobre paixão. Resultado: <span style={{ color: "var(--bb-accent)" }}>#6 global</span>, 70+ clientes enterprise.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "var(--bb-dark)",
            marginBottom: "1.5rem",
          }}
        >
          {[
            { value: "#6", label: "Global TikTok" },
            { value: "#1", label: "LATAM" },
            { value: "45→200", label: "Eficiência" },
            { value: "70+", label: "Clientes Enterprise" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "var(--bb-cream)",
                padding: "1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--bb-dark)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  textTransform: "uppercase",
                  color: "rgba(5, 5, 5, 0.5)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Signature Phrases */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "rgba(5, 5, 5, 0.4)",
              marginBottom: "0.75rem",
            }}
          >
            MANTRAS
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              "A melhor coisa é impossibilitar caminhos.",
              "Se não está no ClickUp, não aconteceu.",
              "Automação antes de delegação.",
              "Propósito sem sistema é agonia.",
            ].map((phrase) => (
              <div
                key={phrase}
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--bb-dark)",
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid var(--bb-dark)",
                }}
              >
                &ldquo;{phrase}&rdquo;
              </div>
            ))}
          </div>
        </div>

        {/* Together */}
        <div
          style={{
            marginTop: "1.5rem",
            padding: "1rem",
            background: "var(--bb-accent)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-display)",
              fontWeight: 800,
              fontSize: "0.9rem",
              color: "var(--bb-dark)",
              textTransform: "uppercase",
            }}
          >
            JUNTOS: VISÃO + SISTEMA = QUALQUER COISA MATERIALIZADA.
          </p>
        </div>
      </Page>
    </SpreadSection>
  )
}
