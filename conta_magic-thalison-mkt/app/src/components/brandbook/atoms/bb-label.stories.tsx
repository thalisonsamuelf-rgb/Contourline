import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbLabel } from "./bb-label"

const meta = {
  title: "Atoms/Brandbook/BbLabel",
  component: BbLabel,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    required: {
      control: "boolean",
      description: "Exibe asterisco de campo obrigatório",
    },
    children: {
      control: "text",
      description: "Texto do rótulo",
    },
  },
} satisfies Meta<typeof BbLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Nome completo",
  },
}

export const Obrigatorio: Story = {
  args: {
    children: "E-mail",
    required: true,
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <BbLabel>Nome completo</BbLabel>
      <BbLabel required>E-mail</BbLabel>
      <BbLabel required>Senha</BbLabel>
      <BbLabel>Empresa (opcional)</BbLabel>
    </div>
  ),
}
