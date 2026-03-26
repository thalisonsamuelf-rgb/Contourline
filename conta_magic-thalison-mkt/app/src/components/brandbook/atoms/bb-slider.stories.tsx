import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { fn } from "storybook/test"
import { BbSlider } from "./bb-slider"

const meta = {
  title: "Atoms/Brandbook/BbSlider",
  component: BbSlider,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "320px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    min: {
      control: "number",
      description: "Valor mínimo",
    },
    max: {
      control: "number",
      description: "Valor máximo",
    },
    step: {
      control: "number",
      description: "Incremento de cada passo",
    },
    defaultValue: {
      control: "number",
      description: "Valor inicial",
    },
    disabled: {
      control: "boolean",
      description: "Estado desabilitado",
    },
  },
  args: {
    onChange: fn(),
  },
} satisfies Meta<typeof BbSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
  },
}

export const Volume: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 70,
    step: 5,
  },
}

export const Percentual: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 25,
    step: 1,
  },
}

export const Desabilitado: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 40,
    disabled: true,
  },
}
