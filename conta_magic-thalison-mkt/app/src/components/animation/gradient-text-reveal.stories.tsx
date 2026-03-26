import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GradientTextReveal } from "./gradient-text-reveal"

const meta = {
  title: "Atoms/Animation/GradientTextReveal",
  component: GradientTextReveal,
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#1D1F19" }] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#1D1F19",
          padding: "4rem 2rem",
          maxWidth: "640px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    delay: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
  },
} satisfies Meta<typeof GradientTextReveal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children:
      "Construímos plataformas inteligentes que conectam pessoas, dados e decisões em tempo real.",
  },
}

export const WithDelay: Story = {
  args: {
    children:
      "Cada palavra aparece com um atraso sutil, criando uma experiência de leitura envolvente.",
    delay: 0.5,
  },
}

export const LongText: Story = {
  args: {
    children:
      "A inteligência artificial não é apenas uma tecnologia, é uma nova forma de pensar sobre problemas complexos. Nossa plataforma integra modelos de linguagem, automação de processos e análise de dados para entregar resultados que antes pareciam impossíveis. Cada interação gera aprendizado, cada decisão é potencializada por dados, e cada equipe ganha superpoderes digitais que transformam a maneira como trabalham.",
  },
}
