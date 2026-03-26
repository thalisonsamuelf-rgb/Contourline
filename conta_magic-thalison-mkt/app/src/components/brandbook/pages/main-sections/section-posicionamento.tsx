import { BbBrandbookSection } from "../../organisms"
import { POSICIONAMENTO, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionPosicionamento() {
  const chrome = SECTION_CHROME.posicionamento

  return (
    <BbBrandbookSection {...chrome}>
      {/* 3-col info */}
      <div style={{ border: "1px solid var(--bb-border)", marginBottom: "2rem" }}>
        <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] lg:grid-cols-3">
          {POSICIONAMENTO.columns.map((c) => (
            <div key={c.label} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
              <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                {c.label}
              </div>
              {c.isLong ? (
                <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>{c.value}</p>
              ) : (
                <h4 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.15rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: 0, overflowWrap: "anywhere" }}>{c.value}</h4>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Polarity */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", textAlign: "center", margin: "3rem 0 1.5rem" }}>
        O que a Marca E vs O que NAO E
      </h3>
      <div style={{ border: "1px solid var(--bb-border)", padding: "2rem", marginBottom: "3rem" }}>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          {POSICIONAMENTO.polarityIntro}
        </p>
        <div style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>O QUE E</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {POSICIONAMENTO.isTags.map((t) => (
              <span key={t} style={{ display: "inline-block", padding: "0.5rem 1rem", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", background: "var(--bb-accent)", color: "var(--bb-dark)", border: "1px solid var(--bb-accent)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: "rgba(204,0,0,0.6)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>O QUE NAO E</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {POSICIONAMENTO.notTags.map((t) => (
              <span key={t} style={{ display: "inline-block", padding: "0.5rem 1rem", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "line-through", color: "rgba(204,0,0,0.7)", border: "1px solid rgba(204,0,0,0.3)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Pyramid */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", textAlign: "center", marginBottom: "1rem" }}>
        Hierarquia da Comunicacao
      </h3>
      <p style={{ textAlign: "center", color: "var(--bb-dim)", maxWidth: 600, margin: "0 auto 3rem" }}>
        {POSICIONAMENTO.pyramidIntro}
      </p>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        {POSICIONAMENTO.pyramid.map((p) => (
          <div
            key={p.level}
            style={{
              textAlign: "center",
              padding: "2rem",
              border: "1px solid var(--bb-border)",
              marginBottom: "1rem",
              background: p.level === 1 ? "var(--bb-accent)" : "var(--bb-surface)",
              borderColor: p.level === 1 ? "var(--bb-accent)" : "var(--bb-border)",
              width: p.level === 1 ? "100%" : p.level === 2 ? "90%" : "80%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: p.level === 1 ? "var(--bb-dark)" : "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: p.level === 1 ? 700 : 500 }}>
              {p.label}
            </div>
            <div style={{ fontFamily: "var(--font-bb-display)", fontSize: p.level === 3 ? "1rem" : "1.35rem", fontWeight: 800, color: p.level === 1 ? "var(--bb-dark)" : p.level === 2 ? "var(--bb-accent)" : "var(--bb-cream)", textTransform: "uppercase" }}>
              {p.value}
            </div>
          </div>
        ))}
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "2rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{POSICIONAMENTO.insight.title}</strong> {POSICIONAMENTO.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
