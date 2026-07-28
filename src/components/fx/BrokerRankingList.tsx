import Link from 'next/link'
import type { Broker } from '@/data/brokers-types'
import { articles } from '@/data/articles-index'
import { getBrokerLink } from '@/lib/affiliates'
import { RankBadge } from './RankBadge'
import { CtaButton } from './CtaButton'
import { BrokerLogo } from './BrokerLogo'
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
    ...brokers.map((broker) => parseLeverageValue(broker.maxLeverage)).filter(Number.isFinite)
  )

  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-slate-600">
        ※
        この順位は金融的な優劣を数値で採点したものではありません。日本人トレーダーの利用実績が多いとされる順に編集部が並べたものです（編集部調べ）。レバレッジ等の数値は変更されることがあるため、最新情報は必ず公式サイトでご確認ください。
      </p>
      <ul className="space-y-4">
        {brokers.map((broker, i) => {
          const reviewSlug = findReviewSlug(broker.slug)

          return (
            <li
              key={broker.slug}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="flex items-center gap-3 md:flex-col">
                  <RankBadge index={i + 1} />
                  <BrokerLogo name={broker.name} slug={broker.slug} />
                </div>
                <div className="flex-1 space-y-3">
                  <p className="text-xl font-bold text-slate-900">{broker.name}</p>
                  <SpecBar
                    label="最大レバレッジ"
                    value={parseLeverageValue(broker.maxLeverage)}
                    max={maxLeverageValue}
                    displayValue={broker.maxLeverage}
                  />
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
                    <div>
                      <dt className="text-xs text-slate-600">最低入金額</dt>
                      <dd className="font-bold text-slate-800">{broker.minDeposit}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-slate-600">日本語サポート</dt>
                      <dd className="font-bold text-slate-800">
                        {broker.japaneseSupport ? 'あり' : 'なし'}
                      </dd>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <dt className="text-xs text-slate-600">ボーナス</dt>
                      <dd className="line-clamp-2 font-bold text-slate-800">
                        {broker.bonusSummary}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
                {reviewSlug && (
                  <Link
                    href={`/articles/${reviewSlug}`}
                    className="inline-block cursor-pointer rounded-xl bg-amber-500 px-6 py-3 text-center font-bold text-slate-900 transition-colors duration-200 hover:bg-amber-400"
                  >
                    この業者の紹介ページを見る
                  </Link>
                )}
                <CtaButton href={broker.linkCaution ? null : getBrokerLink(broker.slug)}>
                  公式サイトはこちら
                </CtaButton>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
