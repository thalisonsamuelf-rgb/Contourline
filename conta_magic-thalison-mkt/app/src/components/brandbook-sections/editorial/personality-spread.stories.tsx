import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PersonalitySpread } from "./personality-spread"

const meta = {
  title: "Organisms/BrandbookSections/PersonalitySpread",
  component: PersonalitySpread,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PersonalitySpread>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
