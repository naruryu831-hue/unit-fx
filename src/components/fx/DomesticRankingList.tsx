import Link from 'next/link'
import type { Broker } from '@/data/brokers-types'
import { articles } from '@/data/articles-index'
import { getBrokerLink } from '@/lib/affiliates'
import { RankBadge } from './RankBadge'
import { CtaButton } from './CtaButton'
import { BrokerLogo } from './BrokerLogo'

function findReviewSlug(brokerSlug: string): string | undefined {
  return articles.find(
    (article) => article.category === 'broker-review' && article.brokerSlugs.includes(brokerSlug)
  )?.slug
}

export function DomesticRankingList({ brokers }: { brokers: Broker[] }) {
  return (
    <div className="space-y-4">
      <p className="text-xs leading-relaxed text-slate-500">
        ※
        この順位は金融的な優劣を数値で採点したものではありません。初心者が最初の1社として選びやすい順（取引単位の小ささ・情報量・ツールの分かりやすさ）に編集部が並べたものです（編集部調べ）。取引条件は変更されることがあるため、最新情報は必ず公式サイトでご確認ください。
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
                  編集部おすすめ
                </span>
              )}
              <div className="flex flex-col gap-5 md:flex-row">
                <div className="flex items-center gap-4 md:w-44 md:flex-col md:items-center md:justify-center md:border-r md:border-line md:pr-5">
                  <RankBadge index={i + 1} />
                  <BrokerLogo name={broker.name} slug={broker.slug} />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xl font-black text-navy-900">{broker.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {broker.company}
                      {broker.registration ? ` ・ ${broker.registration}` : ''}
                    </p>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{broker.summary}</p>
                  <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                    <div className="rounded-lg bg-paper px-3 py-2">
                      <dt className="text-[11px] font-bold text-slate-500">最低取引単位</dt>
                      <dd className="mt-0.5 text-xs font-black leading-snug text-navy-900">
                        {broker.minTradeUnit ?? '公式サイト参照'}
                      </dd>
                    </div>
                    <div className="rounded-lg bg-paper px-3 py-2">
                      <dt className="text-[11px] font-bold text-slate-500">通貨ペア数</dt>
                      <dd className="mt-0.5 text-xs font-black leading-snug text-navy-900">
                        {broker.currencyPairs ?? '公式サイト参照'}
                      </dd>
                    </div>
                    <div className="rounded-lg bg-paper px-3 py-2">
                      <dt className="text-[11px] font-bold text-slate-500">レバレッジ</dt>
                      <dd className="mt-0.5 text-xs font-black leading-snug text-navy-900">
                        {broker.maxLeverage}
                      </dd>
                    </div>
                    <div className="rounded-lg bg-paper px-3 py-2">
                      <dt className="text-[11px] font-bold text-slate-500">取引ツール</dt>
                      <dd className="mt-0.5 line-clamp-2 text-xs font-black leading-snug text-navy-900">
                        {broker.tools ?? '公式サイト参照'}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
                {reviewSlug && (
                  <Link prefetch={false}
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
