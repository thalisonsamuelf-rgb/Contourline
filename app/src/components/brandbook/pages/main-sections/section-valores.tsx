import { BbBrandbookSection } from "../../organisms"
import { SECTION_CHROME, VALORES } from "@/components/brandbook/data/movimento-content"

export function SectionValores() {
  const chrome = SECTION_CHROME.valores

  return (
    <BbBrandbookSection {...chrome}>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-2 lg:grid-cols-3" style={{ border: "1px solid var(--bb-border)" }}>
        {VALORES.items.map((v) => (
          <div key={v.num} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.5rem",
                fontWeight: 900,
                color: "var(--bb-accent)",
              }}
            >
              {v.num}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1rem",
                fontWeight: 800,
                color: "var(--bb-cream)",
                textTransform: "uppercase",
                margin: "0.75rem 0 0.5rem",
              }}
            >
              {v.title}
            </h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>
              {v.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{VALORES.insight.title}</strong> {VALORES.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
