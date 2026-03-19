import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NarrativeSpread } from "./narrative-spread"

const meta = {
  title: "Organisms/BrandbookSections/NarrativeSpread",
  component: NarrativeSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NarrativeSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
