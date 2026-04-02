import { cn } from "@/lib/utils"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   LOGO DON'TS SPREAD // Misuse grid + usage rules + clear space
   Server component. Left page shows a 2x3 grid of logo misuse examples
   with CSS-only demos. Right page covers do's/don'ts and clear space spec.
   ═══════════════════════════════════════════════════════════════════════════ */

interface LogoDontsSpreadProps {
  className?: string
}

export function LogoDontsSpread({ className }: LogoDontsSpreadProps) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // Logo misuse grid */}
      <Page side="left" pageNumber={19} sectionName="Logo Don'ts">
        <SectionNumber>19. LOGO MISUSE.</SectionNumber>

        {/* 2x3 grid of misuse examples */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(5, 5, 5, 0.1)",
          }}
        >
          {/* 1. Stretched */}
          <MisuseCell
            label="Don't stretch"
            logoStyle={{ transform: "scaleX(1.5)" }}
          />

          {/* 2. Rotated */}
          <MisuseCell
            label="Don't rotate"
            logoStyle={{ transform: "rotate(15deg)" }}
          />

          {/* 3. Wrong Color */}
          <MisuseCell
            label="Don't recolor"
            logoStyle={{ color: "#FF69B4" }}
          />

          {/* 4. Busy Background */}
          <MisuseCell
            label="Don't use busy backgrounds"
            cellBg="linear-gradient(135deg, #DDD1BB, #FF6B00)"
          />

          {/* 5. Blurred */}
          <MisuseCell
            label="Don't blur"
            logoStyle={{ filter: "blur(2px)" }}
          />

          {/* 6. Crowded */}
          <MisuseCell
            label="Don't crowd"
            crowded
          />
        </div>
      </Page>

      {/* RIGHT PAGE // Usage rules + clear space */}
      <Page side="right" pageNumber={20} sectionName="Logo Don'ts">
        <HugeNumber>10</HugeNumber>

        <SectionNumber>20. USAGE RULES.</SectionNumber>

        {/* DO'S */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>DO</div>

          <div
            style={{
              borderLeft: "3px solid #22C55E",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontWeight: 700,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              Use approved colors only
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.65rem",
                color: "rgba(5,5,5,0.5)",
              }}
            >
              Lime on dark, dark on cream, white on dark
            </div>
          </div>

          <div
            style={{
              borderLeft: "3px solid #22C55E",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontWeight: 700,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              Maintain clear space
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.65rem",
                color: "rgba(5,5,5,0.5)",
              }}
            >
              Minimum 1x logo height on all sides
            </div>
          </div>

          <div
            style={{
              borderLeft: "3px solid #22C55E",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontWeight: 700,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
              }}
            >
              Use provided files
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.65rem",
                color: "rgba(5,5,5,0.5)",
              }}
            >
              Always use original SVG/PNG assets
            </div>
          </div>
        </div>

        {/* DON'TS */}
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={sectionLabelStyle}>DON&apos;T</div>

          <div
            style={{
              borderLeft: "3px solid #EF4444",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontWeight: 700,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
                textDecoration: "line-through",
              }}
            >
              Apply effects or filters
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.65rem",
                color: "rgba(5,5,5,0.5)",
              }}
            >
              No shadows, glows, bevels, or blur
            </div>
          </div>

          <div
            style={{
              borderLeft: "3px solid #EF4444",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontWeight: 700,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
                textDecoration: "line-through",
              }}
            >
              Alter proportions
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.65rem",
                color: "rgba(5,5,5,0.5)",
              }}
            >
              No stretching, squishing, or rotating
            </div>
          </div>

          <div
            style={{
              borderLeft: "3px solid #EF4444",
              padding: "0.75rem 1rem",
              marginBottom: "0.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontWeight: 700,
                fontSize: "0.75rem",
                marginBottom: "0.25rem",
                textDecoration: "line-through",
              }}
            >
              Place on busy backgrounds
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "0.65rem",
                color: "rgba(5,5,5,0.5)",
              }}
            >
              No gradients, photos, or patterns behind
            </div>
          </div>
        </div>

        {/* CLEAR SPACE VISUALIZATION */}
        <div style={{ marginTop: "1.5rem" }}>
          <div style={sectionLabelStyle}>CLEAR SPACE</div>
          <div
            style={{
              border: "2px dashed rgba(5, 5, 5, 0.2)",
              padding: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              marginTop: "0.5rem",
            }}
          >
            {/* Top marker */}
            <div
              style={{
                position: "absolute",
                top: "0.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5,5,5,0.3)",
              }}
            >
              1x
            </div>
            {/* Bottom marker */}
            <div
              style={{
                position: "absolute",
                bottom: "0.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5,5,5,0.3)",
              }}
            >
              1x
            </div>
            {/* Left marker */}
            <div
              style={{
                position: "absolute",
                left: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5,5,5,0.3)",
              }}
            >
              1x
            </div>
            {/* Right marker */}
            <div
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "rgba(5,5,5,0.3)",
              }}
            >
              1x
            </div>

            {/* Logo in center */}
            <div
              style={{
                background: "#050505",
                padding: "1rem 1.5rem",
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "var(--bb-accent)",
                letterSpacing: "-1px",
              }}
            >
              AIOX
            </div>
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   INTERNAL SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function MisuseCell({
  label,
  logoStyle,
  cellBg,
  crowded,
}: {
  label: string
  logoStyle?: React.CSSProperties
  cellBg?: string
  crowded?: boolean
}) {
  return (
    <div
      style={{
        background: cellBg ?? "#050505",
        padding: "1.5rem",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 120,
      }}
    >
      {/* Logo text with misuse applied */}
      {crowded ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.55rem",
              color: "var(--bb-cream)",
              fontWeight: 500,
            }}
          >
            POWERED BY
          </span>
          <span
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "1.5rem",
              fontWeight: 900,
              color: "var(--bb-cream)",
              letterSpacing: "-1px",
            }}
          >
            AIOX
          </span>
          <span
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "0.55rem",
              color: "var(--bb-cream)",
              fontWeight: 500,
            }}
          >
            PLATFORM
          </span>
        </div>
      ) : (
        <div
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "var(--bb-cream)",
            letterSpacing: "-1px",
            ...logoStyle,
          }}
        >
          AIOX
        </div>
      )}

      {/* Red X overlay */}
      <div
        style={{
          position: "absolute",
          top: "0.5rem",
          right: "0.5rem",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "rgba(239, 68, 68, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.7rem",
          fontWeight: 900,
          color: "white",
        }}
      >
        {"\u2715"}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.55rem",
          fontWeight: 700,
          color: "var(--bb-dim)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginTop: "0.75rem",
        }}
      >
        {label}
      </div>
    </div>
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
