import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GitHubIcon } from "./github"

const meta = {
  title: "Atoms/Icons/GitHub",
  component: GitHubIcon,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "range", min: 16, max: 96, step: 4 },
      description: "Icon size in pixels",
    },
  },
} satisfies Meta<typeof GitHubIcon>

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
