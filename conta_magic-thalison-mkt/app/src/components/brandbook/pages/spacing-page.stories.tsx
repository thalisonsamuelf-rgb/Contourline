import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpacingPage } from "./spacing-page"

const meta = {
  title: "Pages/SpacingPage",
  component: SpacingPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SpacingPage>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: {} }
