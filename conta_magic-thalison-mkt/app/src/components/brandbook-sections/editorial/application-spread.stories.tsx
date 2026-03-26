import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ApplicationSpread } from "./application-spread"

const meta = {
  title: "Organisms/BrandbookSections/ApplicationSpread",
  component: ApplicationSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ApplicationSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
