import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSkeleton } from "./bb-skeleton"

const meta = {
  title: "Atoms/Brandbook/BbSkeleton",
  component: BbSkeleton,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    width: {
      control: "text",
      description: "Largura do skeleton (CSS ou número em px)",
    },
    height: {
      control: "number",
      description: "Altura do skeleton em px",
    },
    rounded: {
      control: "boolean",
      description: "Forma circular (para avatares)",
    },
  },
} satisfies Meta<typeof BbSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: "240px",
    height: 16,
  },
}

export const Linha: Story = {
  args: {
    width: "180px",
    height: 12,
  },
}

export const Bloco: Story = {
  args: {
    width: "320px",
    height: 80,
  },
}

export const Avatar: Story = {
  args: {
    width: 48,
    height: 48,
    rounded: true,
  },
}

export const CardSimulado: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "0.75rem", padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <BbSkeleton width={40} height={40} rounded />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <BbSkeleton width="60%" height={12} />
          <BbSkeleton width="40%" height={10} />
        </div>
      </div>
      <BbSkeleton width="100%" height={12} />
      <BbSkeleton width="85%" height={12} />
      <BbSkeleton width="70%" height={12} />
    </div>
  ),
}
