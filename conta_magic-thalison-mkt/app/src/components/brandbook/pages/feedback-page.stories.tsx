import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FeedbackPage } from "./feedback-page"

const meta = {
  title: "Pages/FeedbackPage",
  component: FeedbackPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeedbackPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
