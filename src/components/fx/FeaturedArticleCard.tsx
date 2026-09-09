import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { categoryLabels } from '@/lib/category-labels'
import { overseasBrokers } from '@/data/brokers-index'
import { getBrokerLogoPath } from '@/lib/broker-logos'
import { getBrokerShortName } from '@/lib/broker-visual'

export function FeaturedArticleCard({
  article,
  brokers = overseasBrokers,
  lead,
  badge = 'おすすめ',
}: {
  article: Article
  brokers?: Broker[]
  lead?: string
  badge?: string
}) {
  const top = brokers.slice(0, 3)

  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group relative block min-w-0 cursor-pointer overflow-hidden rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-navy-700 p-7 text-white shadow-card transition-shadow duration-200 hover:shadow-card-hover md:p-10"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-3 py-1 text-xs font-black text-navy-950">
            <span aria-hidden="true">★</span> {badge}
          </span>
          <h2 className="mt-4 text-2xl font-black leading-tight md:text-4xl">{article.title}</h2>
          <p className="mt-3 text-sm text-slate-300">
            {lead ??
              `${categoryLabels[article.category]} ・ 提携${brokers.length}社をレバレッジ・最低入金額・日本語対応で横並び比較`}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-black text-navy-900 transition-colors group-hover:bg-gold-400">
            続きを読む <span aria-hidden="true">→</span>
          </span>
        </div>
        <ul className="flex min-w-0 flex-wrap gap-3 md:flex-col">
          {top.map((broker, i) => {
            const logo = getBrokerLogoPath(broker.slug)
            return (
              <li
                key={broker.slug}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-gold-500 text-xs font-black text-navy-950">
                  {i + 1}
                </span>
                {logo && (
                  <span className="hidden h-8 w-16 place-items-center rounded-md bg-white px-1.5 sm:grid">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logo} alt="" className="max-h-5 max-w-full object-contain" />
                  </span>
                )}
                <span className="text-sm font-bold">{getBrokerShortName(broker.name)}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </Link>
  )
}
