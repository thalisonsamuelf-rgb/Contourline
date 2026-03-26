import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbBentoPageTemplate } from "./bb-bento-page-template"

const meta = {
  title: "Templates/BbBentoPageTemplate",
  component: BbBentoPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BbBentoPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: {
      title: "Page Title",
      subtitle: "A short description of this page",
      badge: "Template",
    },
    children: (
      <div style={{ padding: "2rem", color: "#aaa", fontFamily: "monospace" }}>
        Bento grid content goes here
      </div>
    ),
  },
}
