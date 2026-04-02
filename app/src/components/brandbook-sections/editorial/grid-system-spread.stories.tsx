import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GridSystemSpread } from "./grid-system-spread"

const meta = {
  title: "Organisms/BrandbookSections/GridSystemSpread",
  component: GridSystemSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof GridSystemSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
