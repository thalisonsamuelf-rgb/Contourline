import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbFoundationsPageTemplate } from "./bb-foundations-page-template"

const meta = {
  title: "Templates/BbFoundationsPageTemplate",
  component: BbFoundationsPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BbFoundationsPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: {
      title: "Foundations",
      subtitle: "Design tokens and base styles",
      badge: "Core",
    },
    sections: [
      { id: "typography", label: "Typography", content: "Typography tokens and scale." },
      { id: "color", label: "Color", content: "Color palette and usage." },
    ],
  },
}
