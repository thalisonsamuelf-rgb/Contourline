import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSectionDivider } from "./bb-section-divider"

const meta = {
  title: "Organisms/Brandbook/BbSectionDivider",
  component: BbSectionDivider,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbSectionDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "TYPOGRAPHY",
  },
}
