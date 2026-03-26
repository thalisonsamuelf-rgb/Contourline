import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"
import { BrutalistCard } from "@/components/brandbook/chrome/brutalist-card"

/* ═══════════════════════════════════════════════════════════════════════════
   PROPOSITO SECTION — Purpose card, essence, 5 values, enemy list
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const values = [
  {
    name: "Empoderamento",
    description: "Devolver o poder de criação para quem tem a visão. A IA serve você, não o contrário.",
  },
  {
    name: "Profundidade",
    description: "Ir além da superfície. Entender o sistema, não apenas usar a ferramenta.",
  },
  {
    name: "Autenticidade",
    description: "Ser real. Sem buzzwords vazios, sem promessas impossíveis, sem teatro.",
  },
  {
    name: "Clareza",
    description: "Cortar o ruído. Cada palavra, cada tela, cada decisão deve simplificar, nunca complicar.",
  },
  {
    name: "Paixão",
    description: "Construir com fogo. Quem usa AIOX sente que está criando algo que importa.",
  },
  {
    name: "Coragem",
    description: "Hackear barreiras. Soberania sobre as regras. Fazer diferente quando preciso.",
  },
]

const enemies = [
  "Ferramentas mentirosas",
  "Medo da exclusão",
  "Barulheira",
  "Terminal como barreira",
  "Desperdício invisível",
]

interface PropositoSectionProps {
  className?: string
}

export function PropositoSection({ className }: PropositoSectionProps) {
  return (
    <section id="proposito" className={cn(className)}>
      <PanelHeader label="PROPÓSITO" concept="Brand Purpose" num="02" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Essence card */}
        <BrutalistCard>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "0.75rem",
            }}
          >
            Essência
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontWeight: 800,
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              color: "var(--bb-accent)",
            }}
          >
            Transformação
          </div>
        </BrutalistCard>

        {/* Values grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1px",
            background: "var(--bb-border)",
            marginTop: "1px",
          }}
        >
          {values.map((v) => (
            <div
              key={v.name}
              style={{
                background: "var(--bb-dark)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                  textTransform: "uppercase",
                  color: "var(--bb-cream)",
                }}
              >
                {v.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                  color: "var(--bb-dim)",
                }}
              >
                {v.description}
              </div>
            </div>
          ))}
        </div>

        {/* Enemy list */}
        <div
          style={{
            marginTop: "2rem",
            padding: "2rem",
            background: "var(--bb-surface)",
            border: "1px solid var(--bb-border)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-flare)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1.25rem",
            }}
          >
            O Inimigo
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {enemies.map((e) => (
              <div
                key={e}
                className="flex items-center gap-3"
              >
                <span
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    color: "var(--bb-flare)",
                  }}
                >
                  X
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.85rem",
                    color: "var(--bb-cream)",
                  }}
                >
                  {e}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterBar left="Brand Purpose" center="Propósito" right="02" />
    </section>
  )
}
