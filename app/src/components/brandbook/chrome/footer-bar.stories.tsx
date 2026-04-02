import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FooterBar } from "./footer-bar"

const meta = {
  title: "Atoms/Brandbook Chrome/FooterBar",
  component: FooterBar,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    left: {
      control: "text",
      description: "Texto do lado esquerdo (obrigatorio)",
    },
    center: {
      control: "text",
      description: "Texto central (opcional)",
    },
    right: {
      control: "text",
      description: "Texto do lado direito (opcional)",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof FooterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    left: "AIOX Squad",
    center: "Sistema de Design",
    right: "v2.0",
  },
}

export const SomenteEsquerda: Story = {
  name: "Somente Esquerda",
  args: {
    left: "AIOX Squad — Brandbook",
  },
}

export const DoisLados: Story = {
  name: "Dois Lados (sem centro)",
  args: {
    left: "Confidencial",
    right: "2025",
  },
}

export const ComPaginacao: Story = {
  name: "Com Paginacao",
  args: {
    left: "Identidade Visual",
    center: "Pagina 01 / 12",
    right: "aioxsquad.ai",
  },
}

export const ComStatus: Story = {
  name: "Com Status do Sistema",
  args: {
    left: "Sistema Operacional",
    center: "Status: Ativo",
    right: "Build #4729",
  },
}

export const Gallery: Story = {
  name: "Galeria — Variacoes de Conteudo",
  parameters: { controls: { disable: true } },
  args: {
    left: "Somente esquerda",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: "600px", border: "1px solid var(--bb-border)" }}>
      <FooterBar left="Somente esquerda" />
      <FooterBar left="Dois lados" right="v1.0" />
      <FooterBar left="Tres colunas" center="Centro" right="Direita" />
      <FooterBar left="AIOX Squad" center="Brandbook Oficial" right="aioxsquad.ai" />
    </div>
  ),
}
