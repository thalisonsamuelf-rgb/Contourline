import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbHint } from "./bb-hint"

const meta = {
  title: "Atoms/Brandbook/BbHint",
  component: BbHint,
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
      options: ["default", "error", "success"],
      description: "Variante visual da dica de texto",
    },
    children: {
      control: "text",
      description: "Conteúdo da dica",
    },
  },
} satisfies Meta<typeof BbHint>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "default",
    children: "Use letras, números e caracteres especiais.",
  },
}

export const Erro: Story = {
  args: {
    variant: "error",
    children: "Este campo é obrigatório.",
  },
}

export const Sucesso: Story = {
  args: {
    variant: "success",
    children: "Informação salva com sucesso.",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <BbHint variant="default">Use pelo menos 8 caracteres.</BbHint>
      <BbHint variant="error">Senha inválida. Tente novamente.</BbHint>
      <BbHint variant="success">Senha forte! Cadastro realizado.</BbHint>
    </div>
  ),
}
