import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { DeviceMockupFrame } from "./device-mockup-frame"

const meta = {
  title: "Atoms/Display/DeviceMockupFrame",
  component: DeviceMockupFrame,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["laptop", "phone", "tablet"],
      description: "Variante do dispositivo a ser renderizado",
    },
  },
} satisfies Meta<typeof DeviceMockupFrame>

export default meta
type Story = StoryObj<typeof meta>

const ConteudoDeTela = () => (
  <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800 flex items-center justify-center">
    <p className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
      Conteudo da tela
    </p>
  </div>
)

export const Laptop: Story = {
  args: {
    variant: "laptop",
    children: <ConteudoDeTela />,
  },
}

export const Phone: Story = {
  name: "Celular",
  args: {
    variant: "phone",
    children: <ConteudoDeTela />,
  },
}

export const Tablet: Story = {
  args: {
    variant: "tablet",
    children: <ConteudoDeTela />,
  },
}

export const AllVariants: Story = {
  name: "Todas as Variantes",
  render: () => (
    <div className="flex flex-wrap items-end justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-3">
        <DeviceMockupFrame variant="phone">
          <ConteudoDeTela />
        </DeviceMockupFrame>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Celular</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <DeviceMockupFrame variant="tablet">
          <ConteudoDeTela />
        </DeviceMockupFrame>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Tablet</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <DeviceMockupFrame variant="laptop">
          <ConteudoDeTela />
        </DeviceMockupFrame>
        <span className="text-xs text-muted-foreground uppercase tracking-wider">Notebook</span>
      </div>
    </div>
  ),
}

export const WithRichContent: Story = {
  name: "Com Conteudo Rico",
  render: () => (
    <DeviceMockupFrame variant="laptop">
      <div className="w-full h-full bg-neutral-950 flex flex-col">
        <div className="h-8 bg-neutral-900 border-b border-neutral-800 flex items-center gap-2 px-3">
          <div className="size-2.5 rounded-full bg-red-500" />
          <div className="size-2.5 rounded-full bg-yellow-500" />
          <div className="size-2.5 rounded-full bg-green-500" />
          <div className="flex-1 mx-3 h-4 rounded bg-neutral-800 flex items-center justify-center">
            <span className="text-[9px] text-neutral-500">aioxsquad.ai</span>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-white font-bold text-lg tracking-tight">AIOX Squad</p>
        </div>
      </div>
    </DeviceMockupFrame>
  ),
}
