import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import { PAGE_CONTENT } from "@/components/brandbook/data/movimento-content"

const mono: React.CSSProperties = {
  fontFamily: "var(--font-bb-mono)",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
}

export function HeaderBanner() {
  return (
    <div
      style={{
        background: "var(--bb-surface)",
        backgroundImage:
          "linear-gradient(to right, rgba(245,244,231,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,231,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        minHeight: 340,
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Nav Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.7rem 1.5rem",
          borderBottom: "1px solid var(--bb-border)",
          ...mono,
          fontSize: "0.7rem",
          color: "var(--bb-dim)",
        }}
      >
        <span>{STARTER_BRAND_ASSETS.brandName.toUpperCase()}</span>
        <span>{PAGE_CONTENT.headerBanner.navCenter}</span>
        <span>{STARTER_BRAND_ASSETS.editionLabel}</span>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          padding: "2.5rem",
        }}
      >
        <img src={STARTER_BRAND_ASSETS.logoLightSrc} alt={STARTER_BRAND_ASSETS.logoAlt} style={{ height: "clamp(2rem, 5vw, 4rem)" }} />
        <div style={{ maxWidth: 280, textAlign: "right" as const, paddingBottom: "2rem", color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", lineHeight: 1.6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
          <strong style={{ color: "var(--bb-cream)" }}>{PAGE_CONTENT.headerBanner.eyebrow}</strong>
          <br />
          {PAGE_CONTENT.headerSubtitle}
        </div>
      </div>

      {/* Footer Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0.6rem 1.5rem",
          borderTop: "1px solid var(--bb-border)",
          ...mono,
          fontSize: "0.65rem",
          color: "var(--bb-dim)",
        }}
      >
        <span>{PAGE_CONTENT.headerBanner.footerLeft}</span>
        <span style={{ color: "var(--bb-accent)" }}>{PAGE_CONTENT.headerBanner.footerCenter}</span>
        <span>{PAGE_CONTENT.headerBanner.footerRight}</span>
      </div>
    </div>
  )
}
