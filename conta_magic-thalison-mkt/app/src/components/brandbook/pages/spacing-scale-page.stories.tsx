import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpacingScalePage } from "./spacing-scale-page"

const meta = {
  title: "Pages/SpacingScalePage",
  component: SpacingScalePage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SpacingScalePage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
