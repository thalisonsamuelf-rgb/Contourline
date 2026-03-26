import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BrutalistCard } from "./brutalist-card"

const meta = {
  title: "Atoms/Brandbook Chrome/BrutalistCard",
  component: BrutalistCard,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0a" }],
    },
  },
  argTypes: {
    small: {
      control: "boolean",
      description: "Reduz o padding interno do cartao",
    },
    className: {
      control: "text",
      description: "Classes CSS adicionais",
    },
  },
} satisfies Meta<typeof BrutalistCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <p style={{ color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem" }}>
        Conteudo padrao do cartao brutalista. Padding normal aplicado.
      </p>
    ),
    small: false,
  },
}

export const Pequeno: Story = {
  name: "Pequeno (small)",
  args: {
    children: (
      <p style={{ color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem" }}>
        Conteudo com padding reduzido.
      </p>
    ),
    small: true,
  },
}

export const ComTitulo: Story = {
  name: "Com Titulo e Descricao",
  args: {
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h3
          style={{
            color: "var(--bb-cream)",
            fontFamily: "var(--font-bb-display)",
            fontWeight: 800,
            fontSize: "1rem",
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          Identidade Visual
        </h3>
        <p
          style={{
            color: "var(--bb-dim)",
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.65rem",
            letterSpacing: "0.06em",
            margin: 0,
          }}
        >
          Expressao visual da marca construida sobre contraste, brutalismo e precisao tipografica.
        </p>
      </div>
    ),
    small: false,
  },
}

export const ComDestaque: Story = {
  name: "Com Destaque Lime",
  args: {
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <span
          style={{
            color: "var(--bb-accent)",
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.55rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          Principio #01
        </span>
        <p
          style={{
            color: "var(--bb-cream)",
            fontFamily: "var(--font-bb-display)",
            fontWeight: 800,
            fontSize: "1.25rem",
            textTransform: "uppercase",
            letterSpacing: "-0.03em",
            margin: 0,
          }}
        >
          Autonomia Radical
        </p>
      </div>
    ),
    small: false,
  },
}

export const Gallery: Story = {
  name: "Galeria — Comparativo de Tamanhos",
  parameters: { controls: { disable: true } },
  args: {
    children: (
      <p style={{ color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", margin: 0 }}>
        Padding padrao — 1.5rem 2rem
      </p>
    ),
    small: false,
  },
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "480px" }}>
      <BrutalistCard>
        <p style={{ color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", margin: 0 }}>
          Padding padrao — 1.5rem 2rem
        </p>
      </BrutalistCard>
      <BrutalistCard small>
        <p style={{ color: "var(--bb-cream)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", margin: 0 }}>
          Padding pequeno — 1rem 1.25rem
        </p>
      </BrutalistCard>
    </div>
  ),
}
