import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { SpacingSection } from "@/components/brandbook-sections/foundations/spacing-section"
import { SpacingScaleSection } from "@/components/brandbook-sections/foundations/spacing-scale-section"
import { LayeringSection } from "@/components/brandbook-sections/foundations/layering-section"

export function SpacingLayoutPage() {
  const chrome = STARTER_PAGE_CHROME.spacingLayout

  return (
    <>
      <PageHeader {...chrome} title={<>Spacing & <span className="text-bb-accent">Layout</span></>} />

      <main>
        {/* 01 -- Named Spacing */}
        <SectionDivider num="01" label="Named Spacing" concept="Semantic Scale Tokens" />
        <SpacingSection />

        {/* 02 -- Numeric Scale */}
        <SectionDivider num="02" label="Spacing Scale" concept="14-Step Numeric Scale · 0–180px" />
        <SpacingScaleSection />

        {/* 03 -- Layering & Breakpoints */}
        <SectionDivider num="03" label="Layering & Breakpoints" concept="Z-Index Stack · Responsive" />
        <LayeringSection />
      </main>
    </>
  )
}
