import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogoDissolveCell } from "./logo-dissolve-cell"

const meta = {
  title: "Organisms/BrandbookSections/LogoDissolveCell",
  component: LogoDissolveCell,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof LogoDissolveCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
