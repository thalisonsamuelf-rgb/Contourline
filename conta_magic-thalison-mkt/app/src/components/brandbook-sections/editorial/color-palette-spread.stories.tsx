import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ColorPaletteSpread } from "./color-palette-spread"

const meta = {
  title: "Organisms/BrandbookSections/ColorPaletteSpread",
  component: ColorPaletteSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ColorPaletteSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
