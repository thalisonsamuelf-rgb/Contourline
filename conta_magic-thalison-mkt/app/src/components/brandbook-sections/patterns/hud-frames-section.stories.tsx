import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HudFramesSection } from "./hud-frames-section"

const meta = {
  title: "Organisms/BrandbookSections/HudFramesSection",
  component: HudFramesSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof HudFramesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
