import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbInput } from "./bb-input"

const meta = {
  title: "Atoms/Brandbook/BbInput",
  component: BbInput,
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
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: "Digite seu e-mail",
    type: "email",
  },
}

export const ComErro: Story = {
  args: {
    placeholder: "nome@exemplo.com",
    error: true,
    defaultValue: "email-invalido",
  },
}

export const Desabilitado: Story = {
  args: {
    placeholder: "Campo desabilitado",
    disabled: true,
    defaultValue: "conteúdo bloqueado",
  },
}

export const Senha: Story = {
  args: {
    placeholder: "Digite sua senha",
    type: "password",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ width: "320px", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <BbInput placeholder="Estado padrão" />
      <BbInput placeholder="Com erro" error />
      <BbInput placeholder="Desabilitado" disabled defaultValue="valor bloqueado" />
    </div>
  ),
}
