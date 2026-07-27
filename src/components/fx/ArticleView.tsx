import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'
import { RiskDisclaimer } from './RiskDisclaimer'
import { ComparisonTable } from './ComparisonTable'
import { FaqSection } from './FaqSection'
import { RelatedArticles } from './RelatedArticles'
import { TableOfContents } from './TableOfContents'
import { ArticleBody } from './ArticleBody'
import { getRelatedArticles } from '@/lib/get-article'
import { extractHeadings } from '@/lib/parse-body'

export function ArticleView({ article, brokers }: { article: Article; brokers: Broker[] }) {
  const headings = extractHeadings(article.body)

  return (
    <article className="mx-auto max-w-3xl space-y-8 p-6">
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <TableOfContents items={headings} />
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-8">
        <RiskDisclaimer />
        <ArticleBody body={article.body} />
        <ComparisonTable brokers={brokers} />
        <FaqSection items={article.faq} />
      </div>
      <RelatedArticles articles={getRelatedArticles(article)} />
    </article>
  )
}
