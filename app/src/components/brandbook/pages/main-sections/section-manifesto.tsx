import { BbBrandbookSection } from "../../organisms"
import { MANIFESTO, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionManifesto() {
  const chrome = SECTION_CHROME.manifesto

  return (
    <BbBrandbookSection {...chrome}>
      <div
        style={{
          border: "1px solid var(--bb-border)",
          padding: 0,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "1rem",
            lineHeight: 1.8,
            fontWeight: 400,
            position: "relative",
            borderLeft: "2px solid var(--bb-accent)",
            color: "var(--bb-dim)",
            background: "var(--bb-accent-02)",
            padding: "2.5rem",
            letterSpacing: "0.01em",
          }}
        >
          {MANIFESTO.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: "1.5rem", whiteSpace: "pre-line" }}>
              {p}
            </p>
          ))}
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--bb-accent)",
              marginTop: "2rem",
              textTransform: "uppercase",
            }}
          >
            {MANIFESTO.cta}
          </div>
        </div>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{MANIFESTO.insight.title}</strong> {MANIFESTO.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
