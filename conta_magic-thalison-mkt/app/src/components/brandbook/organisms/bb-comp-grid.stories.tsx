import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbCompGrid } from "./bb-comp-grid"

const meta = {
  title: "Organisms/Brandbook/BbCompGrid",
  component: BbCompGrid,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbCompGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: 3,
    children: [
      "Component A",
      "Component B",
      "Component C",
      "Component D",
      "Component E",
      "Component F",
    ].map((text, i) => (
      <div key={i} style={{ padding: "1.5rem", background: "var(--surface)", border: "1px solid var(--border)", fontFamily: "monospace", fontSize: "0.7rem", color: "#aaa" }}>
        {text}
      </div>
    )),
  },
}
