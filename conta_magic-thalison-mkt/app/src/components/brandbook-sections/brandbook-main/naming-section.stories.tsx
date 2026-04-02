import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { NamingSection } from "./naming-section"

const meta = {
  title: "Organisms/BrandbookSections/NamingSection",
  component: NamingSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NamingSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
