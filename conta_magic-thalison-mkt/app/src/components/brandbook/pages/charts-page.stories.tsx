import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ChartsPage } from "./charts-page"

const meta = {
  title: "Pages/ChartsPage",
  component: ChartsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChartsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
