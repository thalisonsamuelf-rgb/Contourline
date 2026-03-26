import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionProposito } from "./section-proposito"

const meta = {
  title: "Pages/SectionProposito",
  component: SectionProposito,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionProposito>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
