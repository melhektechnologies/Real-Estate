"use client"

import { useState, useRef, type DragEvent } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Clock3,
  MoreHorizontal,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { documents as initialDocs, type DocStatus, type VaultDocument } from "@/lib/dashboard-data"

const statusConfig: Record<
  DocStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    className: "bg-emerald-500/10 text-emerald-400",
  },
  action: {
    label: "Action Required",
    icon: AlertCircle,
    className: "bg-amber-500/10 text-amber-400",
  },
  review: {
    label: "In Review",
    icon: Clock3,
    className: "bg-sky-500/10 text-sky-400",
  },
}

export function DocumentVault() {
  const [docs, setDocs] = useState<VaultDocument[]>(initialDocs)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const newDocs: VaultDocument[] = Array.from(files).map((file, i) => ({
      id: `up-${Date.now()}-${i}`,
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() ?? "FILE",
      size: `${(file.size / 1024).toFixed(0)} KB`,
      updated: "Just now",
      status: "review",
    }))
    setDocs((prev) => [...newDocs, ...prev])
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  return (
    <section className="rounded-2xl border border-zinc-800/60 bg-zinc-950 p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">Document Center</h2>
          <p className="mt-0.5 text-sm text-zinc-500">Secure storage for transaction files</p>
        </div>
      </div>

      {/* Upload zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-zinc-800 px-4 py-7 text-center transition-colors",
          dragOver ? "border-primary bg-primary/5" : "hover:border-zinc-700 hover:bg-zinc-900/40",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <span
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full transition-colors",
            dragOver ? "bg-primary text-primary-foreground" : "bg-zinc-900 text-zinc-400",
          )}
        >
          <UploadCloud className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <p className="text-sm font-medium">
          <span className="text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-zinc-500">PDF, DOCX, PNG — up to 25 MB</p>
      </div>

      {/* Document list */}
      <ul className="mt-4 flex flex-col gap-1.5">
        {docs.map((doc, i) => {
          const status = statusConfig[doc.status]
          return (
            <motion.li
              key={doc.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i, 6) * 0.04 }}
              className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-zinc-800/60 hover:bg-zinc-900/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400">
                <FileText className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{doc.name}</p>
                <p className="font-mono text-[11px] text-zinc-500">
                  {doc.type} · {doc.size} · {doc.updated}
                </p>
              </div>
              <span
                className={cn(
                  "hidden shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium sm:flex",
                  status.className,
                )}
              >
                <status.icon className="h-3 w-3" />
                {status.label}
              </span>
              <button
                aria-label="More options"
                className="text-zinc-600 opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </motion.li>
          )
        })}
      </ul>
    </section>
  )
}
