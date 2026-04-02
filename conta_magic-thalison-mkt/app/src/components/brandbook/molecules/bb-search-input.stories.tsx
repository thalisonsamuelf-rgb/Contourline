import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbSearchInput } from "./bb-search-input"

const meta = {
  title: "Molecules/Brandbook/BbSearchInput",
  component: BbSearchInput,
  args: {
    placeholder: "Buscar componentes...",
    onChange: fn(),
  },
} satisfies Meta<typeof BbSearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const PlaceholderCustomizado: Story = {
  args: {
    placeholder: "Buscar stories, epics ou agentes...",
    onChange: fn(),
  },
}

export const ComValorInicial: Story = {
  args: {
    defaultValue: "bb-button",
    placeholder: "Buscar componentes...",
    onChange: fn(),
  },
}

export const LarguraTotal: Story = {
  args: {
    placeholder: "Pesquisar na documentacao...",
    style: { width: "100%" },
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 480 }}>
        <Story />
      </div>
    ),
  ],
}

export const Desabilitado: Story = {
  args: {
    placeholder: "Busca indisponivel no momento",
    disabled: true,
    onChange: fn(),
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 400 }}>
      <BbSearchInput placeholder="Buscar componentes..." onChange={fn()} />
      <BbSearchInput placeholder="Buscar na documentacao..." onChange={fn()} />
      <BbSearchInput defaultValue="bb-alert" placeholder="Buscar componentes..." onChange={fn()} />
      <BbSearchInput placeholder="Busca desabilitada" disabled onChange={fn()} />
    </div>
  ),
}
