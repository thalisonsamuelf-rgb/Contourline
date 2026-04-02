import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LayeringSection } from "./layering-section"

const meta = {
  title: "Organisms/BrandbookSections/LayeringSection",
  component: LayeringSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof LayeringSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
