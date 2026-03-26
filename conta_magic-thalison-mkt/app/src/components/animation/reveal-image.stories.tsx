import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { RevealImage } from "./reveal-image"

const meta = {
  title: "Atoms/Animation/RevealImage",
  component: RevealImage,
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
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    direction: {
      control: { type: "select" },
      options: ["left", "right", "up"],
    },
  },
} satisfies Meta<typeof RevealImage>

export default meta
type Story = StoryObj<typeof meta>

const PLACEHOLDER_IMAGE = "https://placehold.co/800x500/1D1F19/D1FF00?text=AIOX"

export const Default: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: "Imagem demonstrando a animacao de revelacao da esquerda",
    className: "h-[300px] w-[500px] rounded-lg",
    direction: "left",
  },
}

export const FromRight: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: "Imagem demonstrando a animacao de revelacao da direita",
    className: "h-[300px] w-[500px] rounded-lg",
    direction: "right",
  },
}

export const FromUp: Story = {
  args: {
    src: PLACEHOLDER_IMAGE,
    alt: "Imagem demonstrando a animacao de revelacao de baixo para cima",
    className: "h-[300px] w-[500px] rounded-lg",
    direction: "up",
  },
}
