import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbAreaChart } from "./bb-area-chart"

const meta = {
  title: "Organisms/Brandbook/BbAreaChart",
  component: BbAreaChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbAreaChart>

export default meta
type Story = StoryObj<typeof meta>

const data = [
  { name: "Jan", users: 400, sessions: 240 },
  { name: "Feb", users: 300, sessions: 139 },
  { name: "Mar", users: 600, sessions: 380 },
  { name: "Apr", users: 478, sessions: 390 },
  { name: "May", users: 589, sessions: 480 },
  { name: "Jun", users: 739, sessions: 580 },
]

export const Default: Story = {
  args: {
    data,
    areas: [{ dataKey: "users", label: "Users" }],
  },
}

export const MultiArea: Story = {
  args: {
    data,
    areas: [
      { dataKey: "users", label: "Users" },
      { dataKey: "sessions", label: "Sessions" },
    ],
    showLegend: true,
  },
}

export const Linear: Story = {
  args: {
    data,
    areas: [{ dataKey: "users", label: "Users" }],
    curveType: "linear",
  },
}
