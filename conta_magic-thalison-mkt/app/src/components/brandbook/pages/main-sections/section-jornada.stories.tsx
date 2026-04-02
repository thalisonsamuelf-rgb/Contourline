import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionJornada } from "./section-jornada"

const meta = {
  title: "Pages/SectionJornada",
  component: SectionJornada,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionJornada>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
