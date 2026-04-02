import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbRadialBarChart } from "./bb-radial-bar-chart"

const meta = {
  title: "Organisms/Brandbook/BbRadialBarChart",
  component: BbRadialBarChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbRadialBarChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: [
      { name: "Chrome", value: 65 },
      { name: "Safari", value: 48 },
      { name: "Firefox", value: 32 },
      { name: "Edge", value: 21 },
    ],
  },
}

export const SingleGauge: Story = {
  args: {
    data: [{ name: "Progress", value: 78 }],
    innerRadius: 60,
    outerRadius: 100,
    height: 250,
  },
}

export const FullCircle: Story = {
  args: {
    data: [
      { name: "Automação", value: 92, fill: "var(--bb-chart-1)" },
      { name: "Qualidade", value: 75, fill: "var(--bb-chart-2)" },
      { name: "Velocidade", value: 58, fill: "var(--bb-chart-5)" },
    ],
    maxValue: 100,
  },
}
