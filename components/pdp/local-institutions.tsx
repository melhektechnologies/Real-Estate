"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { GraduationCap, HeartPulse, TrainFront, Star } from "lucide-react"
import type { PropertyDetail, Institution } from "@/lib/property-detail"
import { cn } from "@/lib/utils"

type TabKey = "schools" | "hospitals" | "transit"

const TABS: { key: TabKey; label: string; icon: typeof GraduationCap }[] = [
  { key: "schools", label: "Schools", icon: GraduationCap },
  { key: "hospitals", label: "Healthcare", icon: HeartPulse },
  { key: "transit", label: "Transit", icon: TrainFront },
]

export function LocalInstitutions({ property }: { property: PropertyDetail }) {
  const [tab, setTab] = useState<TabKey>("schools")
  const rows: Institution[] = property[tab]
  const ratingMax = tab === "schools" ? "10" : "5"

  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">What&apos;s nearby</h2>

      <div className="mt-5 inline-flex rounded-xl border border-zinc-200/70 p-1">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200",
              tab === t.key ? "bg-zinc-900 text-white" : "text-zinc-600 hover:text-zinc-900",
            )}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200/70">
        <AnimatePresence mode="wait">
          <motion.ul
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {rows.map((row, i) => (
              <li
                key={row.name}
                className={cn(
                  "flex items-center justify-between gap-4 px-5 py-4 transition-colors duration-200 hover:bg-zinc-50",
                  i !== rows.length - 1 && "border-b border-zinc-200/70",
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900">{row.name}</p>
                  <p className="text-xs text-zinc-500">{row.type}</p>
                </div>
                <div className="flex shrink-0 items-center gap-5">
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-zinc-900">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {row.rating.toFixed(1)}
                    <span className="text-xs font-normal text-zinc-400">/ {ratingMax}</span>
                  </span>
                  <span className="w-16 text-right text-sm text-zinc-500">{row.distance}</span>
                </div>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </section>
  )
}
