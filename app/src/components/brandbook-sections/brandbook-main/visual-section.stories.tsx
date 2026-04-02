import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { VisualSection } from "./visual-section"

const meta = {
  title: "Organisms/BrandbookSections/VisualSection",
  component: VisualSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof VisualSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
