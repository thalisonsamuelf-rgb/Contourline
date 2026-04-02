import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbChartTooltip } from "./bb-chart-tooltip"

const meta = {
  title: "Atoms/Brandbook/BbChartTooltip",
  component: BbChartTooltip,
  parameters: { layout: "centered" },
} satisfies Meta<typeof BbChartTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "January",
    items: [
      { name: "Revenue", value: 4500, color: "var(--bb-chart-1)" },
      { name: "Costs", value: 2100, color: "var(--bb-chart-3)" },
    ],
  },
}

export const WithFormatter: Story = {
  args: {
    label: "Q1 2026",
    items: [
      { name: "Growth", value: 23.5, color: "var(--bb-chart-2)" },
    ],
    formatter: (v) => `${v.toFixed(1)}%`,
  },
}

export const SingleItem: Story = {
  args: {
    items: [
      { name: "Score", value: 87, color: "var(--bb-chart-5)" },
    ],
  },
}
