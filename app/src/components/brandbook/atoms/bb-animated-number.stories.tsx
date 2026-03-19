import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbAnimatedNumber } from "./bb-animated-number"

const meta = {
  title: "Atoms/Brandbook/BbAnimatedNumber",
  component: BbAnimatedNumber,
  parameters: { layout: "centered" },
} satisfies Meta<typeof BbAnimatedNumber>

export default meta
type Story = StoryObj<typeof meta>

export const Integer: Story = {
  args: { value: 1234, triggerOnView: true },
}

export const Decimal: Story = {
  args: {
    value: 99.7,
    format: (n) => n.toFixed(1),
    triggerOnView: true,
  },
}

export const Currency: Story = {
  args: {
    value: 49900,
    prefix: "R$ ",
    format: (n) => Math.round(n).toLocaleString("pt-BR"),
    triggerOnView: true,
  },
}

export const Percentage: Story = {
  args: {
    value: 87.3,
    suffix: "%",
    format: (n) => n.toFixed(1),
    triggerOnView: true,
  },
}
