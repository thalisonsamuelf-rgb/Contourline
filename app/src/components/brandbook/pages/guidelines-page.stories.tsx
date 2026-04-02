import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GuidelinesPage } from "./guidelines-page"

const meta = {
  title: "Pages/GuidelinesPage",
  component: GuidelinesPage,
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
  },
} satisfies Meta<typeof GuidelinesPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
