"use client"

import { useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDraggable,
  useDroppable,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core"
import Image from "next/image"
import { motion } from "framer-motion"
import { BedDouble, Bath, Maximize, GripVertical, MapPin } from "lucide-react"
import { cn, formatCurrency } from "@/lib/utils"
import { initialCards, stages, type KanbanCard, type StageId } from "@/lib/dashboard-data"

function Card({ card, overlay = false }: { card: KanbanCard; overlay?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: card.id })

  return (
    <div
      ref={overlay ? undefined : setNodeRef}
      {...(overlay ? {} : attributes)}
      {...(overlay ? {} : listeners)}
      className={cn(
        "group cursor-grab touch-none rounded-xl border border-zinc-800/60 bg-zinc-900/60 p-3 transition-colors hover:border-zinc-700 active:cursor-grabbing",
        isDragging && !overlay && "opacity-40",
        overlay && "w-[260px] cursor-grabbing border-primary/50 shadow-2xl shadow-primary/10",
      )}
    >
      <div className="relative h-28 w-full overflow-hidden rounded-lg">
        <Image
          src={card.image || "/placeholder.svg"}
          alt={card.title}
          fill
          sizes="280px"
          className="object-cover"
        />
        <span className="absolute right-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 font-mono text-[10px] font-medium text-white backdrop-blur">
          {formatCurrency(card.price)}
        </span>
        <GripVertical className="absolute left-1.5 top-1.5 h-4 w-4 text-white/70 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <h4 className="mt-3 text-sm font-semibold leading-tight tracking-tight">{card.title}</h4>
      <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
        <MapPin className="h-3 w-3" /> {card.location}
      </p>
      <div className="mt-3 flex items-center gap-3 border-t border-zinc-800/60 pt-2.5 font-mono text-[11px] text-zinc-400">
        <span className="flex items-center gap-1">
          <BedDouble className="h-3.5 w-3.5" /> {card.beds}
        </span>
        <span className="flex items-center gap-1">
          <Bath className="h-3.5 w-3.5" /> {card.baths}
        </span>
        <span className="flex items-center gap-1">
          <Maximize className="h-3.5 w-3.5" /> {card.area.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

function Column({
  stage,
  cards,
}: {
  stage: (typeof stages)[number]
  cards: KanbanCard[]
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id })

  return (
    <div className="flex w-[280px] shrink-0 flex-col">
      <div className="mb-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ background: stage.accent }} />
          <h3 className="text-sm font-semibold tracking-tight">{stage.label}</h3>
        </div>
        <span className="rounded-full bg-zinc-900 px-2 py-0.5 font-mono text-[11px] text-zinc-400">
          {cards.length}
        </span>
      </div>
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[420px] flex-1 flex-col gap-3 rounded-2xl border border-dashed border-zinc-800/60 p-3 transition-colors",
          isOver && "border-primary/50 bg-primary/5",
        )}
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        {cards.length === 0 && (
          <div className="flex flex-1 items-center justify-center rounded-xl text-xs text-zinc-600">
            Drop here
          </div>
        )}
      </div>
    </div>
  )
}

export function SavedListingsKanban() {
  const [cards, setCards] = useState<KanbanCard[]>(initialCards)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    setActiveId(null)
    if (!over) return
    const targetStage = over.id as StageId
    setCards((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, stage: targetStage } : c)),
    )
  }

  const activeCard = cards.find((c) => c.id === activeId) ?? null

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-zinc-800/60 bg-zinc-950 p-5"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Saved Listings Pipeline</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Drag cards across stages to track progress</p>
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {stages.map((stage) => (
            <Column
              key={stage.id}
              stage={stage}
              cards={cards.filter((c) => c.stage === stage.id)}
            />
          ))}
        </div>
        <DragOverlay>{activeCard ? <Card card={activeCard} overlay /> : null}</DragOverlay>
      </DndContext>
    </motion.section>
  )
}
