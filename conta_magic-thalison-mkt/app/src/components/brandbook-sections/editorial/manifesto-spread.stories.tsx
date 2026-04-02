import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ManifestoSpread } from "./manifesto-spread"

const meta = {
  title: "Organisms/BrandbookSections/ManifestoSpread",
  component: ManifestoSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ManifestoSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
