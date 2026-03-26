"use client"

import { BbCompPageTemplate } from "../templates"
import { BbCompGrid } from "../organisms"
import { BbCompCell } from "../molecules"
import { BbButton, BbInput, BbBadge, BbSpinner, BbProgress, BbSwitch, BbCheckbox, BbSlider } from "../atoms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

const categories = [
  { name: "Buttons", count: 4, preview: <BbButton size="sm">Action</BbButton> },
  { name: "Inputs", count: 3, preview: <BbInput placeholder="Type..." style={{ maxWidth: 160 }} /> },
  { name: "Badges", count: 5, preview: <BbBadge>Live</BbBadge> },
  { name: "Switches", count: 1, preview: <BbSwitch /> },
  { name: "Checkboxes", count: 1, preview: <BbCheckbox label="Option" /> },
  { name: "Sliders", count: 1, preview: <BbSlider defaultValue={60} /> },
  { name: "Spinners", count: 3, preview: <BbSpinner size="sm" /> },
  { name: "Progress", count: 3, preview: <BbProgress value={65} style={{ maxWidth: 120 }} /> },
  { name: "Cards", count: 3, preview: <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)" }}>3 variants</div> },
  { name: "Tables", count: 1, preview: <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)" }}>data grid</div> },
  { name: "Charts", count: 2, preview: <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)" }}>bar + donut</div> },
  { name: "Feedback", count: 3, preview: <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)" }}>alert + toast + modal</div> },
]

export function ComponentsPage() {
  const chrome = STARTER_PAGE_CHROME.components

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Component",
        titleHighlight: "Catalog",
      }}
      sections={[
        {
          label: "Component Index",
          content: (
            <BbCompGrid columns={3}>
              {categories.map((cat) => (
                <BbCompCell key={cat.name} name={`${cat.name} (${cat.count})`} preview={cat.preview} />
              ))}
            </BbCompGrid>
          ),
        },
      ]}
    />
  )
}
