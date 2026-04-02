import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { Slider } from "./slider"

const meta = {
  title: "Atoms/Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    min: {
      control: { type: "number" },
      description: "Valor minimo do slider",
    },
    max: {
      control: { type: "number" },
      description: "Valor maximo do slider",
    },
    step: {
      control: { type: "number" },
      description: "Incremento de cada passo",
    },
    disabled: {
      control: "boolean",
      description: "Desabilita o slider",
    },
  },
  args: {
    onValueChange: fn(),
    onValueCommit: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-72 px-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
  },
}

export const LowValue: Story = {
  name: "Valor Baixo",
  args: {
    defaultValue: [20],
    min: 0,
    max: 100,
    step: 1,
  },
}

export const HighValue: Story = {
  name: "Valor Alto",
  args: {
    defaultValue: [80],
    min: 0,
    max: 100,
    step: 1,
  },
}

export const Range: Story = {
  name: "Intervalo (Range)",
  args: {
    defaultValue: [25, 75],
    min: 0,
    max: 100,
    step: 1,
  },
}

export const Disabled: Story = {
  name: "Desabilitado",
  args: {
    defaultValue: [40],
    min: 0,
    max: 100,
    step: 1,
    disabled: true,
  },
}

export const WithSteps: Story = {
  name: "Com Passos Definidos",
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 10,
  },
}

export const Volume: Story = {
  name: "Controle de Volume",
  render: (args) => (
    <div className="flex flex-col gap-2 w-72 px-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Volume</span>
        <span className="font-medium">70%</span>
      </div>
      <Slider {...args} />
    </div>
  ),
  args: {
    defaultValue: [70],
    min: 0,
    max: 100,
    step: 1,
  },
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-6 w-72 px-2 py-4">
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Padrao</p>
        <Slider defaultValue={[50]} min={0} max={100} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Intervalo</p>
        <Slider defaultValue={[20, 80]} min={0} max={100} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Desabilitado</p>
        <Slider defaultValue={[40]} min={0} max={100} disabled />
      </div>
    </div>
  ),
}
