"use client"

import { useState } from "react"
import { MapPin, BadgeCheck, Heart, Scale, Share2 } from "lucide-react"
import type { PropertyDetail } from "@/lib/property-detail"
import { formatCurrency, cn } from "@/lib/utils"

export function PropertyHeader({ property }: { property: PropertyDetail }) {
  const [saved, setSaved] = useState(false)

  const actions = [
    {
      key: "save",
      label: saved ? "Saved" : "Save",
      icon: Heart,
      active: saved,
      onClick: () => setSaved((v) => !v),
    },
    { key: "compare", label: "Compare", icon: Scale, active: false, onClick: () => {} },
    { key: "share", label: "Share", icon: Share2, active: false, onClick: () => {} },
  ]

  return (
    <div className="flex flex-col gap-5 border-b border-zinc-200/70 pb-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
              {property.status}
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 text-balance md:text-3xl">
            {property.title}
          </h1>
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
            <MapPin className="h-4 w-4 shrink-0" />
            {property.address}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
            {formatCurrency(property.price)}
          </p>
          <p className="mt-1 text-sm text-zinc-500">${property.pricePerSqFt} / ft²</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={action.onClick}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl border border-zinc-200/70 px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50",
              action.active ? "text-zinc-900" : "text-zinc-600",
            )}
          >
            <action.icon
              className={cn("h-4 w-4", action.active && action.key === "save" && "fill-rose-500 text-rose-500")}
            />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}
