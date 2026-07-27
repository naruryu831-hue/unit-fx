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
    <div className="rounded-xl overflow-hidden border border-slate-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="p-2 text-left">業者名</th>
            <th className="p-2 text-left">最大レバレッジ</th>
            <th className="p-2 text-left">最低入金額</th>
            <th className="p-2 text-left">日本語サポート</th>
            <th className="p-2 text-left">開設可能年齢</th>
            <th className="p-2 text-left">公式サイト</th>
          </tr>
        </thead>
        <tbody>
          {brokers.map((broker) => (
            <tr key={broker.slug} className="border-b border-slate-200">
              <td className="p-2">{broker.name}</td>
              <td className="p-2">
                <SpecBar
                  label="レバレッジ"
                  value={parseLeverageValue(broker.maxLeverage)}
                  max={maxLeverageValue}
                  displayValue={broker.maxLeverage}
                />
              </td>
              <td className="p-2">{broker.minDeposit}</td>
              <td className="p-2">{broker.japaneseSupport ? 'あり' : 'なし'}</td>
              <td className="p-2">{broker.minAgeYears}歳以上</td>
              <td className="p-2">
                <CtaButton href={broker.linkCaution ? null : getBrokerLink(broker.slug)}>
                  公式サイト
                </CtaButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
