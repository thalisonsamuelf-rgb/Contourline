import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbSwitch } from "./bb-switch"

const meta = {
  title: "Atoms/Brandbook/BbSwitch",
  component: BbSwitch,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    label: {
      control: "text",
      description: "Texto do rótulo associado ao switch",
    },
    checked: {
      control: "boolean",
      description: "Estado ativado do switch",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbSwitch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Ativar notificações",
    checked: false,
  },
}

export const Ativado: Story = {
  args: {
    label: "Notificações ativas",
    checked: true,
  },
}

export const Desativado: Story = {
  args: {
    label: "Notificações desativadas",
    checked: false,
  },
}

export const SemRotulo: Story = {
  args: {
    checked: true,
  },
}

export const Galeria: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <BbSwitch label="Receber notificações por e-mail" checked={false} onChange={fn()} />
      <BbSwitch label="Modo escuro" checked={true} onChange={fn()} />
      <BbSwitch label="Publicar perfil publicamente" checked={false} onChange={fn()} />
      <BbSwitch label="Sincronizar dados automaticamente" checked={true} onChange={fn()} />
    </div>
  ),
}
