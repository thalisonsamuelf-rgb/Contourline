"use client"

import { BbCompPageTemplate } from "../templates"
import { BbCompGrid } from "../organisms"
import { BbCompCell } from "../molecules"
import { BbButton } from "../atoms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { Button } from "@/components/ui/button"
import { CtaButton } from "@/components/ui/cta-button"
import { PrimaryLink } from "@/components/ui/primary-link"
import { SiteCtaButton } from "@/components/ui/site-cta"

export function ButtonsPage() {
  const chrome = STARTER_PAGE_CHROME.buttons

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Button",
        titleHighlight: "Library",
      }}
      sections={[
        {
          label: "Production Roles",
          content: (
            <BbCompGrid columns={4}>
              <BbCompCell
                name="SiteCta"
                status="stable"
                preview={<SiteCtaButton showArrow>Launch project</SiteCtaButton>}
              />
              <BbCompCell
                name="Button"
                status="stable"
                preview={<Button size="md">Open dialog</Button>}
              />
              <BbCompCell
                name="PrimaryLink"
                status="stable"
                preview={<PrimaryLink href="#guidelines">Read guideline</PrimaryLink>}
              />
              <BbCompCell
                name="CtaButton"
                status="deprecated"
                preview={<CtaButton href="#legacy">Legacy hero CTA</CtaButton>}
              />
            </BbCompGrid>
          ),
        },
        {
          label: "Usage Guidance",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "var(--border)" }}>
              {[
                ["SiteCta", "Primary page or form action for marketing surfaces."],
                ["Button", "Generic product and app-shell action primitive."],
                ["PrimaryLink", "Inline editorial or navigation action with low visual weight."],
                ["CtaButton", "Legacy marketing primitive. Keep in existing sections until intentionally migrated."],
              ].map(([title, copy]) => (
                <div key={title} style={{ padding: "1.25rem", background: "var(--surface)" }}>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bb-accent)", marginBottom: "0.75rem" }}>
                    {title}
                  </p>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.6, color: "var(--gray-silver)", margin: 0 }}>
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: "Variants",
          content: (
            <BbCompGrid columns={4}>
              <BbCompCell name="Primary" preview={<BbButton variant="primary">Primary</BbButton>} />
              <BbCompCell name="Secondary" preview={<BbButton variant="secondary">Secondary</BbButton>} />
              <BbCompCell name="Ghost" preview={<BbButton variant="ghost">Ghost</BbButton>} />
              <BbCompCell name="Destructive" preview={<BbButton variant="destructive">Delete</BbButton>} />
            </BbCompGrid>
          ),
        },
        {
          label: "Sizes",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="Small" preview={<BbButton size="sm">Small</BbButton>} />
              <BbCompCell name="Medium" preview={<BbButton size="md">Medium</BbButton>} />
              <BbCompCell name="Large" preview={<BbButton size="lg">Large</BbButton>} />
            </BbCompGrid>
          ),
        },
        {
          label: "States",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell name="Default" preview={<BbButton>Default</BbButton>} />
              <BbCompCell name="Loading" preview={<BbButton loading>Loading</BbButton>} />
              <BbCompCell name="Disabled" preview={<BbButton disabled>Disabled</BbButton>} />
            </BbCompGrid>
          ),
        },
        {
          label: "Combinations",
          content: (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", padding: "1.5rem" }}>
              <BbButton variant="primary" size="lg">Book a Call</BbButton>
              <BbButton variant="secondary" size="lg">Learn More</BbButton>
              <BbButton variant="ghost" size="sm">Cancel</BbButton>
              <BbButton variant="destructive" size="sm">Remove</BbButton>
            </div>
          ),
        },
      ]}
    />
  )
}
