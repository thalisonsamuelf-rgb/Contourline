import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbPanelHeader } from "./bb-panel-header"

const meta = {
  title: "Molecules/Brandbook/BbPanelHeader",
  component: BbPanelHeader,
  args: {
    title: "Visao geral do squad",
  },
} satisfies Meta<typeof BbPanelHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ComSubtitulo: Story = {
  args: {
    title: "Stories da sprint",
    subtitle: "Sprint 4 — 3 a 17 de marco de 2026",
  },
}

export const ComAcoes: Story = {
  args: {
    title: "Agentes ativos",
    subtitle: "10 agentes no total",
    actions: (
      <button
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--lime)",
          border: "1px solid var(--lime)",
          background: "none",
          padding: "0.25rem 0.625rem",
          cursor: "pointer",
        }}
      >
        Ver todos
      </button>
    ),
  },
}

export const ComMultiplasAcoes: Story = {
  args: {
    title: "Componentes do brandbook",
    subtitle: "Design system AIOX v2",
    actions: (
      <>
        <button
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--dim)",
            border: "1px solid var(--border)",
            background: "none",
            padding: "0.25rem 0.625rem",
            cursor: "pointer",
          }}
        >
          Filtrar
        </button>
        <button
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.55rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--lime)",
            border: "1px solid var(--lime)",
            background: "none",
            padding: "0.25rem 0.625rem",
            cursor: "pointer",
          }}
        >
          Exportar
        </button>
      </>
    ),
  },
}

export const ApenasTitulo: Story = {
  args: {
    title: "Metricas de qualidade",
    subtitle: undefined,
    actions: undefined,
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: 560 }}>
      <BbPanelHeader title="Somente titulo" />
      <BbPanelHeader title="Com subtitulo" subtitle="Informacao contextual do painel" />
      <BbPanelHeader
        title="Com acoes"
        subtitle="Painel interativo"
        actions={
          <button style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", textTransform: "uppercase", color: "var(--lime)", border: "1px solid var(--lime)", background: "none", padding: "0.25rem 0.625rem", cursor: "pointer" }}>
            Novo
          </button>
        }
      />
    </div>
  ),
}
