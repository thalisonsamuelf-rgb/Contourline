import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PropositoSection } from "./proposito-section"

const meta = {
  title: "Organisms/BrandbookSections/PropositoSection",
  component: PropositoSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof PropositoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
