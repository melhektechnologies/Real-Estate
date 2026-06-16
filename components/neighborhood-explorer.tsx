"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { neighborhoods } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

export function NeighborhoodExplorer() {
  const scroller = useRef<HTMLDivElement>(null)

  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" })
  }

  return (
    <section id="neighborhoods" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Neighborhood explorer"
            title="Discover the world's prime markets."
            description="Browse curated city zones with live inventory counts and average pricing."
          />
          <div className="hidden flex-shrink-0 gap-2 md:flex">
            <button
              type="button"
              aria-label="Scroll left"
              onClick={() => scroll(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border-hairline bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll right"
              onClick={() => scroll(1)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border-hairline bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-2 md:px-12"
      >
        {neighborhoods.map((n, i) => (
          <motion.a
            key={n.id}
            href="#featured"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="group relative aspect-[3/4] w-[280px] flex-shrink-0 snap-start overflow-hidden rounded-3xl border-hairline transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
          >
            <Image
              src={n.image || "/placeholder.svg"}
              alt={`${n.name}, ${n.country}`}
              fill
              sizes="280px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <span className="absolute right-3 top-3 rounded-full border-hairline bg-background/70 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
              {n.listings.toLocaleString()} listings
            </span>

            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight">{n.name}</h3>
                  <p className="text-sm text-white/70">{n.country}</p>
                  <p className="mt-2 text-sm">
                    <span className="text-white/60">Avg </span>
                    <span className="font-semibold">{n.avgPrice}</span>
                  </p>
                </div>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border-hairline bg-primary text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
