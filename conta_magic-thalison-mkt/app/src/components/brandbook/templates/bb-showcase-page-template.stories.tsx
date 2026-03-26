import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbShowcasePageTemplate } from "./bb-showcase-page-template"

const meta = {
  title: "Templates/BbShowcasePageTemplate",
  component: BbShowcasePageTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BbShowcasePageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: {
      title: "Showcase",
      subtitle: "Component library and patterns",
      badge: "Components",
    },
    groups: [
      {
        label: "Atoms",
        items: [
          { name: "BbBadge", status: "live", content: "Badge component showcase." },
          { name: "BbGlow", status: "wip", content: "Glow effect component." },
        ],
      },
    ],
  },
}
