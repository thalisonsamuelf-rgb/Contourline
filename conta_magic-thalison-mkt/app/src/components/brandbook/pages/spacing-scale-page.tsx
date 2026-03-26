import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { SpacingScaleSection } from "@/components/brandbook-sections/foundations/spacing-scale-section"

export function SpacingScalePage() {
  const chrome = STARTER_PAGE_CHROME.spacingScale

  return (
    <>
      <PageHeader {...chrome} title={<>Spacing <span className="text-bb-accent">Scale</span></>} />
      <main>
        <SectionDivider num="01" label="Numeric Scale" concept="14 Steps · 0–180px" />
        <SpacingScaleSection />
      </main>
    </>
  )
}
