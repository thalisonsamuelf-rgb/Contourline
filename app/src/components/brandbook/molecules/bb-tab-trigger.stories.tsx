import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbTabTrigger } from "./bb-tab-trigger"

const meta = {
  title: "Molecules/Brandbook/BbTabTrigger",
  component: BbTabTrigger,
  args: {
    children: "Visao geral",
    active: false,
    onClick: fn(),
  },
} satisfies Meta<typeof BbTabTrigger>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Inativo: Story = {
  args: {
    children: "Componentes",
    active: false,
    onClick: fn(),
  },
}

export const Ativo: Story = {
  args: {
    children: "Componentes",
    active: true,
    onClick: fn(),
  },
}

export const GrupoDeAbas: Story = {
  render: () => (
    <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
      <BbTabTrigger active onClick={fn()}>Atoms</BbTabTrigger>
      <BbTabTrigger onClick={fn()}>Molecules</BbTabTrigger>
      <BbTabTrigger onClick={fn()}>Organisms</BbTabTrigger>
      <BbTabTrigger onClick={fn()}>Templates</BbTabTrigger>
    </div>
  ),
}

export const AbaDePrincipio: Story = {
  render: () => (
    <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
      <BbTabTrigger onClick={fn()}>Identidade</BbTabTrigger>
      <BbTabTrigger active onClick={fn()}>Tipografia</BbTabTrigger>
      <BbTabTrigger onClick={fn()}>Cores</BbTabTrigger>
      <BbTabTrigger onClick={fn()}>Iconografia</BbTabTrigger>
      <BbTabTrigger onClick={fn()}>Espacamento</BbTabTrigger>
    </div>
  ),
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          Estado inativo
        </p>
        <BbTabTrigger onClick={fn()}>Aba inativa</BbTabTrigger>
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          Estado ativo
        </p>
        <BbTabTrigger active onClick={fn()}>Aba ativa</BbTabTrigger>
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
          Grupo de abas
        </p>
        <div style={{ display: "flex", borderBottom: "1px solid var(--border)" }}>
          <BbTabTrigger active onClick={fn()}>Overview</BbTabTrigger>
          <BbTabTrigger onClick={fn()}>Specs</BbTabTrigger>
          <BbTabTrigger onClick={fn()}>Changelog</BbTabTrigger>
        </div>
      </div>
    </div>
  ),
}
