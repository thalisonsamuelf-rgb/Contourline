import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   SPACING SCALE SECTION — Numeric 14-step spacing scale (--space-0 to --space-13)
   Server component. No interactivity needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const spaceTokens = [
  { token: "--space-0", value: "0px", widthPx: 0 },
  { token: "--space-1", value: "4px", widthPx: 4 },
  { token: "--space-2", value: "8px", widthPx: 8 },
  { token: "--space-3", value: "12px", widthPx: 12 },
  { token: "--space-4", value: "15px", widthPx: 15 },
  { token: "--space-5", value: "20px", widthPx: 20 },
  { token: "--space-6", value: "30px", widthPx: 30 },
  { token: "--space-7", value: "40px", widthPx: 40 },
  { token: "--space-8", value: "60px", widthPx: 60 },
  { token: "--space-9", value: "80px", widthPx: 80 },
  { token: "--space-10", value: "90px", widthPx: 90 },
  { token: "--space-11", value: "120px", widthPx: 120 },
  { token: "--space-12", value: "150px", widthPx: 150 },
  { token: "--space-13", value: "180px", widthPx: 180 },
]

const usageGuide = [
  { range: "0–3", label: "Micro UI", description: "Inline gaps, icon padding, tight clusters" },
  { range: "4–6", label: "Components", description: "Card padding, form gaps, button groups" },
  { range: "7–11", label: "Section / Layout", description: "Section padding, grid gaps, page margins" },
  { range: "12–13", label: "Editorial", description: "Large editorial blocks, hero spacing" },
]

interface SpacingScaleSectionProps {
  className?: string
}

export function SpacingScaleSection({ className }: SpacingScaleSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      {/* Scale bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {spaceTokens.map((row) => (
          <div
            key={row.token}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "0.75rem 2rem",
              borderBottom: "1px solid var(--bb-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                minWidth: 100,
                textTransform: "uppercase",
              }}
            >
              {row.token}
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                color: "var(--bb-dim)",
                minWidth: 50,
                textAlign: "right",
              }}
            >
              {row.value}
            </span>
            <div style={{ flex: 1, position: "relative", height: 16 }}>
              {row.widthPx > 0 && (
                <div
                  style={{
                    height: 16,
                    width: Math.min(row.widthPx, 180),
                    background: "var(--bb-accent)",
                    opacity: 0.2,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Usage guide */}
      <div
        style={{
          marginTop: "1px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {usageGuide.map((guide) => (
          <div
            key={guide.range}
            style={{
              background: "var(--bb-dark)",
              padding: "1.25rem 1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "0.25rem",
              }}
            >
              Space {guide.range}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.65rem",
                color: "var(--bb-cream)",
                marginBottom: "0.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {guide.label}
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                color: "var(--bb-dim)",
                lineHeight: 1.4,
              }}
            >
              {guide.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
