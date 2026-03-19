import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { GridPatternsSection } from "@/components/brandbook-sections/patterns/grid-patterns-section"
import { HudFramesSection } from "@/components/brandbook-sections/patterns/hud-frames-section"
import { HazardSection } from "@/components/brandbook-sections/patterns/hazard-section"
import { CircuitSection } from "@/components/brandbook-sections/patterns/circuit-section"
import { TexturesSection } from "@/components/brandbook-sections/patterns/textures-section"
import { DividersSection } from "@/components/brandbook-sections/patterns/dividers-section"

export function PatternsPage() {
  const chrome = STARTER_PAGE_CHROME.patterns

  return (
    <>
      <PageHeader {...chrome} title={<>Pattern <span style={{ color: "var(--bb-accent)" }}>Library</span></>} />

      <main>
        <SectionDivider
          num="01"
          label="Grid Patterns"
          concept="Background Textures"
        />
        <GridPatternsSection />

        <SectionDivider
          num="02"
          label="HUD Frames"
          concept="Containment Elements"
        />
        <HudFramesSection />

        <SectionDivider
          num="03"
          label="Hazard / Warning"
          concept="Alert Patterns"
        />
        <HazardSection />

        <SectionDivider
          num="04"
          label="Circuit Traces"
          concept="PCB Decoratives"
        />
        <CircuitSection />

        <SectionDivider
          num="05"
          label="Textures"
          concept="Surface Treatments"
        />
        <TexturesSection />

        <SectionDivider
          num="06"
          label="Dividers & Separators"
          concept="Section Breaks"
        />
        <DividersSection />
      </main>
    </>
  )
}
