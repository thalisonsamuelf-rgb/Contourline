import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GrainOverlay } from "./grain-overlay"

const meta = {
  title: "Atoms/Effects/GrainOverlay",
  component: GrainOverlay,
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0a0a" },
        { name: "surface", value: "#111113" },
      ],
    },
  },
  argTypes: {
    opacity: {
      control: { type: "range", min: 0, max: 0.3, step: 0.01 },
      description: "Opacidade do efeito de grao (0 = invisivel, 0.3 = muito intenso)",
    },
  },
  decorators: [
    (Story) => (
      <div
        className="relative w-full h-screen flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <div className="z-10 flex flex-col items-center gap-2">
          <p className="text-white font-mono text-xs uppercase tracking-widest opacity-60">
            Fundo com efeito de grao
          </p>
          <p className="text-white text-2xl font-bold">AIOX</p>
        </div>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GrainOverlay>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Padrao (0.04)",
  args: {
    opacity: 0.04,
  },
}

export const LowOpacity: Story = {
  name: "Baixa Opacidade (0.03)",
  args: {
    opacity: 0.03,
  },
}

export const HighOpacity: Story = {
  name: "Alta Opacidade (0.15)",
  args: {
    opacity: 0.15,
  },
}

export const Invisible: Story = {
  name: "Invisivel (0)",
  args: {
    opacity: 0,
  },
}

export const Maximum: Story = {
  name: "Maximo (0.3)",
  args: {
    opacity: 0.3,
  },
}
