import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoSystemSpread } from "./logo-system-spread"

const meta = {
  title: "Organisms/BrandbookSections/LogoSystemSpread",
  component: LogoSystemSpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof LogoSystemSpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
