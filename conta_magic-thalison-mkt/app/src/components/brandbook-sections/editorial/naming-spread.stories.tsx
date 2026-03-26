import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NamingSpread } from "./naming-spread"

const meta = {
  title: "Organisms/BrandbookSections/NamingSpread",
  component: NamingSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NamingSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
