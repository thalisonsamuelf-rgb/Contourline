import { BbBrandbookSection } from "../../organisms"
import { JORNADA, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionJornada() {
  const chrome = SECTION_CHROME.jornada

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {JORNADA.intro}
      </p>
      {JORNADA.acts.map((a) => (
        <div key={a.num} style={{ display: "flex", gap: "1.5rem", padding: "1.5rem 0", borderBottom: "1px solid var(--bb-border)" }}>
          <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "2rem", fontWeight: 800, color: "var(--bb-accent)", minWidth: 48, textAlign: "center" as const }}>{a.num}</div>
          <div>
            <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.15rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{a.title}</div>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "0.75rem" }}>{a.desc}</p>
            <div style={{ borderLeft: "2px solid var(--bb-accent)", paddingLeft: "1rem", fontStyle: "italic" }}>
              <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", margin: 0 }}>{a.quote}</p>
              <p style={{ color: "var(--bb-accent)", fontSize: "0.7rem", fontFamily: "var(--font-bb-mono)", marginTop: "0.25rem" }}>— {a.author}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{JORNADA.insight.title}</strong> {JORNADA.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
