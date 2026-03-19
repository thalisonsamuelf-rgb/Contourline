import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DualVoiceSpread } from "./dual-voice-spread"

const meta = {
  title: "Organisms/BrandbookSections/DualVoiceSpread",
  component: DualVoiceSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof DualVoiceSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
