import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbProgress } from "./bb-progress"

const meta = {
  title: "Atoms/Brandbook/BbProgress",
  component: BbProgress,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Valor atual do progresso",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Valor máximo do progresso",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Espessura da barra de progresso",
    },
  },
} satisfies Meta<typeof BbProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    size: "md",
  },
}

export const Vazio: Story = {
  args: {
    value: 0,
    size: "md",
  },
}

export const Completo: Story = {
  args: {
    value: 100,
    size: "md",
  },
}

export const Fino: Story = {
  args: {
    value: 45,
    size: "sm",
  },
}

export const Grosso: Story = {
  args: {
    value: 75,
    size: "lg",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pequeno — 25%</p>
        <BbProgress value={25} size="sm" />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Médio — 60%</p>
        <BbProgress value={60} size="md" />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Grande — 90%</p>
        <BbProgress value={90} size="lg" />
      </div>
    </div>
  ),
}
