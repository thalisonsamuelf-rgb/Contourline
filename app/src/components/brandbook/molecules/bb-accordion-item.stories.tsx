import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbAccordionItem } from "./bb-accordion-item"

const meta = {
  title: "Molecules/Brandbook/BbAccordionItem",
  component: BbAccordionItem,
  args: {
    title: "O que e o AIOX?",
    children: "AIOX e um sistema de orquestracao de inteligencia artificial para desenvolvimento full stack. Ele conecta agentes especializados para entregar software com qualidade e velocidade.",
  },
} satisfies Meta<typeof BbAccordionItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Aberto: Story = {
  args: {
    title: "Missao do AIOX",
    defaultOpen: true,
    children: "Devolver as pessoas o poder de criar. O AIOX orquestra agentes de IA para que times pequenos construam produtos grandes.",
  },
}

export const ComIcone: Story = {
  args: {
    title: "Arquitetura do sistema",
    defaultOpen: false,
    icon: <span style={{ fontSize: "0.75rem" }}>⬡</span>,
    children: "O sistema utiliza uma arquitetura de agentes especializados, cada um com autoridade sobre seu dominio. Os agentes se comunicam por meio de handoffs estruturados.",
  },
}

export const AbertoComIcone: Story = {
  args: {
    title: "Principios da Constitution",
    defaultOpen: true,
    icon: <span style={{ fontSize: "0.75rem" }}>§</span>,
    children: "CLI First, Agent Authority, Story-Driven Development, No Invention, Quality First, Absolute Imports. Esses sao os seis principios inegociaveis que regem toda a plataforma.",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <BbAccordionItem title="Principios de design">
        Tipografia mono, paleta escura, espaçamento rigoroso. O brandbook documenta cada decisao visual da identidade AIOX.
      </BbAccordionItem>
      <BbAccordionItem title="Voz e tom" defaultOpen>
        Direto, tecnico, sem enrolacao. A voz da marca e de quem sabe o que esta fazendo e respeita o tempo de quem le.
      </BbAccordionItem>
      <BbAccordionItem title="Arquitetura de agentes">
        Dez agentes especializados, cada um com escopo exclusivo. Juntos formam o orquestrador completo do ciclo de desenvolvimento.
      </BbAccordionItem>
    </div>
  ),
}
