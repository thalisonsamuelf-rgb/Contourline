import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbToast } from "./bb-toast"

const meta = {
  title: "Molecules/Brandbook/BbToast",
  component: BbToast,
  args: {
    message: "Operacao realizada com sucesso.",
    variant: "info",
    duration: 0,
    onDismiss: fn(),
  },
} satisfies Meta<typeof BbToast>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sucesso: Story = {
  args: {
    variant: "success",
    message: "Story validada e aprovada pelo @po com sucesso.",
    duration: 0,
    onDismiss: fn(),
  },
}

export const Erro: Story = {
  args: {
    variant: "error",
    message: "Falha ao conectar com o servidor de agentes. Tente novamente.",
    duration: 0,
    onDismiss: fn(),
  },
}

export const Aviso: Story = {
  args: {
    variant: "warning",
    message: "Limite de iteracoes do QA Loop atingido. Intervencao manual necessaria.",
    duration: 0,
    onDismiss: fn(),
  },
}

export const Info: Story = {
  args: {
    variant: "info",
    message: "O agente @architect esta analisando a complexidade da feature.",
    duration: 0,
    onDismiss: fn(),
  },
}

export const ComDuracao: Story = {
  args: {
    variant: "success",
    message: "Este toast vai desaparecer em 3 segundos.",
    duration: 3000,
    onDismiss: fn(),
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: 480 }}>
      <BbToast variant="success" message="Story 2.4 concluida e revisada." duration={0} onDismiss={fn()} />
      <BbToast variant="error" message="Erro critico no pipeline de CI. Verifique os logs." duration={0} onDismiss={fn()} />
      <BbToast variant="warning" message="Dependencia desatualizada detectada no projeto." duration={0} onDismiss={fn()} />
      <BbToast variant="info" message="Novo agente @data-engineer disponivel para ativacao." duration={0} onDismiss={fn()} />
    </div>
  ),
}
