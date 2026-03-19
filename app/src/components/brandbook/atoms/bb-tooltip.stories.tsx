import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbTooltip } from "./bb-tooltip"
import { BbButton } from "./bb-button"

const meta = {
  title: "Atoms/Brandbook/BbTooltip",
  component: BbTooltip,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    position: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
      description: "Posição do tooltip em relação ao elemento",
    },
    content: {
      control: "text",
      description: "Conteúdo exibido no tooltip",
    },
  },
} satisfies Meta<typeof BbTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    content: "Clique para confirmar a ação",
    position: "top",
    children: <BbButton variant="primary">Passar o mouse aqui</BbButton>,
  },
}

export const AcimaDoElemento: Story = {
  args: {
    content: "Informação acima",
    position: "top",
    children: <BbButton variant="secondary">Acima</BbButton>,
  },
}

export const AbaixoDoElemento: Story = {
  args: {
    content: "Informação abaixo",
    position: "bottom",
    children: <BbButton variant="secondary">Abaixo</BbButton>,
  },
}

export const EsquerdaDoElemento: Story = {
  args: {
    content: "Informação à esquerda",
    position: "left",
    children: <BbButton variant="secondary">Esquerda</BbButton>,
  },
}

export const DireitaDoElemento: Story = {
  args: {
    content: "Informação à direita",
    position: "right",
    children: <BbButton variant="secondary">Direita</BbButton>,
  },
}

export const Galeria: Story = {
  args: {
    content: "Posição: acima",
    position: "top",
    children: <BbButton variant="secondary" size="sm">Cima</BbButton>,
  },
  render: () => (
    <div style={{ display: "flex", gap: "2rem", alignItems: "center", padding: "4rem" }}>
      <BbTooltip content="Posição: acima" position="top">
        <BbButton variant="secondary" size="sm">Cima</BbButton>
      </BbTooltip>
      <BbTooltip content="Posição: abaixo" position="bottom">
        <BbButton variant="secondary" size="sm">Baixo</BbButton>
      </BbTooltip>
      <BbTooltip content="Posição: esquerda" position="left">
        <BbButton variant="secondary" size="sm">Esquerda</BbButton>
      </BbTooltip>
      <BbTooltip content="Posição: direita" position="right">
        <BbButton variant="secondary" size="sm">Direita</BbButton>
      </BbTooltip>
    </div>
  ),
}
