"use client"

import { motion } from "framer-motion"
import type { PropertyDetail } from "@/lib/property-detail"

export function AmenitiesGrid({ property }: { property: PropertyDetail }) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Amenities</h2>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {property.amenities.map((amenity, i) => (
          <motion.div
            key={amenity.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
            className="group flex items-center gap-3 rounded-xl border border-zinc-200/70 px-4 py-3.5 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors duration-200 group-hover:bg-zinc-900 group-hover:text-white">
              <amenity.icon className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <span className="text-sm font-medium text-zinc-700">{amenity.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
