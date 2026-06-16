"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { BedDouble, Bath, Maximize, ArrowUpRight } from "lucide-react"
import { properties } from "@/lib/data"

function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n)
}

export function SimilarProperties({ currentId }: { currentId: string }) {
  const list = properties.filter((p) => p.id !== currentId).slice(0, 4)

  return (
    <section className="border-t border-zinc-200 py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-indigo-600">
              Keep exploring
            </p>
            <h2 className="text-balance text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
              Similar residences
            </h2>
          </div>
          <Link
            href="/"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 md:inline-flex"
          >
            View all listings
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
          </Link>
        </div>

        <div className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0">
          {list.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-[78vw] shrink-0 snap-start sm:w-[320px] md:w-auto"
            >
              <Link
                href={`/property/${p.id}`}
                className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_18px_50px_-20px_rgba(0,0,0,0.25)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.images[0] || "/placeholder.svg"}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-zinc-800 backdrop-blur">
                    {p.type}
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-base font-semibold text-zinc-900">{formatPrice(p.price)}</p>
                  <h3 className="mt-0.5 truncate text-sm font-medium text-zinc-700">{p.title}</h3>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">{p.location}</p>
                  <div className="mt-3 flex items-center gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                    <span className="inline-flex items-center gap-1">
                      <BedDouble className="h-3.5 w-3.5" strokeWidth={1.75} /> {p.beds}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Bath className="h-3.5 w-3.5" strokeWidth={1.75} /> {p.baths}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Maximize className="h-3.5 w-3.5" strokeWidth={1.75} /> {p.area.toLocaleString()} ft²
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
