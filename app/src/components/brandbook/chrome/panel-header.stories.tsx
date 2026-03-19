import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PanelHeader } from "./panel-header"

const meta = {
  title: "Atoms/Brandbook Chrome/PanelHeader",
  component: PanelHeader,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Rotulo principal do painel (obrigatorio)",
    },
    concept: {
      control: "text",
      description: "Conceito ou descricao secundaria (opcional)",
    },
    num: {
      control: "text",
      description: "Numero ou identificador em destaque lime (opcional)",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof PanelHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Identidade Visual",
    concept: "Brand Identity",
    num: "01",
  },
}

export const SomenteLabel: Story = {
  name: "Somente Label",
  args: {
    label: "Tipografia",
  },
}

export const ComConceito: Story = {
  name: "Com Conceito",
  args: {
    label: "Paleta de Cores",
    concept: "Color System",
  },
}

export const ComNumero: Story = {
  name: "Com Numero de Secao",
  args: {
    label: "Valores da Marca",
    num: "03",
  },
}

export const Completo: Story = {
  name: "Completo — Label, Conceito e Numero",
  args: {
    label: "Arquitetura Visual",
    concept: "Visual Architecture",
    num: "07",
  },
}

export const Gallery: Story = {
  name: "Galeria — Variacoes de Slots",
  parameters: { controls: { disable: true } },
  args: {
    label: "Somente Label",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: "600px" }}>
      <PanelHeader label="Somente Label" />
      <PanelHeader label="Com Conceito" concept="With Concept" />
      <PanelHeader label="Com Numero" num="02" />
      <PanelHeader label="Completo" concept="Full Variant" num="04" />
      <PanelHeader label="Missao e Proposito" concept="Mission & Purpose" num="01" />
    </div>
  ),
}
