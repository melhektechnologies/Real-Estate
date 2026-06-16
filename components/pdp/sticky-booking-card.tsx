"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Building, Video, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const TIMES = ["10:00 AM", "12:30 PM", "3:00 PM", "5:30 PM"]

function getNextDays(count: number) {
  const days = []
  const today = new Date()
  for (let i = 1; i <= count; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push({
      key: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
      day: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "short" }),
    })
  }
  return days
}

export function StickyBookingCard() {
  const days = getNextDays(5)
  const [mode, setMode] = useState<"in-person" | "virtual">("in-person")
  const [date, setDate] = useState(days[0].key)
  const [time, setTime] = useState(TIMES[1])
  const [done, setDone] = useState(false)

  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold tracking-tight text-zinc-900">Schedule a viewing</h3>
      <p className="mt-1 text-sm text-zinc-500">Choose how you&apos;d like to tour this home.</p>

      {/* Mode toggle */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { key: "in-person" as const, label: "In-Person", icon: Building },
          { key: "virtual" as const, label: "Virtual", icon: Video },
        ].map((m) => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={cn(
              "flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
              mode === m.key
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200/70 text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50",
            )}
          >
            <m.icon className="h-4 w-4" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Date cards */}
      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-zinc-400">Select a date</p>
      <div className="mt-2.5 grid grid-cols-5 gap-2">
        {days.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setDate(d.key)}
            className={cn(
              "flex flex-col items-center gap-0.5 rounded-xl border py-2.5 transition-all duration-200",
              date === d.key
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200/70 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
            )}
          >
            <span className="text-[10px] font-medium uppercase opacity-70">{d.weekday}</span>
            <span className="text-base font-semibold leading-none tabular-nums">{d.day}</span>
            <span className="text-[10px] opacity-70">{d.month}</span>
          </button>
        ))}
      </div>

      {/* Time slots */}
      <p className="mt-5 text-xs font-medium uppercase tracking-wide text-zinc-400">Select a time</p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {TIMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTime(t)}
            className={cn(
              "rounded-xl border py-2.5 text-sm font-medium transition-all duration-200",
              time === t
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-200/70 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: 0.98 }}
        onClick={() => setDone(true)}
        className={cn(
          "mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition-colors duration-200",
          done ? "bg-emerald-600" : "bg-zinc-900 hover:bg-zinc-800",
        )}
      >
        {done ? (
          <>
            <Check className="h-4 w-4" /> Tour requested
          </>
        ) : (
          `Request ${mode === "virtual" ? "virtual" : "in-person"} tour`
        )}
      </motion.button>
      <p className="mt-3 text-center text-xs text-zinc-400">No obligation · Free cancellation</p>
    </div>
  )
}
