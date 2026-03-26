import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbTextarea } from "./bb-textarea"

const meta = {
  title: "Atoms/Brandbook/BbTextarea",
  component: BbTextarea,
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
    error: {
      control: "boolean",
      description: "Estado de erro — altera a borda para vermelho",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    rows: {
      control: "number",
      description: "Número de linhas visíveis",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Descreva seu projeto...",
    rows: 4,
  },
}

export const ComConteudo: Story = {
  args: {
    defaultValue: "O AIOX é uma plataforma de orquestração de agentes de IA que transforma a forma como equipes de desenvolvimento trabalham.",
    rows: 4,
  },
}

export const ComErro: Story = {
  args: {
    placeholder: "Descreva seu projeto...",
    error: true,
    rows: 4,
  },
}

export const Desabilitado: Story = {
  args: {
    defaultValue: "Este campo está bloqueado para edição.",
    disabled: true,
    rows: 3,
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <BbTextarea placeholder="Estado padrão" rows={3} />
      <BbTextarea placeholder="Com erro" error rows={3} />
      <BbTextarea defaultValue="Campo desabilitado com conteúdo." disabled rows={3} />
    </div>
  ),
}
