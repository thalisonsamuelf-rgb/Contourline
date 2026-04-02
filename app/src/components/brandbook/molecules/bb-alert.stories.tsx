import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbAlert } from "./bb-alert"

const meta = {
  title: "Molecules/Brandbook/BbAlert",
  component: BbAlert,
  args: {
    children: "Verifique as configuracoes antes de prosseguir com a operacao.",
  },
} satisfies Meta<typeof BbAlert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Info: Story = {
  args: {
    variant: "info",
    title: "Informacao",
    children: "Esta operacao pode levar alguns segundos. O sistema continuara funcionando normalmente.",
  },
}

export const Sucesso: Story = {
  args: {
    variant: "success",
    title: "Operacao concluida",
    children: "A story foi validada com sucesso e esta pronta para implementacao.",
  },
}

export const Aviso: Story = {
  args: {
    variant: "warning",
    title: "Atencao",
    children: "O limite de iteracoes do QA Loop esta proximo. Revise os itens pendentes antes de continuar.",
  },
}

export const Erro: Story = {
  args: {
    variant: "error",
    title: "Falha na validacao",
    children: "A story nao passou no gate de qualidade. Corrija os pontos indicados e submeta novamente.",
  },
}

export const ComIcone: Story = {
  args: {
    variant: "success",
    title: "Agente ativo",
    icon: <span style={{ fontSize: "0.75rem" }}>✓</span>,
    children: "O agente @dev foi carregado e esta pronto para execucao.",
  },
}

export const SemTitulo: Story = {
  args: {
    variant: "info",
    children: "Lembre-se de atualizar o arquivo de story apos cada task concluida.",
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 480 }}>
      <BbAlert variant="info" title="Info">Mensagem informativa do sistema.</BbAlert>
      <BbAlert variant="success" title="Sucesso">Operacao realizada com exito.</BbAlert>
      <BbAlert variant="warning" title="Aviso">Acao requer revisao antes de prosseguir.</BbAlert>
      <BbAlert variant="error" title="Erro">Falha critica detectada no processo.</BbAlert>
    </div>
  ),
}
