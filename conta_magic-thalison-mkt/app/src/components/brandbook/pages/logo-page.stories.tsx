import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoPage } from "./logo-page"

const meta = {
  title: "Pages/LogoPage",
  component: LogoPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof LogoPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
