import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TruelinesSection } from "./truelines-section"

const meta = {
  title: "Organisms/BrandbookSections/TruelinesSection",
  component: TruelinesSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TruelinesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
