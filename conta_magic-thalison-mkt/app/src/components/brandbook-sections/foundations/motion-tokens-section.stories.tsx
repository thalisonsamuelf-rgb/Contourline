import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MotionTokensSection } from "./motion-tokens-section"

const meta = {
  title: "Organisms/BrandbookSections/MotionTokensSection",
  component: MotionTokensSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof MotionTokensSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
