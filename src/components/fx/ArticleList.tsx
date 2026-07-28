import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'
import { getBrokerBySlug } from '@/data/brokers-index'
import { BrokerReviewThumbnail } from './BrokerReviewThumbnail'

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {articles.map((article) => {
        const broker =
          article.category === 'broker-review' ? getBrokerBySlug(article.brokerSlugs[0]) : undefined

        return (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="block h-full cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {broker && <BrokerReviewThumbnail brokerName={broker.name} slug={broker.slug} />}
              <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                {categoryLabels[article.category]}
              </span>
              <p className="mt-2 font-bold leading-snug text-slate-900">{article.title}</p>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
