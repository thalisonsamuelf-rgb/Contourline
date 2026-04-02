"use client"

import { cn } from "@/lib/utils"
import { CanvasToolbar, CanvasLegend } from "./canvas-toolbar"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useCallback, useEffect, useId, useRef, useState } from "react"

/* ═══════════════════════════════════════════════════════════════════════════
   FLOW DIAGRAM — Interactive canvas with zoom + pan
   Pure SVG canvas. Tailwind + bb-* tokens for chrome (controls, legend).
   ═══════════════════════════════════════════════════════════════════════════ */

export type FlowNodeType = "default" | "start" | "end" | "decision" | "action"

export interface FlowNode {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  type?: FlowNodeType
  active?: boolean
}

export interface FlowEdge {
  from: string
  to: string
  label?: string
}

export type FlowTheme = "dark" | "light"

export interface FlowDiagramProps {
  nodes: FlowNode[]
  edges: FlowEdge[]
  canvasWidth?: number
  canvasHeight?: number
  nodeWidth?: number
  nodeHeight?: number
  /** Visual theme — dark (default) or light (paper/cream) */
  theme?: FlowTheme
  className?: string
}

/* ─── Visual constants ────────────────────────────────────────────────────── */
const DEFAULT_NODE_W = 110
const DEFAULT_NODE_H = 36
const RADIUS = 8
const DECISION_EXTRA_W = 10
const DECISION_EXTRA_H = 8

const MIN_ZOOM = 0.3
const MAX_ZOOM = 3
const ZOOM_STEP = 0.15

/* ─── SVG color palettes (only used inside <svg>) ─────────────────────────── */
type SvgPalette = {
  bg: string
  surface: string
  border: string
  lime: string
  limeDim: string
  text: string
  activeText: string
  dim: string
  connector: string
  connectorActive: string
  dotGrid: string
}

const SVG_DARK: SvgPalette = {
  bg: "var(--bb-dark, #0c0c0c)",
  surface: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.15)",
  lime: "var(--bb-accent, #ddd1bb)",
  limeDim: "var(--bb-accent-12, var(--bb-accent-12))",
  text: "var(--bb-cream, #f5f0e8)",
  activeText: "var(--bb-accent, #ddd1bb)",
  dim: "var(--bb-dim, rgba(245,244,231,0.4))",
  connector: "rgba(255,255,255,0.18)",
  connectorActive: "var(--bb-accent-50, rgba(221, 209, 187,0.50))",
  dotGrid: "rgba(255,255,255,0.08)",
}

const SVG_LIGHT: SvgPalette = {
  bg: "#e8e2d6",
  surface: "#1a1a1a",
  border: "rgba(0,0,0,0.30)",
  lime: "#ddd1bb",
  limeDim: "#ddd1bb",
  text: "#ffffff",
  activeText: "#1a1a1a",
  dim: "rgba(0,0,0,0.35)",
  connector: "rgba(0,0,0,0.45)",
  connectorActive: "#1a1a1a",
  dotGrid: "rgba(0,0,0,0.00)",
}

function getSvgPalette(theme: FlowTheme): SvgPalette {
  return theme === "light" ? SVG_LIGHT : SVG_DARK
}

/* ─── Geometry helpers ────────────────────────────────────────────────────── */

function getNodeCenter(node: FlowNode, nw: number, nh: number) {
  return { cx: node.x + nw / 2, cy: node.y + nh / 2 }
}

function getDecisionBounds(node: FlowNode, nw: number, nh: number) {
  const cx = node.x + nw / 2
  const cy = node.y + nh / 2
  const hw = nw / 2 + DECISION_EXTRA_W
  const hh = nh / 2 + DECISION_EXTRA_H
  return { cx, cy, hw, hh }
}

function buildPath(x1: number, y1: number, x2: number, y2: number): string {
  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)
  if (dx < 2) return `M ${x1} ${y1} L ${x2} ${y2}`
  if (dy > dx * 0.5) {
    const midY = (y1 + y2) / 2
    return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`
  }
  const midX = (x1 + x2) / 2
  return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`
}

function getNodeEdge(
  node: FlowNode, nw: number, nh: number,
  side: "top" | "bottom" | "left" | "right",
): { x: number; y: number } {
  const cx = node.x + nw / 2
  const cy = node.y + nh / 2
  const isDec = node.type === "decision"
  switch (side) {
    case "top":    return { x: cx, y: isDec ? cy - nh / 2 - DECISION_EXTRA_H : node.y }
    case "bottom": return { x: cx, y: isDec ? cy + nh / 2 + DECISION_EXTRA_H : node.y + nh }
    case "left":   return { x: isDec ? cx - nw / 2 - DECISION_EXTRA_W : node.x, y: cy }
    case "right":  return { x: isDec ? cx + nw / 2 + DECISION_EXTRA_W : node.x + nw, y: cy }
  }
}

function computeConnector(from: FlowNode, to: FlowNode, nw: number, nh: number) {
  const fc = getNodeCenter(from, nw, nh)
  const tc = getNodeCenter(to, nw, nh)

  if (tc.cy > fc.cy + nh * 0.4) {
    const p1 = getNodeEdge(from, nw, nh, "bottom")
    const p2 = getNodeEdge(to, nw, nh, "top")
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
  }
  if (tc.cy < fc.cy - nh * 0.4) {
    const p1 = getNodeEdge(from, nw, nh, "top")
    const p2 = getNodeEdge(to, nw, nh, "bottom")
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
  }
  if (tc.cx >= fc.cx) {
    const p1 = getNodeEdge(from, nw, nh, "right")
    const p2 = getNodeEdge(to, nw, nh, "left")
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
  }
  const p1 = getNodeEdge(from, nw, nh, "left")
  const p2 = getNodeEdge(to, nw, nh, "right")
  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y }
}

/* ─── Node shape (SVG — must use native attributes) ──────────────────────── */

function NodeShape({ node, nw, nh, p }: { node: FlowNode; nw: number; nh: number; p: SvgPalette }) {
  const isActive = node.active
  const isDecision = node.type === "decision"
  const isStart = node.type === "start"
  const isEnd = node.type === "end"

  const fillColor = isActive ? p.limeDim : p.surface
  const strokeColor = p.border
  const strokeWidth = isActive ? 1.5 : 1

  if (isDecision) {
    const { cx, cy, hw, hh } = getDecisionBounds(node, nw, nh)
    return (
      <g>
        {isActive && (
          <polygon
            points={`${cx},${cy - hh - 4} ${cx + hw + 4},${cy} ${cx},${cy + hh + 4} ${cx - hw - 4},${cy}`}
            fill="none" stroke={p.lime} strokeWidth={0.4} opacity={0.2}
          />
        )}
        <polygon
          points={`${cx},${cy - hh} ${cx + hw},${cy} ${cx},${cy + hh} ${cx - hw},${cy}`}
          fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth}
        />
      </g>
    )
  }

  const rx = isStart || isEnd ? nh / 2 : RADIUS
  return (
    <g>
      {isActive && (
        <rect
          x={node.x - 3} y={node.y - 3}
          width={nw + 6} height={nh + 6}
          rx={rx + 2} fill="none" stroke={p.lime} strokeWidth={0.4} opacity={0.2}
        />
      )}
      <rect
        x={node.x} y={node.y} width={nw} height={nh}
        rx={rx} ry={rx} fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth}
      />
    </g>
  )
}

/* ─── Main component ──────────────────────────────────────────────────────── */

export function FlowDiagram({
  nodes,
  edges,
  canvasWidth = 560,
  canvasHeight = 340,
  nodeWidth = DEFAULT_NODE_W,
  nodeHeight = DEFAULT_NODE_H,
  theme: initialTheme = "dark",
  className,
}: FlowDiagramProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const [activeTheme, setActiveTheme] = useState<FlowTheme>(initialTheme)
  const P = getSvgPalette(activeTheme)
  const isDark = activeTheme === "dark"
  const toggleTheme = useCallback(() => setActiveTheme((t) => t === "dark" ? "light" : "dark"), [])

  // Node interaction state
  const [contextNode, setContextNode] = useState<FlowNode | null>(null)
  const [hoveredNode, setHoveredNode] = useState<FlowNode | null>(null)
  const [hoverPos, setHoverPos] = useState({ x: 0, y: 0 })
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Pan & zoom state
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const isPanningRef = useRef(false)
  const panStart = useRef({ x: 0, y: 0 })
  const panOrigin = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z))

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
    setZoom((prev) => clampZoom(prev + delta))
  }, [setZoom])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isPanningRef.current = true
    setIsPanning(true)
    panStart.current = { x: e.clientX, y: e.clientY }
    panOrigin.current = { ...pan }
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
  }, [pan])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isPanningRef.current) return
    const dx = e.clientX - panStart.current.x
    const dy = e.clientY - panStart.current.y
    setPan({ x: panOrigin.current.x + dx, y: panOrigin.current.y + dy })
  }, [])

  const handlePointerUp = useCallback(() => {
    isPanningRef.current = false
    setIsPanning(false)
  }, [])

  const handleFit = useCallback(() => {
    const container = containerRef.current
    if (!container) {
      setZoom(1)
      setPan({ x: 0, y: 0 })
      return
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    for (const n of nodes) {
      const extra = n.type === "decision" ? DECISION_EXTRA_W : 0
      const extraY = n.type === "decision" ? DECISION_EXTRA_H : 0
      minX = Math.min(minX, n.x - extra)
      minY = Math.min(minY, n.y - extraY)
      maxX = Math.max(maxX, n.x + nodeWidth + extra)
      maxY = Math.max(maxY, n.y + nodeHeight + extraY)
    }

    const contentW = maxX - minX
    const contentH = maxY - minY
    const containerW = container.clientWidth
    const containerH = canvasHeight * 1.1

    const pad = 40
    const fitZoom = clampZoom(Math.min(
      (containerW - pad * 2) / contentW,
      (containerH - pad * 2) / contentH,
    ))

    const contentCenterX = (minX + maxX) / 2
    const contentCenterY = (minY + maxY) / 2
    const screenCenterX = containerW / 2
    const screenCenterY = containerH / 2

    const svgOriginX = canvasWidth / 2
    const svgOriginY = canvasHeight / 2
    const panX = screenCenterX - (contentCenterX - svgOriginX) * fitZoom - canvasWidth / 2
    const panY = screenCenterY - (contentCenterY - svgOriginY) * fitZoom - canvasHeight / 2

    setZoom(fitZoom)
    setPan({ x: panX, y: panY })
  }, [canvasHeight, canvasWidth, nodeHeight, nodeWidth, nodes, setPan, setZoom])

  // Auto-fit on mount so the diagram starts centered
  const didAutoFit = useRef(false)
  useEffect(() => {
    if (didAutoFit.current) return
    const raf = requestAnimationFrame(() => {
      handleFit()
      didAutoFit.current = true
    })
    return () => cancelAnimationFrame(raf)
  }, [handleFit])

  // Generate unique IDs per instance to avoid SVG def collisions
  const reactId = useId()
  const uid = reactId.replace(/:/g, "")

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-[10px] cursor-grab",
        isDark
          ? "bg-[var(--bb-dark)] border border-white/[0.12]"
          : "bg-[#e8e2d6] border border-black/10",
        className,
      )}
    >
      {/* Interactive canvas area with ContextMenu */}
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div
            className="w-full overflow-hidden touch-none"
            style={{ height: canvasHeight * 1.1 }}
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onContextMenu={() => { /* contextNode already set by node hit rect, or null for canvas */ }}
          >
        <svg
          viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
          style={{
            width: canvasWidth,
            height: canvasHeight,
            display: "block",
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "center center",
            transition: isPanning ? "none" : "transform 0.15s ease-out",
          }}
          aria-label="Flow diagram"
          role="img"
        >
          <defs>
            {/* Paper texture filter for light mode */}
            <filter id={`paper-${uid}`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={5} seed={3} result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#e8e2d6" surfaceScale={1.5} result="lit">
                <feDistantLight azimuth={45} elevation={55} />
              </feDiffuseLighting>
              <feComposite in="SourceGraphic" in2="lit" operator="arithmetic" k1={0} k2={1} k3={0.12} k4={0} />
            </filter>
            <pattern
              id={`dot-${uid}`}
              width={24} height={24}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={12} cy={12} r={0.5} fill={P.dotGrid} />
            </pattern>
            <marker
              id={`arr-${uid}`}
              markerWidth={6} markerHeight={6}
              refX={5} refY={3} orient="auto" markerUnits="strokeWidth"
            >
              <path d="M0,0.5 L0,5.5 L6,3 z" fill={P.connector} />
            </marker>
            <marker
              id={`arr-a-${uid}`}
              markerWidth={6} markerHeight={6}
              refX={5} refY={3} orient="auto" markerUnits="strokeWidth"
            >
              <path d="M0,0.5 L0,5.5 L6,3 z" fill={P.connectorActive} />
            </marker>
          </defs>

          <rect width={canvasWidth} height={canvasHeight} fill={P.bg} />
          {!isDark && (
            <rect width={canvasWidth} height={canvasHeight} fill={P.bg} filter={`url(#paper-${uid})`} opacity={0.6} />
          )}
          <rect width={canvasWidth} height={canvasHeight} fill={`url(#dot-${uid})`} />

          {/* Edges */}
          {edges.map((edge, idx) => {
            const fromNode = nodeMap.get(edge.from)
            const toNode = nodeMap.get(edge.to)
            if (!fromNode || !toNode) return null

            const isActive = fromNode.active || toNode.active
            const { x1, y1, x2, y2 } = computeConnector(fromNode, toNode, nodeWidth, nodeHeight)
            const pathD = buildPath(x1, y1, x2, y2)
            const labelX = (x1 + x2) / 2
            const labelY = (y1 + y2) / 2

            return (
              <g key={`edge-${idx}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={isActive ? P.connectorActive : P.connector}
                  strokeWidth={isActive ? 1.2 : 0.8}
                  markerEnd={isActive ? `url(#arr-a-${uid})` : `url(#arr-${uid})`}
                />
                {edge.label && (
                  <text
                    x={labelX} y={labelY - 4}
                    textAnchor="middle"
                    fill={isActive ? P.lime : P.dim}
                    fontFamily="var(--font-bb-mono, monospace)"
                    fontSize={7} fontWeight={500}
                    style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => {
            const cx = node.x + nodeWidth / 2
            const isActive = node.active
            const mainY = node.sublabel ? node.y + nodeHeight / 2 - 4 : node.y + nodeHeight / 2 + 1

            return (
              <g key={node.id}>
                <NodeShape node={node} nw={nodeWidth} nh={nodeHeight} p={P} />
                <text
                  x={cx} y={mainY}
                  textAnchor="middle" dominantBaseline="middle"
                  fill={isActive ? P.activeText : P.text}
                  fontFamily="var(--font-bb-sans, sans-serif)"
                  fontSize={9} fontWeight={isActive ? 600 : 400}
                  style={{ letterSpacing: "-0.01em", pointerEvents: "none" }}
                >
                  {node.label}
                </text>
                {node.sublabel && (
                  <text
                    x={cx} y={node.y + nodeHeight / 2 + 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fill={P.dim}
                    fontFamily="var(--font-bb-mono, monospace)"
                    fontSize={6}
                    style={{ textTransform: "uppercase", letterSpacing: "0.08em", pointerEvents: "none" }}
                  >
                    {node.sublabel}
                  </text>
                )}
                {/* Invisible hit area for hover/context menu */}
                <rect
                  x={node.x} y={node.y}
                  width={nodeWidth} height={nodeHeight}
                  fill="transparent" stroke="none"
                  className="cursor-pointer"
                  onMouseEnter={(e) => {
                    if (hoverTimer.current) clearTimeout(hoverTimer.current)
                    const rect = containerRef.current?.getBoundingClientRect()
                    const px = e.clientX - (rect?.left ?? 0)
                    const py = e.clientY - (rect?.top ?? 0)
                    hoverTimer.current = setTimeout(() => {
                      setHoveredNode(node)
                      setHoverPos({ x: px, y: py })
                    }, 500)
                  }}
                  onMouseLeave={() => {
                    if (hoverTimer.current) clearTimeout(hoverTimer.current)
                    setHoveredNode(null)
                  }}
                  onContextMenu={() => setContextNode(node)}
                />
              </g>
            )
          })}
        </svg>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          {contextNode ? (
            <>
              <ContextMenuLabel className="font-mono text-xs">{contextNode.label}</ContextMenuLabel>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => navigator.clipboard?.writeText(contextNode.id)}>
                Copy Node ID
              </ContextMenuItem>
              <ContextMenuItem onClick={() => setContextNode(null)}>
                Deselect
              </ContextMenuItem>
            </>
          ) : (
            <>
              <ContextMenuItem onClick={handleFit}>Fit to View</ContextMenuItem>
              <ContextMenuItem onClick={toggleTheme}>Toggle Theme</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + 0.25))}>Zoom In</ContextMenuItem>
              <ContextMenuItem onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - 0.25))}>Zoom Out</ContextMenuItem>
            </>
          )}
        </ContextMenuContent>
      </ContextMenu>

      {/* HoverCard overlay */}
      {hoveredNode && (
        <div className="absolute z-20 pointer-events-none" style={{ left: hoverPos.x, top: hoverPos.y - 10 }}>
          <HoverCard open>
            <HoverCardTrigger asChild>
              <span className="block w-px h-px" />
            </HoverCardTrigger>
            <HoverCardContent side="top" align="center" sideOffset={8} className="pointer-events-none w-52 bg-popover/95 backdrop-blur-sm">
              <div className="space-y-1">
                <p className="text-sm font-semibold font-mono uppercase tracking-wider">{hoveredNode.label}</p>
                {hoveredNode.sublabel && <p className="text-xs text-muted-foreground">{hoveredNode.sublabel}</p>}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Type: {hoveredNode.type || "default"}</span>
                  <span>Connections: {edges.filter((e) => e.from === hoveredNode.id || e.to === hoveredNode.id).length}</span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}

      {/* Toolbar */}
      <CanvasToolbar
        zoom={zoom}
        onZoomChange={setZoom}
        onFit={handleFit}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
      />

      {/* Legend */}
      <CanvasLegend
        isDark={isDark}
        items={[
          { label: "Active", fill: P.limeDim, border: P.lime },
          { label: "Default", fill: P.surface, border: P.border },
          { label: "Decision", fill: P.surface, border: P.border, shape: "diamond" },
          { label: "Connector", color: P.connector, shape: "line" },
        ]}
      />
    </div>
  )
}
