import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LayeringPage } from "./layering-page"

const meta = {
  title: "Pages/LayeringPage",
  component: LayeringPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LayeringPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
