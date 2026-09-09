'use client'

import { useMemo, useState } from 'react'

const yen = (n: number) =>
  Number.isFinite(n) ? `${Math.round(n).toLocaleString('ja-JP')}円` : '―'

function Field({
  label,
  value,
  onChange,
  suffix,
  step = 1,
  min = 0,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  suffix?: string
  step?: number
  min?: number
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold text-slate-600">{label}</span>
      <span className="mt-1 flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ''}
          min={min}
          step={step}
          onChange={(e) => onChange(Number(e.target.value))}
          className="tnum w-full rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-navy-900 outline-none ring-gold-400 focus:ring-2"
        />
        {suffix && <span className="shrink-0 text-xs text-slate-500">{suffix}</span>}
      </span>
    </label>
  )
}

function Result({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-baseline justify-between gap-3 rounded-lg px-3 py-2 ${strong ? 'bg-navy-900 text-white' : 'bg-paper'}`}>
      <span className={`text-xs font-bold ${strong ? 'text-slate-300' : 'text-slate-500'}`}>{label}</span>
      <span className={`tnum text-right text-base font-black ${strong ? 'text-gold-400' : 'text-navy-900'}`}>
        {value}
      </span>
    </div>
  )
}

function Card({ id, title, lead, children }: { id: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20 rounded-2xl border border-line bg-white p-5 shadow-card md:p-8">
      <h2 className="flex items-center gap-2 text-xl font-black text-navy-900">
        <span className="h-5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        {title}
      </h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-500">{lead}</p>
      <div className="mt-5">{children}</div>
    </section>
  )
}

function MarginCalculator() {
  const [rate, setRate] = useState(150)
  const [units, setUnits] = useState(10000)
  const [leverage, setLeverage] = useState(25)
  const [deposit, setDeposit] = useState(100000)
  const [losscut, setLosscut] = useState(100)

  const r = useMemo(() => {
    const position = rate * units
    const margin = position / leverage
    const ratio = margin > 0 ? (deposit / margin) * 100 : NaN
    const cutLoss = deposit - (margin * losscut) / 100
    const cutPips = units > 0 ? (cutLoss / units) * 100 : NaN
    return { position, margin, ratio, cutLoss, cutPips }
  }, [rate, units, leverage, deposit, losscut])

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="為替レート（円）" value={rate} onChange={setRate} suffix="円" step={0.01} />
        <Field label="取引数量" value={units} onChange={setUnits} suffix="通貨" step={1000} />
        <Field label="レバレッジ" value={leverage} onChange={setLeverage} suffix="倍" />
        <Field label="口座残高（証拠金）" value={deposit} onChange={setDeposit} suffix="円" step={10000} />
        <Field label="ロスカット水準（証拠金維持率）" value={losscut} onChange={setLosscut} suffix="%" />
        <div className="flex flex-wrap items-end gap-2 text-xs">
          <button type="button" onClick={() => setLeverage(25)} className="rounded-md border border-line px-2.5 py-1.5 font-bold text-navy-900 hover:bg-navy-50">国内 25倍</button>
          <button type="button" onClick={() => setLeverage(1000)} className="rounded-md border border-line px-2.5 py-1.5 font-bold text-navy-900 hover:bg-navy-50">海外 1000倍</button>
        </div>
      </div>
      <div className="space-y-2">
        <Result label="取引金額（レート×数量）" value={yen(r.position)} />
        <Result label="必要証拠金" value={yen(r.margin)} strong />
        <Result label="現在の証拠金維持率" value={Number.isFinite(r.ratio) ? `${r.ratio.toFixed(0)}%` : '―'} />
        <Result label="ロスカットまでの許容損失" value={yen(r.cutLoss)} />
        <Result label="ロスカットまでの値幅（目安）" value={Number.isFinite(r.cutPips) ? `約${r.cutPips.toFixed(1)}pips（${(r.cutPips / 100).toFixed(2)}円）` : '―'} />
        <p className="text-[11px] leading-relaxed text-slate-500">
          ※ 円建て通貨ペア（米ドル/円など）を前提にした概算です。スプレッド・スワップ・各社の証拠金率の端数処理は含みません。実際のロスカット水準は業者・口座タイプで異なります。
        </p>
      </div>
    </div>
  )
}

function PipsCalculator() {
  const [units, setUnits] = useState(10000)
  const [pips, setPips] = useState(10)
  const [trades, setTrades] = useState(1)

  const perPip = units * 0.01
  const total = perPip * pips * trades

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="取引数量" value={units} onChange={setUnits} suffix="通貨" step={1000} />
        <Field label="値幅" value={pips} onChange={setPips} suffix="pips" step={0.1} />
        <Field label="取引回数" value={trades} onChange={setTrades} suffix="回" />
      </div>
      <div className="space-y-2">
        <Result label="1pipsあたりの損益" value={yen(perPip)} />
        <Result label="合計損益（値幅×数量×回数）" value={yen(total)} strong />
        <Result label="1,000通貨に換算" value={`1pips = ${yen(10)}`} />
        <p className="text-[11px] leading-relaxed text-slate-500">
          ※ 円建て通貨ペアで1pips＝0.01円として計算しています。損失方向にも同じ額が動きます。
        </p>
      </div>
    </div>
  )
}

const BRACKETS: { limit: number; rate: number; deduction: number }[] = [
  { limit: 1_950_000, rate: 0.05, deduction: 0 },
  { limit: 3_300_000, rate: 0.1, deduction: 97_500 },
  { limit: 6_950_000, rate: 0.2, deduction: 427_500 },
  { limit: 9_000_000, rate: 0.23, deduction: 636_000 },
  { limit: 18_000_000, rate: 0.33, deduction: 1_536_000 },
  { limit: 40_000_000, rate: 0.4, deduction: 2_796_000 },
  { limit: Infinity, rate: 0.45, deduction: 4_796_000 },
]

function incomeTax(taxable: number): number {
  if (taxable <= 0) return 0
  const b = BRACKETS.find((x) => taxable <= x.limit)!
  const base = taxable * b.rate - b.deduction
  return base * 1.021
}

function TaxCalculator() {
  const [salaryTaxable, setSalaryTaxable] = useState(3_000_000)
  const [profit, setProfit] = useState(1_000_000)

  const r = useMemo(() => {
    const domestic = profit > 0 ? profit * 0.20315 : 0
    const baseTax = incomeTax(salaryTaxable)
    const withFx = incomeTax(salaryTaxable + Math.max(0, profit))
    const overseasIncome = withFx - baseTax
    const overseasResident = Math.max(0, profit) * 0.1
    const overseas = overseasIncome + overseasResident
    return { domestic, overseas, overseasIncome, overseasResident, diff: overseas - domestic }
  }, [salaryTaxable, profit])

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
      <div className="grid gap-3">
        <Field label="FX以外の課税所得（給与所得−各種控除）" value={salaryTaxable} onChange={setSalaryTaxable} suffix="円" step={100000} />
        <Field label="FXの年間利益（経費控除後）" value={profit} onChange={setProfit} suffix="円" step={100000} />
        <p className="text-[11px] leading-relaxed text-slate-500">
          課税所得が分からない場合は、源泉徴収票の「給与所得控除後の金額」から「所得控除の額の合計額」を引いた金額を入れてください。
        </p>
      </div>
      <div className="space-y-2">
        <Result label="国内FX（申告分離課税 20.315%）" value={yen(r.domestic)} strong />
        <Result label="海外FX（総合課税）合計" value={yen(r.overseas)} strong />
        <Result label="　うち所得税＋復興特別所得税（増加分）" value={yen(r.overseasIncome)} />
        <Result label="　うち住民税（10%）" value={yen(r.overseasResident)} />
        <Result label="差額（海外 − 国内）" value={`${r.diff >= 0 ? '+' : ''}${yen(r.diff)}`} />
        <p className="text-[11px] leading-relaxed text-slate-500">
          ※ 2026年時点の所得税速算表と住民税10%で計算した概算です。住民税の均等割・調整控除、国内FXの損失繰越、各種控除の変動は含みません。最終的な税額は税務署・税理士にご確認ください。
        </p>
      </div>
    </div>
  )
}

export function FxCalculators() {
  return (
    <div className="space-y-8">
      <Card id="margin" title="必要証拠金・ロスカット計算" lead="レート・数量・レバレッジから必要証拠金と維持率、ロスカットまでの値幅を試算します。">
        <MarginCalculator />
      </Card>
      <Card id="pips" title="pips損益計算" lead="値幅と数量から、円建ての損益額を確認します。">
        <PipsCalculator />
      </Card>
      <Card id="tax" title="FX税金シミュレーター（国内 vs 海外）" lead="同じ利益で、申告分離課税と総合課税の税額がどれだけ違うかを比較します。">
        <TaxCalculator />
      </Card>
    </div>
  )
}
