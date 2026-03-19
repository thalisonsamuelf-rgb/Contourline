import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbComposedChart } from "./bb-composed-chart"

const meta = {
  title: "Organisms/Brandbook/BbComposedChart",
  component: BbComposedChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbComposedChart>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { name: "Jan", revenue: 4000, target: 3500, growth: 15 },
  { name: "Feb", revenue: 3000, target: 3200, growth: -8 },
  { name: "Mar", revenue: 5000, target: 4000, growth: 25 },
  { name: "Apr", revenue: 4780, target: 4500, growth: 12 },
  { name: "May", revenue: 5890, target: 5000, growth: 23 },
  { name: "Jun", revenue: 6390, target: 5500, growth: 18 },
]

export const BarAndLine: Story = {
  args: {
    data,
    series: [
      { dataKey: "revenue", type: "bar", label: "Revenue" },
      { dataKey: "target", type: "line", label: "Target" },
    ],
  },
}

export const BarLineAndArea: Story = {
  args: {
    data,
    series: [
      { dataKey: "revenue", type: "bar", label: "Revenue" },
      { dataKey: "target", type: "line", label: "Target" },
      { dataKey: "growth", type: "area", label: "Growth %" },
    ],
  },
}
