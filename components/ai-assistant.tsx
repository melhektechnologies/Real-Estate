"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, X, Send, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "assistant" | "user"
  text: string
}

const SCRIPT: Record<string, string> = {
  start:
    "Hi! I'm Mel, your AI property concierge. What are you looking for today — buying, renting, or investing?",
}

const QUICK_REPLIES = ["Buy a home", "Investment property", "Just browsing"]

const RESPONSES = [
  "Great choice. Which market interests you most — Dubai, New York, London, or Singapore?",
  "Perfect. What's your budget range so I can surface the best verified listings?",
  "Got it. I've found 24 matching verified listings. Want me to book a tour or connect you with a top-rated agent?",
]

export function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: SCRIPT.start },
  ])
  const [input, setInput] = useState("")
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((m) => [...m, { role: "user", text }])
    setInput("")
    setTyping(true)
    const reply = RESPONSES[Math.min(step, RESPONSES.length - 1)]
    setStep((s) => s + 1)
    setTimeout(() => {
      setTyping(false)
      setMessages((m) => [...m, { role: "assistant", text: reply }])
    }, 900)
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open AI property assistant"
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[0_8px_30px_rgba(99,102,241,0.5)] transition-shadow hover:shadow-[0_8px_40px_rgba(99,102,241,0.7)]"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="s" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Sparkles className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 flex h-[460px] w-[calc(100vw-3rem)] max-w-sm flex-col overflow-hidden rounded-3xl border-hairline bg-card/95 backdrop-blur-md shadow-[0_20px_60px_rgb(0,0,0,0.6)]"
          >
            <div className="flex items-center gap-3 border-b border-border bg-background/40 p-4">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />
              </span>
              <div>
                <p className="text-sm font-semibold">Mel · AI Concierge</p>
                <p className="text-xs text-success">Online now</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 no-scrollbar">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex",
                    m.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                      m.role === "user"
                        ? "rounded-br-md bg-primary text-primary-foreground"
                        : "rounded-bl-md border-hairline bg-muted text-foreground",
                    )}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border-hairline bg-muted px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border-hairline bg-background px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Mel anything…"
                className="flex-1 rounded-xl border-hairline bg-background px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-ring/40"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
