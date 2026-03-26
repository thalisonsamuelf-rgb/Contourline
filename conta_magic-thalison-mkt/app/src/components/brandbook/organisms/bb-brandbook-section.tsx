import type { ReactNode } from "react"

export interface BbBrandbookSectionProps {
  /** Section ID for scroll-spy navigation */
  id: string
  /** Panel header label (e.g. "MANIFESTO") */
  label: string
  /** Panel header concept (e.g. "Core Belief") */
  concept: string
  /** Section number (e.g. "01") */
  num: string
  /** Section header subtitle (e.g. "01. Manifesto") */
  subtitle: string
  /** Section header h2 title */
  title: string
  /** Footer left text */
  footerLeft: string
  /** Footer center text */
  footerCenter: string
  /** Section content */
  children: ReactNode
}

const mono: React.CSSProperties = {
  fontFamily: "var(--font-bb-mono)",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.1em",
}

/** Reusable section wrapper matching the HTML brandbook panel-header + section-header + footer-bar pattern */
export function BbBrandbookSection({
  id,
  label,
  concept,
  num,
  subtitle,
  title,
  footerLeft,
  footerCenter,
  children,
}: BbBrandbookSectionProps) {
  return (
    <section id={id} style={{ padding: "4rem 0", borderBottom: "1px solid var(--bb-border)" }}>
      {/* Panel Header: ── LABEL concept NUM ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 0,
          padding: "0.6rem 1.5rem",
          borderBottom: "1px solid var(--bb-border)",
          ...mono,
          fontSize: "0.65rem",
        }}
      >
        <span style={{ flex: 1, height: 1, background: "var(--bb-border)" }} />
        <span style={{ color: "var(--bb-cream)", letterSpacing: "0.1em", padding: "0 1rem", whiteSpace: "nowrap" }}>
          {label}
        </span>
        <span style={{ color: "var(--bb-dim)", padding: "0 0.8rem", whiteSpace: "nowrap" }}>{concept}</span>
        <span style={{ color: "var(--bb-accent)", padding: "0 0.5rem 0 0", whiteSpace: "nowrap" }}>{num}</span>
        <span style={{ flex: 1, height: 1, background: "var(--bb-border)" }} />
      </div>

      {/* Section Header */}
      <div style={{ marginTop: "2rem" }}>
        <span style={{ ...mono, color: "var(--bb-accent)", fontSize: "0.7rem", display: "block", marginBottom: "0.5rem" }}>
          {subtitle}
        </span>
        <h2
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--bb-cream)",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Content */}
      <div style={{ marginTop: "2rem", fontFamily: "var(--font-bb-mono)" }}>{children}</div>

      {/* Footer Bar */}
      <div
        className="flex flex-col gap-1 sm:flex-row sm:justify-between"
        style={{
          padding: "0.6rem 1.5rem",
          borderTop: "1px solid var(--bb-border)",
          marginTop: "2rem",
          ...mono,
          fontSize: "0.65rem",
          color: "var(--bb-dim)",
        }}
      >
        <span>{footerLeft}</span>
        <span>{footerCenter}</span>
        <span style={{ color: "var(--bb-accent)" }}>{num}</span>
      </div>
    </section>
  )
}
