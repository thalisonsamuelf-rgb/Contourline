import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbKpiGrid } from "./bb-kpi-grid"

const meta = {
  title: "Organisms/Brandbook/BbKpiGrid",
  component: BbKpiGrid,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbKpiGrid>

export default meta
type Story = StoryObj<typeof meta>

const sampleItems = [
  { id: "revenue", label: "Revenue", value: "R$ 1.2M", change: "+12.5%", trend: "up" as const },
  { id: "users", label: "Active Users", value: "8,432", change: "+5.2%", trend: "up" as const },
  { id: "churn", label: "Churn Rate", value: "3.1%", change: "-0.8%", trend: "down" as const },
  { id: "nps", label: "NPS Score", value: "72", change: "0%", trend: "neutral" as const },
  { id: "arpu", label: "ARPU", value: "R$ 142", change: "+8.3%", trend: "up" as const },
  { id: "cac", label: "CAC", value: "R$ 89", change: "-15%", trend: "up" as const },
]

export const Default: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    columns: 4,
  },
}

export const SixCards: Story = {
  args: {
    items: sampleItems,
    columns: 3,
  },
}

export const WithPersistence: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    columns: 4,
    persistOrder: true,
    storageKey: "storybook-kpi-grid-order",
  },
}
