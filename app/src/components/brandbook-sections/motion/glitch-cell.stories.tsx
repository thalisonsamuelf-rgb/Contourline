import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GlitchCell } from "./glitch-cell"

const meta = {
  title: "Organisms/BrandbookSections/GlitchCell",
  component: GlitchCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof GlitchCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
