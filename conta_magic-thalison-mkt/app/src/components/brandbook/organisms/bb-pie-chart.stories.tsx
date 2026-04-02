import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbPieChart } from "./bb-pie-chart"

const meta = {
  title: "Organisms/Brandbook/BbPieChart",
  component: BbPieChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbPieChart>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { name: "Automation", value: 42 },
  { name: "Support", value: 28 },
  { name: "Analytics", value: 18 },
  { name: "Other", value: 12 },
]

export const Pie: Story = {
  args: { data },
}

export const Donut: Story = {
  args: { data, innerRadius: 60 },
}

export const WithLabels: Story = {
  args: { data, showLabels: true },
}
