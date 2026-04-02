import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbRadio } from "./bb-radio"

const meta = {
  title: "Atoms/Brandbook/BbRadio",
  component: BbRadio,
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
      description: "Texto do rótulo associado ao radio",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbRadio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Plano mensal",
    name: "plano",
  },
}

export const Selecionado: Story = {
  args: {
    label: "Plano anual",
    name: "plano",
    defaultChecked: true,
  },
}

export const SemRotulo: Story = {
  args: {
    name: "opcao",
  },
}

export const Desabilitado: Story = {
  args: {
    label: "Opção indisponível",
    name: "opcao",
    disabled: true,
  },
}

export const Grupo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <BbRadio name="plano" label="Plano básico — Grátis" defaultChecked />
      <BbRadio name="plano" label="Plano profissional — R$ 49/mês" />
      <BbRadio name="plano" label="Plano empresarial — R$ 199/mês" />
      <BbRadio name="plano" label="Plano personalizado — Indisponível" disabled />
    </div>
  ),
}
