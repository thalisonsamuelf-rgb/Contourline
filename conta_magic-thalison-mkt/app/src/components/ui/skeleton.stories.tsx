import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Skeleton } from "./skeleton"

const meta = {
  title: "Atoms/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description: "Classes CSS para controlar tamanho e formato",
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: "h-4 w-48",
  },
}

export const TextLine: Story = {
  name: "Linha de Texto",
  render: () => (
    <div className="flex flex-col gap-2 w-64">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  ),
}

export const Circle: Story = {
  name: "Circulo (Avatar)",
  render: () => (
    <div className="flex items-center gap-3">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  ),
}

export const Card: Story = {
  name: "Card",
  render: () => (
    <div className="flex flex-col gap-3 w-64 p-4 border border-border rounded-lg">
      <Skeleton className="h-32 w-full rounded-md" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  ),
}

export const Table: Story = {
  name: "Tabela",
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <div className="flex gap-4">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-5 w-24" />
      </div>
      {Array.from({ length: 4 }, (_, i) => (
        <div key={i} className="flex gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  ),
}

export const Gallery: Story = {
  name: "Galeria",
  render: () => (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Linha de texto</p>
        <Skeleton className="h-4 w-48" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Bloco retangular</p>
        <Skeleton className="h-20 w-64 rounded-md" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Circular</p>
        <Skeleton className="size-12 rounded-full" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Avatar com nome</p>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  ),
}
