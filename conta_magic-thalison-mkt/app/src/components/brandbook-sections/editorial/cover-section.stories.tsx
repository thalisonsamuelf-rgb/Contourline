import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CoverSection } from "./cover-section"

const meta = {
  title: "Organisms/BrandbookSections/CoverSection",
  component: CoverSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof CoverSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
