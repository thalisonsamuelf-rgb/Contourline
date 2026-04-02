import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoDontsSpread } from "./logo-donts-spread"

const meta = {
  title: "Organisms/BrandbookSections/LogoDontsSpread",
  component: LogoDontsSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof LogoDontsSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
