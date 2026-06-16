"use client"

import { Quote } from "lucide-react"
import { testimonials } from "@/lib/data"
import { SectionHeading } from "@/components/section-heading"

export function TestimonialMarquee() {
  const row = [...testimonials, ...testimonials]

  return (
    <section className="overflow-hidden py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <SectionHeading
          eyebrow="Loved by professionals"
          title="Trusted across 120+ markets."
          align="center"
        />
      </div>

      <div className="marquee-pause relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max animate-marquee gap-5">
          {row.map((t, i) => (
            <figure
              key={`${t.id}-${i}`}
              className="w-[340px] flex-shrink-0 rounded-3xl border-hairline bg-card p-6"
            >
              <Quote className="h-6 w-6 text-primary" aria-hidden="true" />
              <blockquote className="mt-4 text-pretty text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
