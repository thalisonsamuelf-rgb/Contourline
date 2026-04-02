import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionTruelines } from "./section-truelines"

const meta = {
  title: "Pages/SectionTruelines",
  component: SectionTruelines,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionTruelines>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
