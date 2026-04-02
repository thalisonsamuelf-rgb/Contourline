import { BbBrandbookSection } from "../../organisms"
import { PROPOSITO, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionProposito() {
  const chrome = SECTION_CHROME.proposito

  return (
    <BbBrandbookSection {...chrome}>
      {/* Proposito card */}
      <div
        className="px-4 py-10 sm:px-8"
        style={{
          border: "1px solid var(--bb-border)",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          Proposito
        </div>
        <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "2rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: 0 }}>
          {PROPOSITO.headline.split(PROPOSITO.headlineAccent)[0]}<span style={{ color: "var(--bb-accent)", fontWeight: 600 }}>{PROPOSITO.headlineAccent}</span>{PROPOSITO.headline.split(PROPOSITO.headlineAccent)[1]}
        </h3>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginTop: "1rem", maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>
          {PROPOSITO.description}
        </p>
      </div>

      {/* Values grid */}
      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROPOSITO.values.map((v) => (
          <div key={v.name} style={{ border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.15rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              {v.name}
            </h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>{v.desc}</p>
          </div>
        ))}
      </div>

      {/* O Inimigo */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: "3rem 0 1.5rem" }}>
        <span style={{ color: "#ef4444", marginRight: "0.5rem", fontFamily: "var(--font-bb-mono)" }}>X</span>O Inimigo
      </h3>
      <div style={{ border: "1px solid var(--bb-border)", padding: "1.5rem" }}>
        <p style={{ fontSize: "1.1rem", color: "var(--bb-cream)", marginBottom: "1.5rem" }}>
          {PROPOSITO.enemyIntro}
        </p>
        {PROPOSITO.enemies.map((e) => (
          <div key={e.bold} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <span style={{ color: "#ef4444", fontFamily: "var(--font-bb-mono)", fontWeight: 700, flexShrink: 0 }}>X</span>
            <span style={{ color: "var(--bb-dim)", fontSize: "0.9rem" }}>
              <strong style={{ color: "var(--bb-cream)" }}>{e.bold}</strong> {e.desc}
            </span>
          </div>
        ))}
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{PROPOSITO.insight.title}</strong> {PROPOSITO.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
