import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandRevealCell } from "./brand-reveal-cell"

const meta = {
  title: "Organisms/BrandbookSections/BrandRevealCell",
  component: BrandRevealCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BrandRevealCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
