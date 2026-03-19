import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ManifestoSection } from "./manifesto-section"

const meta = {
  title: "Organisms/BrandbookSections/ManifestoSection",
  component: ManifestoSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ManifestoSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
