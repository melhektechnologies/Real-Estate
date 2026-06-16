import type { Metadata } from "next"
import { Search, Bell } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MetricBanner } from "@/components/dashboard/metric-banner"
import { SavedListingsKanban } from "@/components/dashboard/saved-listings-kanban"
import { AppointmentTimeline } from "@/components/dashboard/appointment-timeline"
import { DocumentVault } from "@/components/dashboard/document-vault"
import { AIRecommendations } from "@/components/dashboard/ai-recommendations"
import { buyerProfile } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Buyer Dashboard — Melhek Real Estate OS",
  description:
    "Your enterprise buyer workspace: saved listings pipeline, showings timeline, document vault, and AI-matched recommendations.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-black text-foreground">
      <DashboardSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Workspace header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-zinc-800/60 bg-black/80 px-5 backdrop-blur-xl md:px-8">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              Welcome back, {buyerProfile.name.split(" ")[0]}
            </h1>
            <p className="hidden text-xs text-zinc-500 sm:block">
              Here is what is happening with your property search today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-zinc-800/60 bg-zinc-950 px-3 py-2 md:flex">
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                placeholder="Search properties, docs..."
                className="w-48 bg-transparent text-sm text-foreground outline-none placeholder:text-zinc-600"
              />
              <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-400">
                ⌘K
              </kbd>
            </div>
            <button
              aria-label="Notifications"
              className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-800/60 bg-zinc-950 text-zinc-400 transition-colors hover:text-foreground"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-mono text-xs font-semibold text-white">
              {buyerProfile.initials}
            </div>
          </div>
        </header>

        {/* Workspace body */}
        <main className="flex flex-1 flex-col gap-6 p-5 md:p-8">
          <MetricBanner />
          <SavedListingsKanban />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <AppointmentTimeline />
            <DocumentVault />
          </div>

          <AIRecommendations />
        </main>
      </div>
    </div>
  )
}
