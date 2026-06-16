"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star, MessageCircle } from "lucide-react"
import { agents } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

export function AgentRoster() {
  return (
    <section id="agents" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Agent roster"
          title="Work with verified top performers."
          description="Our agents close more, faster. Each one is vetted, rated, and matched to your goals."
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {agents.map((agent, i) => (
            <motion.article
              key={agent.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group overflow-hidden rounded-3xl border-hairline bg-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.5)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={agent.image || "/placeholder.svg"}
                  alt={agent.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full border-hairline bg-background/70 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                  <Star className="h-3 w-3 fill-secondary text-secondary" />
                  {agent.rating.toFixed(1)}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-semibold tracking-tight">{agent.name}</h3>
                <p className="text-sm text-muted-foreground">{agent.title}</p>

                <div className="mt-3 flex items-center justify-between border-t border-border pt-3 text-sm">
                  <div>
                    <p className="font-semibold">{agent.deals}</p>
                    <p className="text-xs text-muted-foreground">deals closed</p>
                  </div>
                  <span className="rounded-full border-hairline bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
                    {agent.specialty}
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-hairline bg-background py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
