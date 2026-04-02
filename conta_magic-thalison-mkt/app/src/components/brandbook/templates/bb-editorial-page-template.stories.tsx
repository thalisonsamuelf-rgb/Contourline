import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbEditorialPageTemplate } from "./bb-editorial-page-template"

const meta = {
  title: "Templates/BbEditorialPageTemplate",
  component: BbEditorialPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    spreads: [
      {
        label: "COVER",
        concept: "Identity",
        content: (
          <div style={{ padding: "2rem 0", fontSize: "0.85rem", lineHeight: 1.6 }}>
            Cover spread content.
          </div>
        ),
      },
      {
        label: "MANIFESTO",
        concept: "Core Belief",
        content: (
          <div style={{ padding: "2rem 0", fontSize: "0.85rem", lineHeight: 1.6 }}>
            Manifesto spread content.
          </div>
        ),
      },
    ],
  },
} satisfies Meta<typeof BbEditorialPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
