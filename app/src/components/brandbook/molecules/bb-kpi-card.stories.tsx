import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbKpiCard } from "./bb-kpi-card"

const meta = {
  title: "Molecules/Brandbook/BbKpiCard",
  component: BbKpiCard,
  args: {
    label: "Stories concluidas",
    value: "47",
    trend: "neutral",
  },
} satisfies Meta<typeof BbKpiCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TendenciaPositiva: Story = {
  args: {
    label: "Velocidade do squad",
    value: "23",
    change: "+12% em relacao a semana anterior",
    trend: "up",
  },
}

export const TendenciaNegativa: Story = {
  args: {
    label: "Bugs em aberto",
    value: "8",
    change: "+3 novos esta semana",
    trend: "down",
  },
}

export const TendenciaNeutra: Story = {
  args: {
    label: "Agentes ativos",
    value: "10",
    change: "sem variacao",
    trend: "neutral",
  },
}

export const ValorGrande: Story = {
  args: {
    label: "Linhas de codigo geradas",
    value: "142.380",
    change: "+8.200 esta sprint",
    trend: "up",
  },
}

export const SemMudanca: Story = {
  args: {
    label: "Epics planejadas",
    value: "5",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", maxWidth: 640 }}>
      <BbKpiCard label="Stories feitas" value="47" change="+5 esta sprint" trend="up" />
      <BbKpiCard label="Bugs em aberto" value="3" change="-2 esta semana" trend="up" />
      <BbKpiCard label="Cobertura de testes" value="94%" change="-1%" trend="down" />
      <BbKpiCard label="Agentes ativos" value="10" trend="neutral" />
      <BbKpiCard label="Deploys hoje" value="7" change="+3 vs ontem" trend="up" />
      <BbKpiCard label="Tempo medio de PR" value="1h 20m" change="-10m" trend="up" />
    </div>
  ),
}
