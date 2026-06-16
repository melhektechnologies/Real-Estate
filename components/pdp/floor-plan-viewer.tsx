"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { BedDouble, Bath, Maximize } from "lucide-react"
import type { PropertyDetail } from "@/lib/property-detail"
import { cn } from "@/lib/utils"

export function FloorPlanViewer({ property }: { property: PropertyDetail }) {
  const [active, setActive] = useState(0)
  const plan = property.floorPlans[active]

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Floor Plans</h2>
        <div className="inline-flex rounded-xl border border-zinc-200/70 p-1">
          {property.floorPlans.map((fp, i) => (
            <button
              key={fp.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "rounded-lg px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
                i === active ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900",
              )}
            >
              {fp.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200/70">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-zinc-200/70 bg-zinc-50/60 px-5 py-4 text-sm text-zinc-600">
          <span className="font-medium text-zinc-900">{plan.level}</span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-zinc-400" /> {plan.beds} Beds
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-zinc-400" /> {plan.baths} Baths
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4 text-zinc-400" /> {plan.area.toLocaleString()} ft²
          </span>
        </div>

        <div className="relative aspect-[16/10] bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={plan.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={plan.image || "/placeholder.svg"}
                alt={`${plan.name} floor plan`}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-contain p-6"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
