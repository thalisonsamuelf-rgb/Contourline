import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ButtonsPage } from "./buttons-page"

const meta = {
  title: "Pages/ButtonsPage",
  component: ButtonsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ButtonsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
