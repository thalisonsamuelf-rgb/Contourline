import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpacingLayoutPage } from "./spacing-layout-page"

const meta = {
  title: "Pages/SpacingLayoutPage",
  component: SpacingLayoutPage,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SpacingLayoutPage>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: {} }
