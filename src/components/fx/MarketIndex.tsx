import Link from 'next/link'
import type { Article, ArticleCategory } from '@/data/articles-types'
import type { Broker, BrokerMarket } from '@/data/brokers-types'
import { ArticleList } from './ArticleList'
import { RiskDisclaimer } from './RiskDisclaimer'
import { SiteFooter } from './SiteFooter'
import { ToolsPromo } from './ToolsPromo'
import { JsonLd } from './JsonLd'
import { categoryLabels } from '@/lib/category-labels'
import { SITE_URL } from '@/lib/site-config'

const ORDER: ArticleCategory[] = [
  'hub',
  'broker-review',
  'comparison',
  'problem-solving',
  'bonus-roundup',
  'account-opening',
  'tax',
]

export function MarketIndex({
  market,
  title,
  lead,
  articles,
  brokers,
  hubSlug,
}: {
  market: BrokerMarket
  title: string
  lead: string
  articles: Article[]
  brokers: Broker[]
  hubSlug: string
}) {
  const path = market === 'domestic' ? '/kokunai' : '/kaigai'
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'トップ', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` },
    ],
  }

  return (
    <>
      <JsonLd data={breadcrumbLd} />
      <main className="mx-auto max-w-6xl space-y-10 px-5 py-8">
        <nav aria-label="パンくずリスト" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-navy-900">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-navy-800">{title}</li>
          </ol>
        </nav>
        <header className="space-y-3">
          <h1 className="text-2xl font-black leading-tight text-navy-900 md:text-4xl">{title}</h1>
          <p className="max-w-3xl text-sm leading-relaxed text-slate-600 md:text-base">{lead}</p>
          <p className="text-xs text-slate-500">
            掲載業者{brokers.length}社 ・ 記事{articles.length}本
          </p>
          <Link
            href={`/articles/${hubSlug}`}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-b from-gold-400 to-gold-500 px-5 py-3 text-sm font-black text-navy-950 shadow-[0_2px_0_#b8891f] transition-transform hover:-translate-y-px"
          >
            比較ランキングを見る <span aria-hidden="true">→</span>
          </Link>
        </header>
        <RiskDisclaimer compact market={market} />
        <section aria-label="掲載業者" className="space-y-3">
          <h2 className="flex items-center gap-2 text-xl font-black text-navy-900">
            <span className="h-6 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
            掲載業者
          </h2>
          <ul className="flex flex-wrap gap-2">
            {brokers.map((broker) => {
              const review = articles.find(
                (a) => a.category === 'broker-review' && a.brokerSlugs[0] === broker.slug
              )
              return (
                <li key={broker.slug}>
                  <Link
                    href={review ? `/articles/${review.slug}` : `/articles/${hubSlug}`}
                    className="inline-block rounded-lg border border-line bg-white px-3 py-2 text-sm font-bold text-navy-900 transition-colors hover:border-navy-900"
                  >
                    {broker.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
        {ORDER.map((category) => {
          const list = articles.filter((a) => a.category === category)
          if (list.length === 0) return null
          return (
            <section key={category} id={category} className="scroll-mt-20 space-y-5">
              <h2 className="flex items-center gap-2 text-xl font-black text-navy-900 md:text-2xl">
                <span className="h-6 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
                {categoryLabels[category]}
                <span className="tnum text-sm font-bold text-slate-400">{list.length}本</span>
              </h2>
              <ArticleList articles={list} />
            </section>
          )
        })}
        <ToolsPromo market={market} />
      </main>
      <SiteFooter />
    </>
  )
}
