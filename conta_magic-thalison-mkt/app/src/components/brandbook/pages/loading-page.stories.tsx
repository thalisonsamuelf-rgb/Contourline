import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LoadingPage } from "./loading-page"

const meta = {
  title: "Pages/LoadingPage",
  component: LoadingPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoadingPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
