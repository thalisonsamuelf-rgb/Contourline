import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrandbookSidebar } from "./brandbook-sidebar"

const groups = [
  {
    label: "Fundamentos",
    items: [
      { id: "manifesto", label: "Manifesto", num: "01" },
      { id: "proposito", label: "Proposito", num: "02" },
      { id: "arquetipo", label: "Arquetipo", num: "03" },
    ],
  },
  {
    label: "Estrategia",
    items: [
      { id: "posicionamento", label: "Posicionamento", num: "04" },
      { id: "naming", label: "Naming", num: "05" },
    ],
  },
]

const meta = {
  title: "Organisms/BrandbookLayout/BrandbookSidebar",
  component: BrandbookSidebar,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    groups,
  },
} satisfies Meta<typeof BrandbookSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: "100vh", background: "var(--bb-dark)", color: "var(--bb-cream)" }}>
      <BrandbookSidebar {...args} />
      <main style={{ marginLeft: 300, padding: "2rem", display: "grid", gap: "2rem" }}>
        {args.groups.flatMap((group) => group.items).map((item) => (
          <section key={item.id} id={item.id} style={{ minHeight: "30vh", border: "1px solid var(--bb-border)", padding: "1.25rem", background: "var(--bb-surface)" }}>
            <h3 style={{ margin: 0, fontFamily: "var(--font-bb-display)", textTransform: "uppercase" }}>{item.label}</h3>
            <p style={{ margin: "0.6rem 0 0", color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.68rem" }}>
              Section anchor: #{item.id}
            </p>
          </section>
        ))}
      </main>
    </div>
  ),
}
