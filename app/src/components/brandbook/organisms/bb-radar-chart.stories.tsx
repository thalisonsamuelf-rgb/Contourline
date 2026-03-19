import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbRadarChart } from "./bb-radar-chart"

const meta = {
  title: "Organisms/Brandbook/BbRadarChart",
  component: BbRadarChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbRadarChart>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { skill: "Speed", current: 85, target: 95 },
  { skill: "Quality", current: 90, target: 88 },
  { skill: "Scalability", current: 70, target: 85 },
  { skill: "Security", current: 88, target: 92 },
  { skill: "UX", current: 75, target: 80 },
  { skill: "Cost", current: 60, target: 70 },
]

export const Default: Story = {
  args: {
    data,
    axes: [{ dataKey: "skill" }],
    series: [{ dataKey: "current", label: "Current" }],
  },
}

export const MultiSeries: Story = {
  args: {
    data,
    axes: [{ dataKey: "skill" }],
    series: [
      { dataKey: "current", label: "Current" },
      { dataKey: "target", label: "Target" },
    ],
  },
}
