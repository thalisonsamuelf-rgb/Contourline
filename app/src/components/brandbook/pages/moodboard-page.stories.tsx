import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MoodboardPage } from "./moodboard-page"

const meta = {
  title: "Pages/MoodboardPage",
  component: MoodboardPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MoodboardPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
