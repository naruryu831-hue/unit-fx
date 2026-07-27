import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { FaqSection } from './FaqSection'
import { RelatedArticles } from './RelatedArticles'
import { getRelatedArticles } from '@/lib/get-article'

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  return (
    <article className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <RiskDisclaimer />
      <div className="whitespace-pre-line leading-relaxed">{article.body}</div>
      <ComparisonTable brokers={brokers} />
      <FaqSection items={article.faq} />
      <RelatedArticles articles={getRelatedArticles(article)} />
    </article>
  )
}
