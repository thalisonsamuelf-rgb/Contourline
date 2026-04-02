"use client"

import { BbCompPageTemplate } from "../templates"
import {
  STARTER_BRAND_ASSETS,
  STARTER_PAGE_CHROME,
  STARTER_RUNTIME_LABELS,
} from "@/components/brandbook/data/starter-brand-data"

/** Reusable logo display — renders the real SVG asset */
function LogoDisplay({
  size = "3rem",
  variant = "white",
  style,
}: {
  size?: string
  /** @deprecated kept for backward compat — use variant instead */
  accent?: boolean
  variant?: "white" | "black"
  style?: React.CSSProperties
}) {
  const src = variant === "black"
    ? STARTER_BRAND_ASSETS.logoDarkSrc
    : STARTER_BRAND_ASSETS.logoLightSrc

  return (
    <img
      src={src}
      alt={STARTER_BRAND_ASSETS.logoAlt}
      style={{ height: size, width: "auto", display: "block", ...style }}
    />
  )
}

/** Mono label */
function MonoLabel({ children, color = "var(--bb-accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.6rem",
        color,
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
      }}
    >
      {children}
    </span>
  )
}

/** Grid cell */
function LogoCell({ children, bg = "var(--dark)" }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      style={{
        background: bg,
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      {children}
    </div>
  )
}

/** Usage cell with correct/incorrect status */
function UsageCell({
  children,
  correct,
  desc,
  style,
}: {
  children: React.ReactNode
  correct: boolean
  desc: string
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: "var(--dark)",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        position: "relative",
        opacity: correct ? 1 : 0.5,
        ...style,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "0.75rem",
          right: "0.75rem",
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.5rem",
          color: correct ? "var(--bb-accent)" : "var(--error)",
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
        }}
      >
        {correct ? "CORRECT" : "INCORRECT"}
      </span>
      {children}
      <span
        style={{
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.55rem",
          color: "var(--dim)",
          textAlign: "center",
          textTransform: "uppercase" as const,
          letterSpacing: "0.06em",
        }}
      >
        {desc}
      </span>
    </div>
  )
}

export function LogoPage() {
  const chrome = STARTER_PAGE_CHROME.logo

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Logo",
        titleHighlight: "System",
      }}
      sections={[
        {
          label: "Primary Logo",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1px", background: "var(--border)" }}>
              <LogoCell>
                <MonoLabel>Primary / Dark Background</MonoLabel>
                <LogoDisplay />
              </LogoCell>
              <LogoCell bg="var(--cream-alt, #f5f0e8)">
                <MonoLabel color="var(--dark)">Primary / Light Background</MonoLabel>
                <LogoDisplay variant="black" />
              </LogoCell>
            </div>
          ),
        },
        {
          label: "Variants",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1px", background: "var(--border)" }}>
              <LogoCell>
                <MonoLabel>{STARTER_RUNTIME_LABELS.horizontalLogoLabel}</MonoLabel>
                <LogoDisplay size="2.5rem" />
              </LogoCell>
              <LogoCell>
                <MonoLabel>Compact</MonoLabel>
                <LogoDisplay size="1.5rem" />
              </LogoCell>
              <LogoCell>
                <MonoLabel>Favicon / Small</MonoLabel>
                <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
                  <LogoDisplay size="1.2rem" />
                  <img src={STARTER_BRAND_ASSETS.logoDarkSrc} alt={STARTER_BRAND_ASSETS.logoAlt} style={{ width: 32, height: 32 }} />
                </div>
              </LogoCell>
            </div>
          ),
        },
        {
          label: "Clear Space",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "var(--border)" }}>
              <LogoCell>
                <MonoLabel>Minimum Clear Space = 1x height of &quot;X&quot;</MonoLabel>
                <div
                  style={{
                    position: "relative",
                    padding: "2rem",
                    border: "1px dashed var(--bb-accent-25)",
                  }}
                >
                  {/* Markers */}
                  {["top", "bottom", "left", "right"].map((pos) => (
                    <span
                      key={pos}
                      style={{
                        position: "absolute",
                        fontFamily: "var(--font-bb-mono)",
                        fontSize: "0.45rem",
                        color: "var(--bb-accent-40)",
                        textTransform: "uppercase" as const,
                        ...(pos === "top" && { top: "0.3rem", left: "50%", transform: "translateX(-50%)" }),
                        ...(pos === "bottom" && { bottom: "0.3rem", left: "50%", transform: "translateX(-50%)" }),
                        ...(pos === "left" && { left: "0.3rem", top: "50%", transform: "translateY(-50%)" }),
                        ...(pos === "right" && { right: "0.3rem", top: "50%", transform: "translateY(-50%)" }),
                      }}
                    >
                      1x
                    </span>
                  ))}
                  <LogoDisplay size="2rem" />
                </div>
              </LogoCell>
            </div>
          ),
        },
        {
          label: "Usage Rules",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
              <UsageCell correct desc="Use approved colors only">
                <LogoDisplay size="2rem" />
              </UsageCell>
              <UsageCell correct desc="Monochrome on brand bg" style={{ background: "var(--bb-accent)" }}>
                <LogoDisplay size="2rem" variant="black" />
              </UsageCell>
              <UsageCell correct={false} desc="Never use non-brand colors">
                <LogoDisplay size="2rem" style={{ filter: "hue-rotate(180deg) saturate(2)" }} />
              </UsageCell>
              <UsageCell correct={false} desc="Never rotate or distort">
                <div style={{ transform: "rotate(15deg)" }}>
                  <LogoDisplay size="2rem" />
                </div>
              </UsageCell>
            </div>
          ),
        },
        {
          label: "Color Contexts",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
              <LogoCell bg="var(--void, #000)">
                <MonoLabel>On Black (#000)</MonoLabel>
                <LogoDisplay size="2rem" />
              </LogoCell>
              <LogoCell bg="var(--surface)">
                <MonoLabel>On Surface (#0F0F11)</MonoLabel>
                <LogoDisplay size="2rem" />
              </LogoCell>
              <LogoCell bg="var(--cream-alt, #f5f0e8)">
                <MonoLabel color="var(--dark)">On Cream</MonoLabel>
                <LogoDisplay size="2rem" variant="black" />
              </LogoCell>
              <LogoCell bg="var(--bb-accent)">
                <MonoLabel color="var(--dark)">On Lime</MonoLabel>
                <LogoDisplay size="2rem" variant="black" />
              </LogoCell>
            </div>
          ),
        },
      ]}
    />
  )
}
