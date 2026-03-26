import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionVisual } from "./section-visual"

const meta = {
  title: "Pages/SectionVisual",
  component: SectionVisual,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionVisual>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
