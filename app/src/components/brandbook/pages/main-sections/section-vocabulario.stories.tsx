import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { SectionVocabulario } from "./section-vocabulario"

const meta = {
  title: "Pages/SectionVocabulario",
  component: SectionVocabulario,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SectionVocabulario>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
