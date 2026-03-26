import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { Switch } from "./switch"
import { Label } from "./label"

const meta = {
  title: "Atoms/Forms/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "radio",
      options: ["default", "sm"],
      description: "Tamanho do switch",
    },
    checked: {
      control: "boolean",
      description: "Estado ativo/inativo do switch",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o switch",
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    size: "default",
  },
}

export const Checked: Story = {
  name: "Ativado",
  args: {
    defaultChecked: true,
    size: "default",
  },
}

export const SmallSize: Story = {
  name: "Tamanho Pequeno",
  args: {
    size: "sm",
  },
}

export const SmallSizeChecked: Story = {
  name: "Tamanho Pequeno Ativado",
  args: {
    size: "sm",
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  name: "Desabilitado",
  args: {
    disabled: true,
    size: "default",
  },
}

export const DisabledChecked: Story = {
  name: "Desabilitado Ativado",
  args: {
    disabled: true,
    defaultChecked: true,
    size: "default",
  },
}

export const WithLabel: Story = {
  name: "Com Label",
  render: (args) => (
    <div className="flex items-center gap-2">
      <Switch {...args} id="switch-notificacoes" />
      <Label htmlFor="switch-notificacoes">Receber notificacoes</Label>
    </div>
  ),
  args: {
    size: "default",
  },
}

export const AllSizes: Story = {
  name: "Todos os Tamanhos",
  render: () => (
    <div className="flex flex-col gap-5 p-4">
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Padrao</p>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <Switch size="default" id="as-default-off" />
            <span className="text-xs text-muted-foreground">Inativo</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch size="default" defaultChecked id="as-default-on" />
            <span className="text-xs text-muted-foreground">Ativo</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch size="default" disabled id="as-default-disabled" />
            <span className="text-xs text-muted-foreground">Desabilitado</span>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Pequeno</p>
        <div className="flex gap-6">
          <div className="flex flex-col items-center gap-2">
            <Switch size="sm" id="as-sm-off" />
            <span className="text-xs text-muted-foreground">Inativo</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch size="sm" defaultChecked id="as-sm-on" />
            <span className="text-xs text-muted-foreground">Ativo</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Switch size="sm" disabled id="as-sm-disabled" />
            <span className="text-xs text-muted-foreground">Desabilitado</span>
          </div>
        </div>
      </div>
    </div>
  ),
}
