import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSidebar } from "./bb-sidebar"

const defaultGroups = [
  {
    title: "Foundations",
    items: [
      { label: "Tokens", href: "#tokens", active: true },
      { label: "Typography", href: "#typography" },
      { label: "Spacing", href: "#spacing" },
    ],
  },
  {
    title: "Components",
    items: [
      { label: "Atoms", href: "#atoms" },
      { label: "Molecules", href: "#molecules" },
      { label: "Organisms", href: "#organisms" },
    ],
  },
]

const meta = {
  title: "Organisms/Brandbook/BbSidebar",
  component: BbSidebar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    groups: defaultGroups,
  },
} satisfies Meta<typeof BbSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ display: "flex", minHeight: "80vh", background: "var(--bb-dark)" }}>
      <BbSidebar {...args} />
      <div style={{ padding: "2rem", color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.68rem" }}>
        <p style={{ margin: 0 }}>Main content area preview.</p>
      </div>
    </div>
  ),
}

export const DenseNavigation: Story = {
  args: {
    groups: [
      ...defaultGroups,
      {
        title: "Showcase",
        items: [
          { label: "Gallery", href: "#gallery" },
          { label: "Editorial", href: "#editorial" },
          { label: "Guidelines", href: "#guidelines" },
        ],
      },
    ],
  },
  render: (args) => (
    <div style={{ display: "flex", minHeight: "85vh", background: "var(--bb-dark)" }}>
      <BbSidebar {...args} />
      <div style={{ padding: "2rem", color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.68rem" }}>
        <p style={{ margin: 0 }}>Expanded navigation with additional groups.</p>
      </div>
    </div>
  ),
}
