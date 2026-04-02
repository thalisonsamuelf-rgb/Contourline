import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HeaderBanner } from "./header-banner"

const meta = {
  title: "Pages/HeaderBanner",
  component: HeaderBanner,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HeaderBanner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
