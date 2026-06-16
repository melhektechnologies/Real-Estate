"use client"

import { motion } from "framer-motion"
import { Heart, CalendarCheck, FileCheck2, TrendingUp } from "lucide-react"

const metrics = [
  {
    label: "Saved Properties",
    value: "06",
    delta: "+2 this week",
    icon: Heart,
    accent: "#6366f1",
  },
  {
    label: "Booked Showings",
    value: "04",
    delta: "+1 upcoming",
    icon: CalendarCheck,
    accent: "#0ea5e9",
  },
  {
    label: "Uploaded Docs",
    value: "05",
    delta: "2 need action",
    icon: FileCheck2,
    accent: "#059669",
  },
]

export function MetricBanner() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {metrics.map((metric, i) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="group relative overflow-hidden rounded-2xl border border-zinc-800/60 bg-zinc-950 p-5 transition-colors hover:border-zinc-700"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
            style={{ background: metric.accent }}
          />
          <div className="flex items-start justify-between">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${metric.accent}1a`, color: metric.accent }}
            >
              <metric.icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="flex items-center gap-1 font-mono text-[11px] text-zinc-500">
              <TrendingUp className="h-3 w-3" />
              {metric.delta}
            </span>
          </div>
          <p className="mt-5 font-mono text-4xl font-semibold tracking-tighter tabular-nums">
            {metric.value}
          </p>
          <p className="mt-1 text-sm text-zinc-400">{metric.label}</p>
        </motion.div>
      ))}
    </div>
  )
}
