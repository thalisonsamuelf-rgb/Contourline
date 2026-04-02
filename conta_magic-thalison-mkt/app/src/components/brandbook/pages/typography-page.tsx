import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { TypographySection } from "@/components/brandbook-sections/foundations/typography-section"

export function TypographyPage() {
  const chrome = STARTER_PAGE_CHROME.typography

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={<>Typo<span className="text-bb-accent">graphy</span></>}
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />
      <main>
        <SectionDivider num="01" label="Typography" concept="Font Families & Scale" />
        <TypographySection />
      </main>
    </>
  )
}
