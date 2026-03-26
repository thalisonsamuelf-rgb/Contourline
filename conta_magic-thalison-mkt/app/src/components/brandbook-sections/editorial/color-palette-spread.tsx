import {
  STARTER_BORDER_TOKENS,
  STARTER_GRAY_SCALE,
  STARTER_PALETTE,
  STARTER_PRIMARY_COLORS,
  STARTER_SEMANTIC_COLORS,
  STARTER_TEXT_COLORS,
} from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   COLOR PALETTE SPREAD // Primary + extended color systems
   Server component. Left page shows primary palette with large swatches,
   right page shows extended palette with usage guidelines.
   Source of truth: globals.css (--bb-* tokens)
   ═══════════════════════════════════════════════════════════════════════════ */

interface ColorPaletteSpreadProps {
  className?: string
}

const primaryColors = STARTER_PRIMARY_COLORS
const textColors = STARTER_TEXT_COLORS
const semanticColors = STARTER_SEMANTIC_COLORS
const grayScale = STARTER_GRAY_SCALE
const borderTokens = STARTER_BORDER_TOKENS
const accentTintScale = [
  { label: "10%", bg: "var(--bb-accent-10)" },
  { label: "25%", bg: "var(--bb-accent-25)" },
  { label: "50%", bg: "var(--bb-accent-50)" },
  { label: "75%", bg: "var(--bb-accent-75)" },
  { label: "100%", bg: "var(--bb-accent)" },
] as const

export function ColorPaletteSpread({ className }: ColorPaletteSpreadProps) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // Primary palette */}
      <Page side="left" pageNumber={3} sectionName="Color System">
        <div id="colors" style={{ position: "absolute", top: "-100px" }} />
        <SectionNumber>4. PRIMARY PALETTE.</SectionNumber>

        {/* Large accent swatch */}
        <div
          style={{
            backgroundColor: "var(--bb-accent)",
            padding: "2rem",
            marginBottom: "1.5rem",
            color: "var(--bb-dark)",
            position: "relative",
            minHeight: 150,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "2.5rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "-1px",
              lineHeight: 1,
              marginBottom: "0.75rem",
            }}
          >
            {STARTER_PALETTE.accent.name.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              gap: "2rem",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.7rem",
            }}
          >
            <div>
              <div style={specLabelStyle}>HEX</div>
              <div style={{ fontWeight: 700 }}>{STARTER_PALETTE.accent.hex}</div>
            </div>
            <div>
              <div style={specLabelStyle}>RGB</div>
              <div style={{ fontWeight: 700 }}>{STARTER_PALETTE.accent.rgb}</div>
            </div>
            <div>
              <div style={specLabelStyle}>TOKEN</div>
              <div style={{ fontWeight: 700 }}>{STARTER_PALETTE.accent.token}</div>
            </div>
          </div>
        </div>

        {/* Dark palette swatches */}
        <div style={{ display: "flex", gap: "1px", marginBottom: "1.5rem" }}>
          {primaryColors.slice(1).map((color) => (
            <div
              key={color.name}
              style={{
                flex: 1,
                backgroundColor: color.bg,
                color: color.textColor,
                padding: "1.25rem 1rem",
                minHeight: 120,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                {color.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  marginBottom: "0.25rem",
                }}
              >
                {color.hex}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  opacity: 0.6,
                }}
              >
                {color.token}
              </div>
            </div>
          ))}
        </div>

        {/* Text Colors */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>TEXT COLORS</div>
          <div style={{ display: "flex", gap: "1px" }}>
            {textColors.map((color) => (
              <div
                key={color.name}
                style={{
                  flex: 1,
                  backgroundColor: color.bg,
                  color: color.textColor,
                  padding: "1rem",
                  border: "1px solid rgba(5,5,5,0.1)",
                }}
              >
                <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", fontWeight: 700 }}>
                  {color.name}
                </div>
                <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", opacity: 0.6 }}>
                  {color.token}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gray Scale */}
        <div>
          <div style={sectionLabelStyle}>GRAY SCALE</div>
          <div style={{ display: "flex", gap: "1px" }}>
            {grayScale.map((color) => (
              <div
                key={color.name}
                style={{
                  flex: 1,
                  backgroundColor: color.hex,
                  color: "white",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", fontWeight: 700 }}>
                  {color.hex}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>

      {/* RIGHT PAGE // Semantic + Usage */}
      <Page side="right" pageNumber={4} sectionName="Color System">
        <HugeNumber>02</HugeNumber>

        <SectionNumber>5. EXTENDED PALETTE.</SectionNumber>

        {/* Semantic Colors */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>SEMANTIC COLORS</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "#050505",
            }}
          >
            {semanticColors.map((color) => (
              <div
                key={color.name}
                style={{
                  backgroundColor: color.bg,
                  color: color.textColor,
                  padding: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontWeight: 700,
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                  }}
                >
                  {color.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.6rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {color.hex}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "0.65rem",
                    opacity: 0.8,
                  }}
                >
                  {color.usage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Border Tokens */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>BORDER TOKENS</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            {borderTokens.map((token) => (
              <div
                key={token.name}
                style={{
                  flex: 1,
                  padding: "1rem",
                  border: `2px solid ${token.value}`,
                  background: "#050505",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    color: "#F4F4E8",
                    marginBottom: "0.25rem",
                  }}
                >
                  {token.name}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    color: "rgba(245, 244, 231, 0.6)",
                  }}
                >
                  {token.token}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accent Tint Scale */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>ACCENT TINT SCALE</div>

          {/* On dark background */}
          <div style={{ marginBottom: "0.75rem" }}>
            <div style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.5rem",
              color: "rgba(5, 5, 5, 0.35)",
              marginBottom: "0.25rem",
            }}>
              On Dark
            </div>
            <div style={{ display: "flex", gap: "1px" }}>
              {accentTintScale.map((tint) => (
                <div
                  key={`dark-${tint.label}`}
                  style={{
                    flex: 1,
                    height: 48,
                    background: tint.bg,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: "0.35rem",
                    position: "relative",
                  }}
                >
                  {/* Dark background behind the tint to show transparency */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "#050505",
                    zIndex: -1,
                  }} />
                  <span style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    color: tint.label === "100%" || tint.label === "75%" ? "var(--bb-dark)" : "rgba(244, 244, 244, 0.72)",
                    position: "relative",
                    zIndex: 1,
                  }}>
                    {tint.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* On light background */}
          <div>
            <div style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.5rem",
              color: "rgba(5, 5, 5, 0.35)",
              marginBottom: "0.25rem",
            }}>
              On Light
            </div>
            <div style={{ display: "flex", gap: "1px" }}>
              {accentTintScale.map((tint) => (
                <div
                  key={`light-${tint.label}`}
                  style={{
                    flex: 1,
                    height: 48,
                    background: tint.bg,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    paddingBottom: "0.35rem",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    color: "#050505",
                    opacity: 0.6,
                  }}>
                    {tint.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gradients */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>GRADIENTS</div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{
                height: 64,
                background: "linear-gradient(135deg, var(--bb-accent), var(--bb-dark))",
                marginBottom: "0.35rem",
              }} />
              <div style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5, 5, 5, 0.4)",
              }}>
                Linear 135deg Accent to Dark
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                height: 64,
                background: "radial-gradient(circle at center, var(--bb-accent), var(--bb-dark))",
                marginBottom: "0.35rem",
              }} />
              <div style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5, 5, 5, 0.4)",
              }}>
                Radial Accent to Dark
              </div>
            </div>
          </div>
        </div>

        {/* Usage guidelines summary */}
        <div
          style={{
            borderTop: "2px solid #050505",
            paddingTop: "1rem",
          }}
        >
          <h4
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "0.9rem",
              fontWeight: 800,
              textTransform: "uppercase",
              marginBottom: "0.75rem",
              color: "#050505",
            }}
          >
            Diretrizes de Uso
          </h4>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.7rem",
              lineHeight: 1.5,
              color: "rgba(5, 5, 5, 0.6)",
            }}
          >
            <div>
              <strong style={{ color: "#050505" }}>60% Dark</strong>{" // Backgrounds, canvas, depth"}
            </div>
            <div>
              <strong style={{ color: "var(--bb-dark)", background: "var(--bb-accent)", padding: "0 0.25rem" }}>
                25% {STARTER_PALETTE.accent.name}
              </strong>{" // CTAs, interactive, emphasis"}
            </div>
            <div>
              <strong style={{ color: "#050505" }}>10% Cream</strong>{" // Text, editorial, print"}
            </div>
            <div>
              <strong style={{ color: "#050505" }}>5% Semantic</strong>{" // Status, alerts, errors"}
            </div>
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
}

const specLabelStyle = {
  fontFamily: "var(--font-bb-mono)" as const,
  fontSize: "0.55rem",
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  opacity: 0.6,
  marginBottom: "0.1rem",
}

const sectionLabelStyle = {
  fontFamily: "var(--font-bb-mono)" as const,
  fontSize: "0.55rem",
  fontWeight: 700,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  color: "rgba(5, 5, 5, 0.4)",
  marginBottom: "0.5rem",
}
