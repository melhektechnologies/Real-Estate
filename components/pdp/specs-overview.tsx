"use client"

import { motion } from "framer-motion"
import { BedDouble, Bath, Maximize, CalendarDays, Building2, Car } from "lucide-react"
import type { PropertyDetail } from "@/lib/property-detail"

const ICONS = [BedDouble, Bath, Maximize, CalendarDays, Building2, Car]

export function SpecsOverview({ property }: { property: PropertyDetail }) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Overview</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {property.specs.map((spec, i) => {
          const Icon = ICONS[i % ICONS.length]
          return (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
              className="rounded-xl border border-zinc-200/70 p-4 transition-colors duration-200 hover:bg-zinc-50"
            >
              <Icon className="h-5 w-5 text-zinc-400" />
              <p className="mt-3 text-lg font-semibold tracking-tight text-zinc-900">{spec.value}</p>
              <p className="text-xs text-zinc-500">{spec.label}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-7 space-y-4">
        {property.description.map((para, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-zinc-600">
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}
