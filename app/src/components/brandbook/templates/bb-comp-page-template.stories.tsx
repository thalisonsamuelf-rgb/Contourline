import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbCompPageTemplate } from "./bb-comp-page-template"

const sectionPanel = (title: string, desc: string) => (
  <div
    style={{
      padding: "1.5rem",
      border: "1px solid var(--bb-border)",
      background: "var(--bb-surface)",
      color: "var(--bb-cream)",
      fontFamily: "var(--font-bb-mono)",
    }}
  >
    <h3 style={{ margin: 0, fontFamily: "var(--font-bb-display)", fontSize: "1rem", textTransform: "uppercase" }}>{title}</h3>
    <p style={{ margin: "0.6rem 0 0", color: "var(--bb-dim)", fontSize: "0.68rem", lineHeight: 1.5 }}>{desc}</p>
  </div>
)

const meta = {
  title: "Templates/BbCompPageTemplate",
  component: BbCompPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    header: {
      navLeft: "AIOX Squad",
      navCenter: "Component Library",
      navRight: "v2.0",
      titlePrefix: "UI",
      titleHighlight: "Components",
      subtitle: "Reference implementations and usage examples.",
      footerLeft: "Section 01",
      footerCenter: "Foundations",
      footerRight: "2026",
    },
    sections: [
      {
        label: "Atoms",
        concept: "Base UI",
        num: "01",
        content: sectionPanel("Atoms", "Primitive controls and typography primitives."),
      },
      {
        label: "Molecules",
        concept: "Composition",
        num: "02",
        content: sectionPanel("Molecules", "Reusable component groups for forms and overlays."),
      },
      {
        label: "Organisms",
        concept: "Feature Sections",
        num: "03",
        content: sectionPanel("Organisms", "Complex sections that combine multiple molecules."),
      },
    ],
  },
} satisfies Meta<typeof BbCompPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
