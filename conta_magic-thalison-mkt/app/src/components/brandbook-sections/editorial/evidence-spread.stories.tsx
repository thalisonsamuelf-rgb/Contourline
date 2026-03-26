import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EvidenceSpread } from "./evidence-spread"

const meta = {
  title: "Organisms/BrandbookSections/EvidenceSpread",
  component: EvidenceSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof EvidenceSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
