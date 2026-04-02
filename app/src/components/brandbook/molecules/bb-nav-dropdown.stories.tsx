import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbNavDropdown } from "./bb-nav-dropdown"

const itemStyle: React.CSSProperties = {
  display: "block",
  padding: "0.5rem 0.875rem",
  fontFamily: "var(--font-mono)",
  fontSize: "0.625rem",
  color: "var(--cream)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  cursor: "pointer",
  background: "none",
  border: "none",
  width: "100%",
  textAlign: "left",
}

const triggerStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.625rem",
  color: "var(--cream)",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  display: "flex",
  alignItems: "center",
  gap: "0.375rem",
}

const meta = {
  title: "Molecules/Brandbook/BbNavDropdown",
  component: BbNavDropdown,
  args: {
    trigger: <span style={triggerStyle}>Agentes ▾</span>,
    children: (
      <>
        <button style={itemStyle}>@dev — Dex</button>
        <button style={itemStyle}>@qa — Quinn</button>
        <button style={itemStyle}>@architect — Aria</button>
        <button style={itemStyle}>@pm — Morgan</button>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "2rem", minHeight: "200px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BbNavDropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MenuDeProdutos: Story = {
  args: {
    trigger: <span style={triggerStyle}>Plataforma ▾</span>,
    children: (
      <>
        <button style={itemStyle}>Orquestrador de agentes</button>
        <button style={itemStyle}>Pipeline de specs</button>
        <button style={itemStyle}>QA automatizado</button>
        <button style={itemStyle}>Dashboard de metricas</button>
      </>
    ),
  },
}

export const MenuDeDocumentacao: Story = {
  args: {
    trigger: <span style={triggerStyle}>Docs ▾</span>,
    children: (
      <>
        <button style={itemStyle}>Guia de inicio rapido</button>
        <button style={itemStyle}>Referencia de agentes</button>
        <button style={itemStyle}>Constitution</button>
        <button style={itemStyle}>Changelog</button>
      </>
    ),
  },
}

export const TriggerPersonalizado: Story = {
  args: {
    trigger: (
      <span style={{ ...triggerStyle, border: "1px solid var(--border)", padding: "0.375rem 0.75rem" }}>
        Configuracoes ▾
      </span>
    ),
    children: (
      <>
        <button style={itemStyle}>Perfil</button>
        <button style={itemStyle}>Integrações</button>
        <button style={itemStyle}>Tokens de API</button>
        <button style={{ ...itemStyle, color: "var(--error)" }}>Sair</button>
      </>
    ),
  },
}
