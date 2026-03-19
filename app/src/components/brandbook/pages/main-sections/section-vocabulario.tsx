import { BbBrandbookSection } from "../../organisms"
import { SECTION_CHROME, VOCABULARIO } from "@/components/brandbook/data/movimento-content"

const tagBase: React.CSSProperties = {
  display: "inline-block",
  padding: "0.4rem 0.75rem",
  fontFamily: "var(--font-bb-mono)",
  fontSize: "0.7rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
}

export function SectionVocabulario() {
  const chrome = SECTION_CHROME.vocabulario

  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "2rem", maxWidth: 700 }}>
        {VOCABULARIO.intro}
      </p>

      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
        Dicionario Proprietario
      </h3>

      <div className="mb-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Power Words */}
        <div style={{ border: "1px solid var(--bb-border)", padding: "1.5rem" }}>
          <h4 style={{ marginBottom: "1rem", fontSize: "1rem", fontFamily: "var(--font-bb-display)", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase" }}>
            <span style={{ color: "var(--bb-accent)", fontFamily: "var(--font-bb-mono)" }}>&#10003;</span> Power Words
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {VOCABULARIO.powerWords.map((w) => (
              <span key={w.word} style={{ ...tagBase, background: "var(--bb-accent-08)", color: "var(--bb-accent)", border: "1px solid var(--bb-accent-20)" }} title={w.tip}>
                {w.word}
              </span>
            ))}
          </div>
        </div>

        {/* Forbidden */}
        <div style={{ border: "1px solid var(--bb-border)", padding: "1.5rem" }}>
          <h4 style={{ marginBottom: "1rem", fontSize: "1rem", fontFamily: "var(--font-bb-display)", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase" }}>
            <span style={{ color: "#ef4444", fontFamily: "var(--font-bb-mono)" }}>&#10007;</span> Palavras Banidas
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {VOCABULARIO.forbidden.map((w) => (
              <span key={w.word} style={{ ...tagBase, textDecoration: "line-through", color: "rgba(204,0,0,0.7)", border: "1px solid rgba(204,0,0,0.3)" }} title={w.alt}>
                {w.word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tone sliders */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
        5 Dimensoes do Tom
      </h3>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
        {VOCABULARIO.tonesIntro}
      </p>
      <div className="mb-8 px-4 py-8 sm:px-8" style={{ border: "1px solid var(--bb-border)" }}>
        {VOCABULARIO.tones.map((t) => (
          <div key={t.left} className="grid grid-cols-1 gap-2 sm:grid-cols-[90px_minmax(0,1fr)_90px]" style={{ marginBottom: t.left === "Arrogante" ? 0 : "1.25rem" }}>
            <span style={{ textAlign: "right" as const, fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: "var(--bb-dim)", textTransform: "uppercase" }}>{t.left}</span>
            <div style={{ flex: 1, height: 2, background: "rgba(245,244,231,0.08)", position: "relative" }}>
              <div style={{ position: "absolute", left: `${t.pos}%`, top: "50%", transform: "translate(-50%, -50%)", width: 10, height: 10, borderRadius: "50%", background: "var(--bb-accent)" }} />
            </div>
            <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: "var(--bb-dim)", textTransform: "uppercase" }}>{t.right}</span>
          </div>
        ))}
      </div>

      <div style={{ border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", padding: "1.5rem", background: "var(--bb-accent-02)" }}>
        <p style={{ color: "var(--bb-dim)", fontSize: "1rem", fontStyle: "italic", margin: 0 }}>
          {VOCABULARIO.voiceSummaryPrompt}
        </p>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{VOCABULARIO.insight.title}</strong> {VOCABULARIO.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
