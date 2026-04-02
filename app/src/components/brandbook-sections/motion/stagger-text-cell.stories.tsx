import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StaggerTextCell } from "./stagger-text-cell"

const meta = {
  title: "Organisms/BrandbookSections/StaggerTextCell",
  component: StaggerTextCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof StaggerTextCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
