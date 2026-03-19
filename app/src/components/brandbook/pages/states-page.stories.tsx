import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StatesPage } from "./states-page"

const meta = {
  title: "Pages/StatesPage",
  component: StatesPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof StatesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
