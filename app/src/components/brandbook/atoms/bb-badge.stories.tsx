import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbBadge } from "./bb-badge"

const meta = {
  title: "Atoms/Brandbook/BbBadge",
  component: BbBadge,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["accent", "surface", "error", "blue", "solid"],
      description: "Variante visual do badge",
    },
    children: {
      control: "text",
      description: "Conteúdo do badge",
    },
  },
} satisfies Meta<typeof BbBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "accent",
    children: "Destaque",
  },
}

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Novo",
  },
}

export const Surface: Story = {
  args: {
    variant: "surface",
    children: "Neutro",
  },
}

export const Error: Story = {
  args: {
    variant: "error",
    children: "Erro",
  },
}

export const Blue: Story = {
  args: {
    variant: "blue",
    children: "Informação",
  },
}

export const Solid: Story = {
  args: {
    variant: "solid",
    children: "Ativo",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
      <BbBadge variant="accent">Destaque</BbBadge>
      <BbBadge variant="surface">Neutro</BbBadge>
      <BbBadge variant="error">Erro</BbBadge>
      <BbBadge variant="blue">Informação</BbBadge>
      <BbBadge variant="solid">Ativo</BbBadge>
    </div>
  ),
}
