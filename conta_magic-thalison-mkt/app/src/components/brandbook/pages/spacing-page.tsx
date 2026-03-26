import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { SpacingSection } from "@/components/brandbook-sections/foundations/spacing-section"

export function SpacingPage() {
  const chrome = STARTER_PAGE_CHROME.spacing

  return (
    <>
      <PageHeader {...chrome} title={<>Named <span className="text-bb-accent">Spacing</span></>} />
      <main>
        <SectionDivider num="01" label="Spacing" concept="Named Scale Tokens" />
        <SpacingSection />
      </main>
    </>
  )
}
