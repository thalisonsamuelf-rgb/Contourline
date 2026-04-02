import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { TexturesSection } from "./textures-section"

const meta = {
  title: "Organisms/BrandbookSections/TexturesSection",
  component: TexturesSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof TexturesSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
