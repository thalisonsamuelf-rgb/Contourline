import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BlindsLoader } from "./blinds-loader"

const meta = {
  title: "Atoms/Brandbook Loading/BlindsLoader",
  component: BlindsLoader,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
    docs: {
      description: {
        component: [
          "Loader de tela cheia com overlay verde-lime e animacao de persianas verticais.",
          "",
          "**Fases:**",
          "1. `loading` — Overlay lime com logo AIOX revelado por letra (A → I → O → X) e barra de progresso",
          "2. `blinds` — 8 colunas de persianas retraem de cima para baixo em stagger",
          "3. `done` — Componente desmonta e chama `onComplete`",
          "",
          "**Duracoes:** Loading = 4s, Blinds = ~0.8s + stagger por coluna",
        ].join("\n"),
      },
    },
  },
  argTypes: {
    onComplete: {
      action: "onComplete",
      description: "Callback executado quando a animacao de saida termina",
    },
  },
} satisfies Meta<typeof BlindsLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onComplete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Animacao completa: overlay lime com logo AIOX → persianas retraem → componente desmonta. Dura aproximadamente 5 segundos no total.",
      },
    },
  },
}

export const ComCallback: Story = {
  name: "Com Callback onComplete",
  args: {
    onComplete: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstra o callback `onComplete` sendo acionado ao final da animacao de persianas. Verifique o painel Actions para confirmar o disparo.",
      },
    },
  },
}
