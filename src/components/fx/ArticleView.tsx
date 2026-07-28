import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { BrokerRankingList } from './BrokerRankingList'
import { BrokerCtaBanner } from './BrokerCtaBanner'
import { ArticleSummaryBox } from './ArticleSummaryBox'
import { BrokerLogo } from './BrokerLogo'
import { FaqSection } from './FaqSection'
import { RelatedArticles } from './RelatedArticles'
import { TableOfContents } from './TableOfContents'
import { ArticleBody } from './ArticleBody'
import { getRelatedArticles } from '@/lib/get-article'
import { extractHeadings } from '@/lib/parse-body'

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  const headings = extractHeadings(article.body)
  const isHub = article.category === 'hub'
  const singleBroker = brokers.length === 1 ? brokers[0] : null

  return (
    <article className="mx-auto max-w-6xl space-y-8 p-6">
      {singleBroker ? (
        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
          <BrokerLogo name={singleBroker.name} slug={singleBroker.slug} size="lg" />
          <div>
            <p className="text-sm font-bold text-slate-600">{singleBroker.name}</p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">{article.title}</h1>
          </div>
        </header>
      ) : (
        <h1 className="text-2xl font-bold">{article.title}</h1>
      )}

      {isHub && (
        <div className="space-y-4">
          <RiskDisclaimer />
          <BrokerRankingList brokers={brokers} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-8">
          <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            {!isHub && <RiskDisclaimer />}
            {singleBroker && article.summaryPoints && (
              <ArticleSummaryBox brokerName={singleBroker.name} points={article.summaryPoints} />
            )}
            {singleBroker && <BrokerCtaBanner broker={singleBroker} />}
            <ArticleBody body={article.body} />
            {!isHub && <ComparisonTable brokers={brokers} />}
            {singleBroker && <BrokerCtaBanner broker={singleBroker} />}
            <FaqSection items={article.faq} />
          </div>
          <RelatedArticles articles={getRelatedArticles(article)} />
        </div>
        <aside className="lg:sticky lg:top-6 lg:h-fit">
          <TableOfContents items={headings} />
        </aside>
      </div>
    </article>
  )
}
