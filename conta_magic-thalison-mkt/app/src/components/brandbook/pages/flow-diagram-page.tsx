"use client"

import dynamic from "next/dynamic"
import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

const loadingBlock = () => (
  <div className="min-h-[420px] border border-bb-border bg-bb-surface-panel" />
)

const UserFlowSection = dynamic(
  () =>
    import("@/components/brandbook-sections/user-flow/user-flow-section").then(
      (module) => module.UserFlowSection,
    ),
  { ssr: false, loading: loadingBlock },
)

const UserFlowMapSection = dynamic(
  () =>
    import("@/components/brandbook-sections/user-flow/user-flow-section").then(
      (module) => module.UserFlowMapSection,
    ),
  { ssr: false, loading: loadingBlock },
)

const UserFlowIconSection = dynamic(
  () =>
    import("@/components/brandbook-sections/user-flow/user-flow-section").then(
      (module) => module.UserFlowIconSection,
    ),
  { ssr: false, loading: loadingBlock },
)

const UserFlowPlaybookSection = dynamic(
  () =>
    import("@/components/brandbook-sections/user-flow/user-flow-section").then(
      (module) => module.UserFlowPlaybookSection,
    ),
  { ssr: false, loading: loadingBlock },
)

const UserFlowPipelineSection = dynamic(
  () =>
    import("@/components/brandbook-sections/user-flow/user-flow-section").then(
      (module) => module.UserFlowPipelineSection,
    ),
  { ssr: false, loading: loadingBlock },
)

const UserFlowProcessSection = dynamic(
  () =>
    import("@/components/brandbook-sections/user-flow/user-flow-section").then(
      (module) => module.UserFlowProcessSection,
    ),
  { ssr: false, loading: loadingBlock },
)

export function FlowDiagramPage() {
  const chrome = STARTER_PAGE_CHROME.flowDiagram

  return (
    <>
      <PageHeader {...chrome} title={<>Flow<span className="text-bb-accent">Diagram</span></>} />

      <main>
        {/* 01 -- FlowDiagram Component */}
        <SectionDivider num="01" label="FlowDiagram" concept="Interactive Data-Driven Canvas" />
        <UserFlowSection />

        {/* 02 -- FlowMap Component */}
        <SectionDivider num="02" label="FlowMap" concept="Grouped Mindmap Canvas" />
        <UserFlowMapSection />

        {/* 03 -- IconFlowDiagram Component */}
        <SectionDivider num="03" label="IconFlowDiagram" concept="Architecture Icon Canvas" />
        <UserFlowIconSection />

        {/* 04 -- FlowPlaybook Component */}
        <SectionDivider num="04" label="FlowPlaybook" concept="Orchestration Playbook Canvas" />
        <UserFlowPlaybookSection />

        {/* 05 -- PipelineDiagram Component */}
        <SectionDivider num="05" label="PipelineDiagram" concept="Service Pipeline Canvas" />
        <UserFlowPipelineSection />

        {/* 06 -- ProcessFlowDiagram Component */}
        <SectionDivider num="06" label="ProcessFlowDiagram" concept="Development Process Canvas" />
        <UserFlowProcessSection />
      </main>
    </>
  )
}
