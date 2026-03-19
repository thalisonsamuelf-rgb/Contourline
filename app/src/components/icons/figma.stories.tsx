import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FigmaIcon } from "./figma"

const meta = {
  title: "Atoms/Icons/Figma",
  component: FigmaIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "range", min: 16, max: 96, step: 4 },
      description: "Icon size in pixels",
    },
  },
} satisfies Meta<typeof FigmaIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: 32,
  },
}

export const Small: Story = {
  args: {
    size: 20,
  },
}

export const Large: Story = {
  args: {
    size: 64,
  },
}
