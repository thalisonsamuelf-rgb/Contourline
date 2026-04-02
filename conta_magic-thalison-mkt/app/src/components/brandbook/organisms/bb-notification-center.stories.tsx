import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbNotificationCenter, type BbNotification } from "./bb-notification-center"

const meta = {
  title: "Organisms/Brandbook/BbNotificationCenter",
  component: BbNotificationCenter,
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof BbNotificationCenter>

export default meta
type Story = StoryObj<typeof meta>

const now = Date.now()

const sampleNotifications: BbNotification[] = [
  {
    id: "1",
    title: "Deploy concluído",
    description: "O deploy da v2.4.1 foi finalizado com sucesso.",
    timestamp: now - 120_000,
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Erro no pipeline",
    description: "O build falhou no step de typecheck. Verifique os logs.",
    timestamp: now - 3_600_000,
    read: false,
    type: "error",
  },
  {
    id: "3",
    title: "Nova versão disponível",
    description: "AIOX v3.0 está disponível para atualização.",
    timestamp: now - 7_200_000,
    read: true,
    type: "info",
  },
  {
    id: "4",
    title: "Atenção: limite de uso",
    description: "Você atingiu 80% do limite de tokens do mês.",
    timestamp: now - 86_400_000,
    read: true,
    type: "warning",
  },
]

export const Empty: Story = {
  args: {
    notifications: [],
    settingsHref: "/settings/notifications",
  },
}

export const FewNotifications: Story = {
  args: {
    notifications: sampleNotifications.slice(0, 2),
    onMarkRead: (id) => console.log("mark read:", id),
    onDismiss: (id) => console.log("dismiss:", id),
    onMarkAllRead: () => console.log("mark all read"),
    settingsHref: "/settings/notifications",
  },
}

export const ManyNotifications: Story = {
  args: {
    notifications: sampleNotifications,
    onMarkRead: (id) => console.log("mark read:", id),
    onDismiss: (id) => console.log("dismiss:", id),
    onMarkAllRead: () => console.log("mark all read"),
    settingsHref: "/settings/notifications",
  },
}

export const AllRead: Story = {
  args: {
    notifications: sampleNotifications.map((n) => ({ ...n, read: true })),
    onMarkRead: (id) => console.log("mark read:", id),
    onDismiss: (id) => console.log("dismiss:", id),
    settingsHref: "/settings/notifications",
  },
}
