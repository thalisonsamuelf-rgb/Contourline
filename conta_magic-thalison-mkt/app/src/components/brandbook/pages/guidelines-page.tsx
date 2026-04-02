"use client"

import { motion } from "framer-motion"
import { FooterBar } from "@/components/brandbook/chrome/footer-bar"
import { TickerStrip } from "@/components/brandbook/chrome/ticker-strip"
import {
  STARTER_BRAND_ASSETS,
} from "@/components/brandbook/data/starter-brand-data"
import { GUIDELINES_PAGE_CONTENT } from "@/components/brandbook/data/guidelines-page-content"
import { BentoGrid } from "@/components/brandbook-sections/guidelines/bento-grid"
import { GuidelinesPanel } from "@/components/brandbook-sections/guidelines/guidelines-panel"
import { ScrollAnimationWrapper } from "@/components/animation/scroll-animation-wrapper"
import { useBrandbookTheme } from "@/components/brandbook/theme/brandbook-theme-provider"

/* ═══════════════════════════════════════════════════════════
   Shared inline style helpers (mapping HTML vw-based sizes
   to clamp-based responsive equivalents)
   ═══════════════════════════════════════════════════════════ */

const mono: React.CSSProperties = {
  fontFamily: "var(--font-bb-mono)",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
}

const display: React.CSSProperties = {
  fontFamily: "var(--font-bb-display)",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "-0.03em",
  lineHeight: 0.9,
}

const {
  headerBanner,
  tickerRow,
  typographyPanel,
  colorPalettePanel,
  logoConstructionPanel,
  manifestoPanel,
  symbolsPanel,
  namingFlowPanel,
  positioningPanel,
  archetypesPanel,
  evidencePanel,
  narrativePanel,
  voicesPanel,
  personalityPanel,
  dualVoicePanel,
} = GUIDELINES_PAGE_CONTENT

/* ═══════════════════════════════════════════════════════════
   ROW 1 — Header Banner
   ═══════════════════════════════════════════════════════════ */
function HeaderBanner({ editionLabel }: { editionLabel: string }) {
  return (
    <GuidelinesPanel colSpan={4} className="pattern-crosshair-grid--tight">
      <div
        className="flex items-center justify-between"
        style={{
          ...mono,
          padding: "0.6rem 1.25rem",
          fontSize: "0.6rem",
          color: "var(--bb-dim)",
          borderBottom: "1px solid var(--bb-border)",
        }}
      >
        <span>{headerBanner.navLeft}</span>
        <span>{headerBanner.navCenter}</span>
        <span>{headerBanner.navRightPrefix} {editionLabel.toUpperCase()}</span>
      </div>

      <div
        className="flex items-end justify-between"
        style={{ padding: "2.5rem", flex: 1, minHeight: "32vh" }}
      >
        <img
          src={STARTER_BRAND_ASSETS.logoLightSrc}
          alt={STARTER_BRAND_ASSETS.logoAlt}
          style={{ height: "clamp(2.5rem, 10vw, 9rem)" }}
        />

        <div
          style={{
            maxWidth: "22%",
            textAlign: "right",
            paddingBottom: "2rem",
            color: "var(--bb-dim)",
            fontSize: "clamp(0.6rem, 0.9vw, 0.85rem)",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "var(--bb-cream)" }}>{headerBanner.eyebrow}</strong>
          <br />
          {headerBanner.description}
        </div>
      </div>

      <FooterBar
        left={headerBanner.footer.left}
        center={headerBanner.footer.center}
        right={headerBanner.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 2 — Ticker Strip
   ═══════════════════════════════════════════════════════════ */
function TickerRow() {
  return (
    <div className="col-span-1 md:col-span-2 lg:col-span-4">
      <TickerStrip items={[...tickerRow.items]} speed={tickerRow.speed} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 3a — Typography Panel (col-span-2, row-span-2)
   ═══════════════════════════════════════════════════════════ */
function TypographyPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      rowSpan={2}
      header={typographyPanel.header}
    >
      <ScrollAnimationWrapper animation="slideLeft">
        <div className="flex flex-col lg:flex-row" style={{ flex: 1, minHeight: "560px" }}>
          {/* Left column */}
          <div
            className="flex flex-col justify-between"
            style={{
              flex: 1.2,
              padding: "2rem",
              borderRight: "1px solid var(--bb-border)",
            }}
          >
            <div>
              <p
                style={{
                  color: "var(--bb-dim)",
                  fontSize: "clamp(0.7rem, 0.9vw, 0.85rem)",
                  lineHeight: 1.5,
                  marginBottom: "1.2rem",
                }}
              >
                {typographyPanel.intro.lead}{" "}
                <strong style={{ color: "var(--bb-cream)" }}>
                  {typographyPanel.intro.highlight}
                </strong>
                <br />
                {typographyPanel.intro.description}
              </p>
              <div
                style={{
                  ...display,
                  fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                  color: "var(--bb-cream)",
                  marginBottom: "1.2rem",
                }}
              >
                {typographyPanel.titleLines[0]}
                <br />
                {typographyPanel.titleLines[1]}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: "clamp(0.5rem, 0.65vw, 0.6rem)",
                  lineHeight: 1.8,
                  color: "var(--bb-dim)",
                  wordBreak: "break-all",
                }}
              >
                {typographyPanel.characterSetLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 ? <br /> : null}
                    {line}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid var(--bb-border)",
                paddingTop: "0.8rem",
                marginTop: "1.5rem",
              }}
            >
              <div style={{ ...mono, color: "var(--bb-dim)", fontSize: "clamp(0.5rem, 0.65vw, 0.6rem)" }}>
                {typographyPanel.metaLines[0]}
              </div>
              <div
                style={{
                  ...mono,
                  color: "var(--bb-dim)",
                  fontSize: "clamp(0.5rem, 0.65vw, 0.6rem)",
                  marginTop: "0.3rem",
                }}
              >
                {typographyPanel.metaLines[1]}
              </div>
            </div>
          </div>

          {/* Right column — type specimen */}
          <div
            className="flex flex-col"
            style={{
              flex: 1,
              background: "var(--bb-surface)",
              overflow: "hidden",
            }}
          >
            {/* Weight labels */}
            <div className="flex flex-col lg:flex-row" style={{ borderBottom: "1px solid var(--bb-border)" }}>
              {typographyPanel.weightLabels.map((weight) => (
                <div
                  key={weight.label}
                  style={{
                    flex: 1,
                    padding: "0.6rem 0.4rem",
                    ...mono,
                    fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)",
                    textAlign: "center",
                    color: weight.highlight ? "var(--bb-dark)" : "var(--bb-dim)",
                    background: weight.highlight ? "var(--bb-accent)" : "transparent",
                    borderRight:
                      weight.label !== "BLACK"
                        ? "1px solid var(--bb-border)"
                        : "none",
                  }}
                >
                  {weight.label}
                </div>
              ))}
            </div>

            <div
              className="flex flex-col justify-between"
              style={{ flex: 1, padding: "1.5rem", overflow: "hidden" }}
            >
              <div>
                <div
                  style={{
                    ...mono,
                    marginBottom: "0.5rem",
                    color: "var(--bb-dim)",
                    fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)",
                  }}
                >
                  {typographyPanel.specimen.weightLabel}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "clamp(4rem, 11vw, 9rem)",
                    fontWeight: 300,
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                    color: "var(--bb-cream)",
                  }}
                >
                  {typographyPanel.specimen.glyph}
                </div>
              </div>

              <div style={{ fontWeight: 300 }}>
                <div
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "clamp(0.9rem, 1.6vw, 1.4rem)",
                    lineHeight: 1.3,
                    marginBottom: "0.8rem",
                    color: "var(--bb-cream)",
                  }}
                >
                  {typographyPanel.specimen.pangram}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "clamp(0.6rem, 0.85vw, 0.8rem)",
                    lineHeight: 1.5,
                    marginBottom: "0.8rem",
                    color: "var(--bb-dim)",
                  }}
                >
                  {typographyPanel.specimen.characterLines.map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-sans)",
                    fontSize: "clamp(0.5rem, 0.72vw, 0.68rem)",
                    lineHeight: 1.6,
                    color: "var(--bb-dim)",
                  }}
                >
                  {typographyPanel.specimen.note}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={typographyPanel.footer.left}
        center={typographyPanel.footer.center}
        right={typographyPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 3b — Color Palette (col-span-2)
   ═══════════════════════════════════════════════════════════ */

function ColorPalettePanel({
  accentName,
  accentHex,
  accentRgb,
  accentCmyk,
}: {
  accentName: string
  accentHex: string
  accentRgb: string
  accentCmyk: string
}) {
  const colors = [
    { name: accentName.toUpperCase(), hex: accentHex, bg: "var(--bb-accent)", textColor: "var(--bb-dark)", rgb: accentRgb, cmyk: accentCmyk },
    ...colorPalettePanel.fixedColors,
  ]

  return (
    <GuidelinesPanel
      colSpan={2}
      header={colorPalettePanel.header}
    >
      <ScrollAnimationWrapper animation="slideRight">
        <div className="flex flex-col lg:flex-row" style={{ flex: 1, minHeight: "320px" }}>
          {colors.map((c, i) => (
            <div
              key={c.name}
              className="flex flex-col justify-between"
              style={{
                flex: 1,
                background: c.bg,
                padding: "1.5rem",
                borderRight: i < colors.length - 1 ? "1px solid var(--bb-border)" : "none",
              }}
            >
              <span
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                  fontSize: "clamp(0.55rem, 0.8vw, 0.75rem)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: c.textColor,
                }}
              >
                {c.name}
              </span>
              <div>
                <div
                  style={{
                    ...mono,
                    color: c.textColor,
                    marginBottom: "0.5rem",
                    fontSize: "clamp(0.5rem, 0.65vw, 0.6rem)",
                  }}
                >
                  {c.hex}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: "clamp(0.4rem, 0.55vw, 0.5rem)",
                    color: c.bg === "var(--bb-accent)" || c.bg === "var(--bb-warm-white)"
                      ? "rgba(0,0,0,0.5)"
                      : "var(--bb-dim)",
                  }}
                >
                  {c.rgb}
                  <br />
                  {c.cmyk}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={colorPalettePanel.footer.left}
        center={colorPalettePanel.footer.center}
        right={colorPalettePanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 4 — Logo Construction (col-span-2)
   ═══════════════════════════════════════════════════════════ */
function LogoConstructionPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={logoConstructionPanel.header}
      className="!bg-[var(--bb-surface)]"
    >
      <ScrollAnimationWrapper animation="slideRight" delay={0.2}>
        <div
          className="flex items-center justify-center relative"
          style={{
            flex: 1,
            minHeight: "36vh",
            backgroundSize: "2rem 2rem",
            backgroundImage:
              "linear-gradient(to right, rgba(245,244,231,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,231,0.06) 1px, transparent 1px)",
          }}
        >
          {/* Construction frame */}
          <div
            className="relative flex items-center justify-center"
            style={{
              border: "1px solid var(--bb-accent)",
              width: "60%",
              height: "52%",
              position: "absolute",
            }}
          >
            {/* Logo text */}
            <div
              style={{
                ...display,
                fontSize: "clamp(2rem, 5vw, 4.5rem)",
                color: "var(--bb-cream)",
                letterSpacing: "-0.04em",
              }}
            >
              <img
                src={STARTER_BRAND_ASSETS.logoLightSrc}
                alt={STARTER_BRAND_ASSETS.logoAlt}
                style={{ height: "clamp(2rem, 5vw, 4.5rem)" }}
              />
            </div>

            {/* Dashed construction lines */}
            <div
              style={{
                position: "absolute",
                borderTop: "1px dashed var(--bb-accent)",
                width: "100%",
                top: 0,
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                borderTop: "1px dashed var(--bb-accent)",
                width: "100%",
                bottom: 0,
                left: 0,
              }}
            />
            <div
              style={{
                position: "absolute",
                borderLeft: "1px dashed var(--bb-accent)",
                height: "100%",
                top: 0,
                left: "50%",
              }}
            />

            {/* Crosshair markers */}
            {[
              { top: "-1.2rem", left: "-0.8rem" },
              { bottom: "-1.2rem", right: "-0.8rem" },
              { top: "-1.2rem", right: "-0.8rem" },
              { bottom: "-1.2rem", left: "-0.8rem" },
            ].map((pos, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  color: "var(--bb-accent)",
                  fontSize: "0.9rem",
                  ...pos,
                }}
              >
                &#10005;
              </span>
            ))}

            {/* Label */}
            <span
              style={{
                ...mono,
                position: "absolute",
                top: "-1.4rem",
                right: "2rem",
                fontSize: "clamp(0.4rem, 0.6vw, 0.55rem)",
                color: "var(--bb-accent)",
              }}
            >
              {logoConstructionPanel.safeSpaceLabel}
            </span>
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={logoConstructionPanel.footer.left}
        center={logoConstructionPanel.footer.center}
        right={logoConstructionPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 5a — The Manifesto (col-span-2)
   ═══════════════════════════════════════════════════════════ */
function ManifestoPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={manifestoPanel.header}
    >
      <ScrollAnimationWrapper animation="fadeUp">
        <div
          className="flex flex-col justify-between"
          style={{ padding: "2.5rem", flex: 1, minHeight: "320px" }}
        >
          <p
            style={{
              ...display,
              fontSize: "clamp(1.2rem, 2.6vw, 2.2rem)",
              lineHeight: 1.1,
              marginBottom: "2rem",
              color: "var(--bb-cream)",
              textTransform: "none",
              letterSpacing: "-0.02em",
            }}
          >
            &ldquo;{manifestoPanel.quoteLines[0]}
            <br />
            <span style={{ color: "var(--bb-accent)" }}>
              {manifestoPanel.quoteLines[1]}&rdquo;
            </span>
          </p>
          <div
            style={{
              columnCount: 2,
              columnGap: "2.5rem",
              color: "var(--bb-dim)",
              fontSize: "clamp(0.65rem, 0.9vw, 0.82rem)",
              lineHeight: 1.5,
            }}
          >
            {manifestoPanel.bodyParagraphs.map((paragraph, index) => (
              <span key={paragraph}>
                {index > 0 ? (
                  <>
                    <br />
                    <br />
                  </>
                ) : null}
                {paragraph}
              </span>
            ))}
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={manifestoPanel.footer.left}
        center={manifestoPanel.footer.center}
        right={manifestoPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 5b — Symbols & Meaning (col-span-2)
   ═══════════════════════════════════════════════════════════ */
function SymbolsPanel() {
  const [triangleSymbol, joystickSymbol] = symbolsPanel.symbols

  return (
    <GuidelinesPanel
      colSpan={2}
      header={symbolsPanel.header}
      className="!bg-[var(--bb-surface)]"
    >
      <ScrollAnimationWrapper animation="slideLeft">
        <div className="flex gap-6" style={{ padding: "2.5rem", flex: 1 }}>
          {/* Delta / Triangle */}
          <div
            className="flex flex-col justify-between"
            style={{
              flex: 1,
              border: "1px solid var(--bb-accent)",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                ...display,
                color: "var(--bb-accent)",
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                marginBottom: "0.8rem",
              }}
            >
              &#8710;
            </div>
            <div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(0.75rem, 1.15vw, 1rem)",
                  color: "var(--bb-cream)",
                  marginBottom: "0.5rem",
                }}
              >
                {triangleSymbol.title}
              </h3>
              <p
                style={{
                  color: "var(--bb-dim)",
                  fontSize: "clamp(0.65rem, 0.9vw, 0.82rem)",
                  lineHeight: 1.5,
                }}
              >
                {triangleSymbol.description}
              </p>
            </div>
          </div>

          {/* Joystick */}
          <div
            className="flex flex-col justify-between"
            style={{
              flex: 1,
              border: "1px solid var(--bb-border)",
              padding: "1.5rem",
              background: "var(--bb-accent)",
              color: "var(--bb-dark)",
            }}
          >
            <div style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", marginBottom: "0.8rem", lineHeight: 1 }}>
              <svg width="3.5em" height="3.5em" viewBox="0 0 24 24" fill="var(--bb-dark)">
                <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm3-3c-.83 0-1.5-.67-1.5-1.5S17.67 9 18.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
              </svg>
            </div>
            <div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(0.75rem, 1.15vw, 1rem)",
                  marginBottom: "0.5rem",
                }}
              >
                {joystickSymbol.title}
              </h3>
              <p style={{ fontSize: "clamp(0.65rem, 0.9vw, 0.82rem)", lineHeight: 1.5 }}>
                {joystickSymbol.description}
              </p>
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={symbolsPanel.footer.left}
        center={symbolsPanel.footer.center}
        right={symbolsPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 6 — Naming Flow A -> I -> O -> X (col-span-4)
   ═══════════════════════════════════════════════════════════ */

const namingItems = namingFlowPanel.items

function NamingFlowPanel() {
  return (
    <GuidelinesPanel
      colSpan={4}
      header={namingFlowPanel.header}
      className="!bg-[var(--bb-surface)]"
    >
      <ScrollAnimationWrapper animation="scale">
        <div style={{ padding: "2.5rem", minHeight: "30vh" }}>
          {/* Letter flow row */}
          <div className="flex flex-wrap items-center justify-center" style={{ marginBottom: "2.5rem", gap: "0.5rem" }}>
            {namingItems.map((item, i) => (
              <span key={item.letter} className="flex items-center">
                <span
                  style={{
                    ...display,
                    fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                    lineHeight: 1,
                    color: item.color,
                    cursor: "default",
                    transition: "transform 0.3s ease, color 0.3s ease",
                  }}
                >
                  {item.letter}
                </span>
                {i < namingItems.length - 1 && (
                  <span
                    style={{
                      fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)",
                      color: "var(--bb-dim)",
                      margin: "0 0.5rem",
                    }}
                  >
                    &#8594;
                  </span>
                )}
              </span>
            ))}
          </div>

          {/* Descriptions */}
          <div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4"
            style={{
              gap: "1.5rem",
            }}
          >
            {namingItems.map((item, i) => (
              <ScrollAnimationWrapper key={item.letter} animation="fadeUp" delay={i * 0.1}>
                <div style={{ borderLeft: `2px solid ${item.borderColor}`, paddingLeft: "1.2rem" }}>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
                      color: item.color,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--bb-dim)",
                      fontSize: "clamp(0.6rem, 0.82vw, 0.78rem)",
                      lineHeight: 1.5,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={namingFlowPanel.footer.left}
        center={namingFlowPanel.footer.center}
        right={namingFlowPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 7a — Positioning (col-span-2)
   ═══════════════════════════════════════════════════════════ */

const positioningCards = positioningPanel.cards

function PositioningPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={positioningPanel.header}
    >
      <ScrollAnimationWrapper animation="slideLeft">
        <div
          className="flex flex-col"
          style={{ padding: "2.5rem", flex: 1, gap: "1.2rem", minHeight: "360px" }}
        >
          {positioningCards.map((card) => (
            <div
              key={card.label}
              style={{
                padding: "1.2rem",
                ...(card.variant === "accent"
                  ? { background: "var(--bb-accent)", color: "var(--bb-dark)" }
                  : card.variant === "surface"
                    ? { background: "var(--bb-surface)" }
                    : { border: "1px solid var(--bb-border)" }),
              }}
            >
              <div
                style={{
                  ...mono,
                  color:
                    card.variant === "accent"
                      ? "rgba(0,0,0,0.5)"
                      : "var(--bb-dim)",
                  marginBottom: "0.4rem",
                  fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)",
                }}
              >
                {card.label}
              </div>
              <h3
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(0.85rem, 1.4vw, 1.2rem)",
                  color:
                    card.variant === "accent"
                      ? "inherit"
                      : card.variant === "surface"
                        ? "var(--bb-accent)"
                        : "var(--bb-cream)",
                  marginBottom: "0.4rem",
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(0.6rem, 0.82vw, 0.78rem)",
                  color: card.variant === "accent" ? "inherit" : "var(--bb-dim)",
                  lineHeight: 1.5,
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={positioningPanel.footer.left}
        center={positioningPanel.footer.center}
        right={positioningPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 7b — Archetypes (col-span-2)
   ═══════════════════════════════════════════════════════════ */

const archetypes = archetypesPanel.items

function ArchetypesPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={archetypesPanel.header}
      className="!bg-[var(--bb-surface)]"
    >
      <div
        className="flex flex-col justify-between"
        style={{ padding: "2.5rem", flex: 1, minHeight: "360px" }}
      >
        <div>
          {archetypes.map((arch, i) => (
            <div key={arch.label}>
              <ScrollAnimationWrapper animation="fadeUp" delay={i * 0.1}>
                <div className="flex items-center" style={{ marginBottom: "1rem" }}>
                  <span
                    style={{
                      ...mono,
                      width: "8rem",
                      fontWeight: 600,
                      fontSize: "clamp(0.55rem, 0.8vw, 0.72rem)",
                      color: arch.color,
                    }}
                  >
                    {arch.label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: "2px",
                      background: "rgba(245,244,231,0.08)",
                      margin: "0 1rem",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      style={{
                        height: "100%",
                        background: "var(--bb-accent)",
                        transformOrigin: "left",
                      }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: arch.pct / 100 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
                    />
                  </div>
                  <span
                    style={{
                      ...mono,
                      width: "3rem",
                      textAlign: "right",
                      fontSize: "clamp(0.5rem, 0.7vw, 0.65rem)",
                      color: arch.label === "MAGICIAN" ? "var(--bb-accent)" : "var(--bb-dim)",
                    }}
                  >
                    {arch.pct}%
                  </span>
                </div>
                <p
                  style={{
                    color: "var(--bb-dim)",
                    fontSize: "clamp(0.55rem, 0.8vw, 0.72rem)",
                    marginBottom: "1.5rem",
                    paddingLeft: "8rem",
                    lineHeight: 1.5,
                  }}
                >
                  {arch.description}
                </p>
              </ScrollAnimationWrapper>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--bb-border)", paddingTop: "1.2rem" }}>
          <p
            style={{
              color: "var(--bb-accent)",
              fontWeight: 600,
              fontSize: "clamp(0.6rem, 0.9vw, 0.82rem)",
              lineHeight: 1.5,
            }}
          >
            {archetypesPanel.closingLine}
          </p>
        </div>
      </div>
      <FooterBar
        left={archetypesPanel.footer.left}
        center={archetypesPanel.footer.center}
        right={archetypesPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 8 — Evidence & Stats (col-span-4)
   ═══════════════════════════════════════════════════════════ */

const stats = evidencePanel.stats

function EvidencePanel() {
  return (
    <GuidelinesPanel
      colSpan={4}
      header={evidencePanel.header}
    >
      <ScrollAnimationWrapper animation="scale">
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          style={{
            display: "grid",
          }}
        >
          {stats.map((stat, i) => (
            <ScrollAnimationWrapper key={stat.value} animation="fadeUp" delay={i * 0.1}>
              <div
                className="flex flex-col items-center justify-center"
                style={{
                  padding: "2.5rem",
                  borderRight: i < stats.length - 1 ? "1px solid var(--bb-border)" : "none",
                  textAlign: "center",
                  background: stat.accent ? "var(--bb-accent)" : "transparent",
                  color: stat.accent ? "var(--bb-dark)" : "inherit",
                  minHeight: "180px",
                }}
              >
                <div
                  style={{
                    ...display,
                    fontSize: "clamp(1.5rem, 3.5vw, 3rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                    color: stat.accent ? "var(--bb-dark)" : "var(--bb-accent)",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    ...mono,
                    fontSize: "clamp(0.55rem, 0.85vw, 0.78rem)",
                    marginTop: "0.4rem",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "clamp(0.5rem, 0.72vw, 0.65rem)",
                    marginTop: "0.2rem",
                    color: stat.accent ? "rgba(0,0,0,0.5)" : "var(--bb-dim)",
                  }}
                >
                  {stat.description}
                </div>
                <div
                  style={{
                    ...mono,
                    marginTop: "0.8rem",
                    fontSize: "clamp(0.35rem, 0.55vw, 0.5rem)",
                    color: stat.accent ? "rgba(0,0,0,0.45)" : "var(--bb-dim)",
                  }}
                >
                  {stat.source}
                </div>
              </div>
            </ScrollAnimationWrapper>
          ))}
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={evidencePanel.footer.left}
        center={evidencePanel.footer.center}
        right={evidencePanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 9a — Narrative / Hero's Journey (col-span-2)
   ═══════════════════════════════════════════════════════════ */

const journeySteps = narrativePanel.steps

function NarrativePanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={narrativePanel.header}
      className="!bg-[var(--bb-surface)]"
    >
      <div className="flex flex-col" style={{ padding: "2.5rem", flex: 1, minHeight: "380px" }}>
        {journeySteps.map((step, i) => (
          <ScrollAnimationWrapper key={step.num} animation="fadeUp" delay={i * 0.1}>
            <div
              className="flex items-start"
              style={{
                gap: "1.5rem",
                padding: "1.2rem 0",
                borderBottom: i < journeySteps.length - 1 ? "1px solid var(--bb-border)" : "none",
              }}
            >
              <div
                style={{
                  ...mono,
                  fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                  fontWeight: 600,
                  color: "var(--bb-accent)",
                  lineHeight: 1,
                  minWidth: "3rem",
                }}
              >
                {step.num}
              </div>
              <div>
                <h3
                  style={{
                    fontWeight: 600,
                    fontSize: "clamp(0.7rem, 1.15vw, 1rem)",
                    color: "var(--bb-cream)",
                    marginBottom: "0.4rem",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    color: "var(--bb-dim)",
                    fontSize: "clamp(0.6rem, 0.82vw, 0.78rem)",
                    lineHeight: 1.5,
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </ScrollAnimationWrapper>
        ))}
      </div>
      <FooterBar
        left={narrativePanel.footer.left}
        center={narrativePanel.footer.center}
        right={narrativePanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 9b — Voices / Testimonials (col-span-2)
   ═══════════════════════════════════════════════════════════ */

const testimonials = voicesPanel.testimonials

function VoicesPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={voicesPanel.header}
    >
      <div
        className="flex flex-col"
        style={{ padding: "2.5rem", flex: 1, gap: "1.2rem", minHeight: "380px" }}
      >
        {testimonials.map((t, i) => (
          <ScrollAnimationWrapper key={i} animation="fadeUp" delay={i * 0.1}>
            <div
              style={{
                borderLeft: "2px solid var(--bb-accent)",
                padding: "1.2rem",
                background: "var(--bb-accent-02)",
                transition: "transform 0.3s ease",
              }}
              className="hover:translate-x-1"
            >
              <p
                style={{
                  fontWeight: 600,
                  fontSize: "clamp(0.7rem, 1vw, 0.92rem)",
                  marginBottom: "0.4rem",
                  color: "var(--bb-cream)",
                  lineHeight: 1.4,
                }}
              >
                {t.quote}
              </p>
              <span style={{ ...mono, color: "var(--bb-dim)", fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)" }}>
                {t.author}
              </span>
            </div>
          </ScrollAnimationWrapper>
        ))}
      </div>
      <FooterBar
        left={voicesPanel.footer.left}
        center={voicesPanel.footer.center}
        right={voicesPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   ROW 10 — Brand Personality (col-span-2) + Dual Voice (col-span-2)
   ═══════════════════════════════════════════════════════════ */

function PersonalityPanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={personalityPanel.header}
    >
      <ScrollAnimationWrapper animation="fadeUp">
        <div
          className="flex flex-col justify-between"
          style={{ padding: "2.5rem", flex: 1, minHeight: "360px" }}
        >
          <div>
            <p
              style={{
                fontSize: "clamp(0.65rem, 0.95vw, 0.88rem)",
                color: "var(--bb-dim)",
                marginBottom: "1.2rem",
                lineHeight: 1.5,
              }}
            >
              {personalityPanel.intro.lead}{" "}
              <strong style={{ color: "var(--bb-cream)" }}>
                {personalityPanel.intro.highlight}
              </strong>
              : {personalityPanel.intro.description}
            </p>

            {/* Personality grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1px",
                background: "var(--bb-border)",
                marginBottom: "1.5rem",
              }}
            >
              {personalityPanel.traits.map((item) => (
                <div
                  key={item.trait}
                  style={{
                    background:
                      item.variant === "surface"
                        ? "var(--bb-surface)"
                        : "var(--bb-dark)",
                    padding: "1.2rem",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "clamp(0.6rem, 0.95vw, 0.85rem)",
                      color:
                        item.variant === "dark-accent"
                          ? "var(--bb-accent)"
                          : "var(--bb-cream)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {item.trait}
                  </h3>
                  <p
                    style={{
                      color: "var(--bb-dim)",
                      fontSize: "clamp(0.55rem, 0.78vw, 0.7rem)",
                      lineHeight: 1.4,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vocabulary tags */}
          <div>
            <div style={{ ...mono, marginBottom: "0.5rem", color: "var(--bb-dim)", fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)" }}>
              {personalityPanel.vocabulary.title}
            </div>
            <div className="flex flex-wrap" style={{ gap: "0.25rem", marginBottom: "1rem" }}>
              {personalityPanel.vocabulary.filled.map((tag) => (
                <span
                  key={tag}
                  style={{
                    ...mono,
                    display: "inline-block",
                    border: "1px solid var(--bb-accent)",
                    padding: "0.35rem 0.75rem",
                    fontWeight: 600,
                    fontSize: "clamp(0.5rem, 0.75vw, 0.68rem)",
                    background: "var(--bb-accent)",
                    color: "var(--bb-dark)",
                  }}
                >
                  {tag}
                </span>
              ))}
              {personalityPanel.vocabulary.normal.map((tag) => (
                <span
                  key={tag}
                  style={{
                    ...mono,
                    display: "inline-block",
                    border: "1px solid var(--bb-border)",
                    padding: "0.35rem 0.75rem",
                    fontWeight: 600,
                    fontSize: "clamp(0.5rem, 0.75vw, 0.68rem)",
                    color: "var(--bb-dim)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                ...mono,
                marginBottom: "0.4rem",
                color: "rgba(204,0,0,0.6)",
                fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)",
              }}
            >
              {personalityPanel.vocabulary.bannedTitle}
            </div>
            <div className="flex flex-wrap" style={{ gap: "0.25rem" }}>
              {personalityPanel.vocabulary.banned.map((tag) => (
                <span
                  key={tag}
                  style={{
                    ...mono,
                    display: "inline-block",
                    border: "1px solid rgba(204,0,0,0.4)",
                    padding: "0.35rem 0.75rem",
                    fontWeight: 600,
                    fontSize: "clamp(0.5rem, 0.75vw, 0.68rem)",
                    color: "rgba(204,0,0,0.7)",
                    textDecoration: "line-through",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={personalityPanel.footer.left}
        center={personalityPanel.footer.center}
        right={personalityPanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   Dual Voice (col-span-2)
   ═══════════════════════════════════════════════════════════ */

function DualVoicePanel() {
  return (
    <GuidelinesPanel
      colSpan={2}
      header={dualVoicePanel.header}
    >
      <ScrollAnimationWrapper animation="fadeUp">
        <div className="flex flex-col lg:flex-row" style={{ flex: 1, minHeight: "360px" }}>
          {/* AIOX voice */}
          <div
            className="flex flex-col"
            style={{
              flex: 1,
              padding: "2rem",
              gap: "0.8rem",
              borderRight: "1px solid var(--bb-border)",
            }}
          >
            <h3 style={{ marginBottom: "0.3rem" }}>
              <img
                src={STARTER_BRAND_ASSETS.logoLightSrc}
                alt={STARTER_BRAND_ASSETS.logoAlt}
                style={{ height: "clamp(0.8rem, 1.3vw, 1.1rem)" }}
              />
            </h3>
            <div style={{ ...mono, color: "var(--bb-dim)", marginBottom: "0.8rem", fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)" }}>
              {dualVoicePanel.brandVoice.subtitle}
            </div>
            <div className="flex flex-wrap" style={{ gap: "0.25rem", marginBottom: "0.8rem" }}>
              {dualVoicePanel.brandVoice.tags.map((trait) => (
                <span
                  key={trait}
                  style={{
                    ...mono,
                    display: "inline-block",
                    padding: "0.2rem 0.6rem",
                    fontSize: "clamp(0.4rem, 0.55vw, 0.5rem)",
                    background: "var(--bb-surface)",
                    color: "var(--bb-cream)",
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
            <ul
              style={{
                fontSize: "clamp(0.55rem, 0.78vw, 0.7rem)",
                paddingLeft: "1.1rem",
                lineHeight: 2,
                color: "var(--bb-dim)",
              }}
            >
              {dualVoicePanel.brandVoice.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>

          {/* Alan voice */}
          <div
            className="flex flex-col"
            style={{
              flex: 1,
              padding: "2rem",
              gap: "0.8rem",
              background: "var(--bb-surface)",
            }}
          >
            <h3
              style={{
                fontWeight: 600,
                fontSize: "clamp(0.8rem, 1.3vw, 1.1rem)",
                color: "var(--bb-accent)",
                marginBottom: "0.3rem",
              }}
            >
              {dualVoicePanel.founderVoice.title}
            </h3>
            <div style={{ ...mono, color: "var(--bb-dim)", marginBottom: "0.8rem", fontSize: "clamp(0.45rem, 0.6vw, 0.55rem)" }}>
              {dualVoicePanel.founderVoice.subtitle}
            </div>
            <div className="flex flex-wrap" style={{ gap: "0.25rem", marginBottom: "0.8rem" }}>
              {dualVoicePanel.founderVoice.tags.map((trait) => (
                <span
                  key={trait}
                  style={{
                    ...mono,
                    display: "inline-block",
                    padding: "0.2rem 0.6rem",
                    fontSize: "clamp(0.4rem, 0.55vw, 0.5rem)",
                    background: "var(--bb-accent)",
                    color: "var(--bb-dark)",
                  }}
                >
                  {trait}
                </span>
              ))}
            </div>
            <ul
              style={{
                fontSize: "clamp(0.55rem, 0.78vw, 0.7rem)",
                paddingLeft: "1.1rem",
                lineHeight: 2,
                color: "var(--bb-dim)",
              }}
            >
              {dualVoicePanel.founderVoice.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </ScrollAnimationWrapper>
      <FooterBar
        left={dualVoicePanel.footer.left}
        center={dualVoicePanel.footer.center}
        right={dualVoicePanel.footer.right}
      />
    </GuidelinesPanel>
  )
}

/* ═══════════════════════════════════════════════════════════
   GUIDELINES PAGE — Full Assembly
   ═══════════════════════════════════════════════════════════ */

export function GuidelinesPage() {
  const { meta } = useBrandbookTheme()

  return (
    <>
      <main style={{ fontFamily: "var(--font-bb-mono)" }}>
        <BentoGrid>
          {/* Row 1: Header Banner */}
          <HeaderBanner editionLabel={meta.editionLabel} />

          {/* Row 2: Ticker Strip */}
          <TickerRow />

          {/* Row 3: Typography + Color Palette */}
          <TypographyPanel />
          <ColorPalettePanel
            accentName={meta.accentName}
            accentHex={meta.accentHex}
            accentRgb={meta.accentRgb}
            accentCmyk={meta.accentCmyk}
          />

          {/* Row 4: Logo Construction */}
          <LogoConstructionPanel />

          {/* Row 5: Manifesto + Symbols */}
          <ManifestoPanel />
          <SymbolsPanel />

          {/* Row 6: Naming Flow */}
          <NamingFlowPanel />

          {/* Row 7: Positioning + Archetypes */}
          <PositioningPanel />
          <ArchetypesPanel />

          {/* Row 8: Evidence */}
          <EvidencePanel />

          {/* Row 9: Narrative + Voices */}
          <NarrativePanel />
          <VoicesPanel />

          {/* Row 10: Personality + Dual Voice */}
          <PersonalityPanel />
          <DualVoicePanel />
        </BentoGrid>
      </main>
    </>
  )
}
