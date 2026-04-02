import { BbBrandbookSection } from "../../organisms"
import { BRANDSCRIPT, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionBrandscript() {
  const chrome = SECTION_CHROME.brandscript

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {BRANDSCRIPT.intro}
      </p>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-2 xl:grid-cols-3">
        {BRANDSCRIPT.cards.map((c) => (
          <div key={c.title} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <h4 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1rem", color: c.color, textTransform: "uppercase", marginBottom: "0.5rem" }}>
              {c.title}
            </h4>
            <p style={{ fontSize: "0.9rem", color: "var(--bb-dim)", margin: 0, whiteSpace: "pre-line" }}>{c.text}</p>
          </div>
        ))}
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{BRANDSCRIPT.insight.title}</strong> {BRANDSCRIPT.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
