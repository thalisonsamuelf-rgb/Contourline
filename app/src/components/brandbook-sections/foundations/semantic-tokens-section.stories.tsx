import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SemanticTokensSection } from "./semantic-tokens-section"

const meta = {
  title: "Organisms/BrandbookSections/SemanticTokensSection",
  component: SemanticTokensSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SemanticTokensSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
