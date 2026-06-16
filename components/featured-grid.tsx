"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { BedDouble, Bath, Maximize, BadgeCheck, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { properties, type Property } from "@/lib/data"
import { formatCurrency, cn } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

export function FeaturedGrid() {
  return (
    <section id="featured" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Featured listings"
          title="Hand-picked, fully verified."
          description="Every listing passes our TruCheck verification — confirmed ownership, pricing, and documentation before it reaches you."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [slide, setSlide] = useState(0)
  const [liked, setLiked] = useState(false)
  const total = property.images.length

  const go = (dir: number) => setSlide((s) => (s + dir + total) % total)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="group overflow-hidden rounded-3xl border-hairline bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.images.map((src, i) => (
          <Image
            key={src}
            src={src || "/placeholder.svg"}
            alt={`${property.title} — view ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              i === slide ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {property.verified && (
            <span className="flex items-center gap-1 rounded-full border-hairline bg-success/90 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          )}
          <span className="rounded-full border-hairline bg-background/70 px-2.5 py-1 text-[11px] font-medium text-foreground backdrop-blur-sm">
            {property.type}
          </span>
        </div>

        <button
          type="button"
          aria-label={liked ? "Remove from saved" : "Save listing"}
          onClick={() => setLiked((v) => !v)}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border-hairline bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background"
        >
          <Heart className={cn("h-4 w-4", liked && "fill-secondary text-secondary")} />
        </button>

        {/* Slideshow controls */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border-hairline bg-background/70 text-foreground backdrop-blur-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border-hairline bg-background/70 text-foreground backdrop-blur-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {property.images.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === slide ? "w-5 bg-white" : "w-1.5 bg-white/50",
              )}
            />
          ))}
        </div>
      </div>

      <Link href={`/property/${property.id}`} className="block p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-primary">
              {property.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">{property.location}</p>
          </div>
        </div>

        <p className="mt-3 text-xl font-semibold tracking-tight">
          {formatCurrency(property.price)}
        </p>

        <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4" /> {property.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4" /> {property.baths}
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize className="h-4 w-4" /> {property.area.toLocaleString()} ft²
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
