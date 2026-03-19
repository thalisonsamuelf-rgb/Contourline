import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TypographySpread } from "./typography-spread"

const meta = {
  title: "Organisms/BrandbookSections/TypographySpread",
  component: TypographySpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TypographySpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
