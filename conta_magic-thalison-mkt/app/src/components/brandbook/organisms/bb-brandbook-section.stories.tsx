import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbBrandbookSection } from "./bb-brandbook-section"

const meta = {
  title: "Organisms/Brandbook/BbBrandbookSection",
  component: BbBrandbookSection,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbBrandbookSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "manifesto",
    label: "MANIFESTO",
    concept: "Core Belief",
    num: "01",
    subtitle: "01. Manifesto",
    title: "Devolver As Pessoas O Poder De Criar",
    footerLeft: "AIOX SQUAD",
    footerCenter: "BRANDBOOK 2025",
    children: "Section content goes here.",
  },
}
