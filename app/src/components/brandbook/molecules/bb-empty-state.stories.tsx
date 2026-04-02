import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbEmptyState } from "./bb-empty-state"

const meta = {
  title: "Molecules/Brandbook/BbEmptyState",
  component: BbEmptyState,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbEmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Nenhum item encontrado",
    description: "Não há itens para exibir no momento.",
    variant: "default",
  },
}

export const Search: Story = {
  args: {
    title: "Nenhum resultado",
    description: "Não encontramos resultados para sua busca. Tente termos diferentes.",
    variant: "search",
    action: {
      label: "Limpar busca",
      onClick: () => console.log("clear search"),
    },
  },
}

export const Error: Story = {
  args: {
    title: "Algo deu errado",
    description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
    variant: "error",
    action: {
      label: "Tentar novamente",
      onClick: () => console.log("retry"),
    },
  },
}

export const Permissions: Story = {
  args: {
    title: "Acesso restrito",
    description: "Você não tem permissão para acessar este recurso. Solicite acesso ao administrador.",
    variant: "permissions",
  },
}

export const WithAction: Story = {
  args: {
    title: "Nenhum projeto",
    description: "Comece criando seu primeiro projeto.",
    variant: "default",
    action: {
      label: "Criar projeto",
      onClick: () => console.log("create"),
    },
  },
}
