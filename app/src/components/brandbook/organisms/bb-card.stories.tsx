import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbCard } from "./bb-card"

const meta = {
  title: "Organisms/Brandbook/BbCard",
  component: BbCard,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Design Tokens",
    subtitle: "Core visual primitives",
    children: "Card body content goes here.",
  },
}
