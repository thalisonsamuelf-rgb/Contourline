import {
  STARTER_FONT_PAIRINGS,
  STARTER_TYPOGRAPHY,
} from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   TYPOGRAPHY SPREAD // Font specimens + hierarchy scale
   Server component. Left page shows the starter display specimen,
   right page shows starter font pairings with type hierarchy scale.
   Dark variant — specimens in cream/lime on dark background.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TypographySpreadProps {
  className?: string
}

export function TypographySpread({ className }: TypographySpreadProps) {
  return (
    <SpreadSection className={cn(className)} variant="dark">
      {/* LEFT PAGE // starter display specimen */}
      <Page side="left" pageNumber={5} variant="dark" sectionName="Typography">
        <SectionNumber variant="dark">6. DISPLAY TYPEFACE.</SectionNumber>

        {/* Oversized Aa hero */}
        <div
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "clamp(10rem, 20vw, 18rem)",
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: "-6px",
            marginBottom: "2rem",
            position: "relative",
          }}
        >
          <span style={{ color: "var(--bb-cream)" }}>A</span>
          <span style={{ color: "var(--bb-accent)" }}>a</span>
        </div>

        {/* Font name */}
        <div
          style={{
            borderTop: "2px solid var(--bb-accent)",
            paddingTop: "1.5rem",
          }}
        >
          <div style={metaLabelStyle}>Primary Display</div>
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "2rem",
              fontWeight: 900,
              letterSpacing: "-2px",
              color: "var(--bb-cream)",
              marginBottom: "0.5rem",
            }}
          >
            {STARTER_TYPOGRAPHY.display.family}
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              color: "var(--bb-dim)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              lineHeight: 1.6,
            }}
          >
            Weights: {STARTER_TYPOGRAPHY.display.weights}
            <br />
            Fallback: {STARTER_TYPOGRAPHY.sans.family}, system-ui, sans-serif
          </div>
        </div>
      </Page>

      {/* RIGHT PAGE // Type scale + font pairings */}
      <Page side="right" pageNumber={6} variant="dark" sectionName="Typography">
        <HugeNumber variant="dark">03</HugeNumber>

        <SectionNumber variant="dark">7. TYPE SCALE.</SectionNumber>

        {/* Cascading scale -- Capnamic style */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={metaLabelStyle}>Cascading Scale</div>
          {[
            { pt: "288pt", size: "4rem", weight: 900 },
            { pt: "144pt", size: "2.5rem", weight: 900 },
            { pt: "72pt", size: "1.5rem", weight: 800 },
            { pt: "48pt", size: "1.25rem", weight: 800 },
            { pt: "36pt", size: "1rem", weight: 700 },
            { pt: "24pt", size: "0.85rem", weight: 600 },
            { pt: "18pt", size: "0.75rem", weight: 500 },
            { pt: "12pt", size: "0.65rem", weight: 400 },
          ].map((level) => (
            <div
              key={level.pt}
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: level.size,
                fontWeight: level.weight,
                color: "var(--bb-cream)",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                borderBottom: "1px solid rgba(244, 244, 232, 0.06)",
                paddingBottom: "0.35rem",
                marginBottom: "0.35rem",
              }}
            >
              {level.pt}
            </div>
          ))}
        </div>

        {/* Font pairing examples -- keep from original */}
        <div>
          <div style={metaLabelStyle}>Font Pairings</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginTop: "0.75rem",
            }}
          >
            {STARTER_FONT_PAIRINGS.map((pair) => (
              <div
                key={pair.context}
                style={{
                  border: "1px solid rgba(244, 244, 232, 0.12)",
                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {pair.context}
                </div>
                <div
                  style={{
                    fontFamily:
                      pair.primaryKind === "display"
                        ? "var(--font-bb-display)"
                        : "var(--font-bb-sans)",
                    fontWeight: pair.primaryKind === "display" ? 900 : 600,
                    fontSize: pair.primaryKind === "display" ? "1rem" : "0.85rem",
                    textTransform: pair.primaryKind === "display"
                      ? ("uppercase" as const)
                      : ("none" as const),
                    color: "var(--bb-cream)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {pair.example.headline}
                </div>
                <div
                  style={{
                    fontFamily: pair.secondaryKind === "mono"
                      ? "var(--font-bb-mono)"
                      : "var(--font-bb-sans)",
                    fontSize: "0.75rem",
                    color: "rgba(244, 244, 232, 0.5)",
                    lineHeight: 1.4,
                  }}
                >
                  {pair.example.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
}

const metaLabelStyle = {
  fontFamily: "var(--font-bb-mono)" as const,
  fontSize: "0.6rem",
  fontWeight: 700,
  color: "var(--bb-dim)" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
}
