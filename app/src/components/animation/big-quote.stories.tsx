import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BigQuote } from "./big-quote"

const meta = {
  title: "Atoms/Animation/BigQuote",
  component: BigQuote,
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#1D1F19" }] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#1D1F19",
          padding: "6rem 2rem",
          maxWidth: "800px",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BigQuote>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    quote:
      "A melhor maneira de prever o futuro é inventá-lo.",
    author: "Alan Kay",
    role: "Cientista da Computação",
  },
}

export const LongQuote: Story = {
  args: {
    quote:
      "Não é sobre substituir pessoas por máquinas. É sobre dar superpoderes para cada pessoa da sua equipe, liberando criatividade e eliminando trabalho repetitivo para que possam focar no que realmente importa: resolver problemas que fazem a diferença.",
    author: "Satya Nadella",
    role: "CEO, Microsoft",
  },
}
