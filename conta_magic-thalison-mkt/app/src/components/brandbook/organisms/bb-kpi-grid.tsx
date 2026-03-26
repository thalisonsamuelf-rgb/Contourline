"use client"

import { useState, useCallback, lazy } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { BbKpiCard } from "../molecules/bb-kpi-card"

/* ── Types ── */

export interface BbKpiGridItem {
  id: string
  label: string
  value: string | number
  change?: string
  trend?: "up" | "down" | "neutral"
}

export interface BbKpiGridProps {
  items: BbKpiGridItem[]
  onReorder?: (items: BbKpiGridItem[]) => void
  persistOrder?: boolean
  storageKey?: string
  columns?: 2 | 3 | 4 | 5 | 6
  className?: string
}

/* ── Sortable Card Wrapper ── */

function SortableKpiCard({ item }: { item: BbKpiGridItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : undefined,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(isDragging && "shadow-lg shadow-[var(--bb-accent-25)]")}
      {...attributes}
    >
      <BbKpiCard
        label={item.label}
        value={item.value}
        change={item.change}
        trend={item.trend}
        draggable
        dragHandleProps={listeners}
      />
    </div>
  )
}

/* ── Grid Columns Map ── */

const colsClass: Record<number, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
}

/* ── Persistence Hook ── */

function usePersistedOrder(
  items: BbKpiGridItem[],
  storageKey?: string,
): [BbKpiGridItem[], (newItems: BbKpiGridItem[]) => void] {
  const [ordered, setOrdered] = useState<BbKpiGridItem[]>(() => {
    if (!storageKey || typeof window === "undefined") return items
    try {
      const stored = localStorage.getItem(storageKey)
      if (!stored) return items
      const ids: string[] = JSON.parse(stored)
      const map = new Map(items.map((it) => [it.id, it]))
      const result: BbKpiGridItem[] = []
      for (const id of ids) {
        const item = map.get(id)
        if (item) {
          result.push(item)
          map.delete(id)
        }
      }
      // Append any new items not in stored order
      for (const item of map.values()) result.push(item)
      return result
    } catch {
      return items
    }
  })

  const persist = useCallback(
    (newItems: BbKpiGridItem[]) => {
      setOrdered(newItems)
      if (storageKey && typeof window !== "undefined") {
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify(newItems.map((it) => it.id)),
          )
        } catch {
          // storage full — silently ignore
        }
      }
    },
    [storageKey],
  )

  return [ordered, persist]
}

/* ── Main Component ── */

export function BbKpiGrid({
  items,
  onReorder,
  persistOrder = false,
  storageKey = "bb-kpi-grid-order",
  columns = 4,
  className,
}: BbKpiGridProps) {
  const key = persistOrder ? storageKey : undefined
  const [ordered, setOrdered] = usePersistedOrder(items, key)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = ordered.findIndex((it) => it.id === active.id)
      const newIndex = ordered.findIndex((it) => it.id === over.id)
      const newOrder = arrayMove(ordered, oldIndex, newIndex)
      setOrdered(newOrder)
      onReorder?.(newOrder)
    },
    [ordered, setOrdered, onReorder],
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={ordered.map((it) => it.id)}
        strategy={rectSortingStrategy}
      >
        <div className={cn("grid gap-4", colsClass[columns], className)}>
          {ordered.map((item) => (
            <SortableKpiCard key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

export const BbKpiGridLazy = lazy(() =>
  import("./bb-kpi-grid").then((m) => ({ default: m.BbKpiGrid })),
)
