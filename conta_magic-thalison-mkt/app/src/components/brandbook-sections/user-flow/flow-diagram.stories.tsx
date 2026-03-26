import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FlowDiagram } from "./flow-diagram"

const meta = {
  title: "Organisms/BrandbookSections/FlowDiagram",
  component: FlowDiagram,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#050505" }],
    },
  },
} satisfies Meta<typeof FlowDiagram>

export default meta
type Story = StoryObj<typeof meta>

/* ─── Default: SaaS Onboarding ─────────────────────────────────────────── */

export const Default: Story = {
  args: {
    canvasWidth: 700,
    canvasHeight: 420,
    nodes: [
      { id: "landing",   label: "Landing Page",  sublabel: "entry point",   x: 280, y: 24,  type: "start" },
      { id: "signup",    label: "Sign Up",        sublabel: "auth",          x: 280, y: 104, type: "action" },
      { id: "verify",    label: "Verify Email",   sublabel: "email gate",    x: 280, y: 184, type: "decision" },
      { id: "resend",    label: "Resend Link",    sublabel: "recovery",      x: 80,  y: 184, type: "action" },
      { id: "workspace", label: "Workspace",      sublabel: "dashboard",     x: 280, y: 264, type: "default", active: true },
      { id: "invite",    label: "Invite Team",    sublabel: "collaboration",  x: 80,  y: 264, type: "action" },
      { id: "setup",     label: "Setup Wizard",   sublabel: "onboarding",    x: 480, y: 264, type: "action" },
      { id: "activate",  label: "First Action",   sublabel: "activation",    x: 280, y: 344, type: "end" },
    ],
    edges: [
      { from: "landing",   to: "signup" },
      { from: "signup",    to: "verify" },
      { from: "verify",    to: "resend",    label: "no email" },
      { from: "verify",    to: "workspace", label: "verified" },
      { from: "resend",    to: "verify" },
      { from: "workspace", to: "invite" },
      { from: "workspace", to: "setup" },
      { from: "workspace", to: "activate",  label: "skip" },
      { from: "invite",    to: "activate" },
      { from: "setup",     to: "activate" },
    ],
  },
}

/* ─── Agent Orchestration ───────────────────────────────────────────────── */

export const AgentOrchestration: Story = {
  args: {
    canvasWidth: 560,
    canvasHeight: 328,
    nodes: [
      { id: "trigger", label: "User Prompt",   sublabel: "input",        x: 210, y: 24,  type: "start" },
      { id: "router",  label: "Agent Router",  sublabel: "orchestrator", x: 210, y: 104, type: "decision", active: true },
      { id: "dev",     label: "@dev",          sublabel: "code agent",   x: 40,  y: 184, type: "action" },
      { id: "qa",      label: "@qa",           sublabel: "quality gate", x: 210, y: 184, type: "action" },
      { id: "devops",  label: "@devops",       sublabel: "deploy agent", x: 380, y: 184, type: "action" },
      { id: "result",  label: "Output",        sublabel: "response",     x: 210, y: 264, type: "end" },
    ],
    edges: [
      { from: "trigger", to: "router" },
      { from: "router",  to: "dev",    label: "implement" },
      { from: "router",  to: "qa",     label: "review" },
      { from: "router",  to: "devops", label: "deploy" },
      { from: "dev",     to: "result" },
      { from: "qa",      to: "result" },
      { from: "devops",  to: "result" },
    ],
  },
}

/* ─── Minimal: Linear Flow ──────────────────────────────────────────────── */

export const LinearFlow: Story = {
  args: {
    canvasWidth: 560,
    canvasHeight: 280,
    nodes: [
      { id: "a", label: "Step 1",  x: 210, y: 24,  type: "start" },
      { id: "b", label: "Step 2",  x: 210, y: 100, type: "action", active: true },
      { id: "c", label: "Step 3",  x: 210, y: 176, type: "action" },
      { id: "d", label: "Done",    x: 210, y: 252, type: "end" },
    ],
    edges: [
      { from: "a", to: "b" },
      { from: "b", to: "c" },
      { from: "c", to: "d" },
    ],
  },
}
