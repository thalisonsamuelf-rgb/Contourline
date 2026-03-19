import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircuitSection } from "./circuit-section"

const meta = {
  title: "Organisms/BrandbookSections/CircuitSection",
  component: CircuitSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CircuitSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
