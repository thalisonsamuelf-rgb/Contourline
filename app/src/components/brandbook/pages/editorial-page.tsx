import { CoverSection } from "@/components/brandbook-sections/editorial/cover-section"
import { LogoSystemSpread } from "@/components/brandbook-sections/editorial/logo-system-spread"
import { LogoDontsSpread } from "@/components/brandbook-sections/editorial/logo-donts-spread"
import { ColorPaletteSpread } from "@/components/brandbook-sections/editorial/color-palette-spread"
import { GridSystemSpread } from "@/components/brandbook-sections/editorial/grid-system-spread"
import { TypographySpread } from "@/components/brandbook-sections/editorial/typography-spread"
import { ManifestoSpread } from "@/components/brandbook-sections/editorial/manifesto-spread"
import { NamingSpread } from "@/components/brandbook-sections/editorial/naming-spread"
import { NarrativeSpread } from "@/components/brandbook-sections/editorial/narrative-spread"
import { EvidenceSpread } from "@/components/brandbook-sections/editorial/evidence-spread"
import { PersonalitySpread } from "@/components/brandbook-sections/editorial/personality-spread"
import { FoundersSpread } from "@/components/brandbook-sections/editorial/founders-spread"
import { DualVoiceSpread } from "@/components/brandbook-sections/editorial/dual-voice-spread"
import { ApplicationSpread } from "@/components/brandbook-sections/editorial/application-spread"
import {
  EditorialCanvas,
  EditorialChapterHeader,
} from "@brandbook-editorial"

/* ═══════════════════════════════════════════════════════════════════════════
   EDITORIAL PAGE // Print/book-like brandbook layout
   Server component. Composes cover + spread sections in a centered,
   editorial-style book format with full-bleed chapter headers.
   ═══════════════════════════════════════════════════════════════════════════ */

export function EditorialPage() {
  return (
    <EditorialCanvas>
        <CoverSection />

        <EditorialChapterHeader number="01" title="Logo & Colors" concept="Visual Basics" variant="dark" />
        <LogoSystemSpread />

        <EditorialChapterHeader number="02" title="Color System" concept="Chromatic Identity" variant="accent" />
        <ColorPaletteSpread />

        <EditorialChapterHeader number="03" title="Typography" concept="Type System" variant="dark" />
        <TypographySpread />

        <EditorialChapterHeader number="04" title="Manifesto & Positioning" concept="Core Belief" variant="accent" />
        <ManifestoSpread />

        <EditorialChapterHeader number="05" title="Naming & Archetypes" concept="Brand DNA" variant="dark" />
        <NamingSpread />

        <EditorialChapterHeader number="06" title="Narrative & Voices" concept="Story Arc" variant="accent" />
        <NarrativeSpread />

        <EditorialChapterHeader number="07" title="Evidence & Personality" concept="Proof & Traits" variant="dark" />
        <EvidenceSpread />

        <EditorialChapterHeader number="08" title="Brand Personality" concept="Character & Tone" variant="accent" />
        <PersonalitySpread />

        <EditorialChapterHeader number="09" title="Os Fundadores" concept="Lideranca" variant="dark" />
        <FoundersSpread />

        <EditorialChapterHeader number="10" title="Logo Don'ts" concept="Usage Rules" variant="accent" />
        <LogoDontsSpread />

        <EditorialChapterHeader number="11" title="Grid System" concept="Spatial Logic" variant="dark" />
        <GridSystemSpread />

        <EditorialChapterHeader number="12" title="Application" concept="Brand In Action" variant="accent" />
        <ApplicationSpread />

        <EditorialChapterHeader number="13" title="Dual Voice & Colophon" concept="Vozes" variant="dark" />
        <DualVoiceSpread />
    </EditorialCanvas>
  )
}
