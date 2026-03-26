import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MorphingSquareCell } from "./morphing-square-cell"

const meta = {
  title: "Organisms/BrandbookSections/MorphingSquareCell",
  component: MorphingSquareCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MorphingSquareCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
