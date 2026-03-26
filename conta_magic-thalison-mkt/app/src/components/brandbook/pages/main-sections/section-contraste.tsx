import { BbBrandbookSection } from "../../organisms"
import { CONTRASTE, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

const rows = ["archetype", "framing", "promise", "gap"] as const

export function SectionContraste() {
  const chrome = SECTION_CHROME.contraste

  return (
    <BbBrandbookSection {...chrome}>
      <div style={{ borderLeft: "2px solid var(--bb-accent)", padding: "1rem 1.5rem", background: "var(--bb-accent-02)", marginBottom: "2rem" }}>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          {CONTRASTE.intro}
        </p>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.75rem",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid var(--bb-border)" }}>
              <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.65rem", color: "var(--bb-dim)" }} />
              {CONTRASTE.competitors.map((c) => (
                <th key={c.name} style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "0.65rem", color: c.highlight ? "var(--bb-accent)" : "var(--bb-dim)", whiteSpace: "nowrap" }}>
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row} style={{ borderBottom: "1px solid var(--bb-border)" }}>
                <td style={{ padding: "0.75rem 1rem", fontWeight: 700, textTransform: "uppercase", fontSize: "0.65rem", color: "var(--bb-dim)", whiteSpace: "nowrap" }}>
                  {CONTRASTE.rowLabels[row]}
                </td>
                {CONTRASTE.competitors.map((c) => (
                  <td key={c.name} style={{ padding: "0.75rem 1rem", color: c.highlight ? "var(--bb-accent)" : "var(--bb-dim)", fontWeight: c.highlight ? 600 : 400 }}>
                    {c[row]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{CONTRASTE.insight.title}</strong> {CONTRASTE.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
