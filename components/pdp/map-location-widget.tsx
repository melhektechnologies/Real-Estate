"use client"

import { MapPin, Navigation } from "lucide-react"
import type { PropertyDetail } from "@/lib/property-detail"

export function MapLocationWidget({ property }: { property: PropertyDetail }) {
  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Location</h2>
      <p className="mt-1 text-sm text-zinc-500">{property.address}</p>

      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-100">
        {/* Stylized static map */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        {/* Faux roads */}
        <div className="absolute left-0 top-1/3 h-3 w-full -rotate-6 bg-white shadow-sm" />
        <div className="absolute left-1/4 top-0 h-full w-3 rotate-3 bg-white shadow-sm" />
        <div className="absolute bottom-1/4 left-0 h-2 w-full rotate-12 bg-white/80" />
        {/* Park block */}
        <div className="absolute bottom-6 right-10 h-20 w-28 rounded-lg bg-emerald-200/50" />

        {/* Center pin */}
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="absolute -inset-6 animate-ping rounded-full bg-zinc-900/10" />
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg ring-4 ring-white">
            <MapPin className="h-5 w-5" />
          </span>
        </div>

        <button
          type="button"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-zinc-200/80 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
        >
          <Navigation className="h-4 w-4" />
          Get directions
        </button>
      </div>
    </section>
  )
}
