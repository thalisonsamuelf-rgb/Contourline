import {
  SECTION_CHROME,
  VISUAL,
} from "@/components/brandbook/data/movimento-content"
import { BbBrandbookSection } from "../../organisms"

export function SectionVisual() {
  const chrome = SECTION_CHROME.visual
  const [triangleSymbol, joystickSymbol] = VISUAL.symbols

  return (
    <BbBrandbookSection
      {...chrome}
    >
      {/* Symbols */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1.5rem" }}>{VISUAL.headings.symbols}</h3>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem", textAlign: "center" as const }}>
          <div style={{ fontSize: "4rem", color: "var(--bb-accent)", marginBottom: "0.5rem" }}>&#9650;</div>
          <h4 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase" }}>{triangleSymbol.title}</h4>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{triangleSymbol.description}</p>
        </div>
        <div style={{ border: "1px solid var(--bb-border)", padding: "2rem", textAlign: "center" as const }}>
          <div style={{ fontSize: "4rem", color: "var(--bb-accent)", marginBottom: "0.5rem" }}>&#127918;</div>
          <h4 style={{ fontFamily: "var(--font-bb-display)", fontWeight: 800, fontSize: "1.15rem", color: "var(--bb-cream)", textTransform: "uppercase" }}>{joystickSymbol.title}</h4>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginTop: "0.5rem" }}>{joystickSymbol.description}</p>
        </div>
      </div>

      {/* Symbol concept flow */}
      <div className="mb-12 px-4 py-6 sm:px-6" style={{ border: "1px solid var(--bb-border)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {VISUAL.symbolFlow.map((s, i) => (
            <div key={s.char} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {i > 0 && <span style={{ color: "var(--bb-accent)", fontSize: "1.2rem" }}>&rarr;</span>}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "clamp(1.5rem, 6vw, 2rem)", fontWeight: 800, color: s.color }}>{s.char}</div>
                <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.05em", overflowWrap: "anywhere", maxWidth: 96 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Palette */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "1.5rem" }}>{VISUAL.headings.palette}</h3>
      {VISUAL.colorGroups.map((group) => (
        <div key={group.label} style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
            {group.label}
          </div>
          <div style={{ border: "1px solid var(--bb-border)", display: "flex", minHeight: 160, overflow: "hidden" }}>
            {group.colors.map((c, i) => (
              <div
                key={`${c.hex}-${i}`}
                style={{
                  flex: 1,
                  background: c.bg,
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: c.light ? "rgba(0,0,0,0.4)" : "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {c.name}
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", color: c.light ? "var(--bb-dark)" : "var(--bb-cream)", fontWeight: 600 }}>{c.hex}</div>
                  <div style={{ fontSize: "0.6rem", color: c.light ? "rgba(0,0,0,0.5)" : "var(--bb-dim)", marginTop: "0.25rem" }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Typography */}
      <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: "3rem 0 1.5rem" }}>{VISUAL.headings.typography}</h3>
      <div style={{ border: "1px solid var(--bb-border)", padding: "2rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{VISUAL.typography.displayFamily} — Headings / Display</div>
          <p style={{ fontFamily: "var(--font-bb-display)", fontSize: "2rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", letterSpacing: "-0.03em", margin: 0 }}>
            {VISUAL.typography.headline}
          </p>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{VISUAL.typography.sansFamily} — Body</div>
          <p style={{ fontSize: "1rem", fontWeight: 400, color: "var(--bb-dim)", margin: 0 }}>
            {VISUAL.typography.body}
          </p>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{VISUAL.typography.monoFamily} — Código</div>
          <p style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.9rem", fontWeight: 500, color: "var(--bb-accent)", background: "var(--bb-surface)", padding: "1rem", margin: 0 }}>
            {VISUAL.typography.command}
          </p>
        </div>
      </div>
    </BbBrandbookSection>
  )
}
