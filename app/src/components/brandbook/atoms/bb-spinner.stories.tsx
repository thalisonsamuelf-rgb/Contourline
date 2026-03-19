import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSpinner } from "./bb-spinner"

const meta = {
  title: "Atoms/Brandbook/BbSpinner",
  component: BbSpinner,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do spinner",
    },
  },
} satisfies Meta<typeof BbSpinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "md",
  },
}

export const Pequeno: Story = {
  args: {
    size: "sm",
  },
}

export const Grande: Story = {
  args: {
    size: "lg",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <BbSpinner size="sm" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pequeno</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <BbSpinner size="md" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Médio</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
        <BbSpinner size="lg" />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Grande</span>
      </div>
    </div>
  ),
}
