import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AdvancedPage } from "./advanced-page"

const meta = {
  title: "Pages/AdvancedPage",
  component: AdvancedPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AdvancedPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
