"use client"

import { cn } from "@/lib/utils"
import { CanvasToolbar, CanvasLegend } from "./canvas-toolbar"
import { useCallback, useEffect, useId, useRef, useState } from "react"

/* ═══════════════════════════════════════════════════════════════════════════
   ICON FLOW DIAGRAM — Architecture diagram with icons per node
   Pure SVG canvas. Tailwind + bb-* tokens for chrome (controls, legend).
   ═══════════════════════════════════════════════════════════════════════════ */

export type IconFlowNodeType = "default" | "primary" | "output"

export interface IconFlowNode {
  id: string
  label: string
  sublabel?: string
  x: number
  y: number
  /** SVG path data for the icon (24x24 viewBox) */
  icon?: string
  type?: IconFlowNodeType
  active?: boolean
}

export interface IconFlowEdge {
  from: string
  to: string
  label?: string
}

export type IconFlowTheme = "dark" | "light"

export interface IconFlowDiagramProps {
  nodes: IconFlowNode[]
  edges: IconFlowEdge[]
  canvasWidth?: number
  canvasHeight?: number
  nodeWidth?: number
  nodeHeight?: number
  /** Visual theme — dark (default) or light (paper/cream) */
  theme?: IconFlowTheme
  className?: string
}

/* ─── Visual constants ────────────────────────────────────────────────────── */
const DEFAULT_NODE_W = 120
const DEFAULT_NODE_H = 80
const RADIUS = 10
const ICON_SIZE = 24

const MIN_ZOOM = 0.3
const MAX_ZOOM = 3
const ZOOM_STEP = 0.15

/* ─── SVG color palettes (only used inside <svg>) ─────────────────────────── */
type SvgPalette = {
  bg: string
  surface: string
  border: string
  lime: string
  iconDefault: string
  iconActive: string
  text: string
  activeText: string
  activeFill: string
  activeBorder: string
  dim: string
  connector: string
  dotGrid: string
  edgePillFill: string
  edgePillBorder: string
}

const SVG_DARK: SvgPalette = {
  bg: "var(--bb-dark, #0c0c0c)",
  surface: "var(--bb-surface, rgba(255,255,255,0.06))",
  border: "var(--bb-border, rgba(255,255,255,0.15))",
  lime: "var(--bb-accent, #ddd1bb)",
  iconDefault: "rgba(255,255,255,0.5)",
  iconActive: "var(--bb-accent, #ddd1bb)",
  text: "var(--bb-cream, #f5f0e8)",
  activeText: "var(--bb-cream, #f5f0e8)",
  activeFill: "var(--bb-surface, rgba(255,255,255,0.06))",
  activeBorder: "var(--bb-accent, #ddd1bb)",
  dim: "var(--bb-dim, rgba(245,244,231,0.4))",
  connector: "rgba(255,255,255,0.18)",
  dotGrid: "rgba(255,255,255,0.08)",
  edgePillFill: "var(--bb-surface, rgba(255,255,255,0.06))",
  edgePillBorder: "var(--bb-border, rgba(255,255,255,0.15))",
}

const SVG_LIGHT: SvgPalette = {
  bg: "#e8e2d6",
  surface: "#1a1a1a",
  border: "rgba(0,0,0,0.30)",
  lime: "#ddd1bb",
  iconDefault: "#8B7500",
  iconActive: "#1a1a1a",
  text: "#ffffff",
  activeText: "#1a1a1a",
  activeFill: "#ddd1bb",
  activeBorder: "#ddd1bb",
  dim: "rgba(0,0,0,0.35)",
  connector: "rgba(0,0,0,0.45)",
  dotGrid: "rgba(0,0,0,0.00)",
  edgePillFill: "rgba(0,0,0,0.06)",
  edgePillBorder: "rgba(0,0,0,0.30)",
}

function getSvgPalette(theme: IconFlowTheme): SvgPalette {
  return theme === "light" ? SVG_LIGHT : SVG_DARK
}

/* ─── Geometry helpers ────────────────────────────────────────────────────── */

function getNodeCenter(node: IconFlowNode, nw: number, nh: number) {
  return { cx: node.x + nw / 2, cy: node.y + nh / 2 }
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
  node: IconFlowNode, nw: number, nh: number,
  side: "top" | "bottom" | "left" | "right",
): { x: number; y: number } {
  const cx = node.x + nw / 2
  const cy = node.y + nh / 2
  switch (side) {
    case "top":    return { x: cx, y: node.y }
    case "bottom": return { x: cx, y: node.y + nh }
    case "left":   return { x: node.x, y: cy }
    case "right":  return { x: node.x + nw, y: cy }
  }
}

function computeConnector(from: IconFlowNode, to: IconFlowNode, nw: number, nh: number) {
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

/* ─── Icon node shape (SVG — must use native attributes) ──────────────────── */

function IconNodeShape({
  node, nw, nh, p, isDark,
}: {
  node: IconFlowNode; nw: number; nh: number; p: SvgPalette; isDark: boolean
}) {
  const isActive = node.active
  const fillColor = isActive
    ? (isDark ? p.activeFill : p.activeFill)
    : p.surface
  const strokeColor = isActive ? p.activeBorder : p.border
  const strokeWidth = isActive ? 1.5 : 1

  const iconColor = isActive ? p.iconActive : p.iconDefault
  const textColor = isActive ? p.activeText : p.text

  // Icon area: centered in the top portion of the node
  const iconX = node.x + nw / 2 - ICON_SIZE / 2
  const iconY = node.y + 8

  // Label area: bottom portion
  const labelY = node.sublabel ? node.y + nh - 20 : node.y + nh - 14
  const sublabelY = node.y + nh - 10

  return (
    <g>
      {/* Active glow */}
      {isActive && (
        <rect
          x={node.x - 3} y={node.y - 3}
          width={nw + 6} height={nh + 6}
          rx={RADIUS + 2} fill="none" stroke={p.lime} strokeWidth={0.5} opacity={0.25}
        />
      )}

      {/* Node body */}
      <rect
        x={node.x} y={node.y} width={nw} height={nh}
        rx={RADIUS} ry={RADIUS}
        fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth}
      />

      {/* Icon */}
      {node.icon && (
        <svg
          x={iconX} y={iconY}
          width={ICON_SIZE} height={ICON_SIZE}
          viewBox="0 0 24 24"
        >
          <path
            d={node.icon}
            fill="none"
            stroke={iconColor}
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {/* Label */}
      <text
        x={node.x + nw / 2} y={labelY}
        textAnchor="middle" dominantBaseline="middle"
        fill={textColor}
        fontFamily="var(--font-bb-sans, sans-serif)"
        fontSize={9} fontWeight={isActive ? 600 : 400}
        style={{ letterSpacing: "-0.01em", pointerEvents: "none" }}
      >
        {node.label}
      </text>

      {/* Sublabel */}
      {node.sublabel && (
        <text
          x={node.x + nw / 2} y={sublabelY}
          textAnchor="middle" dominantBaseline="middle"
          fill={p.dim}
          fontFamily="var(--font-bb-mono, monospace)"
          fontSize={6}
          style={{ textTransform: "uppercase", letterSpacing: "0.08em", pointerEvents: "none" }}
        >
          {node.sublabel}
        </text>
      )}
    </g>
  )
}

/* ─── Edge label pill (SVG) ───────────────────────────────────────────────── */

function EdgeLabelPill({
  x, y, label, p,
}: {
  x: number; y: number; label: string; p: SvgPalette
}) {
  const paddingX = 6
  const paddingY = 3
  const charWidth = 4.5
  const pillW = label.length * charWidth + paddingX * 2
  const pillH = 14

  return (
    <g>
      <rect
        x={x - pillW / 2} y={y - pillH / 2}
        width={pillW} height={pillH}
        rx={pillH / 2} ry={pillH / 2}
        fill={p.edgePillFill}
        stroke={p.edgePillBorder}
        strokeWidth={0.5}
      />
      <text
        x={x} y={y + paddingY - 2}
        textAnchor="middle" dominantBaseline="middle"
        fill={p.dim}
        fontFamily="var(--font-bb-mono, monospace)"
        fontSize={7} fontWeight={500}
        style={{ textTransform: "uppercase", letterSpacing: "0.06em", pointerEvents: "none" }}
      >
        {label}
      </text>
    </g>
  )
}


/* ─── Main component ──────────────────────────────────────────────────────── */

export function IconFlowDiagram({
  nodes,
  edges,
  canvasWidth = 700,
  canvasHeight = 420,
  nodeWidth = DEFAULT_NODE_W,
  nodeHeight = DEFAULT_NODE_H,
  theme: initialTheme = "dark",
  className,
}: IconFlowDiagramProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const [activeTheme, setActiveTheme] = useState<IconFlowTheme>(initialTheme)
  const P = getSvgPalette(activeTheme)
  const isDark = activeTheme === "dark"
  const toggleTheme = useCallback(() => setActiveTheme((t) => t === "dark" ? "light" : "dark"), [])

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
      minX = Math.min(minX, n.x)
      minY = Math.min(minY, n.y)
      maxX = Math.max(maxX, n.x + nodeWidth)
      maxY = Math.max(maxY, n.y + nodeHeight)
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
      {/* Interactive canvas area */}
      <div
        className="w-full overflow-hidden touch-none"
        style={{ height: canvasHeight * 1.1 }}
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
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
          aria-label="Icon flow diagram"
          role="img"
        >
          <defs>
            {/* Paper texture filter for light mode */}
            <filter id={`ifd-paper-${uid}`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={5} seed={3} result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#e8e2d6" surfaceScale={1.5} result="lit">
                <feDistantLight azimuth={45} elevation={55} />
              </feDiffuseLighting>
              <feComposite in="SourceGraphic" in2="lit" operator="arithmetic" k1={0} k2={1} k3={0.12} k4={0} />
            </filter>
            <pattern
              id={`ifd-dot-${uid}`}
              width={24} height={24}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={12} cy={12} r={0.5} fill={P.dotGrid} />
            </pattern>
            <marker
              id={`ifd-arr-${uid}`}
              markerWidth={6} markerHeight={6}
              refX={5} refY={3} orient="auto" markerUnits="strokeWidth"
            >
              <path d="M0,0.5 L0,5.5 L6,3 z" fill={P.connector} />
            </marker>
          </defs>

          {/* Background */}
          <rect width={canvasWidth} height={canvasHeight} fill={P.bg} />
          {!isDark && (
            <rect width={canvasWidth} height={canvasHeight} fill={P.bg} filter={`url(#ifd-paper-${uid})`} opacity={0.6} />
          )}
          <rect width={canvasWidth} height={canvasHeight} fill={`url(#ifd-dot-${uid})`} />

          {/* Edges */}
          {edges.map((edge, idx) => {
            const fromNode = nodeMap.get(edge.from)
            const toNode = nodeMap.get(edge.to)
            if (!fromNode || !toNode) return null

            const { x1, y1, x2, y2 } = computeConnector(fromNode, toNode, nodeWidth, nodeHeight)
            const pathD = buildPath(x1, y1, x2, y2)
            const labelX = (x1 + x2) / 2
            const labelY = (y1 + y2) / 2

            return (
              <g key={`edge-${idx}`}>
                <path
                  d={pathD}
                  fill="none"
                  stroke={P.connector}
                  strokeWidth={0.8}
                  markerEnd={`url(#ifd-arr-${uid})`}
                />
                {edge.label && (
                  <EdgeLabelPill x={labelX} y={labelY} label={edge.label} p={P} />
                )}
              </g>
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <IconNodeShape
              key={node.id}
              node={node}
              nw={nodeWidth}
              nh={nodeHeight}
              p={P}
              isDark={isDark}
            />
          ))}
        </svg>
      </div>

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
          { label: "Active", fill: P.activeFill, border: P.activeBorder },
          { label: "Default", fill: P.surface, border: P.border },
          { label: "Connector", color: P.connector, shape: "line" },
        ]}
      />
    </div>
  )
}
