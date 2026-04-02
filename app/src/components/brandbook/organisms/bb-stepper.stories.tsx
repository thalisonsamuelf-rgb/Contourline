import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbStepper } from "./bb-stepper"

const meta = {
  title: "Organisms/Brandbook/BbStepper",
  component: BbStepper,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    steps: [
      { label: "Discovery", status: "completed" },
      { label: "Design", status: "completed" },
      { label: "Development", status: "active" },
      { label: "Launch", status: "pending" },
    ],
  },
}
