"use client"

import { useMemo, useState } from "react"
import { formatCurrency } from "@/lib/utils"

const SEGMENTS = [
  { key: "principal", label: "Principal & Interest", color: "#18181b" },
  { key: "tax", label: "Property Tax", color: "#6366f1" },
  { key: "insurance", label: "Home Insurance", color: "#10b981" },
  { key: "hoa", label: "HOA Dues", color: "#f59e0b" },
] as const

function Slider({
  label,
  value,
  min,
  max,
  step,
  format,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  format: (v: number) => string
  onChange: (v: number) => void
}) {
  const pct = ((value - min) / (max - min)) * 100
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-600">{label}</span>
        <span className="font-medium text-zinc-900 tabular-nums">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-zinc-900 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
        style={{ background: `linear-gradient(to right, #18181b ${pct}%, #e4e4e7 ${pct}%)` }}
      />
    </div>
  )
}

export function MortgageEstimator({ price, hoa }: { price: number; hoa: number }) {
  const [down, setDown] = useState(20)
  const [rate, setRate] = useState(5.5)
  const [term, setTerm] = useState(30)

  const { monthlyPI, tax, insurance, total } = useMemo(() => {
    const downAmt = (down / 100) * price
    const loan = price - downAmt
    const r = rate / 100 / 12
    const n = term * 12
    const pi = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const monthlyTax = (price * 0.011) / 12
    const monthlyIns = (price * 0.0035) / 12
    return {
      monthlyPI: pi,
      tax: monthlyTax,
      insurance: monthlyIns,
      total: pi + monthlyTax + monthlyIns + hoa,
    }
  }, [down, rate, term, price, hoa])

  const values = { principal: monthlyPI, tax, insurance, hoa }

  return (
    <section>
      <h2 className="text-lg font-semibold tracking-tight text-zinc-900">Mortgage estimator</h2>

      <div className="mt-5 grid grid-cols-1 gap-8 rounded-2xl border border-zinc-200/70 p-6 md:grid-cols-2 md:p-8">
        {/* Controls */}
        <div className="flex flex-col gap-6">
          <Slider
            label="Down payment"
            value={down}
            min={5}
            max={60}
            step={1}
            format={(v) => `${v}% · ${formatCurrency((v / 100) * price)}`}
            onChange={setDown}
          />
          <Slider
            label="Interest rate"
            value={rate}
            min={2}
            max={10}
            step={0.1}
            format={(v) => `${v.toFixed(1)}%`}
            onChange={setRate}
          />
          <Slider
            label="Loan term"
            value={term}
            min={10}
            max={30}
            step={5}
            format={(v) => `${v} years`}
            onChange={setTerm}
          />
        </div>

        {/* Breakdown */}
        <div className="flex flex-col justify-between gap-6 border-t border-zinc-200/70 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          <div>
            <p className="text-sm text-zinc-500">Estimated monthly payment</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums">
              {formatCurrency(total)}
            </p>
          </div>

          {/* Stacked bar */}
          <div className="flex h-3 w-full overflow-hidden rounded-full">
            {SEGMENTS.map((s) => (
              <div
                key={s.key}
                style={{
                  width: `${(values[s.key as keyof typeof values] / total) * 100}%`,
                  backgroundColor: s.color,
                }}
                className="transition-all duration-300"
              />
            ))}
          </div>

          <ul className="flex flex-col gap-2.5">
            {SEGMENTS.map((s) => (
              <li key={s.key} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-zinc-600">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.label}
                </span>
                <span className="font-medium text-zinc-900 tabular-nums">
                  {formatCurrency(values[s.key as keyof typeof values])}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
