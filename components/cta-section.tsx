"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

export function CTASection() {
  return (
    <section id="cta" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border-hairline bg-card px-6 py-16 text-center md:px-12 md:py-24"
        >
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(600px circle at 50% 0%, rgba(99,102,241,0.18), transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            aria-hidden="true"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black, transparent)",
            }}
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Start closing deals on the world&apos;s smartest real estate OS.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
              Join 40,000+ buyers, sellers, and agents transacting globally with
              confidence. No setup fees. Cancel anytime.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#"
                className="group flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all duration-300 hover:shadow-[0_0_28px_rgba(99,102,241,0.6)]"
              >
                Create free account
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#featured"
                className="rounded-xl border-hairline bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Browse listings
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
