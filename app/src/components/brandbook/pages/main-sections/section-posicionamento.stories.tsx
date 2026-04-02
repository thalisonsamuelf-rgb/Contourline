import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionPosicionamento } from "./section-posicionamento"

const meta = {
  title: "Pages/SectionPosicionamento",
  component: SectionPosicionamento,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionPosicionamento>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
