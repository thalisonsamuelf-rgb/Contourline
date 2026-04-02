import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbLoadingOverlay } from "./bb-loading-overlay"

const meta = {
  title: "Molecules/Brandbook/BbLoadingOverlay",
  component: BbLoadingOverlay,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbLoadingOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <BbLoadingOverlay {...args}>
      <div
        style={{
          height: "200px",
          padding: "2rem",
          background: "var(--black, #050505)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
        }}
      >
        Conteúdo abaixo do overlay
      </div>
    </BbLoadingOverlay>
  ),
}

export const WithMessage: Story = {
  args: {
    loading: true,
    message: "Processando dados...",
  },
  render: (args) => (
    <BbLoadingOverlay {...args}>
      <div
        style={{
          height: "200px",
          padding: "2rem",
          background: "var(--black, #050505)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
        }}
      >
        Conteúdo abaixo do overlay
      </div>
    </BbLoadingOverlay>
  ),
}

export const NotLoading: Story = {
  args: {
    loading: false,
  },
  render: (args) => (
    <BbLoadingOverlay {...args}>
      <div
        style={{
          height: "200px",
          padding: "2rem",
          background: "var(--black, #050505)",
          border: "1px solid var(--border)",
          color: "var(--cream)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
        }}
      >
        Conteúdo visível (sem overlay)
      </div>
    </BbLoadingOverlay>
  ),
}
