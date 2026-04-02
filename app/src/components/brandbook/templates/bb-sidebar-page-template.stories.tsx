import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSidebarPageTemplate } from "./bb-sidebar-page-template"

const sidebarGroups = [
  {
    title: "Core",
    items: [
      { label: "Overview", href: "#overview", active: true },
      { label: "Foundations", href: "#foundations" },
      { label: "Components", href: "#components" },
    ],
  },
  {
    title: "Delivery",
    items: [
      { label: "Guidelines", href: "#guidelines" },
      { label: "Release", href: "#release" },
    ],
  },
]

const mainContent = (
  <div style={{ display: "grid", gap: "1rem" }}>
    <section id="overview" style={{ border: "1px solid var(--bb-border)", padding: "1rem", background: "var(--bb-surface)" }}>
      <h3 style={{ margin: 0, color: "var(--bb-cream)", fontFamily: "var(--font-bb-display)", textTransform: "uppercase" }}>Overview</h3>
      <p style={{ margin: "0.5rem 0 0", color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.68rem" }}>High-level summary of the brandbook system.</p>
    </section>
    <section id="foundations" style={{ border: "1px solid var(--bb-border)", padding: "1rem", background: "var(--bb-surface)" }}>
      <h3 style={{ margin: 0, color: "var(--bb-cream)", fontFamily: "var(--font-bb-display)", textTransform: "uppercase" }}>Foundations</h3>
      <p style={{ margin: "0.5rem 0 0", color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.68rem" }}>Tokens, typography and motion rules.</p>
    </section>
    <section id="components" style={{ border: "1px solid var(--bb-border)", padding: "1rem", background: "var(--bb-surface)" }}>
      <h3 style={{ margin: 0, color: "var(--bb-cream)", fontFamily: "var(--font-bb-display)", textTransform: "uppercase" }}>Components</h3>
      <p style={{ margin: "0.5rem 0 0", color: "var(--bb-dim)", fontFamily: "var(--font-bb-mono)", fontSize: "0.68rem" }}>Atomic layers and composition patterns.</p>
    </section>
  </div>
)

const meta = {
  title: "Templates/BbSidebarPageTemplate",
  component: BbSidebarPageTemplate,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    sidebarGroups,
    children: mainContent,
  },
} satisfies Meta<typeof BbSidebarPageTemplate>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
