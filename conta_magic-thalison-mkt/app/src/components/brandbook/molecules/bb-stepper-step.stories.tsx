import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbStepperStep } from "./bb-stepper-step"

const meta = {
  title: "Molecules/Brandbook/BbStepperStep",
  component: BbStepperStep,
  args: {
    step: 1,
    label: "Criar story",
    status: "pending",
  },
} satisfies Meta<typeof BbStepperStep>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Pendente: Story = {
  args: {
    step: 3,
    label: "Implementar",
    status: "pending",
  },
}

export const Ativo: Story = {
  args: {
    step: 2,
    label: "Validar story",
    status: "active",
  },
}

export const Concluido: Story = {
  args: {
    step: 1,
    label: "Criar story",
    status: "completed",
  },
}

export const CicloCompleto: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 320 }}>
      <BbStepperStep step={1} label="Criar story" status="completed" />
      <BbStepperStep step={2} label="Validar story" status="completed" />
      <BbStepperStep step={3} label="Implementar" status="active" />
      <BbStepperStep step={4} label="QA Gate" status="pending" />
      <BbStepperStep step={5} label="Deploy" status="pending" />
    </div>
  ),
}

export const PipelineDeSpec: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 320 }}>
      <BbStepperStep step={1} label="Coletar requisitos" status="completed" />
      <BbStepperStep step={2} label="Avaliar complexidade" status="completed" />
      <BbStepperStep step={3} label="Pesquisa tecnica" status="active" />
      <BbStepperStep step={4} label="Escrever spec" status="pending" />
      <BbStepperStep step={5} label="Critica de qualidade" status="pending" />
      <BbStepperStep step={6} label="Planejar implementacao" status="pending" />
    </div>
  ),
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          Pendente
        </p>
        <BbStepperStep step={1} label="Aguardando inicio" status="pending" />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          Ativo
        </p>
        <BbStepperStep step={2} label="Em execucao agora" status="active" />
      </div>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>
          Concluido
        </p>
        <BbStepperStep step={3} label="Etapa finalizada" status="completed" />
      </div>
    </div>
  ),
}
