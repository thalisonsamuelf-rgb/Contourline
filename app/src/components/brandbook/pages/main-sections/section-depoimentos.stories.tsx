import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionDepoimentos } from "./section-depoimentos"

const meta = {
  title: "Pages/SectionDepoimentos",
  component: SectionDepoimentos,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionDepoimentos>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
