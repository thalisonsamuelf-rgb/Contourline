import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbSelect } from "./bb-select"

const meta = {
  title: "Atoms/Brandbook/BbSelect",
  component: BbSelect,
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
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <>
        <option value="">Selecione um plano</option>
        <option value="basico">Básico</option>
        <option value="profissional">Profissional</option>
        <option value="empresarial">Empresarial</option>
      </>
    ),
  },
}

export const ComValorSelecionado: Story = {
  args: {
    defaultValue: "profissional",
    children: (
      <>
        <option value="basico">Básico</option>
        <option value="profissional">Profissional</option>
        <option value="empresarial">Empresarial</option>
      </>
    ),
  },
}

export const Paises: Story = {
  args: {
    children: (
      <>
        <option value="">Selecione um país</option>
        <option value="br">Brasil</option>
        <option value="pt">Portugal</option>
        <option value="us">Estados Unidos</option>
        <option value="ar">Argentina</option>
      </>
    ),
  },
}
