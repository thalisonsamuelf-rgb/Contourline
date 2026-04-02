import { BbBrandbookSection } from "../../organisms"
import { SECTION_CHROME, TRUELINES } from "@/components/brandbook/data/movimento-content"

const cellStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  fontSize: "0.85rem",
  color: "var(--bb-dim)",
  borderBottom: "1px solid var(--bb-border)",
}

export function SectionTruelines() {
  const chrome = SECTION_CHROME.truelines

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {TRUELINES.intro}
      </p>
      <div style={{ border: "1px solid var(--bb-border)", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", minWidth: 560, borderCollapse: "collapse", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem" }}>
          <thead>
            <tr style={{ background: "var(--bb-surface)" }}>
              <th style={{ ...cellStyle, color: "var(--bb-cream)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Trueline</th>
              <th style={{ ...cellStyle, color: "var(--bb-cream)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Tipo</th>
              <th style={{ ...cellStyle, color: "var(--bb-cream)", textAlign: "left", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Uso</th>
            </tr>
          </thead>
          <tbody>
            {TRUELINES.rows.map((r) => (
              <tr key={r.line} style={r.highlight ? { background: "var(--bb-accent-05)" } : undefined}>
                <td style={{ ...cellStyle, color: r.highlight ? "var(--bb-accent)" : "var(--bb-cream)", fontWeight: r.highlight ? 700 : 400 }}>{r.line}</td>
                <td style={cellStyle}>{r.tipo}</td>
                <td style={cellStyle}>{r.uso}</td>
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
          <strong style={{ color: "var(--bb-cream)" }}>{TRUELINES.insight.title}</strong> {TRUELINES.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
