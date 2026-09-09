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
      <p className="text-xs leading-relaxed text-slate-500">
        ※
        この順位は金融的な優劣を数値で採点したものではありません。日本人トレーダーの利用実績が多いとされる順に編集部が並べたものです（編集部調べ）。レバレッジ等の数値は変更されることがあるため、最新情報は必ず公式サイトでご確認ください。
      </p>
      <ol className="space-y-4">
        {brokers.map((broker, i) => {
          const reviewSlug = findReviewSlug(broker.slug)
          const isTop = i === 0

          return (
            <li
              key={broker.slug}
              className={`relative overflow-hidden rounded-2xl border bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-card-hover md:p-6 ${
                isTop ? 'border-gold-500/60 ring-2 ring-gold-400/40' : 'border-line'
              }`}
            >
              {isTop && (
                <span className="absolute right-0 top-0 rounded-bl-xl bg-gold-500 px-3 py-1 text-[11px] font-black text-navy-950">
                  日本人利用実績 No.1
                </span>
              )}
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex items-center gap-4 md:w-44 md:flex-col md:items-center md:justify-center md:border-r md:border-line md:pr-5">
                  <RankBadge index={i + 1} />
                  <BrokerLogo name={broker.name} slug={broker.slug} />
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-xl font-black text-navy-900">{broker.name}</p>
                    <p className="text-xs text-slate-500">
                      {broker.founded}年設立
                      {broker.japaneseSupport ? ' ・ 日本語サポートあり' : ''}
                    </p>
                  </div>
                  <SpecBar
                    label="最大レバレッジ"
                    value={parseLeverageValue(broker.maxLeverage)}
                    max={maxLeverageValue}
                    displayValue={broker.maxLeverage}
                  />
                  <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                    <div className="rounded-lg bg-paper px-3 py-2">
                      <dt className="text-[11px] font-bold text-slate-500">最低入金額</dt>
                      <dd className="mt-0.5 font-black text-navy-900">{broker.minDeposit}</dd>
                    </div>
                    <div className="rounded-lg bg-paper px-3 py-2">
                      <dt className="text-[11px] font-bold text-slate-500">日本語サポート</dt>
                      <dd className="mt-0.5 font-black text-navy-900">
                        {broker.japaneseSupport ? 'あり' : 'なし'}
                      </dd>
                    </div>
                    <div className="col-span-2 rounded-lg bg-paper px-3 py-2 sm:col-span-1">
                      <dt className="text-[11px] font-bold text-slate-500">ボーナス</dt>
                      <dd className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-navy-900">
                        {broker.bonusSummary}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                {reviewSlug && (
                  <Link
                    href={`/articles/${reviewSlug}`}
                    className="inline-flex cursor-pointer items-center justify-center rounded-xl border-2 border-navy-900 px-6 py-3 text-center text-sm font-black text-navy-900 transition-colors duration-200 hover:bg-navy-900 hover:text-white"
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
      </ol>
    </div>
  )
}
