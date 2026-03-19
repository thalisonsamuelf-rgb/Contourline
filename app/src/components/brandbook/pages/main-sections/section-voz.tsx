import { BbBrandbookSection } from "../../organisms"
import { SECTION_CHROME, VOZ } from "@/components/brandbook/data/movimento-content"

export function SectionVoz() {
  const chrome = SECTION_CHROME.voz

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {VOZ.intro}
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {VOZ.traits.map((t) => (
          <div key={t.title} style={{ border: "1px solid var(--bb-border)", padding: "1.5rem" }}>
            <h4
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.15rem",
                fontWeight: 800,
                color: "var(--bb-cream)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              {t.title}
            </h4>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: "0 0 1rem" }}>
              {t.desc}
            </p>
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "var(--bb-accent-02)",
                borderLeft: "2px solid var(--bb-accent)",
                fontStyle: "italic",
                color: "var(--bb-accent)",
                fontSize: "0.9rem",
              }}
            >
              {t.example}
            </div>
          </div>
        ))}
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{VOZ.insight.title}</strong> {VOZ.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
