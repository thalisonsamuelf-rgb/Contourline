import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ColorTokensPage } from "./color-tokens-page"

const meta = {
  title: "Pages/ColorTokensPage",
  component: ColorTokensPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ColorTokensPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
