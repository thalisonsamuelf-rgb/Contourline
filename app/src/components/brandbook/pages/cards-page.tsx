"use client"

import { BbCompPageTemplate } from "../templates"
import { BbCard } from "../organisms"
import { BbButton, BbBadge } from "../atoms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

export function CardsPage() {
  const chrome = STARTER_PAGE_CHROME.cards

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Card",
        titleHighlight: "Library",
      }}
      sections={[
        {
          label: "Variants",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", padding: "1.5rem" }}>
              <BbCard title="Default Card" subtitle="Standard surface card">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                  Content area with default background and border styling.
                </p>
              </BbCard>
              <BbCard title="Elevated Card" subtitle="With shadow" variant="elevated">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                  Content area with elevated shadow for emphasis.
                </p>
              </BbCard>
              <BbCard title="Outlined Card" subtitle="Transparent bg" variant="outlined">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                  Content area with transparent background and border.
                </p>
              </BbCard>
            </div>
          ),
        },
        {
          label: "With Actions",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", padding: "1.5rem" }}>
              <BbCard
                title="Project Alpha"
                subtitle="AI Automation"
                actions={<BbBadge variant="accent">Active</BbBadge>}
                footer={
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <BbButton size="sm" variant="primary">Open</BbButton>
                    <BbButton size="sm" variant="ghost">Archive</BbButton>
                  </div>
                }
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                  Workflow automation project with 12 active squads and 3 pending reviews.
                </p>
              </BbCard>
              <BbCard
                title="Report Q4"
                subtitle="Financial"
                actions={<BbBadge variant="surface">Draft</BbBadge>}
                footer={
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <BbButton size="sm" variant="secondary">Edit</BbButton>
                    <BbButton size="sm" variant="destructive">Delete</BbButton>
                  </div>
                }
              >
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                  Quarterly financial report with pending approval from stakeholders.
                </p>
              </BbCard>
            </div>
          ),
        },
      ]}
    />
  )
}
