import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { SemanticTokensSection } from "@/components/brandbook-sections/foundations/semantic-tokens-section"

export function SemanticTokensPage() {
  const chrome = STARTER_PAGE_CHROME.semanticTokens

  return (
    <>
      <PageHeader {...chrome} title={<>Semantic <span className="text-bb-accent">Tokens</span></>} />
      <main>
        <SectionDivider num="01" label="Semantic Tokens" concept="Aliases · Glow · States · Weights · shadcn" />
        <SemanticTokensSection />
      </main>
    </>
  )
}
