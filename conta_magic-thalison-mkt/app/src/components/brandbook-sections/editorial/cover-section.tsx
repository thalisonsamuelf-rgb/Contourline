import { cn } from "@/lib/utils"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import Image from "next/image"

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL COVER // Full viewport height brand poster
   Server component. Dark background with centered starter logo.
   Clean, professional design inspired by premium brandbooks.
   ═══════════════════════════════════════════════════════════════════════════ */

interface CoverSectionProps {
  className?: string
}

export function CoverSection({ className }: CoverSectionProps) {
  return (
    <section
      className={cn(className)}
      style={{
        backgroundColor: "var(--bb-dark)",
        width: "100%",
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        border: "1px solid var(--bb-border)",
      }}
    >
      {/* Top bar with metadata */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 2.5rem",
          borderBottom: "1px solid var(--bb-border)",
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "var(--bb-dim)",
        }}
      >
        <span>{STARTER_BRAND_ASSETS.brandName.toUpperCase()}</span>
        <span>{STARTER_BRAND_ASSETS.editorialSystemName.toUpperCase()}</span>
        <span>{`${STARTER_BRAND_ASSETS.editionLabel} // ${STARTER_BRAND_ASSETS.yearLabel}`}</span>
      </div>

      {/* Main content area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem",
          position: "relative",
        }}
      >
        {/* Large starter logo */}
        <div
          style={{
            marginBottom: "4rem",
          }}
        >
          <Image
            src={STARTER_BRAND_ASSETS.logoLightSrc}
            alt={STARTER_BRAND_ASSETS.logoAlt}
            width={600}
            height={175}
            style={{
              width: "clamp(300px, 50vw, 600px)",
              height: "auto",
            }}
            priority
          />
        </div>

        {/* Tagline */}
        <div
          style={{
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 800,
              color: "var(--bb-accent)",
              letterSpacing: "-1px",
              marginBottom: "1.5rem",
              lineHeight: 1.1,
              textTransform: "uppercase",
            }}
          >
            AGORA O CONTROLE É SEU.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-bb-sans)",
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
              color: "var(--bb-dim)",
              lineHeight: 1.6,
              maxWidth: 500,
              margin: "0 auto",
            }}
          >
            Devolver às pessoas o poder de criar, orquestrando IA com estrutura,
            metodologia e clareza para que qualquer pessoa com visão possa construir.
          </p>
        </div>

        {/* Decorative corner marks */}
        <CornerMark position="top-left" />
        <CornerMark position="top-right" />
        <CornerMark position="bottom-left" />
        <CornerMark position="bottom-right" />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 2.5rem",
          borderTop: "1px solid var(--bb-border)",
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ color: "var(--bb-dim)" }}>EDITORIAL EDITION</span>
        <span style={{ color: "var(--bb-accent)" }}>AI ORCHESTRATION EXPERIENCE</span>
        <span style={{ color: "var(--bb-dim)" }}>TERMINAL REAL PARA LEIGOS</span>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   CORNER MARK // Decorative registration marks
   ═══════════════════════════════════════════════════════════════════════════ */

function CornerMark({
  position,
}: {
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const positionStyles: Record<string, React.CSSProperties> = {
    "top-left": { top: "2rem", left: "2rem" },
    "top-right": { top: "2rem", right: "2rem" },
    "bottom-left": { bottom: "2rem", left: "2rem" },
    "bottom-right": { bottom: "2rem", right: "2rem" },
  }

  return (
    <div
      style={{
        position: "absolute",
        width: 20,
        height: 20,
        ...positionStyles[position],
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 1,
          backgroundColor: "var(--bb-accent)",
          top: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1,
          height: "100%",
          backgroundColor: "var(--bb-accent)",
          left: "50%",
        }}
      />
    </div>
  )
}
