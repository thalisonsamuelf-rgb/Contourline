import {
  STARTER_BRAND_ASSETS,
  STARTER_CORE_PALETTE_SWATCHES,
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
   LOGO SYSTEM SPREAD // Construction grid + logo variants
   Server component. Shows logo construction with draft lines and
   annotation markers, plus variant showcase.
   ═══════════════════════════════════════════════════════════════════════════ */

interface LogoSystemSpreadProps {
  className?: string
}

export function LogoSystemSpread({ className }: LogoSystemSpreadProps) {
  return (
    <SpreadSection className={cn(className)}>
      {/* LEFT PAGE // Logo construction grid */}
      <Page side="left" pageNumber={1} sectionName="Logo System">
        <div id="logo" style={{ position: "absolute", top: "-100px" }} />
        <SectionNumber>1. LOGO SYSTEM.</SectionNumber>

        {/* Construction grid box */}
        <div
          style={{
            border: "2px solid var(--bb-dark)",
            padding: "3rem",
            marginBottom: "3rem",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 250,
          }}
        >
          {/* Draft grid lines */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)",
              backgroundSize: "20px 20px",
              zIndex: 1,
            }}
          />

          {/* Horizontal annotation lines */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "80%",
              height: 1,
              background: "var(--bb-dark)",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%",
              left: "10%",
              width: "80%",
              height: 1,
              background: "var(--bb-dark)",
              zIndex: 3,
            }}
          />

          {/* Vertical annotation lines */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: 1,
              height: "60%",
              background: "var(--bb-dark)",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: 1,
              height: "60%",
              background: "var(--bb-dark)",
              zIndex: 3,
            }}
          />

          {/* Annotations */}
          <span
            style={{
              position: "absolute",
              top: "15%",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "0.65rem",
              fontWeight: 700,
              fontFamily: "var(--font-bb-sans)",
              color: "var(--bb-dark)",
              textTransform: "uppercase",
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            Primary typeface cannot be distorted
          </span>
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "2%",
              transform: "translateY(-50%)",
              fontSize: "0.65rem",
              fontWeight: 700,
              fontFamily: "var(--font-bb-sans)",
              color: "var(--bb-dark)",
              textTransform: "uppercase",
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            Safe space
          </span>

          {/* Logo SVG */}
          <img
            src={STARTER_BRAND_ASSETS.logoDarkSrc}
            alt={STARTER_BRAND_ASSETS.logoAlt}
            style={{
              position: "relative",
              zIndex: 2,
              height: "4rem",
              width: "auto",
            }}
          />
        </div>

        {/* Color palette preview */}
        <div style={{ marginTop: "3rem" }}>
          <SectionNumber>2. COLOR PALETTE.</SectionNumber>
        </div>
        <div
          style={{
            display: "flex",
            height: 200,
            marginBottom: "2rem",
            borderBottom: "2px solid var(--bb-dark)",
            borderTop: "2px solid var(--bb-dark)",
          }}
        >
          {STARTER_CORE_PALETTE_SWATCHES.map((swatch, index) => (
            <ColorCard
              key={`${swatch.name}-${swatch.hex}`}
              name={swatch.name}
              hex={swatch.hex}
              bg={swatch.bg}
              textColor={swatch.textColor}
              isLast={index === STARTER_CORE_PALETTE_SWATCHES.length - 1}
            />
          ))}
        </div>
      </Page>

      {/* RIGHT PAGE // Logo variants + typography preview */}
      <Page side="right" pageNumber={2} sectionName="Logo System">
        <HugeNumber>01</HugeNumber>

        {/* Logo variant mockups */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
            {/* Primary - white on dark */}
            <LogoVariant
              label="Primary"
              bg="var(--bb-dark)"
              logoSrc={STARTER_BRAND_ASSETS.logoLightSrc}
            />
            {/* Reversed - dark on accent */}
            <LogoVariant
              label="Reversed"
              bg="var(--bb-accent)"
              logoSrc={STARTER_BRAND_ASSETS.logoDarkSrc}
            />
          </div>
          <div style={{ display: "flex", gap: "2rem" }}>
            {/* On Cream */}
            <LogoVariant
              label="On Light"
              bg="var(--bb-cream)"
              logoSrc={STARTER_BRAND_ASSETS.logoDarkSrc}
            />
            {/* Minimum size spec */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  border: "2px solid var(--bb-dark)",
                  padding: "1.5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <img
                  src={STARTER_BRAND_ASSETS.logoDarkSrc}
                  alt={STARTER_BRAND_ASSETS.logoAlt}
                  style={{
                    height: "1rem",
                    width: "auto",
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.6rem",
                    color: "rgba(5, 5, 5, 0.4)",
                    textTransform: "uppercase",
                  }}
                >
                  Min size: 24px height
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  color: "var(--bb-dark)",
                  textTransform: "uppercase",
                  display: "block",
                  marginTop: "0.5rem",
                }}
              >
                Minimum Size
              </span>
            </div>
          </div>
        </div>

        {/* Typography preview */}
        <div style={{ marginTop: "4rem" }} id="foundations">
          <SectionNumber>3. TYPOGRAPHY.</SectionNumber>
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "4rem",
              fontWeight: 900,
              letterSpacing: "-2px",
              marginBottom: "2rem",
              borderBottom: "2px solid var(--bb-dark)",
              paddingBottom: "1rem",
              color: "var(--bb-dark)",
            }}
          >
            {STARTER_TYPOGRAPHY.display.family}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "2rem",
              fontSize: "0.9rem",
              borderTop: "2px solid var(--bb-dark)",
              paddingTop: "2rem",
            }}
          >
            <div>
              <div style={typoLabelStyle}>Primary Typeface</div>
              <div
                style={{
                  marginBottom: "1rem",
                  fontWeight: 500,
                  fontFamily: "var(--font-bb-sans)",
                }}
              >
                {STARTER_TYPOGRAPHY.display.family} / {STARTER_TYPOGRAPHY.sans.family}
              </div>
              <div style={typoLabelStyle}>Secondary Typeface</div>
              <div style={{ fontWeight: 500, fontFamily: "var(--font-bb-sans)" }}>
                {STARTER_TYPOGRAPHY.sans.family} / {STARTER_TYPOGRAPHY.mono.family}
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-sans)",
                fontSize: "1.4rem",
                wordBreak: "break-all",
                lineHeight: 1.4,
                letterSpacing: "2px",
                fontWeight: 500,
                color: "var(--bb-dark)",
              }}
            >
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              1234567890
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

const typoLabelStyle = {
  fontFamily: "var(--font-bb-sans)",
  fontWeight: 900,
  marginBottom: "0.25rem",
  textTransform: "uppercase" as const,
  fontSize: "0.8rem",
  color: "var(--bb-dark)",
}

function ColorCard({
  name,
  hex,
  bg,
  textColor,
  isLast = false,
}: {
  name: string
  hex: string
  bg: string
  textColor: string
  isLast?: boolean
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "1rem",
        backgroundColor: bg,
        color: textColor,
        borderRight: isLast ? "none" : "1px solid #e0e0e0",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-bb-sans)",
          fontWeight: 900,
          fontSize: "0.7rem",
          textTransform: "uppercase",
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: "var(--font-bb-mono)",
          fontWeight: 500,
          fontSize: "0.6rem",
          marginTop: "0.25rem",
        }}
      >
        {hex}
      </div>
    </div>
  )
}

function LogoVariant({
  label,
  bg,
  logoSrc,
}: {
  label: string
  bg: string
  logoSrc: string
}) {
  return (
    <div style={{ flex: 1 }}>
      <div
        style={{
          backgroundColor: bg,
          padding: "2rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 120,
          border: bg === "var(--bb-accent)" ? "2px solid var(--bb-dark)" : "none",
        }}
      >
        <img
          src={logoSrc}
          alt={STARTER_BRAND_ASSETS.logoAlt}
          style={{
            height: "2rem",
            width: "auto",
          }}
        />
      </div>
      <span
        style={{
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.6rem",
          fontWeight: 700,
          color: "var(--bb-dark)",
          textTransform: "uppercase",
          display: "block",
          marginTop: "0.5rem",
        }}
      >
        {label}
      </span>
    </div>
  )
}
