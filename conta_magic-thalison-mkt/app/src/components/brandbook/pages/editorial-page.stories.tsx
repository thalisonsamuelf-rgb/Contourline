import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EditorialPage } from "./editorial-page"

const meta = {
  title: "Pages/EditorialPage",
  component: EditorialPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EditorialPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
