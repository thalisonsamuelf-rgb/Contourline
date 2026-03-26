import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ListsPage } from "./lists-page"

const meta = {
  title: "Pages/ListsPage",
  component: ListsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ListsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
