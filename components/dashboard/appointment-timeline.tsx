"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, Navigation, Video, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { appointments } from "@/lib/dashboard-data"

export function AppointmentTimeline() {
  return (
    <section className="rounded-2xl border border-zinc-800/60 bg-zinc-950 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Upcoming Showings</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Your scheduled property visits</p>
        </div>
      </div>

      <div className="relative">
        <span className="absolute bottom-3 left-[27px] top-3 w-px bg-zinc-800/80" aria-hidden />
        <ul className="flex flex-col gap-3">
          {appointments.map((apt, i) => (
            <motion.li
              key={apt.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="relative flex gap-4"
            >
              {/* Date node */}
              <div className="z-10 flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl border border-zinc-800/60 bg-zinc-900">
                <span className="font-mono text-lg font-semibold leading-none tabular-nums">
                  {apt.date}
                </span>
                <span className="mt-0.5 text-[10px] uppercase tracking-wide text-zinc-500">
                  {apt.day}
                </span>
              </div>

              {/* Content */}
              <div className="group flex-1 rounded-xl border border-zinc-800/60 bg-zinc-900/40 p-3.5 transition-colors hover:border-zinc-700">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-semibold leading-tight tracking-tight">
                    {apt.title}
                  </h3>
                  <span
                    className={cn(
                      "flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                      apt.mode === "Virtual"
                        ? "bg-sky-500/10 text-sky-400"
                        : "bg-primary/10 text-primary",
                    )}
                  >
                    {apt.mode === "Virtual" ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <MapPin className="h-3 w-3" />
                    )}
                    {apt.mode}
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {apt.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" /> {apt.agent}
                  </span>
                </div>
                <div className="mt-2.5 flex items-center justify-between border-t border-zinc-800/60 pt-2.5">
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <MapPin className="h-3 w-3" /> {apt.address}
                  </span>
                  <button className="flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                    <Navigation className="h-3 w-3" /> Directions
                  </button>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
