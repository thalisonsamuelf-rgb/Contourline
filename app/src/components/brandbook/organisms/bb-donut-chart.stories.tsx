import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbDonutChart } from "./bb-donut-chart"

const meta = {
  title: "Organisms/Brandbook/BbDonutChart",
  component: BbDonutChart,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbDonutChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    segments: [
      { label: "Outlaw", value: 50, color: "var(--lime)" },
      { label: "Magician", value: 35 },
      { label: "Explorer", value: 15 },
    ],
  },
}
