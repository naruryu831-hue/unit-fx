import Link from 'next/link'
import type { Broker } from '@/data/brokers-types'
import { articles } from '@/data/articles-index'
import { getBrokerLink } from '@/lib/affiliates'
import { RankBadge } from './RankBadge'
import { CtaButton } from './CtaButton'

function findReviewSlug(brokerSlug: string): string | undefined {
  return articles.find(
    (article) => article.category === 'broker-review' && article.brokerSlugs.includes(brokerSlug)
  )?.slug
}

export function BrokerRankingList({ brokers }: { brokers: Broker[] }) {
  return (
    <ul className="space-y-4">
      {brokers.map((broker, i) => {
        const reviewSlug = findReviewSlug(broker.slug)

        return (
          <li
            key={broker.slug}
            className="rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col md:flex-row md:items-center gap-4 bg-white"
          >
            <RankBadge index={i + 1} />
            <div className="flex-1 space-y-2">
              <p className="text-xl font-bold text-slate-900">{broker.name}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                <span>最大レバレッジ: {broker.maxLeverage}</span>
                <span>最低入金額: {broker.minDeposit}</span>
                <span>日本語サポート: {broker.japaneseSupport ? 'あり' : 'なし'}</span>
              </div>
              {reviewSlug && (
                <Link href={`/articles/${reviewSlug}`} className="text-blue-600 underline text-sm">
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
  )
}
