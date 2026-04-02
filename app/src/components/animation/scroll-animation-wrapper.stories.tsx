import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ScrollAnimationWrapper } from "./scroll-animation-wrapper"

const meta = {
  title: "Atoms/Animation/ScrollAnimationWrapper",
  component: ScrollAnimationWrapper,
  parameters: {
    layout: "padded",
    backgrounds: { default: "dark", values: [{ name: "dark", value: "#1D1F19" }] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: "#1D1F19",
          padding: "4rem 2rem",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    animation: {
      control: { type: "select" },
      options: ["fadeUp", "fadeIn", "slideLeft", "slideRight", "scale"],
    },
    delay: { control: { type: "range", min: 0, max: 2, step: 0.1 } },
  },
} satisfies Meta<typeof ScrollAnimationWrapper>

export default meta
type Story = StoryObj<typeof meta>

const SampleCard = ({ label }: { label: string }) => (
  <div
    style={{
      backgroundColor: "#2A2C24",
      border: "1px solid #D1FF0033",
      borderRadius: "12px",
      padding: "2rem",
      color: "#F5F4E7",
      minWidth: "280px",
    }}
  >
    <h3 style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: "0.5rem" }}>
      {label}
    </h3>
    <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>
      Conteudo de exemplo para demonstrar a animacao de scroll.
    </p>
  </div>
)

export const FadeUp: Story = {
  args: {
    animation: "fadeUp",
    children: <SampleCard label="Fade Up" />,
  },
}

export const FadeIn: Story = {
  args: {
    animation: "fadeIn",
    children: <SampleCard label="Fade In" />,
  },
}

export const SlideLeft: Story = {
  args: {
    animation: "slideLeft",
    children: <SampleCard label="Slide Left" />,
  },
}

export const Scale: Story = {
  args: {
    animation: "scale",
    children: <SampleCard label="Scale" />,
  },
}

export const AllAnimations: Story = {
  args: {
    animation: "fadeUp",
    children: <SampleCard label="Fade Up" />,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <ScrollAnimationWrapper animation="fadeUp">
        <SampleCard label="Fade Up" />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper animation="fadeIn" delay={0.1}>
        <SampleCard label="Fade In" />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper animation="slideLeft" delay={0.2}>
        <SampleCard label="Slide Left" />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper animation="slideRight" delay={0.3}>
        <SampleCard label="Slide Right" />
      </ScrollAnimationWrapper>
      <ScrollAnimationWrapper animation="scale" delay={0.4}>
        <SampleCard label="Scale" />
      </ScrollAnimationWrapper>
    </div>
  ),
}
