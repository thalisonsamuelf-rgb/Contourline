import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FoundationsPage } from "./foundations-page"

const meta = {
  title: "Pages/FoundationsPage",
  component: FoundationsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FoundationsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
