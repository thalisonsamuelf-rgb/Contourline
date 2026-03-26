import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { SurfacesSection } from "@/components/brandbook-sections/foundations/surfaces-section"

export function SurfacesPage() {
  const chrome = STARTER_PAGE_CHROME.surfaces

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={<>Surfaces & <span className="text-bb-accent">Borders</span></>}
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />
      <main>
        <SectionDivider num="01" label="Surfaces & Borders" concept="Elevation · Borders · Radius · Glass" />
        <SurfacesSection />
      </main>
    </>
  )
}
