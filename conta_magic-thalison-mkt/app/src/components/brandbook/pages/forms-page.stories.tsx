import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FormsPage } from "./forms-page"

const meta = {
  title: "Pages/FormsPage",
  component: FormsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FormsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
