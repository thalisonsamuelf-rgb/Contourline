import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   MANIFESTO SECTION — Core belief, accent left border, multi-paragraph quote
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const manifestoParagraphs = [
  `Todo mundo está vendendo inteligência artificial. "A IA que faz por você." "A IA que substitui você." "A IA que pensa por você." E você? Cadê você nessa história?`,
  `Nós acreditamos em outra coisa. Acreditamos que a IA não é o herói. Você é. Acreditamos que a IA não é o destino. É o caminho. Acreditamos que a pessoa mais poderosa na sala não é a que tem a melhor ferramenta -- é a que sabe onde quer chegar.`,
  `O AIOX nasceu para isso.`,
  `Não é um framework. Não é uma ferramenta. É o sistema que remove tudo que está entre você e o que você quer construir.`,
]

const brandLine = "A IA é só a seta. O X é seu."

interface ManifestoSectionProps {
  className?: string
}

export function ManifestoSection({ className }: ManifestoSectionProps) {
  return (
    <section id="manifesto" className={cn(className)}>
      <PanelHeader label="MANIFESTO" concept="Core Belief" num="01" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Quote block with accent left border */}
        <div
          style={{
            borderLeft: "3px solid var(--bb-accent)",
            paddingLeft: "2rem",
            maxWidth: "720px",
          }}
        >
          {manifestoParagraphs.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--bb-cream)",
                marginBottom: "1.5rem",
              }}
            >
              {p}
            </p>
          ))}
        </div>

        {/* Brand line */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2rem",
            background: "var(--bb-surface)",
            border: "1px solid var(--bb-border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-bb-display)",
              fontWeight: 800,
              fontSize: "clamp(1.2rem, 3vw, 2rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--bb-accent)",
              textAlign: "center",
            }}
          >
            {brandLine}
          </p>
        </div>
      </div>

      <FooterBar left="Core Belief" center="Manifesto" right="01" />
    </section>
  )
}
