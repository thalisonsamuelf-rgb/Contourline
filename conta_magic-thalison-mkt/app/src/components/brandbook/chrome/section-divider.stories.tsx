import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionDivider } from "./section-divider"

const meta = {
  title: "Atoms/Brandbook Chrome/SectionDivider",
  component: SectionDivider,
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
      description: "Rotulo central do divisor (obrigatorio)",
    },
    concept: {
      control: "text",
      description: "Conceito ou traducao em tom escuro (opcional)",
    },
    num: {
      control: "text",
      description: "Numero da secao em destaque lime (opcional)",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof SectionDivider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Identidade Visual",
    concept: "Visual Identity",
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
    concept: "Color Palette",
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
    label: "Arquitetura de Marca",
    concept: "Brand Architecture",
    num: "07",
  },
}

export const Gallery: Story = {
  name: "Galeria — Variacoes Compostas",
  parameters: { controls: { disable: true } },
  args: {
    label: "Somente Label",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <SectionDivider label="Somente Label" />
      <div style={{ padding: "1rem 0" }} />
      <SectionDivider label="Com Conceito" concept="With Concept" />
      <div style={{ padding: "1rem 0" }} />
      <SectionDivider label="Com Numero" num="02" />
      <div style={{ padding: "1rem 0" }} />
      <SectionDivider label="Missao e Proposito" concept="Mission & Purpose" num="01" />
      <div style={{ padding: "1rem 0" }} />
      <SectionDivider label="Sistema Tipografico" concept="Type System" num="04" />
    </div>
  ),
}
