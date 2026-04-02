declare module "react-simple-maps" {
  import type { ComponentType, CSSProperties, ReactNode } from "react"

  interface ProjectionConfig {
    scale?: number
    center?: [number, number]
    rotate?: [number, number, number]
  }

  interface ComposableMapProps {
    projection?: string
    projectionConfig?: ProjectionConfig
    width?: number
    height?: number
    style?: CSSProperties
    children?: ReactNode
  }

  interface ZoomableGroupProps {
    zoom?: number
    center?: [number, number]
    minZoom?: number
    maxZoom?: number
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void
    children?: ReactNode
  }

  interface GeographyStyle {
    default?: CSSProperties & { outline?: string }
    hover?: CSSProperties & { outline?: string }
    pressed?: CSSProperties & { outline?: string }
  }

  interface GeographyProps {
    geography: Record<string, unknown> & { rsmKey: string }
    fill?: string
    stroke?: string
    strokeWidth?: number
    style?: GeographyStyle
  }

  interface GeographiesChildProps {
    geographies: Array<Record<string, unknown> & { rsmKey: string }>
  }

  interface GeographiesProps {
    geography: string | Record<string, unknown>
    children: (props: GeographiesChildProps) => ReactNode
  }

  interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
    onMouseEnter?: (event: React.MouseEvent) => void
    onMouseLeave?: (event: React.MouseEvent) => void
    onClick?: (event: React.MouseEvent) => void
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<MarkerProps>
}
