import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbBentoGrid } from "./bb-bento-grid"

const meta = {
  title: "Organisms/Brandbook/BbBentoGrid",
  component: BbBentoGrid,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbBentoGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: [
      "Cell 1 — Typography",
      "Cell 2 — Color palette",
      "Cell 3 — Spacing scale",
      "Cell 4 — Motion tokens",
    ].map((text, i) => (
      <div key={i} style={{ padding: "2rem", background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "monospace", fontSize: "0.75rem", color: "#aaa" }}>
        {text}
      </div>
    )),
  },
}
