import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PageHeader } from "./page-header"

const meta = {
  title: "Atoms/Brandbook Chrome/PageHeader",
  component: PageHeader,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    navLeft: {
      control: "text",
      description: "Texto esquerdo da barra de navegacao",
    },
    navCenter: {
      control: "text",
      description: "Texto central da barra de navegacao",
    },
    navRight: {
      control: "text",
      description: "Texto direito da barra de navegacao",
    },
    title: {
      control: "text",
      description: "Titulo principal da pagina (ReactNode)",
    },
    subtitle: {
      control: "text",
      description: "Subtitulo abaixo do titulo",
    },
    footerLeft: {
      control: "text",
      description: "Texto esquerdo do rodape do header",
    },
    footerCenter: {
      control: "text",
      description: "Texto central do rodape (destaque em lime)",
    },
    footerRight: {
      control: "text",
      description: "Texto direito do rodape do header",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof PageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    navLeft: "AIOX Squad",
    navCenter: "Brandbook",
    navRight: "v2.0",
    title: "Identidade Visual",
    subtitle: "Expressao visual da marca — cores, tipografia e forma",
    footerLeft: "Capitulo 01",
    footerCenter: "Sistema de Design",
    footerRight: "aioxsquad.ai",
  },
}

export const SomenteTitulo: Story = {
  name: "Somente Titulo",
  args: {
    title: "Missao",
  },
}

export const ComSubtitulo: Story = {
  name: "Com Subtitulo",
  args: {
    title: "Valores da Marca",
    subtitle: "Os principios que guiam cada decisao criativa e estrategica",
  },
}

export const NavCompleta: Story = {
  name: "Com Navegacao Completa",
  args: {
    navLeft: "AIOX Squad",
    navCenter: "Brandbook Oficial 2025",
    navRight: "Confidencial",
    title: "Tipografia",
    subtitle: "Sistema tipografico baseado em contraste e hierarquia visual",
  },
}

export const RodapeCompleto: Story = {
  name: "Com Rodape Completo",
  args: {
    title: "Paleta de Cores",
    subtitle: "Cores primarias, secundarias e tons de suporte",
    footerLeft: "Secao 03",
    footerCenter: "Cores Oficiais",
    footerRight: "2025",
  },
}

export const TituloCurto: Story = {
  name: "Titulo como ReactNode",
  args: {
    navLeft: "AIOX",
    navRight: "Squad",
    title: (
      <span>
        <span style={{ color: "var(--bb-accent)" }}>AI</span>OX
      </span>
    ),
    subtitle: "Artificial Intelligence Orchestration Experience",
    footerLeft: "Brandbook",
    footerCenter: "Pagina Principal",
    footerRight: "aioxsquad.ai",
  },
}

export const Gallery: Story = {
  name: "Galeria — Variacoes de Densidade",
  parameters: { controls: { disable: true } },
  args: {
    title: "Minimo",
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <PageHeader title="Minimo" />
      <PageHeader
        navLeft="Nav Esquerda"
        navRight="Nav Direita"
        title="Com Navegacao"
        subtitle="Subtitulo descritivo"
      />
      <PageHeader
        navLeft="AIOX Squad"
        navCenter="Brandbook"
        navRight="v2.0"
        title="Header Completo"
        subtitle="Todos os slots preenchidos para maxima densidade de informacao"
        footerLeft="Capitulo 01"
        footerCenter="Ativo"
        footerRight="2025"
      />
    </div>
  ),
}
