import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { H2GradientReveal } from "./h2-gradient-reveal"

const meta = {
  title: "Atoms/Animation/H2GradientReveal",
  component: H2GradientReveal,
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
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    as: {
      control: { type: "select" },
      options: ["h1", "h2", "h3"],
    },
  },
} satisfies Meta<typeof H2GradientReveal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Transformando ideias em experiências digitais",
  },
}

export const AsH1: Story = {
  args: {
    children: "O futuro da inteligência artificial",
    as: "h1",
  },
}

export const AsH3: Story = {
  args: {
    children: "Soluções que escalam com você",
    as: "h3",
  },
}
