import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CardsPage } from "./cards-page"

const meta = {
  title: "Pages/CardsPage",
  component: CardsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CardsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
