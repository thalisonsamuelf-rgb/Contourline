"use client"

import { BbCompPageTemplate } from "../templates"
import { BbListItem, BbKpiCard } from "../molecules"
import { BbBadge } from "../atoms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

export function ListsPage() {
  const chrome = STARTER_PAGE_CHROME.lists

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "List",
        titleHighlight: "Library",
      }}
      sections={[
        {
          label: "List Items",
          content: (
            <div style={{ padding: "1.5rem", maxWidth: 520 }}>
              <BbListItem
                title="Workflow Automation"
                description="Connect your tools and eliminate manual handoffs"
                trailing={<BbBadge variant="accent">Active</BbBadge>}
              />
              <BbListItem
                title="Customer Support AI"
                description="Handle inquiries 24/7 with human-like accuracy"
                trailing={<BbBadge variant="blue">In Progress</BbBadge>}
              />
              <BbListItem
                title="Data Pipeline"
                description="Automated ETL from 12 sources"
                trailing={<BbBadge variant="surface">Planned</BbBadge>}
              />
              <BbListItem
                title="Legacy Migration"
                description="Deprecated system being replaced"
                trailing={<BbBadge variant="error">Blocked</BbBadge>}
              />
            </div>
          ),
        },
        {
          label: "KPI Cards",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", padding: "1.5rem" }}>
              <BbKpiCard label="Deployments" value="50+" trend="up" />
              <BbKpiCard label="Time Saved" value="83%" trend="up" />
              <BbKpiCard label="Hours Automated" value="245K" trend="up" />
              <BbKpiCard label="Error Rate" value="0.3%" trend="down" />
            </div>
          ),
        },
      ]}
    />
  )
}
