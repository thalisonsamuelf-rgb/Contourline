"use client"

import { BbCompPageTemplate } from "../templates"
import { BbTabs, BbAccordion, BbStepper } from "../organisms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

export function AdvancedPage() {
  const chrome = STARTER_PAGE_CHROME.advanced

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Advanced",
        titleHighlight: "UI",
      }}
      sections={[
        {
          label: "Tabs",
          content: (
            <div style={{ padding: "1.5rem" }}>
              <BbTabs
                tabs={[
                  {
                    label: "Overview",
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        Project overview with key metrics and status dashboard. Displays real-time data from connected automation systems.
                      </p>
                    ),
                  },
                  {
                    label: "Configuration",
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        System configuration panel. Manage API keys, webhook endpoints, and notification preferences for your automation stack.
                      </p>
                    ),
                  },
                  {
                    label: "Logs",
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        Execution logs showing recent activity, errors, and performance metrics. Filter by severity, date range, or automation ID.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          label: "Accordion",
          content: (
            <div style={{ padding: "1.5rem" }}>
              <BbAccordion
                items={[
                  {
                    title: "What is the starter framework?",
                    defaultOpen: true,
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        The starter framework is a reusable brandbook foundation that gives your team a pre-wired visual system, editorial structure, and component baseline to customize faster.
                      </p>
                    ),
                  },
                  {
                    title: "How long does implementation take?",
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        Initial projects typically start in 2-3 weeks, with measurable results from the first operational deliveries.
                      </p>
                    ),
                  },
                  {
                    title: "Do I need to be a programmer?",
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        No. The starter is meant to reduce technical friction and help teams adapt structure, copy, and design tokens without rebuilding the system from zero.
                      </p>
                    ),
                  },
                  {
                    title: "What about data security?",
                    content: (
                      <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", margin: 0 }}>
                        We follow industry-standard security practices including encryption at rest and in transit, SOC 2 compliance, and dedicated infrastructure options.
                      </p>
                    ),
                  },
                ]}
              />
            </div>
          ),
        },
        {
          label: "Stepper — Horizontal",
          content: (
            <div style={{ padding: "1.5rem" }}>
              <BbStepper
                steps={[
                  { label: "Discovery", status: "completed" },
                  { label: "Architecture", status: "completed" },
                  { label: "Implementation", status: "active" },
                  { label: "QA Review", status: "pending" },
                  { label: "Deploy", status: "pending" },
                ]}
                direction="horizontal"
              />
            </div>
          ),
        },
        {
          label: "Stepper — Vertical",
          content: (
            <div style={{ padding: "1.5rem" }}>
              <BbStepper
                steps={[
                  { label: "Onboarding", status: "completed" },
                  { label: "Data Integration", status: "completed" },
                  { label: "Training", status: "active" },
                  { label: "Go Live", status: "pending" },
                ]}
                direction="vertical"
              />
            </div>
          ),
        },
      ]}
    />
  )
}
