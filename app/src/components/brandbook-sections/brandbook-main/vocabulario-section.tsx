import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   VOCABULARIO SECTION — Power words, forbidden words, 5 tone sliders
   Server component.
   ═══════════════════════════════════════════════════════════════════════════ */

const powerWords = [
  "Criar/Criador",
  "Poder",
  "Terminal",
  "A Seta",
  "O X/Destino",
  "Clareza",
  "Pilula Vermelha",
  "Despertar",
  "A Toca",
  "Semente",
  "Barulheira",
  "X marks the spot",
]

const forbiddenWords = [
  "Magico/Magia",
  "Hack/Atalho",
  "Facil/Sem esforco",
  "Disruptivo",
  "AI-Powered",
  "Usuario/Cliente",
  "Automatico",
]

const toneSliders = [
  { left: "Formal", right: "Informal", pct: 50 },
  { left: "Serio", right: "Divertido", pct: 60 },
  { left: "Tecnico", right: "Acessivel", pct: 50 },
  { left: "Distante", right: "Proximo", pct: 40 },
  { left: "Arrogante", right: "Humilde", pct: 40 },
]

interface VocabularioSectionProps {
  className?: string
}

export function VocabularioSection({ className }: VocabularioSectionProps) {
  return (
    <section id="vocabulario" className={cn(className)}>
      <PanelHeader label="VOCABULARIO" concept="Brand Language" num="08" />

      <div style={{ padding: "3rem 2rem" }}>
        {/* Power words */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Palavras de Poder
          </div>
          <div className="flex flex-wrap gap-2">
            {powerWords.map((w) => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "0.4rem 0.85rem",
                  background: "var(--bb-accent)",
                  color: "var(--bb-dark)",
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Forbidden words */}
        <div style={{ marginBottom: "3rem" }}>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-flare)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1rem",
            }}
          >
            Palavras Proibidas
          </div>
          <div className="flex flex-wrap gap-2">
            {forbiddenWords.map((w) => (
              <span
                key={w}
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  padding: "0.4rem 0.85rem",
                  border: "1px solid var(--bb-flare)",
                  color: "var(--bb-flare)",
                  textDecoration: "line-through",
                  opacity: 0.7,
                }}
              >
                {w}
              </span>
            ))}
          </div>
        </div>

        {/* Tone sliders */}
        <div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: "1.5rem",
            }}
          >
            Tom de Voz
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {toneSliders.map((slider) => (
              <div key={slider.left}>
                <div
                  className="flex justify-between"
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.65rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span style={{ color: "var(--bb-dim)" }}>{slider.left}</span>
                  <span style={{ color: "var(--bb-dim)" }}>{slider.right}</span>
                </div>
                {/* Slider track */}
                <div
                  style={{
                    height: "6px",
                    background: "var(--bb-surface)",
                    border: "1px solid var(--bb-border)",
                    position: "relative",
                  }}
                >
                  {/* Slider fill */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      height: "100%",
                      width: `${slider.pct}%`,
                      background: "var(--bb-accent)",
                    }}
                  />
                  {/* Slider indicator */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-4px",
                      left: `${slider.pct}%`,
                      width: "2px",
                      height: "14px",
                      background: "var(--bb-accent)",
                      transform: "translateX(-1px)",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-accent)",
                    marginTop: "0.25rem",
                  }}
                >
                  {slider.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <FooterBar left="Brand Language" center="Vocabulario" right="08" />
    </section>
  )
}
