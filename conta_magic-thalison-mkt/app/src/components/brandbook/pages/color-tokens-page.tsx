import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { ColorSection } from "@/components/brandbook-sections/foundations/color-section"

/* ------------------------------------------------------------------ */
/*  Semantic Aliases (shadcn → bb mapping)                             */
/* ------------------------------------------------------------------ */

const shadcnMapping = [
  { shadcn: "--background", mapsTo: "--bb-canvas", usage: "Page background" },
  { shadcn: "--foreground", mapsTo: "--bb-cream", usage: "Default text" },
  { shadcn: "--primary", mapsTo: "--bb-accent", usage: "Primary actions" },
  { shadcn: "--primary-foreground", mapsTo: "--bb-dark", usage: "Text on primary" },
  { shadcn: "--secondary", mapsTo: "--bb-surface-alt", usage: "Secondary bg" },
  { shadcn: "--muted", mapsTo: "--bb-surface-panel", usage: "Muted backgrounds" },
  { shadcn: "--muted-foreground", mapsTo: "--bb-dim", usage: "Muted text" },
  { shadcn: "--accent", mapsTo: "--bb-accent-10", usage: "Accent backgrounds" },
  { shadcn: "--accent-foreground", mapsTo: "--bb-accent", usage: "Accent text" },
  { shadcn: "--destructive", mapsTo: "--bb-error", usage: "Error/destructive" },
  { shadcn: "--border", mapsTo: "--bb-border", usage: "Default borders" },
  { shadcn: "--input", mapsTo: "--bb-border-input", usage: "Input borders" },
  { shadcn: "--ring", mapsTo: "--bb-accent-40", usage: "Focus ring" },
  { shadcn: "--card", mapsTo: "--bb-surface", usage: "Card bg" },
  { shadcn: "--card-foreground", mapsTo: "--bb-cream", usage: "Card text" },
  { shadcn: "--popover", mapsTo: "--bb-surface", usage: "Popover bg" },
  { shadcn: "--popover-foreground", mapsTo: "--bb-cream", usage: "Popover text" },
] as const

/* ------------------------------------------------------------------ */
/*  Page Component                                                     */
/* ------------------------------------------------------------------ */

export function ColorTokensPage() {
  const chrome = STARTER_PAGE_CHROME.colorTokens

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={<>Color <span className="text-bb-accent">Tokens</span></>}
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />

      <main>
        {/* ── 01 Color System (Gold + Bronze) ──────────────────── */}
        <SectionDivider num="01" label="Color System" concept="Complete Palette · Gold + Bronze Editions" />
        <ColorSection />

        {/* ── 02 Semantic Aliases (shadcn mapping) ─────────────── */}
        <SectionDivider num="02" label="Semantic Aliases" concept="shadcn/ui token mapping" />

        <section className="bg-bb-dark">
          <div className="grid grid-cols-[2.5rem_1fr_1fr_1.5fr] gap-px border-b border-bb-border bg-bb-surface px-4 py-2.5 font-[family-name:var(--font-bb-mono)] text-[0.58rem] font-medium uppercase tracking-[0.1em] text-bb-dim md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.6fr)]">
            <span />
            <span>shadcn Token</span>
            <span>Maps To</span>
            <span>Usage</span>
          </div>
          {shadcnMapping.map((m) => (
            <div
              key={m.shadcn}
              className="grid grid-cols-[2.5rem_1fr_1fr_1.5fr] items-center gap-px border-b border-bb-border bg-bb-dark px-4 py-3 md:grid-cols-[2.5rem_minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,1.6fr)]"
            >
              <div className="flex items-center">
                <div
                  className="h-5 w-5 rounded-sm border border-bb-border"
                  style={{ background: `var(${m.mapsTo})` }}
                />
              </div>
              <span className="truncate font-[family-name:var(--font-bb-mono)] text-[0.6rem] text-bb-cream">
                {m.shadcn}
              </span>
              <span className="truncate font-[family-name:var(--font-bb-mono)] text-[0.6rem] text-bb-accent">
                {m.mapsTo}
              </span>
              <span className="text-[0.62rem] leading-snug text-bb-dim">
                {m.usage}
              </span>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
