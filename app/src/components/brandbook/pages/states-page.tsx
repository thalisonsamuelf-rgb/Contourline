"use client"

import { BbCompPageTemplate } from "../templates"
import { BbCompGrid } from "../organisms"
import { BbCompCell } from "../molecules"
import { BbSpinner, BbProgress, BbSkeleton } from "../atoms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

export function StatesPage() {
  const chrome = STARTER_PAGE_CHROME.states

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "System",
        titleHighlight: "States",
      }}
      sections={[
        {
          label: "Spinners",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="Small" preview={<BbSpinner size="sm" />} />
              <BbCompCell name="Medium" preview={<BbSpinner size="md" />} />
              <BbCompCell name="Large" preview={<BbSpinner size="lg" />} />
            </BbCompGrid>
          ),
        },
        {
          label: "Progress Bars",
          content: (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "1.5rem", maxWidth: 400 }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Small — 25%</div>
                <BbProgress value={25} size="sm" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Medium — 50%</div>
                <BbProgress value={50} size="md" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Large — 75%</div>
                <BbProgress value={75} size="lg" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>Complete — 100%</div>
                <BbProgress value={100} size="md" />
              </div>
            </div>
          ),
        },
        {
          label: "Skeletons",
          content: (
            <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem", maxWidth: 400 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Text Lines</div>
                <BbSkeleton width="100%" height={12} />
                <BbSkeleton width="80%" height={12} />
                <BbSkeleton width="60%" height={12} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Card Skeleton</div>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                  <BbSkeleton width={48} height={48} rounded />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <BbSkeleton width="60%" height={10} />
                    <BbSkeleton width="40%" height={10} />
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Image Placeholder</div>
                <BbSkeleton width="100%" height={120} />
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
