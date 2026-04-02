import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HazardSection } from "./hazard-section"

const meta = {
  title: "Organisms/BrandbookSections/HazardSection",
  component: HazardSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof HazardSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
