import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbAccordion } from "./bb-accordion"

const meta = {
  title: "Organisms/Brandbook/BbAccordion",
  component: BbAccordion,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbAccordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { title: "What is AIOX?", content: "An AI-Orchestrated System for Full Stack Development." },
      { title: "How does it work?", content: "It orchestrates specialized agents to handle complex workflows." },
      { title: "Who is it for?", content: "Developers, teams, and companies building software products.", defaultOpen: true },
    ],
  },
}
