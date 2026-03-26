import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbButton } from "./bb-button"

const meta = {
  title: "Atoms/Brandbook/BbButton",
  component: BbButton,
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
      options: ["primary", "secondary", "ghost", "destructive"],
      description: "Variante visual do botão",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Tamanho do botão",
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
  },
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof BbButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Confirmar",
  },
}

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Começar agora",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Saiba mais",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "md",
    children: "Cancelar",
  },
}

export const Destructive: Story = {
  args: {
    variant: "destructive",
    size: "md",
    children: "Excluir",
  },
}

export const Pequeno: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Pequeno",
  },
}

export const Grande: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Grande",
  },
}

export const Carregando: Story = {
  args: {
    variant: "primary",
    size: "md",
    loading: true,
    children: "Enviando",
  },
}

export const Desabilitado: Story = {
  args: {
    variant: "primary",
    size: "md",
    disabled: true,
    children: "Indisponível",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
      <BbButton variant="primary">Primário</BbButton>
      <BbButton variant="secondary">Secundário</BbButton>
      <BbButton variant="ghost">Ghost</BbButton>
      <BbButton variant="destructive">Destrutivo</BbButton>
      <BbButton variant="primary" loading>Carregando</BbButton>
      <BbButton variant="primary" disabled>Desabilitado</BbButton>
    </div>
  ),
}

export const Tamanhos: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <BbButton variant="primary" size="sm">Pequeno</BbButton>
      <BbButton variant="primary" size="md">Médio</BbButton>
      <BbButton variant="primary" size="lg">Grande</BbButton>
    </div>
  ),
}
