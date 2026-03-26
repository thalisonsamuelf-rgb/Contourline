import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Progress } from "./progress"

const meta = {
  title: "Atoms/Feedback/Progress",
  component: Progress,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Valor atual do progresso (0-100)",
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: "Metade (50%)",
  args: {
    value: 50,
  },
}

export const Empty: Story = {
  name: "Vazio (0%)",
  args: {
    value: 0,
  },
}

export const Full: Story = {
  name: "Completo (100%)",
  args: {
    value: 100,
  },
}

export const Quarter: Story = {
  name: "Um Quarto (25%)",
  args: {
    value: 25,
  },
}

export const ThreeQuarters: Story = {
  name: "Tres Quartos (75%)",
  args: {
    value: 75,
  },
}

export const Indeterminate: Story = {
  name: "Indeterminado",
  render: () => (
    <div className="w-80">
      <Progress value={undefined} />
    </div>
  ),
}

export const WithLabel: Story = {
  name: "Com Rotulo de Percentual",
  render: (args) => (
    <div className="flex flex-col gap-2 w-80">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Carregando...</span>
        <span className="font-medium">{args.value}%</span>
      </div>
      <Progress {...args} />
    </div>
  ),
  args: {
    value: 67,
  },
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-5 w-80">
      {[0, 25, 50, 75, 100].map((value) => (
        <div key={value} className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{value === 0 ? "Vazio" : value === 100 ? "Completo" : "Em andamento"}</span>
            <span>{value}%</span>
          </div>
          <Progress value={value} />
        </div>
      ))}
    </div>
  ),
}
