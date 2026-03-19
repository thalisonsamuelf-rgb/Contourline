import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SpreadSection } from "./spread-section"

const meta = {
  title: "Organisms/BrandbookSections/SpreadSection",
  component: SpreadSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SpreadSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Spread section content",
  },
}
