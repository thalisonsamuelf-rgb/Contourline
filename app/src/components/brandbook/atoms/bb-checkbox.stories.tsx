import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbCheckbox } from "./bb-checkbox"

const meta = {
  title: "Atoms/Brandbook/BbCheckbox",
  component: BbCheckbox,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Texto do rótulo associado ao checkbox",
    },
    checked: {
      control: "boolean",
      description: "Estado marcado do checkbox",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Aceito os termos de uso",
  },
}

export const Marcado: Story = {
  args: {
    label: "Aceito os termos de uso",
    defaultChecked: true,
  },
}

export const SemRotulo: Story = {
  args: {},
}

export const Desabilitado: Story = {
  args: {
    label: "Opção indisponível",
    disabled: true,
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <BbCheckbox label="Receber notificações por e-mail" />
      <BbCheckbox label="Aceitar comunicações de marketing" defaultChecked />
      <BbCheckbox label="Opção desabilitada" disabled />
      <BbCheckbox label="Opção desabilitada e marcada" disabled defaultChecked />
    </div>
  ),
}
