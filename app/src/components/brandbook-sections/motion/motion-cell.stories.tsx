import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MotionCell } from "./motion-cell"

const meta = {
  title: "Organisms/BrandbookSections/MotionCell",
  component: MotionCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MotionCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Fade In",
    tag: "entrance",
    description: "Elements fade in with a subtle upward motion on scroll.",
    children: "Animation preview area",
  },
}
