import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { EffectsPage } from "./effects-page"

const meta = {
  title: "Pages/EffectsPage",
  component: EffectsPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EffectsPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
