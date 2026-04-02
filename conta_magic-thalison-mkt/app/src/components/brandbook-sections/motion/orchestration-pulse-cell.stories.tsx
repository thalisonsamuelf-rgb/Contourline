import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { OrchestrationPulseCell } from "./orchestration-pulse-cell"

const meta = {
  title: "Organisms/BrandbookSections/OrchestrationPulseCell",
  component: OrchestrationPulseCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof OrchestrationPulseCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
