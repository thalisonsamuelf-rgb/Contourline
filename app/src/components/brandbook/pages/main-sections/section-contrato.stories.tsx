import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionContrato } from "./section-contrato"

const meta = {
  title: "Pages/SectionContrato",
  component: SectionContrato,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionContrato>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
