import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbCompCell } from "./bb-comp-cell"

const meta = {
  title: "Molecules/Brandbook/BbCompCell",
  component: BbCompCell,
  args: {
    name: "bb-button",
    status: "stable",
    preview: (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--cream)", border: "1px solid var(--lime)", padding: "0.375rem 0.75rem" }}>
        Botao primario
      </span>
    ),
  },
} satisfies Meta<typeof BbCompCell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Estavel: Story = {
  args: {
    name: "bb-badge",
    status: "stable",
    preview: (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--lime)", border: "1px solid var(--lime)", padding: "0.125rem 0.375rem" }}>
        Ativo
      </span>
    ),
  },
}

export const Rascunho: Story = {
  args: {
    name: "bb-tooltip",
    status: "draft",
    preview: (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)" }}>
        [ tooltip em desenvolvimento ]
      </span>
    ),
  },
}

export const Depreciado: Story = {
  args: {
    name: "bb-card-legacy",
    status: "deprecated",
    preview: (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", textDecoration: "line-through" }}>
        Card legado
      </span>
    ),
  },
}

export const ComChildren: Story = {
  args: {
    name: "bb-divider",
    status: "stable",
    preview: undefined,
    children: (
      <div style={{ width: "100%", height: 1, background: "var(--border)" }} />
    ),
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 640 }}>
      <BbCompCell
        name="bb-button"
        status="stable"
        preview={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--cream)", border: "1px solid var(--lime)", padding: "0.25rem 0.75rem" }}>Botao</span>}
      />
      <BbCompCell
        name="bb-input"
        status="stable"
        preview={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.675rem", color: "var(--dim)", border: "1px solid var(--border)", padding: "0.25rem 0.5rem" }}>Entrada de texto</span>}
      />
      <BbCompCell
        name="bb-tooltip"
        status="draft"
        preview={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--dim)" }}>em construcao</span>}
      />
      <BbCompCell
        name="bb-modal"
        status="draft"
        preview={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--dim)" }}>em construcao</span>}
      />
      <BbCompCell
        name="bb-card-v1"
        status="deprecated"
        preview={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.625rem", color: "var(--dim)", textDecoration: "line-through" }}>depreciado</span>}
      />
      <BbCompCell
        name="bb-badge"
        status="stable"
        preview={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--lime)", border: "1px solid var(--lime)", padding: "0.125rem 0.375rem", textTransform: "uppercase" }}>Badge</span>}
      />
    </div>
  ),
}
