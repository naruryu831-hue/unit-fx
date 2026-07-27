import type { Broker } from '@/data/brokers-types'
import { getBrokerLink } from '@/lib/affiliates'

export function ComparisonTable({ brokers }: { brokers: Broker[] }) {
  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="border-b">
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
          <tr key={broker.slug} className="border-b">
            <td className="p-2">{broker.name}</td>
            <td className="p-2">{broker.maxLeverage}</td>
            <td className="p-2">{broker.minDeposit}</td>
            <td className="p-2">{broker.japaneseSupport ? 'あり' : 'なし'}</td>
            <td className="p-2">{broker.minAgeYears}歳以上</td>
            <td className="p-2">
              <a
                href={getBrokerLink(broker.slug)}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer nofollow sponsored"
              >
                公式サイト
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
