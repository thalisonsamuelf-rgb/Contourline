import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ScrollReveal } from "./scroll-reveal"

const meta = {
  title: "Atoms/Brandbook Chrome/ScrollReveal",
  component: ScrollReveal,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
    docs: {
      description: {
        component:
          "Wrapper de animacao que revela o conteudo ao entrar na viewport. Utiliza Framer Motion com suporte a quatro direcoes de entrada e configuracao de delay e duracao.",
      },
    },
  },
  argTypes: {
    direction: {
      control: "select",
      options: ["up", "left", "right", "scale"],
      description: "Direcao de entrada da animacao",
    },
    delay: {
      control: { type: "range", min: 0, max: 2, step: 0.1 },
      description: "Atraso antes de iniciar a animacao (segundos)",
    },
    duration: {
      control: { type: "range", min: 0.2, max: 2, step: 0.1 },
      description: "Duracao total da animacao (segundos)",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof ScrollReveal>

export default meta
type Story = StoryObj<typeof meta>

const ExemploConteudo = () => (
  <div
    style={{
      padding: "2rem",
      border: "1px solid var(--bb-border)",
      background: "var(--bb-dark)",
      color: "var(--bb-cream)",
      fontFamily: "var(--font-bb-mono)",
      fontSize: "0.75rem",
      textTransform: "uppercase",
      letterSpacing: "0.08em",
    }}
  >
    Conteudo revelado pela animacao
  </div>
)

export const Default: Story = {
  args: {
    direction: "up",
    delay: 0,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
}

export const DeCima: Story = {
  name: "De Baixo para Cima (up)",
  args: {
    direction: "up",
    delay: 0,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
}

export const DaEsquerda: Story = {
  name: "Da Esquerda para Direita (left)",
  args: {
    direction: "left",
    delay: 0,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
}

export const DaDireita: Story = {
  name: "Da Direita para Esquerda (right)",
  args: {
    direction: "right",
    delay: 0,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
}

export const Escala: Story = {
  name: "Escala (scale)",
  args: {
    direction: "scale",
    delay: 0,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
}

export const ComAtraso: Story = {
  name: "Com Atraso de 0.5s",
  args: {
    direction: "up",
    delay: 0.5,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
}

export const Gallery: Story = {
  name: "Galeria — Todas as Direcoes",
  parameters: { controls: { disable: true } },
  args: {
    direction: "up",
    delay: 0,
    duration: 0.7,
    children: <ExemploConteudo />,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {(["up", "left", "right", "scale"] as const).map((dir, i) => (
        <ScrollReveal key={dir} direction={dir} delay={i * 0.15}>
          <div
            style={{
              padding: "1rem 1.5rem",
              border: "1px solid var(--bb-border)",
              background: "var(--bb-dark)",
              color: "var(--bb-cream)",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Direction: {dir}</span>
            <span style={{ color: "var(--bb-accent)" }}>Delay: {(i * 0.15).toFixed(2)}s</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  ),
}
