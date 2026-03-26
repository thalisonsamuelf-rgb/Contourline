import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { LayeringSection } from "@/components/brandbook-sections/foundations/layering-section"

export function LayeringPage() {
  const chrome = STARTER_PAGE_CHROME.layering

  return (
    <>
      <PageHeader {...chrome} title={<>Layering & <span className="text-bb-accent">Breakpoints</span></>} />
      <main>
        <SectionDivider num="01" label="Layering & Breakpoints" concept="Z-Index · Responsive" />
        <LayeringSection />
      </main>
    </>
  )
}
