"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  LayoutGrid,
  Heart,
  Search,
  FileText,
  MessageSquare,
  Bell,
  ChevronLeft,
  Building2,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { buyerProfile } from "@/lib/dashboard-data"

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutGrid, badge: null },
  { id: "saved", label: "Saved Listings", icon: Heart, badge: "6" },
  { id: "searches", label: "Searches", icon: Search, badge: null },
  { id: "documents", label: "Documents", icon: FileText, badge: "2" },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: "4" },
  { id: "notifications", label: "Notifications", icon: Bell, badge: null },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [active, setActive] = useState("overview")

  return (
    <motion.aside
      animate={{ width: collapsed ? 76 : 256 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="sticky top-0 hidden h-screen shrink-0 flex-col border-r border-zinc-800/60 bg-zinc-950 lg:flex"
    >
      {/* Logo header */}
      <div className="flex h-16 items-center gap-3 border-b border-zinc-800/60 px-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold tracking-tight">Melhek OS</p>
            <p className="truncate text-xs text-zinc-500">Buyer Workspace</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map((item) => {
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-zinc-900 text-foreground"
                  : "text-zinc-400 hover:bg-zinc-900/50 hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary"
                />
              )}
              <item.icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
              {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="rounded-full bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="mx-3 mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-900/50 hover:text-foreground"
      >
        <ChevronLeft
          className={cn("h-[18px] w-[18px] shrink-0 transition-transform", collapsed && "rotate-180")}
          strokeWidth={1.75}
        />
        {!collapsed && <span>Collapse</span>}
      </button>

      {/* User footer */}
      <div className="border-t border-zinc-800/60 p-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-mono text-xs font-semibold text-white">
            {buyerProfile.initials}
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{buyerProfile.name}</p>
              <p className="truncate text-xs text-zinc-500">{buyerProfile.role}</p>
            </div>
          )}
          {!collapsed && (
            <button
              aria-label="Settings"
              className="text-zinc-500 transition-colors hover:text-foreground"
            >
              <Settings className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  )
}
