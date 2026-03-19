import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpacingScaleSection } from "./spacing-scale-section"

const meta = {
  title: "Organisms/BrandbookSections/SpacingScaleSection",
  component: SpacingScaleSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SpacingScaleSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
