"use client"

import dynamic from "next/dynamic"
import { BbCompPageTemplate } from "../templates"
import { BbCompGrid } from "../organisms"
import { BbCompCell } from "../molecules"
import {
  BbBarChart,
  BbDonutChart,
  BbLineChart,
  BbAreaChart,
  BbPieChart,
  BbRadarChart,
  BbRingsChart,
  BbRadialBarChart,
  BbComposedChart,
  BbWorldMap,
} from "../organisms"
import { BbAnimatedNumber, BbChartTooltip } from "../atoms"
import {
  STARTER_PAGE_CHROME,
  STARTER_REFERENCE_LABELS,
} from "@/components/brandbook/data/starter-brand-data"

const BbKpiGrid = dynamic(
  () => import("../organisms/bb-kpi-grid").then((module) => module.BbKpiGrid),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="min-h-[96px] border border-bb-border bg-bb-surface-panel p-4"
          />
        ))}
      </div>
    ),
  },
)

/* ── Sample Data ── */

const barData = [
  { label: "Jan", value: 45 },
  { label: "Feb", value: 62 },
  { label: "Mar", value: 38 },
  { label: "Apr", value: 71 },
  { label: "May", value: 55 },
  { label: "Jun", value: 89 },
  { label: "Jul", value: 76 },
  { label: "Aug", value: 94 },
]

const donutSegments = [
  { label: "Automation", value: 42 },
  { label: "Support", value: 28 },
  { label: "Analytics", value: 18 },
  { label: "Other", value: 12 },
]

const multiBarData = [
  { label: "Q1", value: 120, color: "var(--bb-accent)" },
  { label: "Q2", value: 185, color: "var(--blue)" },
  { label: "Q3", value: 145, color: "var(--warning)" },
  { label: "Q4", value: 210, color: "var(--bb-accent)" },
]

const lineData = [
  { name: "Jan", revenue: 4000, costs: 2400 },
  { name: "Feb", revenue: 3000, costs: 1398 },
  { name: "Mar", revenue: 5000, costs: 3800 },
  { name: "Apr", revenue: 4780, costs: 3908 },
  { name: "May", revenue: 5890, costs: 4800 },
  { name: "Jun", revenue: 6390, costs: 3800 },
]

const areaData = [
  { name: "Jan", users: 400, sessions: 240 },
  { name: "Feb", users: 300, sessions: 139 },
  { name: "Mar", users: 600, sessions: 380 },
  { name: "Apr", users: 478, sessions: 390 },
  { name: "May", users: 589, sessions: 480 },
  { name: "Jun", users: 739, sessions: 580 },
]

const pieData = [
  { name: "Automation", value: 42 },
  { name: "Support", value: 28 },
  { name: "Analytics", value: 18 },
  { name: "Other", value: 12 },
]

const radarData = [
  { skill: "Speed", score: 85 },
  { skill: "Quality", score: 90 },
  { skill: "Scale", score: 70 },
  { skill: "Security", score: 88 },
  { skill: "UX", score: 75 },
  { skill: "Cost", score: 60 },
]

const ringsData = [
  { label: "Automação", value: 85, maxValue: 100 },
  { label: "Integração", value: 62, maxValue: 100 },
  { label: "Adoção", value: 45, maxValue: 100 },
]

const radialBarData = [
  { name: "Chrome", value: 65 },
  { name: "Safari", value: 48 },
  { name: "Firefox", value: 32 },
  { name: "Edge", value: 21 },
]

const composedData = [
  { name: "Jan", revenue: 4000, target: 3500, growth: 15 },
  { name: "Feb", revenue: 3000, target: 3200, growth: -8 },
  { name: "Mar", revenue: 5000, target: 4000, growth: 25 },
  { name: "Apr", revenue: 4780, target: 4500, growth: 12 },
  { name: "May", revenue: 5890, target: 5000, growth: 23 },
  { name: "Jun", revenue: 6390, target: 5500, growth: 18 },
]

export function ChartsPage() {
  const chrome = STARTER_PAGE_CHROME.charts

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Chart",
        titleHighlight: "Library",
      }}
      sections={[
        /* ── Legacy Charts ── */
        {
          label: "Bar Chart (SVG)",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Monthly Performance"
                preview={<BbBarChart data={barData} height={200} />}
              />
              <BbCompCell
                name="Colored Bars"
                preview={<BbBarChart data={multiBarData} height={200} />}
              />
            </BbCompGrid>
          ),
        },
        {
          label: "Donut Chart (SVG)",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Default"
                preview={<BbDonutChart segments={donutSegments} size={160} />}
              />
              <BbCompCell
                name="Custom Colors"
                preview={
                  <BbDonutChart
                    segments={[
                      { label: "A", value: 55, color: "var(--bb-chart-1)" },
                      { label: "B", value: 30, color: "var(--bb-chart-2)" },
                      { label: "C", value: 15, color: "var(--bb-chart-5)" },
                    ]}
                    size={160}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Recharts: Line ── */
        {
          label: "Line Chart",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Single Line"
                preview={
                  <BbLineChart
                    data={lineData}
                    lines={[{ dataKey: "revenue", label: "Revenue" }]}
                    height={220}
                  />
                }
              />
              <BbCompCell
                name="Multi-Line + Legend"
                preview={
                  <BbLineChart
                    data={lineData}
                    lines={[
                      { dataKey: "revenue", label: "Revenue" },
                      { dataKey: "costs", label: "Costs" },
                    ]}
                    showLegend
                    height={220}
                  />
                }
              />
              <BbCompCell
                name="Without Grid"
                preview={
                  <BbLineChart
                    data={lineData}
                    lines={[{ dataKey: "revenue", label: "Revenue" }]}
                    showGrid={false}
                    height={220}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Recharts: Area ── */
        {
          label: "Area Chart",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Default (monotone)"
                preview={
                  <BbAreaChart
                    data={areaData}
                    areas={[{ dataKey: "users", label: "Users" }]}
                    height={220}
                  />
                }
              />
              <BbCompCell
                name="Multi-Area + Legend"
                preview={
                  <BbAreaChart
                    data={areaData}
                    areas={[
                      { dataKey: "users", label: "Users" },
                      { dataKey: "sessions", label: "Sessions" },
                    ]}
                    showLegend
                    height={220}
                  />
                }
              />
              <BbCompCell
                name="Linear Curve"
                preview={
                  <BbAreaChart
                    data={areaData}
                    areas={[{ dataKey: "users", label: "Users" }]}
                    curveType="linear"
                    height={220}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Recharts: Pie ── */
        {
          label: "Pie Chart",
          content: (
            <BbCompGrid columns={3}>
              <BbCompCell
                name="Pie"
                preview={<BbPieChart data={pieData} height={220} />}
              />
              <BbCompCell
                name="Donut (innerRadius)"
                preview={<BbPieChart data={pieData} height={220} innerRadius={50} />}
              />
              <BbCompCell
                name="With Labels"
                preview={<BbPieChart data={pieData} height={220} showLabels />}
              />
            </BbCompGrid>
          ),
        },

        /* ── Recharts: Radar ── */
        {
          label: "Radar Chart",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Single Series"
                preview={
                  <BbRadarChart
                    data={radarData}
                    axes={[{ dataKey: "skill" }]}
                    series={[{ dataKey: "score", label: "Score" }]}
                    height={260}
                  />
                }
              />
              <BbCompCell
                name="Multi-Series"
                preview={
                  <BbRadarChart
                    data={[
                      { skill: "Speed", current: 85, target: 95 },
                      { skill: "Quality", current: 90, target: 88 },
                      { skill: "Scale", current: 70, target: 85 },
                      { skill: "Security", current: 88, target: 92 },
                      { skill: "UX", current: 75, target: 80 },
                    ]}
                    axes={[{ dataKey: "skill" }]}
                    series={[
                      { dataKey: "current", label: "Current" },
                      { dataKey: "target", label: "Target" },
                    ]}
                    height={260}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Rings Chart ── */
        {
          label: "Rings Chart",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="3 Rings"
                preview={<BbRingsChart rings={ringsData} size={180} />}
              />
              <BbCompCell
                name="Custom Colors"
                preview={
                  <BbRingsChart
                    rings={[
                      { label: "Revenue", value: 92, maxValue: 100, color: "var(--bb-chart-2)" },
                      { label: "Profit", value: 67, maxValue: 100, color: "var(--bb-chart-5)" },
                    ]}
                    size={160}
                    strokeWidth={16}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Animated Number ── */
        {
          label: "Animated Number",
          content: (
            <BbCompGrid columns={4}>
              <BbCompCell
                name="Integer"
                preview={
                  <span className="text-3xl font-bold text-bb-accent">
                    <BbAnimatedNumber value={1234} triggerOnView />
                  </span>
                }
              />
              <BbCompCell
                name="Percentage"
                preview={
                  <span className="text-3xl font-bold text-bb-cream">
                    <BbAnimatedNumber value={99.7} format={(n) => n.toFixed(1)} suffix="%" triggerOnView />
                  </span>
                }
              />
              <BbCompCell
                name="Currency"
                preview={
                  <span className="text-3xl font-bold text-bb-blue">
                    <BbAnimatedNumber value={49900} prefix="R$ " format={(n) => Math.round(n).toLocaleString("pt-BR")} triggerOnView />
                  </span>
                }
              />
              <BbCompCell
                name="Compact"
                preview={
                  <span className="text-3xl font-bold text-bb-warning">
                    <BbAnimatedNumber value={2.4} suffix="K" format={(n) => n.toFixed(1)} triggerOnView />
                  </span>
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Radial Bar Chart ── */
        {
          label: "Radial Bar Chart",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Multi-Bar"
                preview={
                  <BbRadialBarChart data={radialBarData} height={260} />
                }
              />
              <BbCompCell
                name="Single Gauge"
                preview={
                  <BbRadialBarChart
                    data={[{ name: "Progress", value: 78 }]}
                    innerRadius={60}
                    outerRadius={100}
                    height={260}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Composed Chart ── */
        {
          label: "Composed Chart",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Bar + Line"
                preview={
                  <BbComposedChart
                    data={composedData}
                    series={[
                      { dataKey: "revenue", type: "bar", label: "Revenue" },
                      { dataKey: "target", type: "line", label: "Target" },
                    ]}
                    height={250}
                  />
                }
              />
              <BbCompCell
                name="Bar + Line + Area"
                preview={
                  <BbComposedChart
                    data={composedData}
                    series={[
                      { dataKey: "revenue", type: "bar", label: "Revenue" },
                      { dataKey: "target", type: "line", label: "Target" },
                      { dataKey: "growth", type: "area", label: "Growth %" },
                    ]}
                    height={250}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── World Map ── */
        {
          label: "World Map",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="No Markers"
                preview={<BbWorldMap markers={[]} height={280} />}
              />
              <BbCompCell
                name="With Markers"
                preview={
                  <BbWorldMap
                    markers={[
                      { coordinates: [-46.63, -23.55], label: "São Paulo", value: "3.4K" },
                      { coordinates: [-43.17, -22.91], label: "Rio de Janeiro", value: "1.2K" },
                      { coordinates: [-73.94, 40.67], label: "New York", value: "890" },
                      { coordinates: [-0.12, 51.51], label: "London", value: "650" },
                      { coordinates: [139.69, 35.69], label: "Tokyo", value: "420" },
                    ]}
                    height={280}
                  />
                }
              />
              <BbCompCell
                name="Zoomable (EqualEarth)"
                preview={
                  <BbWorldMap
                    markers={[
                      { coordinates: [-46.63, -23.55], label: "São Paulo", value: "3.4K" },
                      { coordinates: [2.35, 48.86], label: "Paris", value: "310" },
                      { coordinates: [77.21, 28.61], label: "New Delhi", value: "780" },
                    ]}
                    zoomable
                    height={320}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── KPI Grid (Drag & Drop) ── */
        {
          label: "KPI Grid (DnD)",
          content: (
            <BbCompGrid columns={1}>
              <BbCompCell
                name="Draggable KPI Cards"
                preview={
                  <BbKpiGrid
                    items={[
                      { id: "revenue", label: "Revenue", value: "R$ 1.2M", change: "+12.5%", trend: "up" },
                      { id: "users", label: "Active Users", value: "8,432", change: "+5.2%", trend: "up" },
                      { id: "churn", label: "Churn Rate", value: "3.1%", change: "-0.8%", trend: "down" },
                      { id: "nps", label: "NPS Score", value: "72", change: "0%", trend: "neutral" },
                    ]}
                    columns={4}
                  />
                }
              />
              <BbCompCell
                name="6 Cards (3 cols)"
                preview={
                  <BbKpiGrid
                    items={[
                      { id: "rev2", label: "MRR", value: "R$ 89K", change: "+18%", trend: "up" },
                      { id: "ltv2", label: "LTV", value: "R$ 4.2K", change: "+7%", trend: "up" },
                      { id: "cac2", label: "CAC", value: "R$ 89", change: "-15%", trend: "up" },
                      { id: "arr2", label: "ARR", value: "R$ 1.07M", change: "+22%", trend: "up" },
                      { id: "ret2", label: "Retention", value: "94%", change: "+1.2%", trend: "up" },
                      { id: "tick2", label: "Avg Ticket", value: "R$ 297", change: "-3%", trend: "down" },
                    ]}
                    columns={3}
                  />
                }
              />
            </BbCompGrid>
          ),
        },

        /* ── Chart Tooltip ── */
        {
          label: "Chart Tooltip",
          content: (
            <BbCompGrid columns={2}>
              <BbCompCell
                name="Multi-Item"
                preview={
                  <BbChartTooltip
                    label="January 2026"
                    items={[
                      { name: "Revenue", value: 4500, color: "var(--bb-chart-1)" },
                      { name: "Costs", value: 2100, color: "var(--bb-chart-3)" },
                      { name: "Profit", value: 2400, color: "var(--bb-chart-2)" },
                    ]}
                  />
                }
              />
              <BbCompCell
                name="With Formatter"
                preview={
                  <BbChartTooltip
                    label={STARTER_REFERENCE_LABELS.sampleQuarterLabel}
                    items={[
                      { name: "Growth", value: 23.5, color: "var(--bb-chart-2)" },
                      { name: "Churn", value: 4.2, color: "var(--bb-chart-3)" },
                    ]}
                    formatter={(v) => `${v.toFixed(1)}%`}
                  />
                }
              />
            </BbCompGrid>
          ),
        },
      ]}
    />
  )
}
