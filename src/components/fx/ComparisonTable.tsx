import type { Broker } from '@/data/brokers-types'
import { getBrokerLink } from '@/lib/affiliates'
import { SpecBar } from './SpecBar'
import { CtaButton } from './CtaButton'

export function parseLeverageValue(text: string): number {
  if (/無制限|unlimited/i.test(text)) return Infinity
  const match = text.match(/[\d,]+(?:\.\d+)?/)
  if (!match) return NaN
  const parsed = Number(match[0].replace(/,/g, ''))
  return parsed
}

export function ComparisonTable({ brokers }: { brokers: Broker[] }) {
  const maxLeverageValue = Math.max(
    0,
    ...brokers.map((broker) => parseLeverageValue(broker.maxLeverage)).filter(Number.isFinite)
  )

  return (
    <section aria-label="業者比較表">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-black text-navy-900">
        <span className="h-5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        掲載業者の比較表
      </h2>
      <div className="overflow-x-auto rounded-xl border border-line">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="bg-navy-900 text-left text-xs text-white">
              <th className="p-3 font-bold">業者名</th>
              <th className="p-3 font-bold">最大レバレッジ</th>
              <th className="p-3 font-bold">最低入金額</th>
              <th className="p-3 font-bold">日本語サポート</th>
              <th className="p-3 font-bold">開設可能年齢</th>
              <th className="p-3 font-bold">公式サイト</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker, i) => (
              <tr
                key={broker.slug}
                className={`border-b border-line ${i % 2 === 1 ? 'bg-paper' : 'bg-white'}`}
              >
                <td className="p-3 font-black text-navy-900">{broker.name}</td>
                <td className="w-48 p-3">
                  <SpecBar
                    label="レバレッジ"
                    value={parseLeverageValue(broker.maxLeverage)}
                    max={maxLeverageValue}
                    displayValue={broker.maxLeverage}
                  />
                </td>
                <td className="p-3">{broker.minDeposit}</td>
                <td className="p-3">{broker.japaneseSupport ? 'あり' : 'なし'}</td>
                <td className="p-3">{broker.minAgeYears}歳以上</td>
                <td className="p-3">
                  <CtaButton href={broker.linkCaution ? null : getBrokerLink(broker.slug)} size="sm">
                    公式サイト
                  </CtaButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
