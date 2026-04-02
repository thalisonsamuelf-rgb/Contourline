"use client"

import { BrandbookSidebar } from "../layout/brandbook-sidebar"
import { BbBrandbookSection, BbTickerStrip } from "../organisms"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import {
  CULTURE_PAGE_CONTENT,
  CULTURE_SECTION_CHROME,
  CULTURE_MANIFESTO,
  CULTURE_MVP,
  CULTURE_PILLARS,
  CULTURE_VALUES,
  CULTURE_COMMANDMENTS,
  CULTURE_MANTRAS,
  CULTURE_LEADERSHIP,
  CULTURE_HIRING,
  CULTURE_FRAMEWORKS,
  CULTURE_LIFESTYLE,
  CULTURE_SYMBOLS,
} from "@/components/brandbook/data/culture-content"

// ---------------------------------------------------------------------------
// Shared: Insight block
// ---------------------------------------------------------------------------

function InsightBox({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ marginTop: "1.5rem", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)", background: "var(--bb-accent-02)" }}>
      <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem", fontWeight: 600 }}>
        Por que isso importa
      </div>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0 }}>
        <strong style={{ color: "var(--bb-cream)" }}>{title}</strong> {body}
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 01. Manifesto
// ---------------------------------------------------------------------------

function SectionManifesto() {
  const chrome = CULTURE_SECTION_CHROME.manifesto
  return (
    <BbBrandbookSection {...chrome}>
      <div style={{ border: "1px solid var(--bb-border)", padding: 0 }}>
        <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "1rem", lineHeight: 1.8, fontWeight: 400, borderLeft: "2px solid var(--bb-accent)", color: "var(--bb-dim)", background: "var(--bb-accent-02)", padding: "2.5rem", letterSpacing: "0.01em" }}>
          {CULTURE_MANIFESTO.paragraphs.map((p, i) => (
            <p key={i} style={{ marginBottom: "1.5rem", whiteSpace: "pre-line" }}>{p}</p>
          ))}
          <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "2rem", fontWeight: 800, color: "var(--bb-accent)", marginTop: "2rem", textTransform: "uppercase" }}>
            {CULTURE_MANIFESTO.cta}
          </div>
        </div>
      </div>
      <InsightBox {...CULTURE_MANIFESTO.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 02. MVP
// ---------------------------------------------------------------------------

function SectionMVP() {
  const chrome = CULTURE_SECTION_CHROME.mvp
  return (
    <BbBrandbookSection {...chrome}>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-3" style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_MVP.items.map((item) => (
          <div key={item.label} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "0.75rem", fontWeight: 800, color: item.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{item.label}</span>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginTop: "0.75rem", lineHeight: 1.6 }}>{item.value}</p>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_MVP.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 03. Pilares
// ---------------------------------------------------------------------------

function SectionPillars() {
  const chrome = CULTURE_SECTION_CHROME.pillars
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_PILLARS.intro}</p>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-3" style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_PILLARS.pillars.map((p) => (
          <div key={p.num} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "2rem", fontWeight: 900, color: "var(--bb-accent)" }}>{p.num}</span>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: "0.75rem 0 0.5rem" }}>{p.name}</h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{p.description}</p>
            <p style={{ color: "var(--bb-accent)", fontSize: "0.75rem", fontFamily: "var(--font-bb-mono)", margin: 0 }}>{p.connection}</p>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_PILLARS.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 04. Valores
// ---------------------------------------------------------------------------

function SectionValues() {
  const chrome = CULTURE_SECTION_CHROME.values
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_VALUES.intro}</p>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-2 lg:grid-cols-3" style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_VALUES.values.map((v) => (
          <div key={v.num} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 900, color: "var(--bb-accent)" }}>{v.num}</span>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: "0.75rem 0 0.5rem" }}>{v.name}</h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", margin: 0, lineHeight: 1.6 }}>{v.definition}</p>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_VALUES.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 05. Mandamentos
// ---------------------------------------------------------------------------

function SectionCommandments() {
  const chrome = CULTURE_SECTION_CHROME.commandments
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_COMMANDMENTS.intro}</p>
      <div style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_COMMANDMENTS.commandments.map((c, i) => (
          <div key={c.num} style={{ display: "flex", gap: "1rem", padding: "1rem 1.5rem", borderBottom: i < CULTURE_COMMANDMENTS.commandments.length - 1 ? "1px solid var(--bb-border)" : "none", alignItems: "baseline" }}>
            <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.2rem", fontWeight: 900, color: "var(--bb-accent)", minWidth: "2rem" }}>{c.num}</span>
            <div>
              <strong style={{ color: "var(--bb-cream)", fontFamily: "var(--font-bb-display)", fontSize: "0.9rem", textTransform: "uppercase" }}>{c.title}</strong>
              <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", margin: "0.25rem 0 0", lineHeight: 1.5 }}>{c.description}</p>
            </div>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_COMMANDMENTS.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 06. Mantras
// ---------------------------------------------------------------------------

function SectionMantras() {
  const chrome = CULTURE_SECTION_CHROME.mantras
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_MANTRAS.intro}</p>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-2" style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_MANTRAS.mantras.map((m) => (
          <div key={m.text} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.2rem", fontWeight: 800, color: "var(--bb-accent)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              {m.text}
            </div>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>{m.context}</p>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_MANTRAS.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 07. Lideranca
// ---------------------------------------------------------------------------

function SectionLeadership() {
  const chrome = CULTURE_SECTION_CHROME.leadership
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_LEADERSHIP.intro}</p>

      <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 600 }}>Expectativas de Lideranca</div>
      <div style={{ border: "1px solid var(--bb-border)", marginBottom: "1.5rem" }}>
        {CULTURE_LEADERSHIP.expectations.map((e, i) => (
          <div key={e.title} style={{ padding: "1rem 1.5rem", borderBottom: i < CULTURE_LEADERSHIP.expectations.length - 1 ? "1px solid var(--bb-border)" : "none" }}>
            <strong style={{ color: "var(--bb-cream)", fontSize: "0.9rem" }}>{e.title}</strong>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", margin: "0.25rem 0 0", lineHeight: 1.5 }}>{e.description}</p>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 600 }}>Virtudes do Time</div>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-3" style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_LEADERSHIP.teamVirtues.map((v) => (
          <div key={v.title} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "0.9rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{v.title}</h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", margin: 0, lineHeight: 1.5 }}>{v.description}</p>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_LEADERSHIP.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 08. Contratacao
// ---------------------------------------------------------------------------

function SectionHiring() {
  const chrome = CULTURE_SECTION_CHROME.hiring
  return (
    <BbBrandbookSection {...chrome}>
      {CULTURE_HIRING.sections.map((section) => (
        <div key={section.title} style={{ marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 600 }}>{section.title}</div>
          <div style={{ border: "1px solid var(--bb-border)" }}>
            {section.items.map((item, i) => (
              <div key={item.bold} style={{ padding: "1rem 1.5rem", borderBottom: i < section.items.length - 1 ? "1px solid var(--bb-border)" : "none" }}>
                <strong style={{ color: "var(--bb-cream)", fontSize: "0.9rem" }}>{item.bold}</strong>{" "}
                <span style={{ color: "var(--bb-dim)", fontSize: "0.85rem" }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <InsightBox {...CULTURE_HIRING.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 09. Frameworks
// ---------------------------------------------------------------------------

function SectionFrameworks() {
  const chrome = CULTURE_SECTION_CHROME.frameworks
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_FRAMEWORKS.intro}</p>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-3" style={{ border: "1px solid var(--bb-border)", marginBottom: "1.5rem" }}>
        {CULTURE_FRAMEWORKS.frameworks.map((f) => (
          <div key={f.name} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", marginBottom: "0.5rem" }}>{f.name}</h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "0.75rem" }}>{f.description}</p>
            <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.8rem", color: "var(--bb-accent)", fontWeight: 600 }}>{f.rule}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem", fontWeight: 600 }}>Principios Guia</div>
      <div style={{ border: "1px solid var(--bb-border)" }}>
        {CULTURE_FRAMEWORKS.principles.map((p, i) => (
          <div key={i} style={{ padding: "0.75rem 1.5rem", borderBottom: i < CULTURE_FRAMEWORKS.principles.length - 1 ? "1px solid var(--bb-border)" : "none", color: "var(--bb-cream)", fontFamily: "var(--font-bb-display)", fontSize: "0.9rem", fontWeight: 700 }}>
            {i + 1}. {p}
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_FRAMEWORKS.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 10. Lifestyle (Legendario vs Mediocre)
// ---------------------------------------------------------------------------

function SectionLifestyle() {
  const chrome = CULTURE_SECTION_CHROME.lifestyle
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_LIFESTYLE.intro}</p>
      <div style={{ border: "1px solid var(--bb-border)", overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid var(--bb-border)" }}>
          <div style={{ padding: "0.75rem 1rem", fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", fontWeight: 700, color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Legendario</div>
          <div style={{ padding: "0.75rem 1rem", fontFamily: "var(--font-bb-mono)", fontSize: "0.7rem", fontWeight: 700, color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.1em", borderLeft: "1px solid var(--bb-border)" }}>Mediocre</div>
        </div>
        {CULTURE_LIFESTYLE.rows.map((row, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < CULTURE_LIFESTYLE.rows.length - 1 ? "1px solid var(--bb-border)" : "none" }}>
            <div style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", color: "var(--bb-cream)" }}>{row.legendary}</div>
            <div style={{ padding: "0.6rem 1rem", fontSize: "0.85rem", color: "var(--bb-dim)", borderLeft: "1px solid var(--bb-border)" }}>{row.mediocre}</div>
          </div>
        ))}
      </div>
      <InsightBox {...CULTURE_LIFESTYLE.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// 11. Simbolos
// ---------------------------------------------------------------------------

function SectionSymbols() {
  const chrome = CULTURE_SECTION_CHROME.symbols
  return (
    <BbBrandbookSection {...chrome}>
      <p style={{ color: "var(--bb-dim)", fontSize: "0.9rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>{CULTURE_SYMBOLS.intro}</p>
      <div className="grid grid-cols-1 gap-px bg-[var(--bb-border)] md:grid-cols-3" style={{ border: "1px solid var(--bb-border)", marginBottom: "1.5rem" }}>
        {CULTURE_SYMBOLS.symbols.map((s) => (
          <div key={s.name} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
            <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.type}</span>
            <h3 style={{ fontFamily: "var(--font-bb-display)", fontSize: "1rem", fontWeight: 800, color: "var(--bb-cream)", textTransform: "uppercase", margin: "0.5rem 0" }}>{s.name}</h3>
            <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: "0.5rem" }}>{s.meaning}</p>
            <p style={{ color: "var(--bb-accent)", fontSize: "0.75rem", fontFamily: "var(--font-bb-mono)", margin: 0 }}>{s.origin}</p>
          </div>
        ))}
      </div>
      {CULTURE_SYMBOLS.equation && (
        <div style={{ textAlign: "center", padding: "2rem", border: "1px solid var(--bb-border)", background: "var(--bb-accent-02)", marginBottom: "1.5rem" }}>
          <div style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.5rem", fontWeight: 900, color: "var(--bb-accent)" }}>{CULTURE_SYMBOLS.equation}</div>
        </div>
      )}
      <div style={{ textAlign: "center", padding: "1.5rem", border: "1px solid var(--bb-border)", borderLeft: "2px solid var(--bb-accent)" }}>
        <p style={{ color: "var(--bb-cream)", fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-bb-display)", margin: 0 }}>{CULTURE_SYMBOLS.closingStatement}</p>
      </div>
      <InsightBox {...CULTURE_SYMBOLS.insight} />
    </BbBrandbookSection>
  )
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export function CultureDeckPage() {
  return (
    <>
      <BrandbookSidebar groups={CULTURE_PAGE_CONTENT.sidebarGroups} />

      <main
        className="w-full md:ml-[280px] md:w-[calc(100%-280px)]"
        style={{ scrollBehavior: "smooth", fontFamily: "var(--font-bb-mono)" }}
      >
        {/* Header Banner */}
        <header style={{ borderBottom: "1px solid var(--bb-border)", padding: "3rem clamp(1rem, 4vw, 3rem)" }}>
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem" }}>
            {CULTURE_PAGE_CONTENT.headerBanner.eyebrow}
          </div>
          <h1 style={{ fontFamily: "var(--font-bb-display)", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 900, color: "var(--bb-cream)", textTransform: "uppercase", lineHeight: 1, margin: 0 }}>
            {CULTURE_PAGE_CONTENT.headerBanner.navCenter}
          </h1>
          <p style={{ color: "var(--bb-dim)", fontSize: "0.85rem", marginTop: "1rem", maxWidth: 600 }}>
            {CULTURE_PAGE_CONTENT.headerSubtitle}
          </p>
        </header>

        <BbTickerStrip items={CULTURE_PAGE_CONTENT.tickerItems} speed={CULTURE_PAGE_CONTENT.tickerSpeed} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
          <SectionManifesto />
          <SectionMVP />
          <SectionPillars />
          <SectionValues />
          <SectionCommandments />
          <SectionMantras />
          <SectionLeadership />
          <SectionHiring />
          <SectionFrameworks />
          <SectionLifestyle />
          <SectionSymbols />
        </div>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "4rem 0 2rem", borderTop: "1px solid var(--bb-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <img src={STARTER_BRAND_ASSETS.logoLightSrc} alt={STARTER_BRAND_ASSETS.logoAlt} style={{ height: 16 }} />
            <span style={{ color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              CULTURE DECK
            </span>
          </div>
          <p style={{ color: "var(--bb-accent)", fontFamily: "var(--font-bb-display)", fontSize: "1.2rem", fontWeight: 800, marginTop: "0.5rem", textTransform: "uppercase" }}>
            {CULTURE_PAGE_CONTENT.footerTagline}
          </p>
        </footer>
      </main>
    </>
  )
}
