import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Label } from "./label"
import { Input } from "./input"
import { Checkbox } from "./checkbox"

const meta = {
  title: "Atoms/Forms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "Conteudo do label",
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Nome completo",
  },
}

export const Required: Story = {
  name: "Obrigatorio",
  render: (args) => (
    <Label {...args}>
      {args.children}
      <span className="text-destructive ml-0.5">*</span>
    </Label>
  ),
  args: {
    children: "E-mail",
  },
}

export const WithInput: Story = {
  name: "Com Campo de Texto",
  render: (args) => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="label-input">{args.children}</Label>
      <Input id="label-input" type="text" placeholder="Digite aqui..." />
    </div>
  ),
  args: {
    children: "Endereco",
  },
}

export const WithCheckbox: Story = {
  name: "Com Checkbox",
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="label-checkbox" />
      <Label htmlFor="label-checkbox">{args.children}</Label>
    </div>
  ),
  args: {
    children: "Lembrar minha senha",
  },
}

export const Disabled: Story = {
  name: "Desabilitado (via peer)",
  render: () => (
    <div className="flex flex-col gap-1.5 w-64">
      <Label htmlFor="label-disabled">Campo desabilitado</Label>
      <Input id="label-disabled" type="text" placeholder="Indisponivel" disabled />
    </div>
  ),
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-4 w-64">
      <Label>Label simples</Label>
      <Label>
        Obrigatorio <span className="text-destructive ml-0.5">*</span>
      </Label>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="g-label-1">Com input associado</Label>
        <Input id="g-label-1" type="text" placeholder="Texto..." />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="g-label-2" />
        <Label htmlFor="g-label-2">Com checkbox associado</Label>
      </div>
    </div>
  ),
}
