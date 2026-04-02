import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbConfirmSheet } from "./bb-confirm-sheet"

const meta = {
  title: "Organisms/Brandbook/BbConfirmSheet",
  component: BbConfirmSheet,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof BbConfirmSheet>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    open: true,
    title: "Confirmar ação",
    description: "Deseja prosseguir com esta operação? Esta ação pode ser desfeita.",
    confirmLabel: "Confirmar",
    cancelLabel: "Cancelar",
    onConfirm: () => console.log("confirmed"),
    onCancel: () => console.log("cancelled"),
    onClose: () => console.log("closed"),
    variant: "default",
  },
}

export const Destructive: Story = {
  args: {
    open: true,
    title: "Excluir item",
    description: "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
    confirmLabel: "Excluir",
    cancelLabel: "Cancelar",
    onConfirm: () => console.log("confirmed delete"),
    onCancel: () => console.log("cancelled"),
    onClose: () => console.log("closed"),
    variant: "destructive",
  },
}

export const Loading: Story = {
  args: {
    open: true,
    title: "Processando",
    description: "Aguarde enquanto a operação é processada.",
    confirmLabel: "Processando...",
    cancelLabel: "Cancelar",
    onConfirm: () => {},
    onCancel: () => console.log("cancelled"),
    onClose: () => console.log("closed"),
    variant: "default",
    loading: true,
  },
}
