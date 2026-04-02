import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { VocabularioSection } from "./vocabulario-section"

const meta = {
  title: "Organisms/BrandbookSections/VocabularioSection",
  component: VocabularioSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof VocabularioSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
