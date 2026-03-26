import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Separator } from "./separator"

const meta = {
  title: "Atoms/Layout/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Orientacao do separador",
    },
    decorative: {
      control: "boolean",
      description: "Se verdadeiro, e puramente decorativo (sem semantica de separacao)",
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Horizontal (Padrao)",
  render: (args) => (
    <div className="w-64">
      <p className="text-sm text-muted-foreground mb-2">Conteudo acima</p>
      <Separator {...args} />
      <p className="text-sm text-muted-foreground mt-2">Conteudo abaixo</p>
    </div>
  ),
  args: {
    orientation: "horizontal",
    decorative: true,
  },
}

export const Vertical: Story = {
  name: "Vertical",
  render: (args) => (
    <div className="flex items-center h-10 gap-3 text-sm text-muted-foreground">
      <span>Inicio</span>
      <Separator {...args} />
      <span>Meio</span>
      <Separator {...args} />
      <span>Fim</span>
    </div>
  ),
  args: {
    orientation: "vertical",
    decorative: true,
  },
}

export const Decorative: Story = {
  name: "Decorativo",
  render: (args) => (
    <div className="w-64">
      <p className="text-sm font-medium mb-2">Secao principal</p>
      <Separator {...args} className="my-2" />
      <p className="text-sm text-muted-foreground">Conteudo complementar</p>
    </div>
  ),
  args: {
    orientation: "horizontal",
    decorative: true,
  },
}

export const Semantic: Story = {
  name: "Semantico (nao decorativo)",
  render: (args) => (
    <div className="w-64">
      <nav aria-label="Navegacao principal">
        <p className="text-sm font-medium mb-2">Inicio</p>
        <Separator {...args} className="my-2" role="separator" />
        <p className="text-sm font-medium">Sobre nos</p>
      </nav>
    </div>
  ),
  args: {
    orientation: "horizontal",
    decorative: false,
  },
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-6 w-72 p-4">
      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Horizontal</p>
        <div>
          <p className="text-sm mb-2">Acima do separador</p>
          <Separator />
          <p className="text-sm mt-2">Abaixo do separador</p>
        </div>
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Vertical</p>
        <div className="flex items-center h-8 gap-3 text-sm">
          <span>Item 1</span>
          <Separator orientation="vertical" />
          <span>Item 2</span>
          <Separator orientation="vertical" />
          <span>Item 3</span>
        </div>
      </div>
    </div>
  ),
}
