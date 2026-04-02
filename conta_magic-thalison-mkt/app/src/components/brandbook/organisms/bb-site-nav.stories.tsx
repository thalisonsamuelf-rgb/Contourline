import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbSiteNav } from "./bb-site-nav"

const defaultGroups = [
  {
    label: "Foundations",
    links: [
      { href: "#tokens", label: "Tokens" },
      { href: "#typography", label: "Typography" },
      { href: "#grid", label: "Grid" },
    ],
  },
  {
    label: "Components",
    links: [
      { href: "#atoms", label: "Atoms" },
      { href: "#molecules", label: "Molecules" },
      { href: "#organisms", label: "Organisms" },
    ],
  },
  {
    label: "Pages",
    links: [
      { href: "#brandbook", label: "Brandbook" },
      { href: "#guidelines", label: "Guidelines" },
    ],
  },
]

const logoNode = (
  <span
    style={{
      color: "var(--bb-cream)",
      fontFamily: "var(--font-bb-display)",
      fontSize: "0.95rem",
      fontWeight: 800,
      letterSpacing: "0.02em",
      textTransform: "uppercase",
    }}
  >
    AIOX
  </span>
)

const meta = {
  title: "Organisms/Brandbook/BbSiteNav",
  component: BbSiteNav,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    logo: logoNode,
    groups: defaultGroups,
  },
} satisfies Meta<typeof BbSiteNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Compact: Story = {
  args: {
    groups: [
      {
        label: "Core",
        links: [
          { href: "#overview", label: "Overview" },
          { href: "#tokens", label: "Tokens" },
        ],
      },
      {
        label: "Build",
        links: [
          { href: "#components", label: "Components" },
          { href: "#patterns", label: "Patterns" },
        ],
      },
    ],
  },
}
