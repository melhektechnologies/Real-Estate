"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Grid2x2, X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryImage } from "@/lib/property-detail"
import { cn } from "@/lib/utils"

export function ImageSplitGrid({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const openAt = (i: number) => {
    setActive(i)
    setOpen(true)
  }

  return (
    <section className="px-6 pt-6 md:px-10 md:pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="relative grid grid-cols-1 gap-3 md:grid-cols-3 md:grid-rows-2">
          {/* Main image */}
          <button
            type="button"
            onClick={() => openAt(0)}
            className="group relative col-span-2 row-span-2 aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200/60 md:aspect-auto"
          >
            <Image
              src={images[0].src || "/placeholder.svg"}
              alt={images[0].alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </button>

          {/* Two stacked context images */}
          {[1, 2].map((idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => openAt(idx)}
              className="group relative hidden aspect-[3/2] overflow-hidden rounded-2xl border border-zinc-200/60 md:block"
            >
              <Image
                src={images[idx].src || "/placeholder.svg"}
                alt={images[idx].alt}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
            </button>
          ))}

          {/* View all photos button */}
          <button
            type="button"
            onClick={() => openAt(0)}
            className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-zinc-200/80 bg-white/90 px-4 py-2.5 text-sm font-medium text-zinc-900 shadow-sm backdrop-blur transition-all duration-200 hover:bg-white hover:shadow-md"
          >
            <Grid2x2 className="h-4 w-4" />
            View all {images.length} photos
          </button>
        </div>
      </div>

      {open && <Lightbox images={images} active={active} setActive={setActive} onClose={() => setOpen(false)} />}
    </section>
  )
}

function Lightbox({
  images,
  active,
  setActive,
  onClose,
}: {
  images: GalleryImage[]
  active: number
  setActive: (i: number) => void
  onClose: () => void
}) {
  const total = images.length

  useEffect(() => {
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") setActive((p: number) => (p + 1) % total)
      if (e.key === "ArrowLeft") setActive((p: number) => (p - 1 + total) % total)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-zinc-950/95 backdrop-blur-sm"
    >
      <div className="flex items-center justify-between p-5 text-zinc-200">
        <span className="text-sm font-medium tabular-nums">
          {active + 1} / {total}
        </span>
        <button
          type="button"
          aria-label="Close gallery"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-4">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => setActive((active - 1 + total) % total)}
          className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative h-full w-full max-w-5xl"
          >
            <Image
              src={images[active].src || "/placeholder.svg"}
              alt={images[active].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          aria-label="Next photo"
          onClick={() => setActive((active + 1) % total)}
          className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <div className="flex justify-center gap-2 overflow-x-auto p-5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              i === active ? "border-white" : "border-transparent opacity-50 hover:opacity-100",
            )}
          >
            <Image src={img.src || "/placeholder.svg"} alt={img.alt} fill sizes="96px" className="object-cover" />
          </button>
        ))}
      </div>
    </motion.div>,
    document.body,
  )
}
