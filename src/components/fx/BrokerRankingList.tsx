import Link from 'next/link'
import type { Broker } from '@/data/brokers-types'
import { articles } from '@/data/articles-index'
import { getBrokerLink } from '@/lib/affiliates'
import { RankBadge } from './RankBadge'
import { CtaButton } from './CtaButton'
import { BrokerLogoBadge } from './BrokerLogoBadge'
import { SpecBar } from './SpecBar'
import { parseLeverageValue } from './ComparisonTable'

function findReviewSlug(brokerSlug: string): string | undefined {
  return articles.find(
    (article) => article.category === 'broker-review' && article.brokerSlugs.includes(brokerSlug)
  )?.slug
}

export function BrokerRankingList({ brokers }: { brokers: Broker[] }) {
  const maxLeverageValue = Math.max(
    0,
    ...brokers.map((broker) => parseLeverageValue(broker.maxLeverage))
  )

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-slate-500">
        ※
        この順位は金融的な優劣を数値で採点したものではありません。日本人トレーダーの利用実績が多いとされる順に編集部が並べたものです（編集部調べ）。レバレッジ等の数値は変更されることがあるため、最新情報は必ず公式サイトでご確認ください。
      </p>
      <ul className="space-y-4">
        {brokers.map((broker, i) => {
          const reviewSlug = findReviewSlug(broker.slug)

          return (
            <li
              key={broker.slug}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md md:flex-row md:items-center"
            >
              <div className="flex items-center gap-3 md:flex-col">
                <RankBadge index={i + 1} />
                <BrokerLogoBadge name={broker.name} slug={broker.slug} />
              </div>
              <div className="flex-1 space-y-3">
                <p className="text-xl font-bold text-slate-900">{broker.name}</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <SpecBar
                    label="最大レバレッジ"
                    value={parseLeverageValue(broker.maxLeverage)}
                    max={maxLeverageValue}
                    displayValue={broker.maxLeverage}
                  />
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                    <span>最低入金額: {broker.minDeposit}</span>
                    <span>日本語サポート: {broker.japaneseSupport ? 'あり' : 'なし'}</span>
                  </div>
                </div>
                {reviewSlug && (
                  <Link href={`/articles/${reviewSlug}`} className="text-sm text-blue-600 underline">
                    詳しく見る
                  </Link>
                )}
              </div>
              <CtaButton href={broker.linkCaution ? null : getBrokerLink(broker.slug)}>
                公式サイト
              </CtaButton>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
