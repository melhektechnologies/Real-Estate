"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Navigation, Layers } from "lucide-react"
import { properties } from "@/lib/data"
import { formatCurrency, cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

export function MapPreviewWidget() {
  const [activeId, setActiveId] = useState<string>(properties[0].id)

  return (
    <section id="map" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Interactive map"
          title="Explore listings in real space."
          description="A live, map-first view of inventory. Hover a pin to preview, scan the list to compare."
        />

        <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-3xl border-hairline bg-card lg:grid-cols-2">
          {/* List pane */}
          <div className="order-2 max-h-[520px] overflow-y-auto no-scrollbar border-t border-border lg:order-1 lg:border-r lg:border-t-0">
            <ul className="divide-y divide-border">
              {properties.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(p.id)}
                    onFocus={() => setActiveId(p.id)}
                    className={cn(
                      "flex w-full items-center gap-4 p-4 text-left transition-colors duration-200",
                      activeId === p.id ? "bg-muted" : "hover:bg-muted/50",
                    )}
                  >
                    <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={p.images[0] || "/placeholder.svg"}
                        alt={p.title}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{p.title}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.location}</p>
                      <p className="mt-1 text-sm font-semibold text-primary">
                        {formatCurrency(p.price)}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Map pane */}
          <div className="relative order-1 min-h-[360px] overflow-hidden bg-[#06070d] lg:order-2 lg:min-h-[520px]">
            {/* dark grid */}
            <div
              className="absolute inset-0"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
            {/* faux roads */}
            <div className="absolute inset-0 opacity-50" aria-hidden="true">
              <div className="absolute left-0 top-[30%] h-px w-full bg-white/10" />
              <div className="absolute left-0 top-[64%] h-px w-full bg-white/10" />
              <div className="absolute left-[22%] top-0 h-full w-px bg-white/10" />
              <div className="absolute left-[68%] top-0 h-full w-px bg-white/10" />
              <div className="absolute left-[40%] top-[20%] h-[2px] w-[45%] rotate-[18deg] bg-secondary/20" />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,transparent_30%,rgba(3,3,3,0.6))]" />

            {/* pins */}
            {properties.map((p) => {
              const isActive = p.id === activeId
              return (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`${p.title}, ${formatCurrency(p.price)}`}
                  onMouseEnter={() => setActiveId(p.id)}
                  onClick={() => setActiveId(p.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
                >
                  <span className="relative flex items-center justify-center">
                    {isActive && (
                      <motion.span
                        layoutId="pin-glow"
                        className="absolute h-10 w-10 rounded-full bg-primary/30 blur-md"
                      />
                    )}
                    <span
                      className={cn(
                        "relative flex items-center gap-1 rounded-full border-hairline px-2 py-1 text-[11px] font-semibold shadow-lg transition-all duration-300",
                        isActive
                          ? "scale-110 border-primary/60 bg-primary text-primary-foreground"
                          : "bg-card/90 text-foreground backdrop-blur-sm",
                      )}
                    >
                      <MapPin className="h-3 w-3" />
                      {formatCurrency(p.price / 1_000_000, 1)}M
                    </span>
                  </span>
                </button>
              )
            })}

            {/* controls */}
            <div className="absolute right-4 top-4 flex flex-col gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-hairline bg-card/80 text-muted-foreground backdrop-blur-sm">
                <Layers className="h-4 w-4" />
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border-hairline bg-card/80 text-muted-foreground backdrop-blur-sm">
                <Navigation className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
