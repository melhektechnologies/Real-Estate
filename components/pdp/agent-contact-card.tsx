"use client"

import Image from "next/image"
import { Phone, Mail, MessageCircle, Star, BadgeCheck } from "lucide-react"
import type { PropertyDetail } from "@/lib/property-detail"

export function AgentContactCard({ agent }: { agent: PropertyDetail["agent"] }) {
  const ctas = [
    { label: "Call", icon: Phone, primary: true },
    { label: "Email", icon: Mail, primary: false },
    { label: "WhatsApp", icon: MessageCircle, primary: false },
  ]

  return (
    <div className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-zinc-100">
          <Image src={agent.image || "/placeholder.svg"} alt={agent.name} fill sizes="64px" className="object-cover" />
        </div>
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 text-base font-semibold tracking-tight text-zinc-900">
            {agent.name}
            <BadgeCheck className="h-4 w-4 text-sky-500" />
          </p>
          <p className="text-sm text-zinc-500">{agent.title}</p>
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{agent.agency}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4 border-t border-zinc-200/70 pt-4 text-sm">
        <span className="flex items-center gap-1.5 text-zinc-700">
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-medium">{agent.rating.toFixed(1)}</span>
          <span className="text-zinc-400">rating</span>
        </span>
        <span className="h-4 w-px bg-zinc-200" />
        <span className="text-zinc-700">
          <span className="font-medium">{agent.deals}</span> <span className="text-zinc-400">deals closed</span>
        </span>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {ctas.map((cta) => (
          <button
            key={cta.label}
            type="button"
            className={
              cta.primary
                ? "flex flex-col items-center gap-1.5 rounded-xl bg-zinc-900 px-2 py-3 text-xs font-medium text-white transition-colors duration-200 hover:bg-zinc-800"
                : "flex flex-col items-center gap-1.5 rounded-xl border border-zinc-200/70 px-2 py-3 text-xs font-medium text-zinc-700 transition-all duration-200 hover:border-zinc-300 hover:bg-zinc-50"
            }
          >
            <cta.icon className="h-4 w-4" />
            {cta.label}
          </button>
        ))}
      </div>
    </div>
  )
}
