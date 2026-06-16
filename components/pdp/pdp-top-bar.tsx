"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Building2, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

export function PdpTopBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled ? "border-zinc-200/70 bg-white/80 backdrop-blur-xl" : "border-transparent bg-white",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 md:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to listings
        </Link>

        <Link href="/" className="inline-flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <Building2 className="h-4 w-4" />
          </span>
          <span className="text-base font-semibold tracking-tight text-zinc-900">Melhek</span>
        </Link>
      </div>
    </header>
  )
}
