import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   PERSONALITY SPREAD // Brand traits + tone spectrum
   Server component. Left page shows giant trait words, right page shows
   trait definitions and tone spectrum visualization.
   Dark variant — text in cream, highlights in lime.
   ═══════════════════════════════════════════════════════════════════════════ */

interface PersonalitySpreadProps {
  className?: string
}

const traits = [
  { word: "EMPOWERING", color: "var(--bb-cream)" },
  { word: "DIRECT", color: "var(--bb-accent)" },
  { word: "REBELLIOUS", color: "var(--bb-cream)" },
  { word: "CLEAR", color: "var(--bb-accent)" },
  { word: "PASSIONATE", color: "var(--bb-cream)" },
  { word: "COURAGEOUS", color: "var(--bb-accent)" },
]

const traitDefinitions = [
  { trait: "EMPOWERING", definition: "We give creators the tools and confidence to build without limits." },
  { trait: "DIRECT", definition: "We say what we mean. No jargon, no fluff, no wasted words." },
  { trait: "REBELLIOUS", definition: "We challenge the status quo of complex, gatekept development." },
  { trait: "CLEAR", definition: "Clarity in every interaction — from UI to documentation to code." },
  { trait: "PASSIONATE", definition: "We care deeply about craft, quality, and the people we serve." },
  { trait: "COURAGEOUS", definition: "We make bold decisions and own the consequences." },
]

const toneSpectrums = [
  { left: "Formal", right: "Casual", position: 70 },
  { left: "Technical", right: "Accessible", position: 65 },
  { left: "Serious", right: "Playful", position: 55 },
  { left: "Reserved", right: "Provocative", position: 75 },
]

const metaLabelStyle = {
  fontFamily: "var(--font-bb-mono)" as const,
  fontSize: "0.6rem",
  fontWeight: 700,
  color: "var(--bb-dim)" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "0.75rem",
}

export function PersonalitySpread({ className }: PersonalitySpreadProps) {
  return (
    <SpreadSection className={cn(className)} variant="dark">
      {/* LEFT PAGE // Giant Trait Words */}
      <Page side="left" pageNumber={15} variant="dark" sectionName="Personality">
        <SectionNumber variant="dark">16. BRAND TRAITS.</SectionNumber>

        <div style={{ marginTop: "1rem" }}>
          {traits.map((trait) => (
            <div
              key={trait.word}
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "3.5rem",
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: "-2px",
                textTransform: "uppercase",
                color: trait.color,
              }}
            >
              {trait.word}
            </div>
          ))}
        </div>
      </Page>

      {/* RIGHT PAGE // Trait Definitions + Tone Spectrum */}
      <Page side="right" pageNumber={16} variant="dark" sectionName="Personality">
        <HugeNumber variant="dark">08</HugeNumber>

        <SectionNumber variant="dark">17. TONE SPECTRUM.</SectionNumber>

        {/* Trait Definitions */}
        <div>
          {traitDefinitions.map((item) => (
            <div
              key={item.trait}
              style={{
                borderBottom: "1px solid rgba(244, 244, 232, 0.08)",
                padding: "0.6rem 0",
                display: "flex",
                gap: "1rem",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  minWidth: 90,
                }}
              >
                {item.trait}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "0.7rem",
                  color: "rgba(244, 244, 232, 0.5)",
                  lineHeight: 1.4,
                }}
              >
                {item.definition}
              </span>
            </div>
          ))}
        </div>

        {/* Tone Spectrum */}
        <div style={{ marginTop: "2rem" }}>
          <div style={metaLabelStyle}>TONE SPECTRUM</div>

          {toneSpectrums.map((spectrum) => (
            <div key={spectrum.left} style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.35rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {spectrum.left}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {spectrum.right}
                </span>
              </div>
              {/* Bar */}
              <div
                style={{
                  height: 4,
                  background: "rgba(244, 244, 232, 0.1)",
                  position: "relative",
                }}
              >
                {/* Marker */}
                <div
                  style={{
                    position: "absolute",
                    left: `${spectrum.position}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: "var(--bb-accent)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </Page>
    </SpreadSection>
  )
}
