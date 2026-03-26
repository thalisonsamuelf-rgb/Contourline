import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { IconsPage } from "./icons-page"

const meta = {
  title: "Pages/IconsPage",
  component: IconsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof IconsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
