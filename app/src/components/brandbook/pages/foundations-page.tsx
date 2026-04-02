import Link from "next/link"
import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

const sections = [
  {
    num: "01",
    label: "Typography",
    concept: "Font Families & Scale",
    href: "/brandbook/typography",
    description: "Display, Sans, Mono — type scale, weight system, letter spacing.",
  },
  {
    num: "02",
    label: "Color Tokens",
    concept: "Core Palette · Lime + Gold",
    href: "/brandbook/color-tokens",
    description: "Accent, surface, text, neutral, border, opacity ladder, semantic aliases.",
  },
  {
    num: "03",
    label: "Spacing & Layout",
    concept: "Named Tokens · Numeric Scale · Z-Index · Breakpoints",
    href: "/brandbook/spacing-layout",
    description: "Semantic spacing, 14-step numeric scale, z-index stack, responsive breakpoints.",
  },
  {
    num: "04",
    label: "Surfaces & Borders",
    concept: "Elevation · Borders · Radius · Glass",
    href: "/brandbook/surfaces",
    description: "Surface elevation, border tokens, radius scale, glass effects.",
  },
  {
    num: "05",
    label: "Motion & Easing",
    concept: "Curves & Durations",
    href: "/brandbook/motion",
    description: "Easing curves, duration tokens, animation primitives.",
  },
  {
    num: "06",
    label: "Semantic Tokens",
    concept: "Aliases · Glow · States · Weights · shadcn",
    href: "/brandbook/semantic-tokens",
    description: "High-level aliases, glow effects, interactive states, shadcn/ui mapping.",
  },
] as const

export function FoundationsPage() {
  const chrome = {
    ...STARTER_PAGE_CHROME.foundations,
    footerCenter: `${sections.length} Sections`,
  }

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={<>Design <span className="text-bb-accent">Foundations</span></>}
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />

      <main>
        <section className="bg-bb-dark">
          <div className="grid grid-cols-1 gap-px border-y border-bb-border bg-bb-border sm:grid-cols-2 xl:grid-cols-4">
            {sections.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="group flex flex-col justify-between bg-bb-dark p-6 no-underline transition-colors hover:bg-bb-surface-hover-strong"
              >
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="font-[family-name:var(--font-bb-mono)] text-[0.6rem] text-bb-accent">
                      {s.num}
                    </span>
                    <span className="h-px flex-1 bg-bb-border transition-colors group-hover:bg-bb-border-hover" />
                  </div>

                  <h3 className="mb-1 font-[family-name:var(--font-bb-display)] text-sm font-extrabold uppercase tracking-tight text-bb-cream">
                    {s.label}
                  </h3>

                  <p className="mb-3 font-[family-name:var(--font-bb-mono)] text-[0.55rem] uppercase tracking-[0.1em] text-bb-meta">
                    {s.concept}
                  </p>

                  <p className="text-[0.68rem] leading-relaxed text-bb-dim">
                    {s.description}
                  </p>
                </div>

                <div className="mt-4 font-[family-name:var(--font-bb-mono)] text-[0.55rem] uppercase tracking-[0.1em] text-bb-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Ver seção →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
