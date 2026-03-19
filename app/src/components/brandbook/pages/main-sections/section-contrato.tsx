import { BbBrandbookSection } from "../../organisms"
import { CONTRATO, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionContrato() {
  const chrome = SECTION_CHROME.contrato

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {CONTRATO.intro}
      </p>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Our promises */}
        <div style={{ border: "1px solid var(--bb-border)", borderLeft: "3px solid var(--bb-accent)", padding: "2rem", background: "var(--bb-accent-02)" }}>
          <h3 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-accent)", textTransform: "uppercase", marginBottom: "1rem" }}>
            Nossas Promessas
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {CONTRATO.promises.map((p) => (
              <li key={p.bold} style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "0.5rem", paddingLeft: "1rem", borderLeft: "1px solid var(--bb-border)" }}>
                <strong style={{ color: "var(--bb-cream)" }}>{p.bold}</strong> {p.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Demands */}
        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1rem" }}>
            O que Exigimos
          </h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {CONTRATO.demands.map((d) => (
              <li key={d.bold} style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "0.5rem", paddingLeft: "1rem", borderLeft: "1px solid var(--bb-border)" }}>
                <strong style={{ color: "var(--bb-cream)" }}>{d.bold}</strong> {d.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Definitive frame */}
      <div
        className="px-4 py-10 text-center sm:px-8"
        style={{
          border: "2px solid var(--bb-accent)",
          background: "var(--bb-accent-02)",
        }}
      >
        <p style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.25rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", lineHeight: 1.6, margin: 0 }}>
          &quot;{CONTRATO.oathLines[0]}
          <br />
          {CONTRATO.oathLines[1]}
          <br />
          <span style={{ color: "var(--bb-accent)" }}>{CONTRATO.oathLines[2]}</span>
          <br />
          {CONTRATO.oathLines[3]}
          <br />
          <span style={{ color: "var(--bb-accent)" }}>{CONTRATO.oathLines[4]}</span>&quot;
        </p>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{CONTRATO.insight.title}</strong> {CONTRATO.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
