import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MotionPage } from "./motion-page"

const meta = {
  title: "Pages/MotionPage",
  component: MotionPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MotionPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
