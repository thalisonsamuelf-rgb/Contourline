import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BentoGrid } from "./bento-grid"

const meta = {
  title: "Organisms/BrandbookSections/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BentoGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Bento grid content",
  },
}
