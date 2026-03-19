import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { GuidelinesPanel } from "./guidelines-panel"

const meta = {
  title: "Organisms/BrandbookSections/GuidelinesPanel",
  component: GuidelinesPanel,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof GuidelinesPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Panel content",
    header: { label: "Guidelines", concept: "Design System" },
  },
}
