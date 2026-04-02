import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbBarChart } from "./bb-bar-chart"

const meta = {
  title: "Organisms/Brandbook/BbBarChart",
  component: BbBarChart,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbBarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { label: "Q1", value: 120 },
      { label: "Q2", value: 280 },
      { label: "Q3", value: 190 },
      { label: "Q4", value: 340 },
    ],
  },
}
