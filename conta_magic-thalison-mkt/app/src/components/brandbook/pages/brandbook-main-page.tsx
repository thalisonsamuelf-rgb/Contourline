"use client"

import { BrandbookSidebar } from "../layout/brandbook-sidebar"
import { BbTickerStrip } from "../organisms"
import {
  HeaderBanner,
  SectionManifesto,
  SectionProposito,
  SectionValores,
  SectionArquetipo,
  SectionPosicionamento,
  SectionContraste,
  SectionBrandscript,
  SectionTruelines,
  SectionNaming,
  SectionVocabulario,
  SectionVoz,
  SectionJornada,
  SectionDepoimentos,
  SectionVisual,
  SectionContrato,
  SectionFundadores,
} from "./main-sections"
import { STARTER_BRAND_ASSETS } from "@/components/brandbook/data/starter-brand-data"
import { PAGE_CONTENT } from "@/components/brandbook/data/movimento-content"

export function BrandbookMainPage() {
  return (
    <>
      <BrandbookSidebar groups={PAGE_CONTENT.sidebarGroups} />

      <main
        className="w-full md:ml-[280px] md:w-[calc(100%-280px)]"
        style={{
          scrollBehavior: "smooth",
          fontFamily: "var(--font-bb-mono)",
        }}
      >
        <HeaderBanner />

        <BbTickerStrip items={PAGE_CONTENT.tickerItems} speed={PAGE_CONTENT.tickerSpeed} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
          <SectionManifesto />
          <SectionProposito />
          <SectionValores />
          <SectionArquetipo />
          <SectionPosicionamento />
          <SectionContraste />
          <SectionBrandscript />
          <SectionTruelines />
          <SectionNaming />
          <SectionVocabulario />
          <SectionVoz />
          <SectionJornada />
          <SectionDepoimentos />
          <SectionVisual />
          <SectionContrato />
          <SectionFundadores />
        </div>

        {/* Footer */}
        <footer style={{ textAlign: "center", padding: "4rem 0 2rem", borderTop: "1px solid var(--bb-border)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
            <img src={STARTER_BRAND_ASSETS.logoLightSrc} alt={STARTER_BRAND_ASSETS.logoAlt} style={{ height: 16 }} />
            <span style={{ color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              — {STARTER_BRAND_ASSETS.editorialSystemName}
            </span>
          </div>
          <p style={{ color: "var(--bb-accent)", fontFamily: "var(--font-bb-display)", fontSize: "1.2rem", fontWeight: 800, marginTop: "0.5rem", textTransform: "uppercase" }}>
            {PAGE_CONTENT.footerTagline}
          </p>
        </footer>
      </main>
    </>
  )
}
