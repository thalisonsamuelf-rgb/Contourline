import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import {
  BrownfieldWorkflowSection,
  BrownfieldAgentMapSection,
  BrownfieldArtifactSection,
  BrownfieldDecisionSection,
} from "@/components/brandbook-sections/workflows/brownfield-discovery-section"

export function BrownfieldDiscoveryPage() {
  const chrome = STARTER_PAGE_CHROME.brownfieldDiscovery

  return (
    <>
      <PageHeader {...chrome} title={<>Brownfield<span className="text-bb-accent">Discovery</span></>} />

      <main>
        {/* 01 -- Main Workflow Flow */}
        <SectionDivider num="01" label="Workflow Principal" concept="Fluxo de 10 Fases com Decision Points" />
        <BrownfieldWorkflowSection />

        {/* 02 -- Agent Map */}
        <SectionDivider num="02" label="Mapa de Agentes" concept="6 Agentes Especializados" />
        <BrownfieldAgentMapSection />

        {/* 03 -- Artifact Pipeline */}
        <SectionDivider num="03" label="Pipeline de Artefatos" concept="Mapa de Dependências entre Documentos" />
        <BrownfieldArtifactSection />

        {/* 04 -- Decision Points */}
        <SectionDivider num="04" label="Decision Points" concept="3 Pontos de Decisão Detalhados" />
        <BrownfieldDecisionSection />
      </main>
    </>
  )
}
