import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FoundersSpread } from "./founders-spread"

const meta = {
  title: "Organisms/BrandbookSections/FoundersSpread",
  component: FoundersSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FoundersSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
