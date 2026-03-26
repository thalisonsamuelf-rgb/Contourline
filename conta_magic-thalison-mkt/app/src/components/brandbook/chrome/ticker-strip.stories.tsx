import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TickerStrip } from "./ticker-strip"

const meta = {
  title: "Atoms/Brandbook Chrome/TickerStrip",
  component: TickerStrip,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
    docs: {
      description: {
        component:
          "Faixa de ticker horizontal com animacao de rolagem infinita. Os itens sao separados por travessoes e duplicados para criar o efeito de loop continuo. A velocidade e configuravel em segundos por ciclo.",
      },
    },
  },
  argTypes: {
    items: {
      control: "object",
      description: "Lista de textos exibidos no ticker",
    },
    speed: {
      control: { type: "range", min: 5, max: 120, step: 5 },
      description: "Velocidade do ticker em segundos por ciclo (menor = mais rapido)",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof TickerStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      "Identidade Visual",
      "Tipografia",
      "Paleta de Cores",
      "Principios de Design",
      "Voz da Marca",
      "AIOX Squad",
    ],
    speed: 30,
  },
}

export const Rapido: Story = {
  name: "Rapido (speed: 10)",
  args: {
    items: [
      "Autonomia Radical",
      "Controle nas Maos do Criador",
      "AI Orquestrado",
      "Full Stack",
    ],
    speed: 10,
  },
}

export const Lento: Story = {
  name: "Lento (speed: 60)",
  args: {
    items: [
      "AIOX Squad",
      "Artificial Intelligence Orchestration Experience",
      "aioxsquad.ai",
    ],
    speed: 60,
  },
}

export const MarcaEValores: Story = {
  name: "Valores da Marca",
  args: {
    items: [
      "Outlaw",
      "Magician",
      "Explorer",
      "Agora o Controle e Seu",
      "Devolver o Poder de Criar",
    ],
    speed: 25,
  },
}

export const ManifestoTecnico: Story = {
  name: "Manifesto Tecnico",
  args: {
    items: [
      "CLI First",
      "Agent Authority",
      "Story-Driven Development",
      "No Invention",
      "Quality First",
      "Absolute Imports",
    ],
    speed: 35,
  },
}

export const Gallery: Story = {
  name: "Galeria — Variacoes de Velocidade",
  parameters: { controls: { disable: true } },
  args: {
    items: ["Rapido", "Speed: 10", "Animacao Intensa"],
    speed: 10,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <TickerStrip items={["Rapido", "Speed: 10", "Animacao Intensa"]} speed={10} />
      <div style={{ padding: "0.5rem 0" }} />
      <TickerStrip
        items={["Padrao", "Speed: 30", "AIOX Squad", "Brandbook"]}
        speed={30}
      />
      <div style={{ padding: "0.5rem 0" }} />
      <TickerStrip
        items={["Lento", "Speed: 60", "Artificial Intelligence Orchestration Experience"]}
        speed={60}
      />
    </div>
  ),
}
