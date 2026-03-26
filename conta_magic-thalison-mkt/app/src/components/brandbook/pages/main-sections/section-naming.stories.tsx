import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionNaming } from "./section-naming"

const meta = {
  title: "Pages/SectionNaming",
  component: SectionNaming,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionNaming>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
