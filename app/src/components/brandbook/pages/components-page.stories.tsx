import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ComponentsPage } from "./components-page"

const meta = {
  title: "Pages/ComponentsPage",
  component: ComponentsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ComponentsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
