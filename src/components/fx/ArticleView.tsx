import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { BrokerRankingList } from './BrokerRankingList'
import { FaqSection } from './FaqSection'
import { RelatedArticles } from './RelatedArticles'
import { TableOfContents } from './TableOfContents'
import { ArticleBody } from './ArticleBody'
import { getRelatedArticles } from '@/lib/get-article'
import { extractHeadings } from '@/lib/parse-body'

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  const headings = extractHeadings(article.body)
  const isHub = article.category === 'hub'

  return (
    <article className="mx-auto max-w-6xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">{article.title}</h1>

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
            <ArticleBody body={article.body} />
            {!isHub && <ComparisonTable brokers={brokers} />}
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
