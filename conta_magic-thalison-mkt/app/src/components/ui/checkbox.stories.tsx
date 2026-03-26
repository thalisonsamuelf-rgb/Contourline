import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { Checkbox } from "./checkbox"
import { Label } from "./label"

const meta = {
  title: "Atoms/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Estado de marcacao do checkbox",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o checkbox",
    },
  },
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: "checkbox-padrao",
  },
}

export const Checked: Story = {
  name: "Marcado",
  args: {
    id: "checkbox-marcado",
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  name: "Desabilitado",
  args: {
    id: "checkbox-desabilitado",
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  name: "Desabilitado e Marcado",
  args: {
    id: "checkbox-desabilitado-marcado",
    disabled: true,
    defaultChecked: true,
  },
}

export const WithLabel: Story = {
  name: "Com Label",
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="checkbox-com-label" />
      <Label htmlFor="checkbox-com-label">Aceito os termos de uso</Label>
    </div>
  ),
  args: {},
}

export const WithLabelDisabled: Story = {
  name: "Com Label Desabilitado",
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox {...args} id="checkbox-label-disabled" />
      <Label htmlFor="checkbox-label-disabled">Opcao indisponivel</Label>
    </div>
  ),
  args: {
    disabled: true,
  },
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Checkbox id="g1" />
        <Label htmlFor="g1">Desmarcado</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="g2" defaultChecked />
        <Label htmlFor="g2">Marcado</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="g3" disabled />
        <Label htmlFor="g3">Desabilitado</Label>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="g4" disabled defaultChecked />
        <Label htmlFor="g4">Desabilitado e marcado</Label>
      </div>
    </div>
  ),
}
