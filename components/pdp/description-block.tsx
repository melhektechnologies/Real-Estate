"use client"

import { useState } from "react"
import type { PropertyDetail } from "@/lib/property-detail"

export function DescriptionBlock({ property }: { property: PropertyDetail }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? property.description : property.description.slice(0, 1)

  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">About this home</h2>
      <div className="mt-3 space-y-4 text-[15px] leading-relaxed text-zinc-600">
        {visible.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {property.description.length > 1 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </section>
  )
}
