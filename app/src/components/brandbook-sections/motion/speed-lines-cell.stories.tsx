import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpeedLinesCell } from "./speed-lines-cell"

const meta = {
  title: "Organisms/BrandbookSections/SpeedLinesCell",
  component: SpeedLinesCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SpeedLinesCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
