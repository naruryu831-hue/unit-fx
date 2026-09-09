import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { DomesticComparisonTable } from './DomesticComparisonTable'
import { BrokerRankingList } from './BrokerRankingList'
import { DomesticRankingList } from './DomesticRankingList'
import { BrokerCtaBanner } from './BrokerCtaBanner'
import { ArticleSummaryBox } from './ArticleSummaryBox'
import { BrokerLogo } from './BrokerLogo'
import { FaqSection } from './FaqSection'
import { RelatedArticles } from './RelatedArticles'
import { TableOfContents } from './TableOfContents'
import { ArticleBody } from './ArticleBody'
import { SiteFooter } from './SiteFooter'
import { ToolsPromo } from './ToolsPromo'
import { getRelatedArticles } from '@/lib/get-article'
import { extractHeadings } from '@/lib/parse-body'
import { categoryLabels } from '@/lib/category-labels'

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  const headings = extractHeadings(article.body)
  const isHub = article.category === 'hub'
  const singleBroker = brokers.length === 1 ? brokers[0] : null
  const market = article.market ?? 'overseas'
  const isDomestic = market === 'domestic'
  const marketLabel = isDomestic ? '国内FX' : '海外FX'
  const hubHref = isDomestic ? '/articles/kokunai-fx-hikaku-hub' : '/articles/kaigai-fx-hikaku-hub'

  return (
    <>
      <article className="mx-auto max-w-6xl space-y-8 px-5 py-8">
        <nav aria-label="パンくずリスト" className="text-xs text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-navy-900">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={hubHref} className="hover:text-navy-900">
                {marketLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-navy-800">{categoryLabels[article.category]}</li>
          </ol>
        </nav>

        {singleBroker ? (
          <header className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-6 shadow-card sm:flex-row sm:items-center">
            <BrokerLogo name={singleBroker.name} slug={singleBroker.slug} size="lg" />
            <div>
              <p className="inline-block rounded-md bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-800">
                {marketLabel} ・ {categoryLabels[article.category]} ・ {singleBroker.name}
              </p>
              <h1 className="mt-2 text-2xl font-black leading-tight text-navy-900 md:text-3xl">
                {article.title}
              </h1>
            </div>
          </header>
        ) : (
          <header>
            <p className="inline-block rounded-md bg-navy-50 px-2 py-0.5 text-xs font-bold text-navy-800">
              {marketLabel} ・ {categoryLabels[article.category]}
            </p>
            <h1 className="mt-3 text-2xl font-black leading-tight text-navy-900 md:text-4xl">
              {article.title}
            </h1>
          </header>
        )}

        {isHub && (
          <div className="space-y-5">
            <RiskDisclaimer market={market} />
            {isDomestic ? (
              <DomesticRankingList brokers={brokers} />
            ) : (
              <BrokerRankingList brokers={brokers} />
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <div className="space-y-8 rounded-2xl border border-line bg-white p-5 shadow-card md:p-10">
              {!isHub && <RiskDisclaimer compact market={market} />}
              {singleBroker && article.summaryPoints && (
                <ArticleSummaryBox brokerName={singleBroker.name} points={article.summaryPoints} />
              )}
              {singleBroker && <BrokerCtaBanner broker={singleBroker} />}
              <ArticleBody body={article.body} />
              {!isHub &&
                brokers.length > 0 &&
                (isDomestic ? (
                  <DomesticComparisonTable brokers={brokers} />
                ) : (
                  <ComparisonTable brokers={brokers} />
                ))}
              {singleBroker && <BrokerCtaBanner broker={singleBroker} />}
              <FaqSection items={article.faq} />
            </div>
            <ToolsPromo market={market} />
            <RelatedArticles articles={getRelatedArticles(article)} />
          </div>
          <aside className="lg:sticky lg:top-20 lg:h-fit">
            <TableOfContents items={headings} />
          </aside>
        </div>
      </article>
      <SiteFooter />
    </>
  )
}
