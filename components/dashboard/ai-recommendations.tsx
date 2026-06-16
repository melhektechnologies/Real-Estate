"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, ChevronLeft, ChevronRight, ArrowUpRight, MapPin } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { recommendations } from "@/lib/dashboard-data"

export function AIRecommendations() {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(dir: number) {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" })
  }

  return (
    <section className="rounded-2xl border border-zinc-800/60 bg-zinc-950 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <h2 className="text-base font-semibold tracking-tight">AI Recommendations</h2>
            <p className="mt-0.5 text-sm text-zinc-500">Curated matches based on your activity</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <button
            aria-label="Scroll left"
            onClick={() => scroll(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800/60 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scroll(1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800/60 text-zinc-400 transition-colors hover:border-zinc-700 hover:text-foreground"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {recommendations.map((rec, i) => (
          <motion.article
            key={rec.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="group relative w-[280px] shrink-0 overflow-hidden rounded-xl border border-zinc-800/60 bg-zinc-900/40 transition-colors hover:border-zinc-700"
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={rec.image || "/placeholder.svg"}
                alt={rec.title}
                fill
                sizes="280px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground">
                <Sparkles className="h-3 w-3" />
                {rec.matchScore}% Match
              </span>
              <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
                {rec.reason}
              </span>
            </div>
            <div className="p-3.5">
              <h3 className="text-sm font-semibold leading-tight tracking-tight">{rec.title}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-zinc-500">
                <MapPin className="h-3 w-3" /> {rec.location}
              </p>
              <div className="mt-3 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                <span className="font-mono text-sm font-semibold">{formatCurrency(rec.price)}</span>
                <button className="flex items-center gap-1 text-xs font-medium text-primary">
                  View <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
