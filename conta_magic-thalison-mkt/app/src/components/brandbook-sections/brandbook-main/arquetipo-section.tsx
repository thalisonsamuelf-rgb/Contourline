import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"
import { BrutalistCard } from "@/components/brandbook/chrome/brutalist-card"

/* ═══════════════════════════════════════════════════════════════════════════
   ARQUETIPO SECTION — Archetype bars, voice cards, Morpheus analogy
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const archetypes = [
  { name: "Rebelde", nameEn: "Outlaw", pct: 50, color: "var(--bb-accent)" },
  { name: "Mago", nameEn: "Magician", pct: 35, color: "var(--bb-blue)" },
  { name: "Explorador", nameEn: "Explorer", pct: 15, color: "var(--bb-flare)" },
]

const voices = [
  {
    title: "Voz do Rebelde",
    description:
      "Provocativa. Hackeia barreiras, subverte o status quo. Direto, sem meias palavras. Coragem é o filtro de entrada. O terminal é a arena.",
  },
  {
    title: "Voz do Mago",
    description:
      "Transformadora. Revela o poder que já existe no criador. Antes/depois como prova. Empoderamento real, nunca promessa vazia.",
  },
]

interface ArquetipoSectionProps {
  className?: string
}

export function ArquetipoSection({ className }: ArquetipoSectionProps) {
  return (
    <section id="arquetipo" className={cn(className)}>
      <PanelHeader label="ARQUÉTIPO" concept="Brand Archetype" num="03" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Archetype bars */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {archetypes.map((a) => (
            <div key={a.name}>
              <div className="flex justify-between items-baseline" style={{ marginBottom: "0.5rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-bb-display)",
                    fontWeight: 800,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--bb-cream)",
                  }}
                >
                  {a.name}
                  <span
                    style={{
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.6rem",
                      color: "var(--bb-dim)",
                      marginLeft: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {a.nameEn}
                  </span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: a.color,
                  }}
                >
                  {a.pct}%
                </span>
              </div>
              {/* Bar */}
              <div
                style={{
                  height: "8px",
                  background: "var(--bb-surface)",
                  border: "1px solid var(--bb-border)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: `${a.pct}%`,
                    background: a.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Voice cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1px",
            background: "var(--bb-border)",
            marginTop: "2rem",
          }}
        >
          {voices.map((v) => (
            <div
              key={v.title}
              style={{
                background: "var(--bb-dark)",
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontWeight: 800,
                  fontSize: "0.85rem",
                  textTransform: "uppercase",
                  color: "var(--bb-accent)",
                }}
              >
                {v.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                  color: "var(--bb-dim)",
                }}
              >
                {v.description}
              </div>
            </div>
          ))}
        </div>

        {/* Morpheus analogy */}
        <BrutalistCard className="mt-8">
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Analogia Cultural
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "1rem",
              lineHeight: 1.7,
              color: "var(--bb-cream)",
              borderLeft: "2px solid var(--bb-accent)",
              paddingLeft: "1.5rem",
            }}
          >
            AIOX é o Morpheus. Rebelde que subverte o sistema, mago que
            revela a verdade, explorador que guia pela toca do coelho.
            Oferece a pílula vermelha. Agora o controle é seu.
          </div>
        </BrutalistCard>
      </div>

      <FooterBar left="Brand Archetype" center="Arquétipo" right="03" />
    </section>
  )
}
