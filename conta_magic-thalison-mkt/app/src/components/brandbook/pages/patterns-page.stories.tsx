import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PatternsPage } from "./patterns-page"

const meta = {
  title: "Pages/PatternsPage",
  component: PatternsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof PatternsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
