import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbMoodboardPageTemplate } from "./bb-moodboard-page-template"

const meta = {
  title: "Templates/BbMoodboardPageTemplate",
  component: BbMoodboardPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof BbMoodboardPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    header: {
      title: "Moodboard",
      subtitle: "Visual inspiration and references",
      badge: "Visual",
    },
    children: "Moodboard grid content goes here.",
  },
}
