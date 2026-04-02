import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbTickerStrip } from "./bb-ticker-strip"

const meta = {
  title: "Organisms/Brandbook/BbTickerStrip",
  component: BbTickerStrip,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbTickerStrip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: ["AIOX SQUAD", "AGORA O CONTROLE E SEU", "AI ORCHESTRATION", "FULL STACK", "DESIGN SYSTEM"],
  },
}
