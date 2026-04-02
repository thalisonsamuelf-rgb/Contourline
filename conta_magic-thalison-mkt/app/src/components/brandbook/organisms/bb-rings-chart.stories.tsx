import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbRingsChart } from "./bb-rings-chart"

const meta = {
  title: "Organisms/Brandbook/BbRingsChart",
  component: BbRingsChart,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbRingsChart>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    rings: [
      { label: "Automação", value: 85, maxValue: 100 },
      { label: "Integração", value: 62, maxValue: 100 },
      { label: "Adoção", value: 45, maxValue: 100 },
    ],
  },
}

export const TwoRings: Story = {
  args: {
    rings: [
      { label: "Concluído", value: 73, maxValue: 100 },
      { label: "Em progresso", value: 41, maxValue: 100 },
    ],
    size: 160,
  },
}

export const CustomColors: Story = {
  args: {
    rings: [
      { label: "Revenue", value: 92, maxValue: 100, color: "var(--bb-chart-2)" },
      { label: "Profit", value: 67, maxValue: 100, color: "var(--bb-chart-5)" },
      { label: "Growth", value: 38, maxValue: 100, color: "var(--bb-chart-4)" },
    ],
    size: 220,
    strokeWidth: 16,
  },
}
