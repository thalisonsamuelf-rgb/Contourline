import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TemplatesShowcasePage } from "./templates-showcase-page"

const meta = {
  title: "Pages/TemplatesShowcasePage",
  component: TemplatesShowcasePage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof TemplatesShowcasePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
