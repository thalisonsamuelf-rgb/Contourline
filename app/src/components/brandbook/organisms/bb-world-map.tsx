"use client"

import { lazy, useState, useCallback, useRef } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps"
import { cn } from "@/lib/utils"

/* ── Types ── */

export interface BbWorldMapMarker {
  coordinates: [number, number]
  label: string
  value?: string | number
  color?: string
}

export interface BbWorldMapProps {
  markers?: BbWorldMapMarker[]
  zoomable?: boolean
  projectionType?: "geoMercator" | "geoEqualEarth"
  height?: number
  className?: string
}

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

/* ── Zoom Controls ── */

function ZoomControls({
  zoom,
  minZoom,
  maxZoom,
  onZoomIn,
  onZoomOut,
  onReset,
}: {
  zoom: number
  minZoom: number
  maxZoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
}) {
  const btnClass =
    "flex h-7 w-7 items-center justify-center rounded bg-[var(--bb-surface)] border border-[var(--bb-border)] text-[var(--bb-cream)] transition-colors hover:border-[var(--bb-border-hover)] hover:text-[var(--bb-accent)] disabled:opacity-30 disabled:cursor-not-allowed"

  return (
    <div className="absolute right-3 top-3 z-10 flex flex-col gap-1">
      <button
        type="button"
        className={btnClass}
        onClick={onZoomIn}
        disabled={zoom >= maxZoom}
        aria-label="Zoom in"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
      </button>
      <button
        type="button"
        className={btnClass}
        onClick={onZoomOut}
        disabled={zoom <= minZoom}
        aria-label="Zoom out"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
      </button>
      <button
        type="button"
        className={btnClass}
        onClick={onReset}
        aria-label="Reset zoom"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="12" x2="15" y2="15" /></svg>
      </button>
    </div>
  )
}

/* ── Tooltip ── */

function MarkerTooltip({
  marker,
  x,
  y,
}: {
  marker: BbWorldMapMarker
  x: number
  y: number
}) {
  return (
    <div
      className="pointer-events-none absolute z-20 rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-2.5 py-1.5 shadow-lg"
      style={{
        left: x,
        top: y - 48,
        transform: "translateX(-50%)",
      }}
    >
      <p className="font-bb-mono text-[0.65rem] font-medium text-[var(--bb-cream)]">
        {marker.label}
      </p>
      {marker.value != null && (
        <p className="font-bb-mono text-[0.55rem] text-[var(--bb-dim)]">
          {marker.value}
        </p>
      )}
    </div>
  )
}

/* ── Main Component ── */

export function BbWorldMap({
  markers = [],
  zoomable = true,
  projectionType = "geoEqualEarth",
  height = 400,
  className,
}: BbWorldMapProps) {
  const [zoom, setZoom] = useState(1)
  const [hoveredMarker, setHoveredMarker] = useState<BbWorldMapMarker | null>(null)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })
  const [geoError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const minZoom = 1
  const maxZoom = 4

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z * 1.5, maxZoom))
  }, [])

  const handleZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z / 1.5, minZoom))
  }, [])

  const handleReset = useCallback(() => {
    setZoom(1)
  }, [])

  const handleMarkerHover = useCallback(
    (marker: BbWorldMapMarker, e: React.MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setHoveredMarker(marker)
    },
    [],
  )

  // Scale markers inversely with zoom
  const markerScale = 1 / Math.sqrt(zoom)

  if (geoError) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-lg border border-[var(--bb-border)] bg-[var(--bb-surface)]",
          className,
        )}
        style={{ height }}
      >
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--bb-dim)" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <p className="font-bb-mono text-xs text-[var(--bb-dim)]">
          Mapa indisponível — falha ao carregar dados geográficos
        </p>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg border border-[var(--bb-border)]",
        "bg-[var(--bb-map-water,var(--bb-dark))]",
        className,
      )}
      style={{ height }}
    >
      {zoomable && (
        <ZoomControls
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
        />
      )}

      {hoveredMarker && (
        <MarkerTooltip marker={hoveredMarker} x={tooltipPos.x} y={tooltipPos.y} />
      )}

      <ComposableMap
        projection={projectionType}
        projectionConfig={{ scale: projectionType === "geoEqualEarth" ? 150 : 120 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ZoomableGroup
          zoom={zoom}
          onMoveEnd={({ zoom: z }) => setZoom(z)}
          maxZoom={zoomable ? maxZoom : 1}
          minZoom={minZoom}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="var(--bb-map-land, var(--bb-surface-alt))"
                  stroke="var(--bb-map-border, rgba(156,156,156,0.12))"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: {
                      fill: "var(--bb-map-land-hover, rgba(221, 209, 187,0.08))",
                      outline: "none",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {markers.map((marker, i) => (
            <Marker
              key={`${marker.label}-${i}`}
              coordinates={marker.coordinates}
              onMouseEnter={(e: React.MouseEvent) => handleMarkerHover(marker, e)}
              onMouseLeave={() => setHoveredMarker(null)}
            >
              <circle
                r={8 * markerScale}
                fill={marker.color || "var(--bb-map-marker, var(--bb-accent))"}
                fillOpacity={0.25}
                className="animate-pulse"
              />
              <circle
                r={4 * markerScale}
                fill={marker.color || "var(--bb-map-marker, var(--bb-accent))"}
                cursor="pointer"
              />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export const BbWorldMapLazy = lazy(() =>
  import("./bb-world-map").then((m) => ({ default: m.BbWorldMap })),
)
