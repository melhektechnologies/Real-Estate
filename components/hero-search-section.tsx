"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapPin, DollarSign, Home, Search, Sparkles, BedDouble } from "lucide-react"
import { cn } from "@/lib/utils"

type Field = "location" | "price" | "type" | "beds" | null

const propertyTypes = ["Penthouse", "Villa", "Loft", "Townhouse", "Apartment", "Estate"]
const priceRanges = ["< $1M", "$1M – $3M", "$3M – $5M", "$5M – $10M", "$10M+"]
const bedOptions = ["1+", "2+", "3+", "4+", "5+"]

export function HeroSearchSection() {
  const [active, setActive] = useState<Field>(null)
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")
  const [type, setType] = useState("")
  const [beds, setBeds] = useState("")

  const fields: { key: Exclude<Field, null>; label: string; value: string; placeholder: string; icon: React.ReactNode }[] = [
    { key: "location", label: "Location", value: location, placeholder: "City or area", icon: <MapPin className="h-4 w-4" /> },
    { key: "price", label: "Price", value: price, placeholder: "Any budget", icon: <DollarSign className="h-4 w-4" /> },
    { key: "type", label: "Type", value: type, placeholder: "Any type", icon: <Home className="h-4 w-4" /> },
    { key: "beds", label: "Beds", value: beds, placeholder: "Any", icon: <BedDouble className="h-4 w-4" /> },
  ]

  return (
    <section className="relative overflow-hidden px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute inset-0 radial-glow" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black, transparent)",
        }}
      />

      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border-hairline bg-card/60 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          The operating system for global real estate
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl"
        >
          Global property transactions,{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            automated.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          Discover verified listings across the world&apos;s most sought-after
          markets. Search, finance, and close — all in one intelligent platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 w-full max-w-3xl"
        >
          <div className="rounded-3xl border-hairline bg-card/70 p-2 backdrop-blur-md shadow-[0_8px_40px_rgb(0,0,0,0.4)]">
            <div className="grid grid-cols-2 gap-1 md:grid-cols-[1fr_1fr_1fr_1fr_auto]">
              {fields.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActive((cur) => (cur === f.key ? null : f.key))}
                  className={cn(
                    "group flex flex-col items-start gap-0.5 rounded-2xl px-4 py-3 text-left transition-all duration-300",
                    active === f.key ? "bg-muted" : "hover:bg-muted/60",
                  )}
                >
                  <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <span className="text-primary">{f.icon}</span>
                    {f.label}
                  </span>
                  <span
                    className={cn(
                      "text-sm",
                      f.value ? "text-foreground" : "text-muted-foreground/60",
                    )}
                  >
                    {f.value || f.placeholder}
                  </span>
                </button>
              ))}

              <div className="col-span-2 flex items-stretch md:col-span-1">
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.6)]"
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </button>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {active && (
                <motion.div
                  key={active}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-1 border-t border-border px-4 py-4">
                    {active === "location" && (
                      <input
                        autoFocus
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Search Dubai, New York, London…"
                        className="w-full rounded-xl border-hairline bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-ring/40"
                      />
                    )}
                    {active === "price" && (
                      <div className="flex flex-wrap gap-2">
                        {priceRanges.map((p) => (
                          <Chip key={p} active={price === p} onClick={() => { setPrice(p); setActive(null) }}>
                            {p}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {active === "type" && (
                      <div className="flex flex-wrap gap-2">
                        {propertyTypes.map((t) => (
                          <Chip key={t} active={type === t} onClick={() => { setType(t); setActive(null) }}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    )}
                    {active === "beds" && (
                      <div className="flex flex-wrap gap-2">
                        {bedOptions.map((b) => (
                          <Chip key={b} active={beds === b} onClick={() => { setBeds(b); setActive(null) }}>
                            {b} beds
                          </Chip>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground"
        >
          {[
            ["48K+", "Verified listings"],
            ["120+", "Global markets"],
            ["$14B", "Transactions closed"],
          ].map(([stat, label]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">{stat}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Chip({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border-hairline px-4 py-2 text-sm transition-all duration-200",
        active
          ? "border-primary/40 bg-primary/15 text-foreground"
          : "bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  )
}
