import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { Input } from "./input"
import { Label } from "./label"

const meta = {
  title: "Atoms/Forms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url", "search"],
      description: "Tipo do campo de entrada",
    },
    placeholder: {
      control: "text",
      description: "Texto de placeholder",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o campo",
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: "text",
  },
}

export const WithPlaceholder: Story = {
  name: "Com Placeholder",
  args: {
    type: "text",
    placeholder: "Digite seu nome completo",
  },
}

export const Password: Story = {
  name: "Senha",
  args: {
    type: "password",
    placeholder: "Digite sua senha",
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "seu@email.com.br",
  },
}

export const Disabled: Story = {
  name: "Desabilitado",
  args: {
    type: "text",
    placeholder: "Campo desabilitado",
    disabled: true,
  },
}

export const WithLabel: Story = {
  name: "Com Label",
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="input-nome">Nome completo</Label>
      <Input {...args} id="input-nome" />
    </div>
  ),
  args: {
    type: "text",
    placeholder: "Ex: Joao Silva",
  },
}

export const WithLabelEmail: Story = {
  name: "Com Label — E-mail",
  render: (args) => (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="input-email">Endereco de e-mail</Label>
      <Input {...args} id="input-email" />
    </div>
  ),
  args: {
    type: "email",
    placeholder: "seu@email.com.br",
  },
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="g-text">Texto</Label>
        <Input id="g-text" type="text" placeholder="Texto simples" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="g-email">E-mail</Label>
        <Input id="g-email" type="email" placeholder="seu@email.com.br" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="g-password">Senha</Label>
        <Input id="g-password" type="password" placeholder="Digite sua senha" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="g-disabled">Desabilitado</Label>
        <Input id="g-disabled" type="text" placeholder="Nao editavel" disabled />
      </div>
    </div>
  ),
}
