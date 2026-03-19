import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbFooterBar } from "./bb-footer-bar"

const meta = {
  title: "Molecules/Brandbook/BbFooterBar",
  component: BbFooterBar,
  args: {
    children: (
      <>
        <span>AIOX Squad — 2026</span>
        <span>aioxsquad.ai</span>
      </>
    ),
  },
} satisfies Meta<typeof BbFooterBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Simples: Story = {
  args: {
    children: <span>Agora o controle e seu.</span>,
  },
}

export const ComLinks: Story = {
  args: {
    children: (
      <>
        <span>AIOX Squad &copy; 2026</span>
        <span style={{ display: "flex", gap: "1rem" }}>
          <span>Documentacao</span>
          <span>Privacidade</span>
          <span>Contato</span>
        </span>
      </>
    ),
  },
}

export const ComVersao: Story = {
  args: {
    children: (
      <>
        <span>AIOX Brandbook</span>
        <span style={{ display: "flex", gap: "1.5rem" }}>
          <span>v2.0.0</span>
          <span>Build estavel</span>
        </span>
      </>
    ),
  },
}

export const Centralizado: Story = {
  args: {
    style: { justifyContent: "center", gap: "2rem" },
    children: (
      <>
        <span>Construido com</span>
        <span style={{ color: "var(--lime)" }}>AIOX</span>
        <span>em cada linha</span>
      </>
    ),
  },
}
