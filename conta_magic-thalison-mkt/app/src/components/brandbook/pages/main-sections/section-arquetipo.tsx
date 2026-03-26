import { BbBrandbookSection } from "../../organisms"
import { ARQUETIPO, SECTION_CHROME } from "@/components/brandbook/data/movimento-content"

export function SectionArquetipo() {
  const chrome = SECTION_CHROME.arquetipo

  return (
    <BbBrandbookSection {...chrome}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Archetype bars */}
        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Composicao do Arquetipo
          </h3>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            {ARQUETIPO.compositionIntro}
          </p>
          {ARQUETIPO.archetypes.map((a) => (
            <div key={a.label}>
              <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,140px)_minmax(0,1fr)_40px]" style={{ marginBottom: "0.25rem" }}>
                <div style={{ fontWeight: 600, fontSize: "0.8rem", textTransform: "uppercase", fontFamily: "var(--font-bb-mono)", color: a.color }}>{a.label}</div>
                <div style={{ height: 2, background: "rgba(245,244,231,0.08)", overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "var(--bb-accent)", width: `${a.pct}%` }} />
                </div>
                <div style={{ textAlign: "right" as const, fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", color: a.pct === 50 ? "var(--bb-accent)" : "var(--bb-dim)" }}>{a.pct}%</div>
              </div>
              <div className="sm:pl-4" style={{ fontSize: "0.85rem", color: "var(--bb-dim)", fontStyle: "italic", marginBottom: "1rem" }}>
                {a.quote}
              </div>
            </div>
          ))}
          <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--bb-accent-02)", borderLeft: "2px solid var(--bb-accent)" }}>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
              <strong style={{ color: "var(--bb-accent)" }}>Exercicio:</strong> {ARQUETIPO.analogyPrompt}
            </p>
          </div>
        </div>

        {/* Right: Two Voices */}
        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem" }}>
          <h3 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Duas Vozes da Marca
          </h3>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
            {ARQUETIPO.voicesIntro}
          </p>
          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ color: "var(--bb-accent)", marginBottom: "0.5rem", fontSize: "1rem", fontFamily: "var(--font-bb-display)", fontWeight: 800, textTransform: "uppercase" }}>
              Voz do Fundador
            </h4>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
              {ARQUETIPO.founderVoice}
            </p>
          </div>
          <div style={{ marginBottom: "2rem" }}>
            <h4 style={{ color: "var(--bb-cream)", marginBottom: "0.5rem", fontSize: "1rem", fontFamily: "var(--font-bb-display)", fontWeight: 800, textTransform: "uppercase" }}>
              Voz do Produto
            </h4>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
              {ARQUETIPO.productVoice}
            </p>
          </div>
          <div style={{ padding: "1rem", background: "var(--bb-accent-02)", borderLeft: "2px solid var(--bb-accent)" }}>
            <p style={{ color: "var(--bb-accent)", fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>
              Regra: {ARQUETIPO.voiceRule}
            </p>
          </div>
        </div>
      </div>

      {/* Por que importa */}
      <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
          Por que isso importa
        </div>
        <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
          <strong style={{ color: "var(--bb-cream)" }}>{ARQUETIPO.insight.title}</strong> {ARQUETIPO.insight.body}
        </p>
      </div>
    </BbBrandbookSection>
  )
}
