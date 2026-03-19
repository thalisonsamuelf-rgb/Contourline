"use client"

import { cn } from "@/lib/utils"
import { FlowDiagram, type FlowNode, type FlowEdge } from "./flow-diagram"
import { FlowMap, type FlowMapGroup, type FlowMapEdge } from "./flow-map"
import { IconFlowDiagram, type IconFlowNode, type IconFlowEdge } from "./icon-flow-diagram"
import { FlowPlaybook, type PlaybookNode, type PlaybookEdge } from "./flow-playbook"
import { PipelineDiagram, type PipelineNode, type PipelineEdge } from "./pipeline-diagram"
import { SitemapFlow } from "./examples/sitemap-flow"
import { OrgChartFlow } from "./examples/org-chart-flow"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

/* ═══════════════════════════════════════════════════════════════════════════
   USER FLOW SECTION — Brandbook section showcasing FlowDiagram, FlowMap,
   and IconFlowDiagram components. Client component with interactive
   Collapsible, ScrollArea, Resizable, and Popover enhancements.
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Example: SaaS Onboarding Flow ─────────────────────────────────────── */

const onboardingNodes: FlowNode[] = [
  { id: "landing",   label: "Landing Page",  sublabel: "entry point",    x: 225, y: 20,  type: "start" },
  { id: "signup",    label: "Sign Up",       sublabel: "auth",           x: 225, y: 80,  type: "action" },
  { id: "verify",    label: "Verify Email",  sublabel: "email gate",     x: 225, y: 140, type: "decision" },
  { id: "resend",    label: "Resend Link",   sublabel: "recovery",       x: 60,  y: 140, type: "action" },
  { id: "workspace", label: "Workspace",     sublabel: "dashboard",      x: 225, y: 218, type: "default", active: true },
  { id: "invite",    label: "Invite Team",   sublabel: "collaboration",  x: 60,  y: 218, type: "action" },
  { id: "setup",     label: "Setup Wizard",  sublabel: "onboarding",     x: 390, y: 218, type: "action" },
  { id: "activate",  label: "First Action",  sublabel: "activation",     x: 225, y: 285, type: "end" },
]

const onboardingEdges: FlowEdge[] = [
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
]

/* ─── Example: Agent Orchestration Flow ─────────────────────────────────── */

const agentNodes: FlowNode[] = [
  { id: "trigger", label: "User Prompt",  sublabel: "input",        x: 225, y: 20,  type: "start" },
  { id: "router",  label: "Agent Router", sublabel: "orchestrator", x: 225, y: 85,  type: "decision", active: true },
  { id: "dev",     label: "@dev",         sublabel: "code agent",   x: 60,  y: 170, type: "action" },
  { id: "qa",      label: "@qa",          sublabel: "quality gate", x: 225, y: 170, type: "action" },
  { id: "devops",  label: "@devops",      sublabel: "deploy agent", x: 390, y: 170, type: "action" },
  { id: "result",  label: "Output",       sublabel: "response",     x: 225, y: 240, type: "end" },
]

const agentEdges: FlowEdge[] = [
  { from: "trigger", to: "router" },
  { from: "router",  to: "dev",    label: "implement" },
  { from: "router",  to: "qa",     label: "review" },
  { from: "router",  to: "devops", label: "deploy" },
  { from: "dev",     to: "result" },
  { from: "qa",      to: "result" },
  { from: "devops",  to: "result" },
]

/* ─── Example: E-commerce Checkout ──────────────────────────────────────── */

const checkoutNodes: FlowNode[] = [
  { id: "browse",    label: "Browse",        sublabel: "catalog",     x: 225, y: 20,  type: "start" },
  { id: "cart",      label: "Add to Cart",   sublabel: "selection",   x: 225, y: 75,  type: "action" },
  { id: "checkout",  label: "Checkout",      sublabel: "payment",     x: 225, y: 130, type: "default", active: true },
  { id: "guest",     label: "Guest",         sublabel: "no account",  x: 80,  y: 130, type: "action" },
  { id: "login",     label: "Login",         sublabel: "auth",        x: 370, y: 130, type: "action" },
  { id: "payment",   label: "Payment",       sublabel: "stripe",      x: 225, y: 195, type: "decision" },
  { id: "confirm",   label: "Confirmation",  sublabel: "success",     x: 225, y: 270, type: "end" },
  { id: "retry",     label: "Retry",         sublabel: "error",       x: 390, y: 195, type: "action" },
]

const checkoutEdges: FlowEdge[] = [
  { from: "browse",   to: "cart" },
  { from: "cart",     to: "checkout" },
  { from: "checkout", to: "guest" },
  { from: "checkout", to: "login" },
  { from: "guest",    to: "payment" },
  { from: "login",    to: "payment" },
  { from: "payment",  to: "confirm",  label: "approved" },
  { from: "payment",  to: "retry",    label: "declined" },
  { from: "retry",    to: "payment" },
]

/* ─── Example: FlowMap — Dating App Features ───────────────────────────── */

const datingAppGroups: FlowMapGroup[] = [
  { id: "splash", label: "Splash screen", x: 30, y: 280, width: 140, items: [], active: true },
  { id: "signin", label: "Sign In", x: 30, y: 380, width: 160, items: ["Phone number", "Confirmation code", "Enable location services"] },
  { id: "onboarding", label: "Onboarding", x: 260, y: 300, width: 160, items: ["Set name", "Set birth date", "Set gender", "Set preferences", "Personality test", "Set interests"] },
  { id: "main", label: "Main page", x: 500, y: 30, width: 160, items: ["View profiles", "Set filters", "Swipe right and left", "View stories"], activeItems: [3] },
  { id: "nearby", label: "People near you", x: 500, y: 240, width: 160, items: ["See people near you", "Turn on invisible mode", "Refresh"], activeItems: [1] },
  { id: "chat", label: "Chat", x: 500, y: 420, width: 160, items: ["View chat list", "View stories", "Search chats"], activeItems: [1] },
  { id: "liked", label: "People liked you", x: 500, y: 590, width: 160, items: ["See people who liked you", "Search people who liked you"], active: true },
  { id: "profile", label: "Profile", x: 760, y: 30, width: 160, items: ["View profile details", "Edit profile details", "Payment methods", "Notification settings", "Change subscription plan", "Set email", "Set phone number", "Logout"], activeItems: [4] },
  { id: "chatdetail", label: "Chat", x: 760, y: 420, width: 160, items: ["Send messages", "View stories", "Send voice messages", "Block user"], activeItems: [1] },
]

const datingAppEdges: FlowMapEdge[] = [
  { from: "splash", to: "signin" },
  { from: "signin", to: "onboarding" },
  { from: "onboarding", to: "main" },
  { from: "onboarding", to: "nearby" },
  { from: "onboarding", to: "chat" },
  { from: "onboarding", to: "liked" },
  { from: "main", to: "profile" },
  { from: "chat", to: "chatdetail" },
]

/* ─── Example: IconFlowDiagram — API Ecosystem ─────────────────────────── */

const ICON_GEAR = "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-12 1.09 0 .83.6.27 1a6.97 6.97 0 0 1 1.74 1l.92-.38a1 1 0 0 1 1.09.21l1.54 1.54a1 1 0 0 1 .21 1.09l-.38.92a6.97 6.97 0 0 1 1 1.74l1 .27a1 1 0 0 1 .6.83v2.18a1 1 0 0 1-.6.83l-1 .27a6.97 6.97 0 0 1-1 1.74l.38.92a1 1 0 0 1-.21 1.09l-1.54 1.54a1 1 0 0 1-1.09.21l-.92-.38a6.97 6.97 0 0 1-1.74 1l-.27 1a1 1 0 0 1-.83.6h-2.18a1 1 0 0 1-.83-.6l-.27-1a6.97 6.97 0 0 1-1.74-1l-.92.38a1 1 0 0 1-1.09-.21l-1.54-1.54a1 1 0 0 1-.21-1.09l.38-.92a6.97 6.97 0 0 1-1-1.74l-1-.27a1 1 0 0 1-.6-.83v-2.18a1 1 0 0 1 .6-.83l1-.27a6.97 6.97 0 0 1 1-1.74l-.38-.92a1 1 0 0 1 .21-1.09l1.54-1.54a1 1 0 0 1 1.09-.21l.92.38a6.97 6.97 0 0 1 1.74-1l.27-1a1 1 0 0 1 .83-.6Z"
const ICON_DOC = "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M16 13H8M16 17H8M10 9H8"
const ICON_CLOUD = "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"
const ICON_USER = "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
const ICON_CUBE = "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16ZM3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"

const apiEcosystemNodes: IconFlowNode[] = [
  { id: "spec", label: "OpenAPI", sublabel: "Spec", x: 40, y: 30, icon: ICON_GEAR, type: "primary" },
  { id: "document", label: "OpenAPI", sublabel: "Document", x: 260, y: 30, icon: ICON_DOC, type: "primary", active: true },
  { id: "developer", label: "API", sublabel: "Developer", x: 40, y: 190, icon: ICON_USER },
  { id: "api", label: "API", x: 260, y: 310, icon: ICON_CLOUD, type: "primary" },
  { id: "sdk-gen", label: "SDK", sublabel: "Generator", x: 480, y: 100, icon: ICON_GEAR },
  { id: "docs-gen", label: "API Docs", sublabel: "Generator", x: 640, y: 100, icon: ICON_GEAR },
  { id: "sdks", label: "SDKs", x: 340, y: 460, icon: ICON_CUBE, type: "output" },
  { id: "sdk-docs", label: "SDK", sublabel: "Docs", x: 500, y: 460, icon: ICON_DOC, type: "output" },
  { id: "api-docs", label: "API", sublabel: "Docs", x: 660, y: 460, icon: ICON_DOC, type: "output" },
]

const apiEcosystemEdges: IconFlowEdge[] = [
  { from: "spec", to: "document", label: "provides vocabulary" },
  { from: "developer", to: "api", label: "creates" },
  { from: "document", to: "api", label: "formally describes" },
  { from: "document", to: "sdk-gen" },
  { from: "document", to: "docs-gen" },
  { from: "sdk-gen", to: "sdks", label: "generates" },
  { from: "docs-gen", to: "sdk-docs", label: "generates" },
  { from: "docs-gen", to: "api-docs", label: "generates" },
  { from: "api", to: "sdks" },
  { from: "sdk-gen", to: "document", label: "reads" },
]

/* ─── Shared types ──────────────────────────────────────────────────────── */

interface UserFlowSectionProps {
  className?: string
}

/* ─── Node type detailed descriptions for Popover ───────────────────────── */

const flowDiagramNodeDetails: Record<string, string> = {
  default: "Standard rectangular step node. Used for generic workflow stages that don't fit other categories. Rendered as a simple bordered rectangle.",
  start: "Pill-shaped entry node with rounded ends. Marks the beginning of a flow. Typically placed at the top of the diagram.",
  end: "Pill-shaped exit node with rounded ends. Marks the completion of a flow. Typically placed at the bottom of the diagram.",
  decision: "Diamond-shaped branch node. Represents a conditional fork where the flow splits based on criteria. Edges from this node usually carry labels.",
  action: "Rectangular action node. Represents an active step or operation in the workflow. Visually identical to default but semantically distinct.",
}

const playbookNodeDetails: Record<string, string> = {
  start: "Circular entry point with accent highlight. Marks the beginning of the playbook execution. Always rendered with an icon.",
  action: "Rectangular task step with blue accent and sequential index badge. Contains an icon representing the action type. Core building block of playbooks.",
  condition: "Diamond-shaped branch gate with purple accent. Evaluates conditions to determine execution path. Supports 'first true' and 'any true' semantics.",
  wait: "Hexagonal sync point with amber accent. Waits for one or more upstream paths to complete before proceeding. Supports 'any true', 'first true', and 'all paths' modes.",
  end: "Circular terminal node with red accent. Marks the end of a playbook execution branch.",
}

const pipelineNodeDetails: Record<string, string> = {
  input: "Data source node with blue badge. Represents external inputs like webhooks, message queues, or event streams. Has output ports on the right side.",
  ai: "AI service node with green badge. Represents ML models, classifiers, or AI-powered processing stages. Has ports on both sides for data flow.",
  output: "Data sink node with orange badge. Represents final destinations like APIs, databases, or notification services. Has input ports on the left side.",
  service: "Generic service node with gray badge. Represents utility services, transformers, or middleware components. Configurable port layout.",
}

/* ─── Section header block ──────────────────────────────────────────────── */

function SectionIntro({
  label,
  title,
  details,
}: {
  label: string
  title: string
  details: string[]
}) {
  return (
    <div className="px-8 pb-6 flex justify-between items-end border-b border-[var(--bb-border)] mb-8">
      <div>
        <div className="font-[var(--font-bb-mono)] text-[0.6rem] text-[var(--bb-accent)] uppercase tracking-widest mb-2">
          {label}
        </div>
        <div className="font-[var(--font-bb-display)] text-[clamp(1rem,2.5vw,1.4rem)] font-bold text-[var(--bb-cream)] tracking-tight">
          {title}
        </div>
      </div>
      <div className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-wider text-right">
        {details.map((line, i) => (
          <span key={i}>
            {line}
            {i < details.length - 1 && <br />}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Props grid block (wrapped in Collapsible) ────────────────────────── */

function CollapsiblePropsGrid({ items }: { items: { prop: string; type: string; desc: string }[] }) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center gap-2 w-full px-8 py-2 font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest cursor-pointer hover:text-[var(--bb-cream)] transition-colors">
        <span className="text-[var(--bb-accent)]">&#9656;</span> Props Reference
        <span className="ml-auto text-[0.45rem]">click to toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-px bg-[var(--bb-border)] mb-8">
          {items.map((item) => (
            <div
              key={item.prop}
              className="bg-[var(--bb-dark)] p-4 flex flex-col gap-1.5"
            >
              <span className="font-[var(--font-bb-mono)] text-[0.6rem] text-[var(--bb-accent)] uppercase tracking-wide">
                {item.prop}
              </span>
              <span className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-cream)] opacity-60">
                {item.type}
              </span>
              <span className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] leading-relaxed">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ─── Reusable example block ──────────────────────────────────────────────── */

function ExampleBlock({ title, meta, children }: { title: string; meta: string; children: React.ReactNode }) {
  return (
    <div className="px-8 mb-8">
      <div className="flex justify-between items-center mb-3">
        <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest">{title}</span>
        <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">{meta}</span>
      </div>
      {children}
    </div>
  )
}

/* ─── Node types reference (wrapped in Collapsible + ScrollArea + Popover) ── */

function CollapsibleNodeTypesReference({
  items,
  detailsMap,
}: {
  items: { type: string; desc: string }[]
  detailsMap?: Record<string, string>
}) {
  return (
    <Collapsible defaultOpen>
      <CollapsibleTrigger className="flex items-center gap-2 w-full px-8 py-2 font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest cursor-pointer hover:text-[var(--bb-cream)] transition-colors">
        <span className="text-[var(--bb-accent)]">&#9656;</span> Node Types
        <span className="ml-auto text-[0.45rem]">click to toggle</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-8 mb-8">
          <ScrollArea className="w-full" type="hover">
            <div className="flex gap-2 pb-2">
              {items.map((item) => (
                <Popover key={item.type}>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] cursor-pointer hover:border-[var(--bb-accent)]/40 transition-colors shrink-0">
                      <span className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-accent)] uppercase">
                        {item.type}
                      </span>
                      <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">
                        -- {item.desc}
                      </span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 bg-[var(--bb-dark)] border-[var(--bb-border)] p-4">
                    <div className="space-y-2">
                      <p className="font-[var(--font-bb-mono)] text-[0.6rem] font-medium text-[var(--bb-accent)] uppercase">
                        {item.type}
                      </p>
                      <p className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] leading-relaxed">
                        {detailsMap?.[item.type] ?? item.desc}
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 01 — FlowDiagram
   ═══════════════════════════════════════════════════════════════════════════ */

function FlowDiagramSection() {
  return (
    <>
      <SectionIntro
        label="Component"
        title="FlowDiagram"
        details={[
          "SVG -- no external lib",
          "data-driven via props",
          "active state: accent highlight",
        ]}
      />

      <CollapsiblePropsGrid
        items={[
          { prop: "nodes",        type: "FlowNode[]", desc: "Array of nodes with id, label, x/y, type, active." },
          { prop: "edges",        type: "FlowEdge[]", desc: "Connections between nodes. Optional edge label." },
          { prop: "canvasWidth",  type: "number",     desc: "SVG viewBox width. Default 560." },
          { prop: "canvasHeight", type: "number",     desc: "SVG viewBox height. Default 340." },
          { prop: "nodeWidth",    type: "number",     desc: "Node box width. Default 110." },
          { prop: "nodeHeight",   type: "number",     desc: "Node box height. Default 36." },
        ]}
      />

      <CollapsibleNodeTypesReference
        items={[
          { type: "default",  desc: "Standard step" },
          { type: "start",    desc: "Pill -- entry" },
          { type: "end",      desc: "Pill -- exit" },
          { type: "decision", desc: "Diamond -- branch" },
          { type: "action",   desc: "Rect -- action" },
        ]}
        detailsMap={flowDiagramNodeDetails}
      />

      {/* Example 01 — Resizable split view: diagram + data panel */}
      <div className="px-8 mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-dim)] uppercase tracking-widest">Example 01 -- SaaS Onboarding</span>
          <span className="font-[var(--font-bb-mono)] text-[0.45rem] text-[var(--bb-dim)]">8 nodes / 10 edges / active: Workspace</span>
        </div>
        <ResizablePanelGroup orientation="horizontal" className="rounded-[10px] border border-[var(--bb-border)] min-h-[360px]">
          <ResizablePanel defaultSize={65} minSize={40}>
            <div className="h-full p-2">
              <FlowDiagram
                nodes={onboardingNodes}
                edges={onboardingEdges}
                canvasWidth={560}
                canvasHeight={335}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={35} minSize={20}>
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="font-[var(--font-bb-mono)] text-[0.55rem] text-[var(--bb-accent)] uppercase tracking-widest mb-3">
                  Data Inspector
                </div>
                <pre className="font-[var(--font-bb-mono)] text-[0.5rem] text-[var(--bb-dim)] whitespace-pre-wrap leading-relaxed">
{JSON.stringify({
  component: "FlowDiagram",
  nodes: onboardingNodes.length,
  edges: onboardingEdges.length,
  activeNode: "workspace",
  canvasWidth: 560,
  canvasHeight: 335,
  nodeTypes: [...new Set(onboardingNodes.map(n => n.type))],
  edgesWithLabels: onboardingEdges.filter(e => e.label).length,
}, null, 2)}
                </pre>
              </div>
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <ExampleBlock
        title="Example 02 -- Agent Orchestration"
        meta="6 nodes / 7 edges / active: Router"
      >
        <FlowDiagram
          nodes={agentNodes}
          edges={agentEdges}
          canvasWidth={560}
          canvasHeight={290}
        />
      </ExampleBlock>

      <ExampleBlock
        title="Example 03 -- E-commerce Checkout"
        meta="8 nodes / 9 edges / active: Checkout"
      >
        <FlowDiagram
          nodes={checkoutNodes}
          edges={checkoutEdges}
          canvasWidth={560}
          canvasHeight={320}
        />
      </ExampleBlock>

      <ExampleBlock
        title="Example 04 -- Sitemap"
        meta="22 nodes / 21 edges / hub-spoke layout"
      >
        <SitemapFlow />
      </ExampleBlock>

      <ExampleBlock
        title="Example 05 -- Architecture Org Chart"
        meta="48 nodes / 40 edges / hierarchical tree"
      >
        <OrgChartFlow />
      </ExampleBlock>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 02 — FlowMap
   ═══════════════════════════════════════════════════════════════════════════ */

function FlowMapSection() {
  return (
    <>
      <SectionIntro
        label="Component"
        title="FlowMap"
        details={[
          "SVG -- grouped mindmap",
          "item-level active states",
          "dark + light theme toggle",
        ]}
      />

      <CollapsiblePropsGrid
        items={[
          { prop: "groups",       type: "FlowMapGroup[]", desc: "Array of groups with id, label, items, x/y, active." },
          { prop: "edges",        type: "FlowMapEdge[]",  desc: "Connections between groups. Optional edge label." },
          { prop: "canvasWidth",  type: "number",         desc: "SVG viewBox width. Default 800." },
          { prop: "canvasHeight", type: "number",         desc: "SVG viewBox height. Default 500." },
          { prop: "theme",        type: '"dark" | "light"', desc: "Visual theme. Default dark." },
        ]}
      />

      <ExampleBlock
        title="Example 01 -- Dating App Features"
        meta="9 groups / 8 edges / active: Splash, Liked"
      >
        <FlowMap
          groups={datingAppGroups}
          edges={datingAppEdges}
          canvasWidth={960}
          canvasHeight={800}
        />
      </ExampleBlock>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 03 — IconFlowDiagram
   ═══════════════════════════════════════════════════════════════════════════ */

function IconFlowDiagramSection() {
  return (
    <>
      <SectionIntro
        label="Component"
        title="IconFlowDiagram"
        details={[
          "SVG -- icon nodes",
          "edge labels in pills",
          "dark + light theme toggle",
        ]}
      />

      <CollapsiblePropsGrid
        items={[
          { prop: "nodes",       type: "IconFlowNode[]", desc: "Array of nodes with id, label, x/y, icon path, type, active." },
          { prop: "edges",       type: "IconFlowEdge[]", desc: "Connections between nodes. Optional edge label shown in pill." },
          { prop: "canvasWidth", type: "number",         desc: "SVG viewBox width. Default 700." },
          { prop: "canvasHeight", type: "number",        desc: "SVG viewBox height. Default 420." },
          { prop: "nodeWidth",   type: "number",         desc: "Node box width. Default 120." },
          { prop: "nodeHeight",  type: "number",         desc: "Node box height. Default 80." },
          { prop: "theme",       type: '"dark" | "light"', desc: "Visual theme. Default dark." },
        ]}
      />

      <ExampleBlock
        title="Example 01 -- API Ecosystem"
        meta="9 nodes / 10 edges / active: OpenAPI Document"
      >
        <IconFlowDiagram
          nodes={apiEcosystemNodes}
          edges={apiEcosystemEdges}
          canvasWidth={800}
          canvasHeight={560}
        />
      </ExampleBlock>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

export function UserFlowSection({ className }: UserFlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <FlowDiagramSection />
    </section>
  )
}

export function UserFlowMapSection({ className }: UserFlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <FlowMapSection />
    </section>
  )
}

export function UserFlowIconSection({ className }: UserFlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <IconFlowDiagramSection />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 04 — FlowPlaybook
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Example: Phishing Attack Playbook ───────────────────────────────── */

const phishingNodes: PlaybookNode[] = [
  { id: "start", label: "Start point", x: 300, y: 20, category: "start", icon: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z" },
  { id: "invest", label: "Investigate Breaches", sublabel: "Potential Data", x: 40, y: 120, category: "action", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0Z", index: "#1" },
  { id: "analyze", label: "Analyze Email", sublabel: "Voice and Text", x: 220, y: 120, category: "action", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2Z", index: "#2" },
  { id: "timeline", label: "Establish Timeline", sublabel: "Milestones", x: 400, y: 120, category: "action", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0Z", index: "#3" },
  { id: "condition1", label: "Condition point", sublabel: "First true", x: 580, y: 120, category: "condition" },
  { id: "contain", label: "Select containment", sublabel: "strategy", x: 580, y: 240, category: "action", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016Z", index: "#4", active: true },
  { id: "isolate", label: "Isolate Endpoints", sublabel: "With Accounts", x: 580, y: 340, category: "action", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2Z", index: "#5" },
  { id: "condition2", label: "Condition point", sublabel: "Any true", x: 140, y: 260, category: "condition" },
  { id: "enrich", label: "Enrich Artifacts", sublabel: "Found", x: 60, y: 360, category: "action", icon: "M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7c-2 0-3 1-3 3Z", index: "#6" },
  { id: "hash", label: "Hash Attachments", sublabel: "Threat Feeds", x: 240, y: 360, category: "action", icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14", index: "#7" },
  { id: "identify", label: "Identify Repeat", sublabel: "Offense", x: 400, y: 260, category: "action", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3Z", index: "#8" },
  { id: "escalate", label: "Escalate to Tier 2", sublabel: "Further Analysis", x: 400, y: 360, category: "action", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", index: "#9" },
  { id: "wait1", label: "Wait point", sublabel: "Any true", x: 100, y: 460, category: "wait" },
  { id: "wait2", label: "Wait point", sublabel: "First true", x: 420, y: 460, category: "wait" },
  { id: "wait3", label: "Wait point", sublabel: "All paths", x: 300, y: 530, category: "wait" },
]

const phishingEdges: PlaybookEdge[] = [
  { from: "start", to: "invest" },
  { from: "start", to: "analyze" },
  { from: "start", to: "timeline" },
  { from: "start", to: "condition1" },
  { from: "condition1", to: "contain" },
  { from: "contain", to: "isolate" },
  { from: "invest", to: "condition2" },
  { from: "analyze", to: "condition2" },
  { from: "condition2", to: "enrich" },
  { from: "condition2", to: "hash" },
  { from: "timeline", to: "identify" },
  { from: "identify", to: "escalate" },
  { from: "enrich", to: "wait1" },
  { from: "hash", to: "wait1" },
  { from: "escalate", to: "wait2" },
  { from: "wait1", to: "wait3" },
  { from: "wait2", to: "wait3" },
]

function FlowPlaybookSection() {
  return (
    <>
      <SectionIntro
        label="Component"
        title="FlowPlaybook"
        details={[
          "SVG -- orthogonal connectors",
          "category-coded nodes + icons",
          "pan & zoom + dark/light toggle",
        ]}
      />

      <CollapsiblePropsGrid
        items={[
          { prop: "nodes",        type: "PlaybookNode[]",        desc: "Array of nodes with id, label, x/y, category, icon, index, active." },
          { prop: "edges",        type: "PlaybookEdge[]",        desc: "Connections between nodes. Optional edge label." },
          { prop: "canvasWidth",  type: "number",                desc: "SVG viewBox width. Default 560." },
          { prop: "canvasHeight", type: "number",                desc: "SVG viewBox height. Default 400." },
          { prop: "nodeWidth",    type: "number",                desc: "Node box width. Default 160." },
          { prop: "nodeHeight",   type: "number",                desc: "Node box height. Default 56." },
          { prop: "theme",        type: '"dark" | "light"',      desc: "Visual theme. Default dark." },
        ]}
      />

      <CollapsibleNodeTypesReference
        items={[
          { type: "start",     desc: "Entry point -- accent highlight" },
          { type: "action",    desc: "Task step -- blue accent" },
          { type: "condition", desc: "Branch gate -- purple accent" },
          { type: "wait",      desc: "Sync point -- amber accent" },
          { type: "end",       desc: "Terminal -- red accent" },
        ]}
        detailsMap={playbookNodeDetails}
      />

      <ExampleBlock
        title="Example 01 -- Phishing Attack Playbook"
        meta="15 nodes / 17 edges / active: Select containment"
      >
        <FlowPlaybook
          nodes={phishingNodes}
          edges={phishingEdges}
          canvasWidth={760}
          canvasHeight={580}
        />
      </ExampleBlock>
    </>
  )
}

export function UserFlowPlaybookSection({ className }: UserFlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <FlowPlaybookSection />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 05 — PipelineDiagram
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Example: AI Chat Pipeline ───────────────────────────────────────── */

const chatPipelineNodes: PipelineNode[] = [
  {
    id: "message", type: "input", label: "Message", sublabel: "event.slack.com v1.0.0",
    x: 30, y: 280, status: "ready",
    ports: [
      { id: "bot", label: "Bot Message", sublabel: "event.slack.com", side: "right" },
      { id: "user", label: "User Message", sublabel: "event.slack.com", side: "right" },
    ],
  },
  {
    id: "classifier", type: "ai", label: "Intent Classifier", sublabel: "classifier.ibm.com v1.0.0",
    x: 280, y: 350, status: "ready",
    ports: [
      { id: "text-in", label: "Text", sublabel: "v1.0.0", side: "left" },
      { id: "intent-out", label: "Intent", sublabel: "watson.com v1.0.0", side: "right" },
    ],
  },
  {
    id: "faiss", type: "ai", label: "Faiss", sublabel: "ibm.com v1.0.0",
    x: 400, y: 40, status: "ready",
    ports: [
      { id: "input", label: "Input", sublabel: "faiss.ibm.com v1.0.0", side: "left" },
      { id: "output", label: "Output", sublabel: "faiss.ibm.com v1.0.0", side: "right" },
    ],
  },
  {
    id: "prompt", type: "ai", label: "Prompt Engineering", sublabel: "ibm.com v1.0.0",
    x: 430, y: 220, status: "ready",
    ports: [
      { id: "prompt-in", label: "Prompt", sublabel: "v1.0.0", side: "left" },
      { id: "formatted", label: "Formatted Prompt", sublabel: "v1.0.0", side: "right" },
      { id: "faiss-in", label: "Faiss", sublabel: "prompt-engineering v1.0.0", side: "left" },
      { id: "cache", label: "Cache Output", sublabel: "v1.0.0", side: "right" },
    ],
  },
  {
    id: "bam", type: "ai", label: "BAM", sublabel: "ibm.com v1.0.0",
    x: 720, y: 150, status: "ready",
    ports: [
      { id: "input", label: "Input", sublabel: "bam.ibm.com v1.0.0", side: "left" },
      { id: "issue", label: "Issue", sublabel: "bam.ibm.com v1.0.0", side: "right" },
      { id: "text", label: "Text", sublabel: "bam.ibm.com v1.0.0", side: "right" },
    ],
  },
  {
    id: "codegen", type: "ai", label: "BAM CodeGen", sublabel: "ibm.com v1.0.0",
    x: 720, y: 370, status: "ready",
    ports: [
      { id: "input", label: "Input", sublabel: "bam.ibm.com v1.0.0", side: "left" },
      { id: "issue", label: "Issue", sublabel: "bam.ibm.com v1.0.0", side: "right" },
      { id: "text", label: "Text", sublabel: "bam.ibm.com v1.0.0", side: "right" },
    ],
  },
  {
    id: "postmsg", type: "output", label: "Post Message", sublabel: "chat.slack.com v1.0.0",
    x: 960, y: 220, status: "ready",
    ports: [
      { id: "text", label: "Text", sublabel: "chat.slack.com v1.0.0", side: "left" },
    ],
  },
]

const chatPipelineEdges: PipelineEdge[] = [
  { fromNode: "message", fromPort: "user", toNode: "classifier", toPort: "text-in" },
  { fromNode: "classifier", fromPort: "intent-out", toNode: "prompt", toPort: "prompt-in" },
  { fromNode: "faiss", fromPort: "output", toNode: "prompt", toPort: "faiss-in" },
  { fromNode: "prompt", fromPort: "formatted", toNode: "bam", toPort: "input" },
  { fromNode: "prompt", fromPort: "cache", toNode: "codegen", toPort: "input" },
  { fromNode: "bam", fromPort: "text", toNode: "postmsg", toPort: "text" },
  { fromNode: "codegen", fromPort: "text", toNode: "postmsg", toPort: "text" },
]

function PipelineDiagramSection() {
  return (
    <>
      <SectionIntro
        label="Component"
        title="PipelineDiagram"
        details={[
          "SVG -- service-card nodes",
          "named ports + dashed connectors",
          "pan & zoom + dark/light toggle",
        ]}
      />

      <CollapsiblePropsGrid
        items={[
          { prop: "nodes",        type: "PipelineNode[]",        desc: "Array of service nodes with id, type, label, ports, x/y, status." },
          { prop: "edges",        type: "PipelineEdge[]",        desc: "Port-to-port connections. fromNode/fromPort to toNode/toPort." },
          { prop: "canvasWidth",  type: "number",                desc: "SVG viewBox width. Default 800." },
          { prop: "canvasHeight", type: "number",                desc: "SVG viewBox height. Default 500." },
          { prop: "theme",        type: '"dark" | "light"',      desc: "Visual theme. Default dark." },
        ]}
      />

      <CollapsibleNodeTypesReference
        items={[
          { type: "input",   desc: "Data source -- blue badge" },
          { type: "ai",      desc: "AI service -- green badge" },
          { type: "output",  desc: "Data sink -- orange badge" },
          { type: "service", desc: "Generic service -- gray badge" },
        ]}
        detailsMap={pipelineNodeDetails}
      />

      <ExampleBlock
        title="Example 01 -- AI Chat Pipeline"
        meta="7 nodes / 7 edges / status: all ready"
      >
        <PipelineDiagram
          nodes={chatPipelineNodes}
          edges={chatPipelineEdges}
          canvasWidth={1200}
          canvasHeight={550}
        />
      </ExampleBlock>
    </>
  )
}

export function UserFlowPipelineSection({ className }: UserFlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <PipelineDiagramSection />
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 06 — ProcessFlowDiagram (Starter Delivery Process)
   ═══════════════════════════════════════════════════════════════════════════ */

/* ─── Example: Starter Delivery Process ──────────────────────────────── */

const processNodes: FlowNode[] = [
  { id: "briefing",    label: "Briefing",        sublabel: "kickoff",        x: 225, y: 20,  type: "start" },
  { id: "discovery",   label: "Discovery",       sublabel: "research",       x: 225, y: 90,  type: "action" },
  { id: "architecture",label: "Architecture",    sublabel: "design system",  x: 225, y: 160, type: "action" },
  { id: "stories",     label: "Story Draft",     sublabel: "acceptance",     x: 225, y: 230, type: "action", active: true },
  { id: "dev",         label: "Development",     sublabel: "implementation", x: 225, y: 300, type: "action" },
  { id: "qa",          label: "QA Gate",         sublabel: "validation",     x: 225, y: 370, type: "action" },
  { id: "deploy",      label: "Deploy",          sublabel: "production",     x: 225, y: 440, type: "end" },
]

const processEdges: FlowEdge[] = [
  { from: "briefing",     to: "discovery" },
  { from: "discovery",    to: "architecture" },
  { from: "architecture", to: "stories" },
  { from: "stories",      to: "dev" },
  { from: "dev",          to: "qa" },
  { from: "qa",           to: "deploy" },
]

function ProcessFlowSection() {
  return (
    <>
      <SectionIntro
        label="Component"
        title="ProcessFlowDiagram"
        details={[
          "FlowDiagram -- vertical process",
          "linear top-to-bottom flow",
          "7 sequential steps",
        ]}
      />

      <CollapsiblePropsGrid
        items={[
          { prop: "nodes",        type: "FlowNode[]", desc: "Array of nodes with id, label, x/y, type, active." },
          { prop: "edges",        type: "FlowEdge[]", desc: "Connections between nodes. Optional edge label." },
          { prop: "canvasWidth",  type: "number",     desc: "SVG viewBox width. Default 560." },
          { prop: "canvasHeight", type: "number",     desc: "SVG viewBox height. Default 500." },
        ]}
      />

      <CollapsibleNodeTypesReference
        items={[
          { type: "start",  desc: "Pill -- entry point" },
          { type: "action", desc: "Rect -- active step" },
          { type: "end",    desc: "Pill -- terminal" },
        ]}
        detailsMap={flowDiagramNodeDetails}
      />

      <ExampleBlock
        title="Example 01 -- Starter Delivery Process"
        meta="7 nodes / 6 edges / active: Story Draft"
      >
        <FlowDiagram
          nodes={processNodes}
          edges={processEdges}
          canvasWidth={560}
          canvasHeight={500}
        />
      </ExampleBlock>
    </>
  )
}

export function UserFlowProcessSection({ className }: UserFlowSectionProps) {
  return (
    <section className={cn("py-8", className)}>
      <ProcessFlowSection />
    </section>
  )
}
