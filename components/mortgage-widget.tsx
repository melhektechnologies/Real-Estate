"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { SectionHeading } from "@/components/section-heading"

const TERM_YEARS = 30

export function MortgageWidget() {
  const [price, setPrice] = useState(2_500_000)
  const [downPct, setDownPct] = useState(20)
  const [rate, setRate] = useState(5.5)

  const { monthly, principal, totalInterest, downPayment } = useMemo(() => {
    const downPayment = (price * downPct) / 100
    const principal = price - downPayment
    const r = rate / 100 / 12
    const n = TERM_YEARS * 12
    const monthly =
      r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n))
    const totalInterest = monthly * n - principal
    return { monthly, principal, totalInterest, downPayment }
  }, [price, downPct, rate])

  return (
    <section id="mortgage" className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Mortgage estimator"
              title="Know your numbers before you tour."
              description="Adjust the inputs to model your monthly payment instantly. Built on a standard 30-year amortization."
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border-hairline bg-card p-6 md:p-8"
          >
            <div className="space-y-8">
              <Slider
                label="Home price"
                value={price}
                display={formatCurrency(price)}
                min={250_000}
                max={15_000_000}
                step={50_000}
                onChange={setPrice}
              />
              <Slider
                label="Down payment"
                value={downPct}
                display={`${downPct}%  ·  ${formatCurrency(downPayment)}`}
                min={5}
                max={60}
                step={1}
                onChange={setDownPct}
              />
              <Slider
                label="Interest rate"
                value={rate}
                display={`${rate.toFixed(1)}%`}
                min={1}
                max={12}
                step={0.1}
                onChange={setRate}
              />
            </div>

            <div className="mt-8 rounded-2xl border-hairline bg-gradient-to-br from-primary/15 to-secondary/10 p-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Estimated monthly payment
              </div>
              <p className="mt-2 text-4xl font-semibold tracking-tight">
                {formatCurrency(monthly)}
                <span className="text-base font-normal text-muted-foreground">/mo</span>
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-4 text-sm">
                <Stat label="Loan amount" value={formatCurrency(principal)} />
                <Stat label="Total interest" value={formatCurrency(totalInterest)} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold text-foreground">{value}</p>
    </div>
  )
}

interface SliderProps {
  label: string
  value: number
  display: string
  min: number
  max: number
  step: number
  onChange: (v: number) => void
}

function Slider({ label, value, display, min, max, step, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-foreground">{label}</label>
        <span className="text-sm font-semibold tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgba(99,102,241,0.25)] [&::-webkit-slider-thumb]:transition-all [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary"
        style={{
          background: `linear-gradient(to right, var(--color-primary) ${pct}%, var(--color-muted) ${pct}%)`,
        }}
      />
    </div>
  )
}
