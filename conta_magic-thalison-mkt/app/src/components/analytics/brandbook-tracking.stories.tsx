import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandbookTracking } from "./brandbook-tracking"

const meta = {
  title: "Organisms/Analytics/BrandbookTracking",
  component: BrandbookTracking,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BrandbookTracking>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
