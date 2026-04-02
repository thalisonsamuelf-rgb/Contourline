import { BbBrandbookSection } from "../../organisms"
import { NAMING, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

const cellStyle: React.CSSProperties = { padding: "0.5rem 1rem", fontSize: "0.85rem", color: "var(--bb-dim)", borderBottom: "1px solid var(--bb-border)" }

export function SectionNaming() {
  const chrome = SECTION_CHROME.naming

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {NAMING.intro}
      </p>

      {/* Letter flow */}
      <div className="mb-8 px-4 py-8 sm:px-8" style={{ border: "1px solid var(--bb-border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {NAMING.letters.map((l, i) => (
            <div key={l.char} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {i > 0 && <span style={{ color: "var(--bb-accent)", fontSize: "1.5rem" }}>&rarr;</span>}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "3rem", fontWeight: 800, color: l.color, textTransform: "uppercase" }}>{l.char}</div>
                <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", maxWidth: 160, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Score + Architecture */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem" }}>
          <h4 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Avaliacao do Naming</h4>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.8rem", marginBottom: "1rem" }}>
            {NAMING.scoreIntro}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <tbody>
              {NAMING.scores.map(([label, val]) => (
                <tr key={label}>
                  <td style={{ ...cellStyle, color: label === "TOTAL" ? "var(--bb-cream)" : "var(--bb-dim)", fontWeight: label === "TOTAL" ? 700 : 400 }}>{label}</td>
                  <td style={{ ...cellStyle, textAlign: "right", color: label === "TOTAL" ? "var(--bb-accent)" : "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontWeight: 600 }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem" }}>
          <h4 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Arquitetura do Naming</h4>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.8rem", marginBottom: "1rem" }}>
            {NAMING.architectureIntro}
          </p>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ ...cellStyle, color: "var(--bb-cream)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem" }}>Marca</th>
                <th style={{ ...cellStyle, color: "var(--bb-cream)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600, fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem" }}>Escopo</th>
              </tr>
            </thead>
            <tbody>
              {NAMING.architecture.map(([marca, escopo]) => (
                <tr key={marca}>
                  <td style={{ ...cellStyle, color: "var(--bb-cream)" }}>{marca}</td>
                  <td style={cellStyle}>{escopo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{NAMING.insight.title}</strong> {NAMING.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
