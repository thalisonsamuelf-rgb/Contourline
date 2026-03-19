"use client"

import { cn } from "@/lib/utils"
import { CanvasToolbar, CanvasLegend } from "./canvas-toolbar"
import { useCallback, useEffect, useId, useRef, useState } from "react"

/* ═══════════════════════════════════════════════════════════════════════════
   PIPELINE DIAGRAM — AI Pipeline / Service Architecture
   SVG canvas with service-card nodes, named ports, and dashed connectors.
   Tailwind + bb-* tokens for chrome. shadcn for controls + legend.
   ═══════════════════════════════════════════════════════════════════════════ */

export type PipelineNodeType = "input" | "ai" | "output" | "service"

export interface PipelinePort {
  id: string
  label: string
  sublabel?: string
  side: "left" | "right" | "bottom"
}

export interface PipelineNode {
  id: string
  type: PipelineNodeType
  label: string
  sublabel?: string
  x: number
  y: number
  width?: number
  ports: PipelinePort[]
  status?: "ready" | "running" | "error" | "idle"
}

export interface PipelineEdge {
  fromNode: string
  fromPort: string
  toNode: string
  toPort: string
}

export interface PipelineDiagramProps {
  nodes: PipelineNode[]
  edges: PipelineEdge[]
  canvasWidth?: number
  canvasHeight?: number
  theme?: "dark" | "light"
  className?: string
}

/* ─── Visual constants ────────────────────────────────────────────────────── */
const DEFAULT_NODE_W = 200
const HEADER_H = 45
const BODY_H = 35
const PORT_ROW_H = 24
const PAD_BOTTOM = 8
const PORT_CIRCLE_R = 5
const CORNER_R = 8
const MIN_ZOOM = 0.3
const MAX_ZOOM = 3
const ZOOM_STEP = 0.15

type PipelineTheme = "dark" | "light"

/* ─── SVG color palettes ──────────────────────────────────────────────────── */
type SvgPalette = {
  bg: string
  surface: string
  border: string
  text: string
  dim: string
  portStroke: string
  connector: string
  dotGrid: string
  badgeAi: string
  badgeAiText: string
  badgeInput: string
  badgeInputText: string
  badgeOutput: string
  badgeOutputText: string
  badgeService: string
  badgeServiceText: string
  statusReady: string
  statusRunning: string
  statusError: string
  statusIdle: string
}

const SVG_DARK: SvgPalette = {
  bg: "var(--bb-dark, #0c0c0c)",
  surface: "var(--bb-surface, rgba(255,255,255,0.06))",
  border: "var(--bb-border, rgba(255,255,255,0.15))",
  text: "var(--bb-cream, #f5f0e8)",
  dim: "var(--bb-dim, rgba(245,244,231,0.4))",
  portStroke: "#a855f7",
  connector: "rgba(255,255,255,0.15)",
  dotGrid: "rgba(255,255,255,0.08)",
  badgeAi: "#22c55e",
  badgeAiText: "#052e16",
  badgeInput: "#3b82f6",
  badgeInputText: "#ffffff",
  badgeOutput: "#f97316",
  badgeOutputText: "#ffffff",
  badgeService: "rgba(255,255,255,0.15)",
  badgeServiceText: "rgba(255,255,255,0.7)",
  statusReady: "#22c55e",
  statusRunning: "#3b82f6",
  statusError: "#ef4444",
  statusIdle: "#6b7280",
}

const SVG_LIGHT: SvgPalette = {
  bg: "#e8e2d6",
  surface: "#1a1a1a",
  border: "rgba(0,0,0,0.30)",
  text: "#ffffff",
  dim: "rgba(255,255,255,0.5)",
  portStroke: "#a855f7",
  connector: "rgba(0,0,0,0.25)",
  dotGrid: "rgba(0,0,0,0.00)",
  badgeAi: "#22c55e",
  badgeAiText: "#052e16",
  badgeInput: "#3b82f6",
  badgeInputText: "#ffffff",
  badgeOutput: "#f97316",
  badgeOutputText: "#ffffff",
  badgeService: "rgba(0,0,0,0.25)",
  badgeServiceText: "rgba(255,255,255,0.7)",
  statusReady: "#22c55e",
  statusRunning: "#3b82f6",
  statusError: "#ef4444",
  statusIdle: "#6b7280",
}

function getPalette(theme: PipelineTheme): SvgPalette {
  return theme === "light" ? SVG_LIGHT : SVG_DARK
}

/* ─── Geometry helpers ────────────────────────────────────────────────────── */

function getNodeHeight(node: PipelineNode): number {
  return HEADER_H + BODY_H + node.ports.length * PORT_ROW_H + PAD_BOTTOM
}

function getNodeWidth(node: PipelineNode): number {
  return node.width ?? DEFAULT_NODE_W
}

/** Get the absolute position of a port's connection circle */
function getPortPosition(
  node: PipelineNode,
  port: PipelinePort,
): { x: number; y: number } {
  const nw = getNodeWidth(node)
  const nh = getNodeHeight(node)
  const portIndex = node.ports.indexOf(port)

  if (port.side === "bottom") {
    const bottomPorts = node.ports.filter((p) => p.side === "bottom")
    const bIdx = bottomPorts.indexOf(port)
    const spacing = nw / (bottomPorts.length + 1)
    return {
      x: node.x + spacing * (bIdx + 1),
      y: node.y + nh,
    }
  }

  // Left and right ports are positioned in the ports area (below header + body)
  const sidePorts = node.ports.filter((p) => p.side === port.side)
  const sIdx = sidePorts.indexOf(port)
  const portsStartY = node.y + HEADER_H + BODY_H
  const py = portsStartY + sIdx * PORT_ROW_H + PORT_ROW_H / 2

  if (port.side === "left") {
    return { x: node.x, y: py }
  }
  // right
  return { x: node.x + nw, y: py }
  // portIndex is used implicitly through the sidePorts filter above
  void portIndex
}

/** Build an orthogonal (right-angle) path with rounded corners between two ports */
function buildOrthogonalPath(
  x1: number, y1: number, side1: "left" | "right" | "bottom",
  x2: number, y2: number, side2: "left" | "right" | "bottom",
): string {
  const r = 6 // corner radius

  // Exit direction vector
  const exitLen = 20
  let ex1 = x1, ey1 = y1
  if (side1 === "right") ex1 = x1 + exitLen
  else if (side1 === "left") ex1 = x1 - exitLen
  else ey1 = y1 + exitLen

  // Entry direction vector
  let ex2 = x2, ey2 = y2
  if (side2 === "left") ex2 = x2 - exitLen
  else if (side2 === "right") ex2 = x2 + exitLen
  else ey2 = y2 + exitLen

  // Simple 3-segment orthogonal route:
  // horizontal exit → vertical travel → horizontal entry
  if (side1 === "right" && side2 === "left") {
    const midX = (ex1 + ex2) / 2
    return buildRoundedOrthogonal(x1, y1, ex1, y1, midX, y1, midX, y2, ex2, y2, x2, y2, r)
  }
  if (side1 === "left" && side2 === "right") {
    const midX = (ex1 + ex2) / 2
    return buildRoundedOrthogonal(x1, y1, ex1, y1, midX, y1, midX, y2, ex2, y2, x2, y2, r)
  }
  if (side1 === "bottom" && side2 === "left") {
    return `M ${x1} ${y1} L ${x1} ${ey1} Q ${x1} ${y2} ${Math.min(x1, x2 - exitLen)} ${y2} L ${x2} ${y2}`
  }
  if (side1 === "right" && side2 === "bottom") {
    const midX = x2
    return `M ${x1} ${y1} L ${ex1} ${y1} Q ${midX} ${y1} ${midX} ${Math.min(y1, ey2)} L ${x2} ${y2}`
  }

  // Fallback: simple L-shape or straight line
  if (Math.abs(y1 - y2) < 2) {
    return `M ${x1} ${y1} L ${x2} ${y2}`
  }
  const midX = (x1 + x2) / 2
  return `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2} ${y2}`
}

/** Build a rounded orthogonal path through 6 waypoints (3 segments, 2 corners) */
function buildRoundedOrthogonal(
  _sx: number, _sy: number,
  ax: number, ay: number,
  bx: number, by: number,
  cx: number, cy: number,
  dx: number, dy: number,
  _ex: number, _ey: number,
  r: number,
): string {
  // Clamp radius to half the shortest segment
  const seg1 = Math.abs(bx - ax) + Math.abs(by - ay)
  const seg2 = Math.abs(cx - bx) + Math.abs(cy - by)
  const seg3 = Math.abs(dx - cx) + Math.abs(dy - cy)
  const minSeg = Math.min(seg1, seg2, seg3)
  const cr = Math.min(r, minSeg / 2)

  if (cr < 1) {
    return `M ${_sx} ${_sy} L ${ax} ${ay} L ${bx} ${by} L ${cx} ${cy} L ${dx} ${dy} L ${_ex} ${_ey}`
  }

  // Direction vectors for corners
  const dir = (from: number, to: number) => (to > from ? 1 : to < from ? -1 : 0)

  // Corner 1: A→B→C turn at B
  const d1x = dir(ax, bx), d1y = dir(ay, by)
  const d2x = dir(bx, cx), d2y = dir(by, cy)
  const c1StartX = bx - d1x * cr, c1StartY = by - d1y * cr
  const c1EndX = bx + d2x * cr, c1EndY = by + d2y * cr

  // Corner 2: B→C→D turn at C
  const d3x = dir(cx, dx), d3y = dir(cy, dy)
  const c2StartX = cx - d2x * cr, c2StartY = cy - d2y * cr
  const c2EndX = cx + d3x * cr, c2EndY = cy + d3y * cr

  return [
    `M ${_sx} ${_sy}`,
    `L ${c1StartX} ${c1StartY}`,
    `Q ${bx} ${by} ${c1EndX} ${c1EndY}`,
    `L ${c2StartX} ${c2StartY}`,
    `Q ${cx} ${cy} ${c2EndX} ${c2EndY}`,
    `L ${_ex} ${_ey}`,
  ].join(" ")
}

/* ─── Type badge colors ───────────────────────────────────────────────────── */
function getBadgeColors(type: PipelineNodeType, p: SvgPalette) {
  switch (type) {
    case "ai":      return { bg: p.badgeAi, text: p.badgeAiText }
    case "input":   return { bg: p.badgeInput, text: p.badgeInputText }
    case "output":  return { bg: p.badgeOutput, text: p.badgeOutputText }
    case "service": return { bg: p.badgeService, text: p.badgeServiceText }
  }
}

function getStatusColor(status: PipelineNode["status"], p: SvgPalette): string {
  switch (status) {
    case "ready":   return p.statusReady
    case "running": return p.statusRunning
    case "error":   return p.statusError
    case "idle":    return p.statusIdle
    default:        return p.statusIdle
  }
}

function getStatusLabel(status: PipelineNode["status"]): string {
  switch (status) {
    case "ready":   return "Ready"
    case "running": return "Running"
    case "error":   return "Error"
    case "idle":    return "Idle"
    default:        return "Idle"
  }
}

function getTypeBadgeLabel(type: PipelineNodeType): string {
  switch (type) {
    case "ai":      return "AI"
    case "input":   return "Input"
    case "output":  return "Output"
    case "service": return "Service"
  }
}

/* ─── SVG node rendering ──────────────────────────────────────────────────── */

function PipelineNodeCard({
  node,
  p,
}: {
  node: PipelineNode
  p: SvgPalette
}) {
  const nw = getNodeWidth(node)
  const nh = getNodeHeight(node)
  const badge = getBadgeColors(node.type, p)
  const statusColor = getStatusColor(node.status, p)
  const statusLabel = getStatusLabel(node.status)
  const typeBadgeLabel = getTypeBadgeLabel(node.type)

  const leftPorts = node.ports.filter((port) => port.side === "left")
  const rightPorts = node.ports.filter((port) => port.side === "right")
  const bottomPorts = node.ports.filter((port) => port.side === "bottom")
  const portsStartY = node.y + HEADER_H + BODY_H

  return (
    <g>
      {/* Card background */}
      <rect
        x={node.x} y={node.y}
        width={nw} height={nh}
        rx={CORNER_R} ry={CORNER_R}
        fill={p.surface}
        stroke={p.border}
        strokeWidth={1}
      />

      {/* Header separator */}
      <line
        x1={node.x} y1={node.y + HEADER_H}
        x2={node.x + nw} y2={node.y + HEADER_H}
        stroke={p.border} strokeWidth={0.5}
      />

      {/* Type badge pill */}
      <rect
        x={node.x + 8} y={node.y + 8}
        width={typeBadgeLabel.length * 6.5 + 10} height={16}
        rx={8} ry={8}
        fill={badge.bg}
      />
      <text
        x={node.x + 8 + (typeBadgeLabel.length * 6.5 + 10) / 2}
        y={node.y + 18}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={badge.text}
        fontFamily="var(--font-bb-mono, monospace)"
        fontSize={7}
        fontWeight={600}
        style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}
      >
        {typeBadgeLabel}
      </text>

      {/* Status dot + text */}
      <circle
        cx={node.x + nw - 40}
        cy={node.y + 16}
        r={3.5}
        fill={statusColor}
      />
      <text
        x={node.x + nw - 33}
        y={node.y + 17}
        dominantBaseline="middle"
        fill={p.dim}
        fontFamily="var(--font-bb-mono, monospace)"
        fontSize={7}
        style={{ letterSpacing: "0.04em" }}
      >
        {statusLabel}
      </text>

      {/* Body: label */}
      <text
        x={node.x + nw / 2}
        y={node.y + HEADER_H + 14}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={p.text}
        fontFamily="var(--font-bb-sans, sans-serif)"
        fontSize={11}
        fontWeight={700}
        style={{ letterSpacing: "-0.01em" }}
      >
        {node.label}
      </text>

      {/* Body: sublabel */}
      {node.sublabel && (
        <text
          x={node.x + nw / 2}
          y={node.y + HEADER_H + 27}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={p.dim}
          fontFamily="var(--font-bb-mono, monospace)"
          fontSize={7}
          style={{ textTransform: "lowercase", letterSpacing: "0.04em" }}
        >
          {node.sublabel}
        </text>
      )}

      {/* Ports separator */}
      {node.ports.length > 0 && (
        <line
          x1={node.x} y1={portsStartY}
          x2={node.x + nw} y2={portsStartY}
          stroke={p.border} strokeWidth={0.5}
        />
      )}

      {/* Left ports */}
      {leftPorts.map((port, i) => {
        const py = portsStartY + i * PORT_ROW_H + PORT_ROW_H / 2
        return (
          <g key={port.id}>
            <circle
              cx={node.x} cy={py}
              r={PORT_CIRCLE_R}
              fill="transparent"
              stroke={p.portStroke}
              strokeWidth={1.5}
            />
            <text
              x={node.x + PORT_CIRCLE_R + 5}
              y={py - (port.sublabel ? 3 : 0)}
              dominantBaseline="middle"
              fill={p.dim}
              fontFamily="var(--font-bb-mono, monospace)"
              fontSize={7}
              style={{ letterSpacing: "0.04em" }}
            >
              {port.label}
            </text>
            {port.sublabel && (
              <text
                x={node.x + PORT_CIRCLE_R + 5}
                y={py + 7}
                dominantBaseline="middle"
                fill={p.dim}
                fontFamily="var(--font-bb-mono, monospace)"
                fontSize={6}
                opacity={0.6}
                style={{ letterSpacing: "0.02em" }}
              >
                {port.sublabel}
              </text>
            )}
          </g>
        )
      })}

      {/* Right ports */}
      {rightPorts.map((port, i) => {
        const py = portsStartY + i * PORT_ROW_H + PORT_ROW_H / 2
        return (
          <g key={port.id}>
            <circle
              cx={node.x + nw} cy={py}
              r={PORT_CIRCLE_R}
              fill="transparent"
              stroke={p.portStroke}
              strokeWidth={1.5}
            />
            <text
              x={node.x + nw - PORT_CIRCLE_R - 5}
              y={py - (port.sublabel ? 3 : 0)}
              textAnchor="end"
              dominantBaseline="middle"
              fill={p.dim}
              fontFamily="var(--font-bb-mono, monospace)"
              fontSize={7}
              style={{ letterSpacing: "0.04em" }}
            >
              {port.label}
            </text>
            {port.sublabel && (
              <text
                x={node.x + nw - PORT_CIRCLE_R - 5}
                y={py + 7}
                textAnchor="end"
                dominantBaseline="middle"
                fill={p.dim}
                fontFamily="var(--font-bb-mono, monospace)"
                fontSize={6}
                opacity={0.6}
                style={{ letterSpacing: "0.02em" }}
              >
                {port.sublabel}
              </text>
            )}
          </g>
        )
      })}

      {/* Bottom ports */}
      {bottomPorts.map((port, bIdx) => {
        const spacing = nw / (bottomPorts.length + 1)
        const px = node.x + spacing * (bIdx + 1)
        const py = node.y + nh
        return (
          <g key={port.id}>
            <circle
              cx={px} cy={py}
              r={PORT_CIRCLE_R}
              fill="transparent"
              stroke={p.portStroke}
              strokeWidth={1.5}
            />
            <text
              x={px}
              y={py + PORT_CIRCLE_R + 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={p.dim}
              fontFamily="var(--font-bb-mono, monospace)"
              fontSize={7}
              style={{ letterSpacing: "0.04em" }}
            >
              {port.label}
            </text>
            {port.sublabel && (
              <text
                x={px}
                y={py + PORT_CIRCLE_R + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={p.dim}
                fontFamily="var(--font-bb-mono, monospace)"
                fontSize={6}
                opacity={0.6}
                style={{ letterSpacing: "0.02em" }}
              >
                {port.sublabel}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}


/* ─── Main component ──────────────────────────────────────────────────────── */

export function PipelineDiagram({
  nodes,
  edges,
  canvasWidth = 800,
  canvasHeight = 500,
  theme: initialTheme = "dark",
  className,
}: PipelineDiagramProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]))
  const [activeTheme, setActiveTheme] = useState<PipelineTheme>(initialTheme)
  const P = getPalette(activeTheme)
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
      const nw = getNodeWidth(n)
      const nh = getNodeHeight(n)
      minX = Math.min(minX, n.x)
      minY = Math.min(minY, n.y)
      maxX = Math.max(maxX, n.x + nw)
      maxY = Math.max(maxY, n.y + nh)
    }

    const contentW = maxX - minX
    const contentH = maxY - minY
    const containerW = container.clientWidth
    const containerH = canvasHeight * 1.1

    const pad = 60
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
  }, [canvasHeight, canvasWidth, nodes, setPan, setZoom])

  // Auto-fit on mount
  const didAutoFit = useRef(false)
  useEffect(() => {
    if (didAutoFit.current) return
    const raf = requestAnimationFrame(() => {
      handleFit()
      didAutoFit.current = true
    })
    return () => cancelAnimationFrame(raf)
  }, [handleFit])

  // Unique IDs for SVG defs
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
          aria-label="Pipeline diagram"
          role="img"
        >
          <defs>
            {/* Paper texture filter for light mode */}
            <filter id={`paper-pl-${uid}`} x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves={5} seed={3} result="noise" />
              <feDiffuseLighting in="noise" lightingColor="#e8e2d6" surfaceScale={1.5} result="lit">
                <feDistantLight azimuth={45} elevation={55} />
              </feDiffuseLighting>
              <feComposite in="SourceGraphic" in2="lit" operator="arithmetic" k1={0} k2={1} k3={0.12} k4={0} />
            </filter>
            <pattern
              id={`dot-pl-${uid}`}
              width={24} height={24}
              patternUnits="userSpaceOnUse"
            >
              <circle cx={12} cy={12} r={0.5} fill={P.dotGrid} />
            </pattern>
          </defs>

          <rect width={canvasWidth} height={canvasHeight} fill={P.bg} />
          {!isDark && (
            <rect width={canvasWidth} height={canvasHeight} fill={P.bg} filter={`url(#paper-pl-${uid})`} opacity={0.6} />
          )}
          <rect width={canvasWidth} height={canvasHeight} fill={`url(#dot-pl-${uid})`} />

          {/* Edges (dashed connectors between ports) */}
          {edges.map((edge, idx) => {
            const fromNode = nodeMap.get(edge.fromNode)
            const toNode = nodeMap.get(edge.toNode)
            if (!fromNode || !toNode) return null

            const fromPort = fromNode.ports.find((p) => p.id === edge.fromPort)
            const toPort = toNode.ports.find((p) => p.id === edge.toPort)
            if (!fromPort || !toPort) return null

            const p1 = getPortPosition(fromNode, fromPort)
            const p2 = getPortPosition(toNode, toPort)
            const pathD = buildOrthogonalPath(
              p1.x, p1.y, fromPort.side,
              p2.x, p2.y, toPort.side,
            )

            return (
              <path
                key={`edge-${idx}`}
                d={pathD}
                fill="none"
                stroke={P.connector}
                strokeWidth={1}
                strokeDasharray="6 4"
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <PipelineNodeCard key={node.id} node={node} p={P} />
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
          { label: "AI", color: P.badgeAi, shape: "dot" },
          { label: "Input", color: P.badgeInput, shape: "dot" },
          { label: "Output", color: P.badgeOutput, shape: "dot" },
          { label: "Service", color: P.badgeService, shape: "dot" },
          { label: "Connector", color: P.connector, shape: "line" },
        ]}
      />
    </div>
  )
}
