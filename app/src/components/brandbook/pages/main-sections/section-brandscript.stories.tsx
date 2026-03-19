import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionBrandscript } from "./section-brandscript"

const meta = {
  title: "Pages/SectionBrandscript",
  component: SectionBrandscript,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionBrandscript>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
