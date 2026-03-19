import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbListItem } from "./bb-list-item"

const meta = {
  title: "Molecules/Brandbook/BbListItem",
  component: BbListItem,
  args: {
    title: "Story 1.1 — Configuracao inicial do projeto",
  },
} satisfies Meta<typeof BbListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ComDescricao: Story = {
  args: {
    title: "Agente @dev — Dex",
    description: "Responsavel por implementacao de codigo e operacoes git locais.",
  },
}

export const ComIcone: Story = {
  args: {
    icon: <span style={{ fontSize: "0.875rem" }}>⬡</span>,
    title: "Arquitetura de microservicos",
    description: "Definicao dos limites de servico e contratos de API.",
  },
}

export const ComAcaoTrailing: Story = {
  args: {
    title: "bb-button.tsx",
    description: "Atomo / Estavel",
    trailing: (
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--lime)", border: "1px solid var(--lime)", padding: "0.125rem 0.375rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        Estavel
      </span>
    ),
  },
}

export const ApenasIconeETrailing: Story = {
  args: {
    icon: <span style={{ fontSize: "0.75rem" }}>✓</span>,
    title: "QA Gate aprovado",
    trailing: <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--dim)" }}>ha 2h</span>,
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ maxWidth: 480 }}>
      <BbListItem
        icon={<span>📋</span>}
        title="Story 3.1 — Autenticacao"
        description="Implementar fluxo de login com Supabase Auth."
        trailing={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--lime)", border: "1px solid var(--lime)", padding: "0.125rem 0.375rem" }}>Ready</span>}
      />
      <BbListItem
        icon={<span>🔧</span>}
        title="Story 3.2 — Perfil do usuario"
        description="Pagina de perfil com edicao de dados pessoais."
        trailing={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--warning)", border: "1px solid var(--warning)", padding: "0.125rem 0.375rem" }}>Draft</span>}
      />
      <BbListItem
        icon={<span>✓</span>}
        title="Story 2.4 — Design System base"
        description="Atoms e molecules do brandbook implementados."
        trailing={<span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--dim)", border: "1px solid var(--border)", padding: "0.125rem 0.375rem" }}>Done</span>}
      />
      <BbListItem
        title="Story 4.1 — Relatorios"
        description="Dashboard de metricas por squad."
      />
    </div>
  ),
}
