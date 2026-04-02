import { STARTER_TYPOGRAPHY } from "@/components/brandbook/data/starter-brand-data"
import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   TYPOGRAPHY SECTION — Font specimens + type scale
   Server component. No interactivity needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const specimens = [
  {
    label: "Display / Headlines",
    sampleName: STARTER_TYPOGRAPHY.display.sampleName,
    sampleStyle: {
      fontFamily: "var(--font-bb-display)",
      fontSize: "2rem",
      fontWeight: 800,
      textTransform: "uppercase" as const,
      letterSpacing: "-0.03em",
    },
    charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789 !@#$%&*",
    charsetStyle: {
      fontFamily: "var(--font-bb-display)",
      fontSize: "1rem",
      fontWeight: 800,
      color: "var(--bb-dim)",
      textTransform: "uppercase" as const,
    },
    meta: `${STARTER_TYPOGRAPHY.display.cssToken} // ${STARTER_TYPOGRAPHY.display.family} ${STARTER_TYPOGRAPHY.display.weights} // ${STARTER_TYPOGRAPHY.display.usage}`,
  },
  {
    label: "Sans / Primary",
    sampleName: STARTER_TYPOGRAPHY.sans.sampleName,
    sampleStyle: {
      fontFamily: "var(--font-bb-sans)",
      fontSize: "2rem",
      fontWeight: 600,
    },
    charset:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789 !@#$%&*",
    charsetStyle: {
      fontFamily: "var(--font-bb-sans)",
      fontSize: "1rem",
      fontWeight: 600,
      color: "var(--bb-dim)",
    },
    meta: `${STARTER_TYPOGRAPHY.sans.cssToken} // ${STARTER_TYPOGRAPHY.sans.family} ${STARTER_TYPOGRAPHY.sans.weights} // ${STARTER_TYPOGRAPHY.sans.usage}`,
  },
  {
    label: "Mono / Technical",
    sampleName: STARTER_TYPOGRAPHY.mono.sampleName,
    sampleStyle: {
      fontFamily: "var(--font-bb-mono)",
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    charset:
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ\nabcdefghijklmnopqrstuvwxyz\n0123456789 {}<>[]()=>",
    charsetStyle: {
      fontFamily: "var(--font-bb-mono)",
      fontSize: "0.85rem",
      fontWeight: 500,
      color: "var(--bb-dim)",
    },
    meta: `${STARTER_TYPOGRAPHY.mono.cssToken} // ${STARTER_TYPOGRAPHY.mono.family} ${STARTER_TYPOGRAPHY.mono.weights} // ${STARTER_TYPOGRAPHY.mono.usage}`,
  },
]

const typeScale = [
  {
    size: "4rem",
    name: "Display",
    style: {
      fontFamily: "var(--font-bb-display)",
      fontSize: "4rem",
      fontWeight: 800,
      textTransform: "uppercase" as const,
      letterSpacing: "-0.03em",
      lineHeight: 1,
    },
    sample: "STARTER",
  },
  {
    size: "2.5rem",
    name: "H1",
    style: {
      fontFamily: "var(--font-bb-display)",
      fontSize: "2.5rem",
      fontWeight: 800,
      textTransform: "uppercase" as const,
      letterSpacing: "-0.03em",
      lineHeight: 1,
    },
    sample: "Page Title",
  },
  {
    size: "1.5rem",
    name: "H2",
    style: {
      fontFamily: "var(--font-bb-display)",
      fontSize: "1.5rem",
      fontWeight: 800,
      textTransform: "uppercase" as const,
      lineHeight: 1,
    },
    sample: "Section Title",
  },
  {
    size: "1rem",
    name: "Body",
    style: {
      fontFamily: "var(--font-bb-sans)",
      fontSize: "1rem",
    },
    sample: "The quick brown fox jumps over the lazy dog.",
  },
  {
    size: "0.8rem",
    name: "Small",
    style: {
      fontFamily: "var(--font-bb-sans)",
      fontSize: "0.8rem",
      color: "var(--bb-dim)",
    },
    sample: "Secondary text, descriptions, and supporting content.",
  },
  {
    size: "0.65rem",
    name: "Label",
    style: {
      fontFamily: "var(--font-bb-mono)",
      fontSize: "0.65rem",
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      color: "var(--bb-dim)",
    },
    sample: "HUD Labels // Navigation // Status",
  },
  {
    size: "0.6rem",
    name: "Micro",
    style: {
      fontFamily: "var(--font-bb-mono)",
      fontSize: "0.6rem",
      textTransform: "uppercase" as const,
      letterSpacing: "0.12em",
      color: "var(--bb-accent)",
    },
    sample: "Footer Meta // Class Names // Refs",
  },
]

interface TypographySectionProps {
  className?: string
}

export function TypographySection({ className }: TypographySectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      {/* Font Family Specimens */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {specimens.map((spec) => (
          <div
            key={spec.label}
            style={{
              background: "var(--bb-dark)",
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {spec.label}
            </div>
            <div style={{ ...spec.sampleStyle, lineHeight: 1.2 }}>
              {spec.sampleName}
            </div>
            <div style={{ ...spec.charsetStyle, lineHeight: 1.2, whiteSpace: "pre-line" }}>
              {spec.charset}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginTop: "auto",
              }}
            >
              {spec.meta}
            </div>
          </div>
        ))}
      </div>

      {/* Type Scale */}
      <div style={{ marginTop: "1px" }}>
        {typeScale.map((row) => (
          <div
            key={row.name}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "1.5rem",
              padding: "1.25rem 2rem",
              borderBottom: "1px solid var(--bb-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                minWidth: "60px",
                textTransform: "uppercase",
              }}
            >
              {row.size}
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                color: "var(--bb-dim)",
                minWidth: "100px",
                textTransform: "uppercase",
              }}
            >
              {row.name}
            </span>
            <span
              style={{
                ...row.style,
                flex: 1,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: row.style.color ?? "var(--bb-cream)",
              }}
            >
              {row.sample}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
