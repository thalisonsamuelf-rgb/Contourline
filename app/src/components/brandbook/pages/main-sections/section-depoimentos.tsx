import { BbBrandbookSection } from "../../organisms"
import { DEPOIMENTOS, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionDepoimentos() {
  const chrome = SECTION_CHROME.depoimentos

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {DEPOIMENTOS.intro}
      </p>

      {/* Stat cards */}
      <div className="mb-12 grid grid-cols-1 gap-px bg-[var(--bb-border)] sm:grid-cols-2 xl:grid-cols-4">
        {DEPOIMENTOS.stats.map((s) => (
          <div
            key={s.label}
            style={{
              background: s.accent ? "var(--bb-accent)" : "var(--bb-dark)",
              padding: "1.5rem",
              textAlign: "center" as const,
            }}
          >
            <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: s.accent ? "var(--bb-dark)" : "var(--bb-cream)", textTransform: "uppercase" }}>
              {s.number}
            </div>
            <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: s.accent ? "rgba(0,0,0,0.5)" : "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.25rem" }}>
              {s.label}
            </div>
            <div style={{ fontSize: "0.75rem", color: s.accent ? "rgba(0,0,0,0.5)" : "var(--bb-dim)", marginTop: "0.5rem" }}>
              {s.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Grouped testimonials */}
      {DEPOIMENTOS.testimonialGroups.map((g) => (
        <div key={g.category} style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 600 }}>
            {g.category}
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {g.items.map((t) => (
              <div key={t.author + t.quote.slice(0, 20)} style={{ background: "var(--bb-accent-02)", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", padding: "2rem" }}>
                <p style={{ color: "var(--bb-cream)", fontSize: "1rem", fontStyle: "italic", margin: "0 0 0.75rem" }}>{t.quote}</p>
                <p style={{ color: "var(--bb-dim)", fontSize: "0.8rem", fontFamily: "var(--font-bb-mono)", margin: 0 }}>— {t.author}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{DEPOIMENTOS.insight.title}</strong> {DEPOIMENTOS.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
