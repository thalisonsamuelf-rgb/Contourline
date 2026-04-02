import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SemanticTokensPage } from "./semantic-tokens-page"

const meta = {
  title: "Pages/SemanticTokensPage",
  component: SemanticTokensPage,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SemanticTokensPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
