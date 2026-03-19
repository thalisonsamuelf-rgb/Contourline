import { BbBrandbookSection } from "../../organisms"
import { FUNDADORES, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionFundadores() {
  const chrome = SECTION_CHROME.fundadores

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {FUNDADORES.intro}
      </p>

      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] xl:grid-cols-[1fr_1fr_2fr]">
        {/* Fundador 1 */}
        <div style={{ background: "var(--bb-dark)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "100%", aspectRatio: "1", background: "var(--bb-surface)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--bb-border)" }}>
            <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "3rem", fontWeight: 800, color: "var(--bb-accent)" }}>{FUNDADORES.founder1.initials}</span>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{FUNDADORES.founder1.name}</h3>
            <p style={{ color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {FUNDADORES.founder1.role}
            </p>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
              {FUNDADORES.founder1.desc}
            </p>
          </div>
        </div>

        {/* Fundador 2 */}
        <div style={{ background: "var(--bb-dark)", padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ width: "100%", aspectRatio: "1", background: "var(--bb-surface)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--bb-border)" }}>
            <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "3rem", fontWeight: 800, color: "var(--bb-cream)" }}>{FUNDADORES.founder2.initials}</span>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.25rem" }}>{FUNDADORES.founder2.name}</h3>
            <p style={{ color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {FUNDADORES.founder2.role}
            </p>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
              {FUNDADORES.founder2.desc}
            </p>
          </div>
        </div>

        {/* Dynamic block */}
        <div style={{ background: "var(--bb-accent)", color: "var(--bb-dark)", padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "2.5rem", fontWeight: 800, color: "var(--bb-dark)", lineHeight: 1, textTransform: "uppercase", marginBottom: "1.2rem" }}>
            DINAMICA
            <br />
            COMPLEMENTAR.
          </h3>
          <p style={{ fontSize: "0.95rem", maxWidth: "100%", color: "rgba(0,0,0,0.7)", margin: 0 }}>
            {FUNDADORES.dynamicDesc}
          </p>
          <div style={{ marginTop: "2rem", fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", borderTop: "1px solid rgba(0,0,0,0.15)", paddingTop: "0.8rem", color: "rgba(0,0,0,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {FUNDADORES.dynamicFormula}
          </div>
        </div>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{FUNDADORES.insight.title}</strong> {FUNDADORES.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
