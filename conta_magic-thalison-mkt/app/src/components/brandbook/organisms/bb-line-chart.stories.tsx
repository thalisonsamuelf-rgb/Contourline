import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbLineChart } from "./bb-line-chart"

const meta = {
  title: "Organisms/Brandbook/BbLineChart",
  component: BbLineChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbLineChart>

export default meta
type Story = StoryObj<typeof meta>

const monthlyData = [
  { name: "Jan", revenue: 4000, costs: 2400 },
  { name: "Feb", revenue: 3000, costs: 1398 },
  { name: "Mar", revenue: 5000, costs: 3800 },
  { name: "Apr", revenue: 4780, costs: 3908 },
  { name: "May", revenue: 5890, costs: 4800 },
  { name: "Jun", revenue: 6390, costs: 3800 },
]

export const SingleLine: Story = {
  args: {
    data: monthlyData,
    lines: [{ dataKey: "revenue", label: "Revenue" }],
  },
}

export const MultiLine: Story = {
  args: {
    data: monthlyData,
    lines: [
      { dataKey: "revenue", label: "Revenue" },
      { dataKey: "costs", label: "Costs" },
    ],
    showLegend: true,
  },
}

export const WithoutGrid: Story = {
  args: {
    data: monthlyData,
    lines: [{ dataKey: "revenue", label: "Revenue" }],
    showGrid: false,
  },
}
