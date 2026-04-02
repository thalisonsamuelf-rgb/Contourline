import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   GRID SYSTEM SPREAD // 12-column grid + spacing scale
   Server component. Left page shows 12-column grid visualization with
   module variations. Right page shows spacing scale and base unit.
   Source of truth: globals.css (--bb-* tokens, --space-* tokens)
   ═══════════════════════════════════════════════════════════════════════════ */

const spacingScale = [
  { label: "4px", value: 4, token: "--space-1" },
  { label: "8px", value: 8, token: "--space-2" },
  { label: "12px", value: 12, token: "--space-3" },
  { label: "16px", value: 16, token: "--space-4" },
  { label: "24px", value: 24, token: "--space-6" },
  { label: "32px", value: 32, token: "--space-8" },
  { label: "48px", value: 48, token: "--space-12" },
  { label: "64px", value: 64, token: "--space-16" },
]

export function GridSystemSpread({ className }: { className?: string }) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // 12-column grid visualization */}
      <Page side="left" pageNumber={21} sectionName="Grid System">
        <SectionNumber>21. GRID STRUCTURE.</SectionNumber>

        {/* 12-Column Grid */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={sectionLabelStyle}>12-COLUMN GRID</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "4px",
              height: 200,
              marginTop: "0.5rem",
            }}
          >
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                style={{
                  background:
                    i % 2 === 0
                      ? "var(--bb-accent-25)"
                      : "var(--bb-accent-15)",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  paddingBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    color: "var(--bb-dark)",
                    opacity: 0.5,
                  }}
                >
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Info */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            { label: "COLUMNS", value: "12" },
            { label: "GUTTER", value: "24px" },
            { label: "MARGIN", value: "4rem" },
          ].map((spec) => (
            <div
              key={spec.label}
              style={{
                borderTop: "2px solid var(--bb-dark)",
                paddingTop: "0.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "rgba(5,5,5,0.4)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-display)",
                  fontSize: "1.5rem",
                  fontWeight: 900,
                  color: "var(--bb-dark)",
                }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        {/* Module Variations */}
        <div style={{ marginBottom: "1rem" }}>
          <div style={sectionLabelStyle}>MODULE VARIATIONS</div>
        </div>

        {[
          { label: "12x1", cols: 1 },
          { label: "6x2", cols: 2 },
          { label: "4x3", cols: 3 },
          { label: "3x4", cols: 4 },
        ].map((variation) => (
          <div key={variation.label} style={{ marginBottom: "0.75rem" }}>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5,5,5,0.4)",
                marginBottom: "0.25rem",
              }}
            >
              {variation.label}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${variation.cols}, 1fr)`,
                gap: "4px",
                height: 32,
              }}
            >
              {Array.from({ length: variation.cols }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: "var(--bb-dark)",
                    opacity: 0.8 - i * 0.1,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </Page>

      {/* RIGHT PAGE // Spacing scale */}
      <Page side="right" pageNumber={22} sectionName="Grid System">
        <HugeNumber>11</HugeNumber>

        <SectionNumber>22. SPACING SCALE.</SectionNumber>

        {/* Spacing Scale */}
        {spacingScale.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                fontWeight: 700,
                color: "rgba(5,5,5,0.4)",
                minWidth: 40,
                textAlign: "right",
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                width: item.value * 3,
                height: 16,
                background: "var(--bb-accent)",
              }}
            />
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5,5,5,0.3)",
              }}
            >
              {item.token}
            </div>
          </div>
        ))}

        {/* Base Unit */}
        <div
          style={{
            borderTop: "2px solid var(--bb-dark)",
            paddingTop: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <div style={sectionLabelStyle}>BASE UNIT</div>
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "3rem",
              fontWeight: 900,
              color: "var(--bb-dark)",
              lineHeight: 1,
              marginBottom: "0.5rem",
            }}
          >
            4px
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.7rem",
              color: "rgba(5,5,5,0.5)",
              lineHeight: 1.5,
            }}
          >
            All spacing values are multiples of the 4px base unit.
            This ensures consistent alignment across all components
            and layouts in the design system.
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
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
