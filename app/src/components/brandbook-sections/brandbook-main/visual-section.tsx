import {
  STARTER_BRAND_ASSETS,
  STARTER_COLOR_STRIPS,
  STARTER_SYMBOL_FLOW,
  STARTER_TYPOGRAPHY,
  STARTER_VISUAL_SYMBOLS,
  STARTER_VISUAL_TYPOGRAPHY_EXAMPLES,
  type StarterColorSample,
  type StarterColorStrip,
} from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import { PanelHeader } from "@/components/brandbook/chrome/panel-header"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"

/* ═══════════════════════════════════════════════════════════════════════════
   VISUAL SECTION — Full visual identity: symbols, logos, colors, typography
   Server component. Largest section in the brandbook.
   ═══════════════════════════════════════════════════════════════════════════ */

const aioxLetters = STARTER_SYMBOL_FLOW

const colorStrips = STARTER_COLOR_STRIPS

interface VisualSectionProps {
  className?: string
}

export function VisualSection({ className }: VisualSectionProps) {
  const [triangleSymbol, joystickSymbol] = STARTER_VISUAL_SYMBOLS

  return (
    <section id="visual" className={cn(className)}>
      <PanelHeader label="IDENTIDADE VISUAL" concept="Visual Identity" num="11" />

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
            11. Identidade Visual
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
            Marcas & Cores
          </h2>
        </div>

        {/* ═══ A: Símbolos ═══ */}
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "var(--bb-cream)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Símbolos
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Triangle card */}
            <div
              style={{
                background: "var(--bb-dark)",
                border: "1px solid var(--bb-border)",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              {/* CSS Triangle */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "50px solid transparent",
                  borderRight: "50px solid transparent",
                  borderBottom: "86px solid var(--bb-accent)",
                  margin: "0 auto 1rem",
                }}
              />
              <h4
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--bb-cream)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                {triangleSymbol.title}
              </h4>
              <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                {triangleSymbol.description}
              </p>
            </div>

            {/* Joystick card */}
            <div
              style={{
                background: "var(--bb-dark)",
                border: "1px solid var(--bb-border)",
                padding: "2rem",
                textAlign: "center",
              }}
            >
              {/* Gamepad SVG */}
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="var(--bb-accent)"
                style={{ margin: "0 auto 1rem", display: "block" }}
              >
                <path d="M6 9h2v2H6zm4 0h2v2h-2zm4 0h2v2h-2zm-8 4h2v2H6zm4 0h2v2h-2zm4 0h2v2h-2zM4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v10h16V7H4z" />
              </svg>
              <h4
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "var(--bb-cream)",
                  textTransform: "uppercase",
                  marginBottom: "0.5rem",
                }}
              >
                {joystickSymbol.title}
              </h4>
              <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                {joystickSymbol.description}
              </p>
            </div>
          </div>
        </div>

        {/* Concept row - starter symbol flow */}
        <div
          style={{
            background: "var(--bb-dark)",
            border: "1px solid var(--bb-border)",
            padding: "2rem",
            marginBottom: "3rem",
          }}
        >
          <div className="flex items-center justify-center" style={{ gap: "1rem" }}>
            {aioxLetters.map((item, i) => (
              <div key={item.char} className="flex items-center" style={{ gap: "1rem" }}>
                <div style={{ textAlign: "center" }}>
                  <span
                    style={{
                      fontFamily: "var(--font-bb-display)",
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: item.color,
                    }}
                  >
                    {item.char}
                  </span>
                  <div
                    style={{
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "0.6rem",
                      color: "var(--bb-dim)",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginTop: "0.25rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </div>
                </div>
                {i < aioxLetters.length - 1 && (
                  <span
                    style={{
                      fontFamily: "var(--font-bb-mono)",
                      fontSize: "1.25rem",
                      color: "var(--bb-dim)",
                    }}
                  >
                    &rarr;
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ═══ B: Logos ═══ */}
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "var(--bb-cream)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Logos
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Dark bg logo */}
            <div
              style={{
                background: "var(--bb-dark)",
                border: "1px solid var(--bb-border)",
                height: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={STARTER_BRAND_ASSETS.logoLightSrc}
                  alt={STARTER_BRAND_ASSETS.logoAlt}
                  style={{ height: "2.75rem", width: "auto" }}
                />
              </span>
            </div>

            {/* White bg logo */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid var(--bb-border)",
                height: "180px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={STARTER_BRAND_ASSETS.logoDarkSrc}
                  alt={STARTER_BRAND_ASSETS.logoAlt}
                  style={{ height: "2.75rem", width: "auto" }}
                />
              </span>
            </div>
          </div>
        </div>

        {/* ═══ C: Color Palette ═══ */}
        <div style={{ marginBottom: "3rem" }}>
          <h3
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "var(--bb-cream)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Paleta de Cores
          </h3>

          {colorStrips.map((strip: StarterColorStrip) => (
            <div key={strip.label} style={{ marginBottom: "1.5rem" }}>
              {/* Strip label */}
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "0.5rem",
                }}
              >
                {strip.label}
              </div>

              {/* Strip card */}
              <div
                style={{
                  background: "var(--bb-dark)",
                  border: "1px solid var(--bb-border)",
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex" }}>
                  {strip.colors.map((color: StarterColorSample, i: number) => {
                    const isLightText =
                      strip.specialText?.[i] !== undefined
                        ? strip.specialText[i]
                        : strip.lightText
                    const textColor = isLightText ? "#FFFFFF" : "#000000"

                    return (
                      <div
                        key={color.name}
                        style={{
                          flex: 1,
                          padding: "1.5rem",
                          minHeight: strip.minHeight,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          background: strip.isOverlay
                            ? `repeating-conic-gradient(#808080 0% 25%, #404040 0% 50%) 50% / 16px 16px`
                            : color.hex,
                          borderRight:
                            i < strip.colors.length - 1
                              ? "1px solid var(--bb-border)"
                              : "none",
                          position: "relative",
                        }}
                      >
                        {/* Overlay swatch preview */}
                        {strip.isOverlay && (
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: color.hex,
                            }}
                          />
                        )}

                        {/* Vertical label */}
                        <span
                          style={{
                            writingMode: "vertical-rl",
                            transform: "rotate(180deg)",
                            fontFamily: "var(--font-bb-mono)",
                            fontSize: "0.7rem",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                            color: strip.isOverlay ? "#FFFFFF" : textColor,
                            position: "relative",
                            zIndex: 1,
                          }}
                        >
                          {color.name}
                        </span>

                        {/* Bottom info */}
                        <div style={{ position: "relative", zIndex: 1 }}>
                          {strip.isOverlay && (
                            <div
                              style={{
                                width: "100%",
                                height: "32px",
                                background: color.hex,
                                border: "1px solid rgba(255,255,255,0.1)",
                                marginBottom: "0.5rem",
                              }}
                            />
                          )}
                          <div
                            style={{
                              fontFamily: "var(--font-bb-mono)",
                              fontSize: "0.75rem",
                              color: strip.isOverlay ? "#FFFFFF" : textColor,
                            }}
                          >
                            {color.hex}
                          </div>
                          <div
                            style={{
                              fontFamily: "var(--font-bb-mono)",
                              fontSize: "0.6rem",
                              color: strip.isOverlay
                                ? "rgba(255,255,255,0.6)"
                                : isLightText
                                  ? "rgba(255,255,255,0.5)"
                                  : "rgba(0,0,0,0.5)",
                            }}
                          >
                            {color.desc}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ D: Typography ═══ */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "var(--bb-cream)",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
            }}
          >
            Tipografia
          </h3>

          <div
            style={{
              background: "var(--bb-dark)",
              border: "1px solid var(--bb-border)",
              padding: "2rem",
            }}
          >
            {/* Display type */}
            <div style={{ marginBottom: "2.5rem" }}>
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
                {STARTER_TYPOGRAPHY.display.family} -- Headings / Display
              </div>
              <p
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--bb-cream)",
                  textTransform: "uppercase",
                  letterSpacing: "-0.03em",
                }}
              >
                {STARTER_VISUAL_TYPOGRAPHY_EXAMPLES.headline}
              </p>
            </div>

            {/* Body type */}
            <div style={{ marginBottom: "2.5rem" }}>
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
                {STARTER_TYPOGRAPHY.sans.family} -- Body
              </div>
              <p
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  color: "var(--bb-dim)",
                  lineHeight: 1.7,
                }}
              >
                {STARTER_VISUAL_TYPOGRAPHY_EXAMPLES.body}
              </p>
            </div>

            {/* Code type */}
            <div>
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
                {STARTER_TYPOGRAPHY.mono.family} -- Código
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  color: "var(--bb-accent)",
                  background: "var(--bb-surface)",
                  padding: "1rem",
                }}
              >
                {STARTER_VISUAL_TYPOGRAPHY_EXAMPLES.command}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterBar left="Visual System" center="Identity Kit" right="11" />
    </section>
  )
}
