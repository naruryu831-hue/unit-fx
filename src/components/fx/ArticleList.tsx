import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'
import { getBrokerBySlug } from '@/data/brokers-index'
import { BrokerReviewThumbnail } from './BrokerReviewThumbnail'
import { CategoryThumbnail } from './CategoryThumbnail'

function renderThumbnail(article: Article) {
  if (article.category === 'broker-review') {
    const broker = getBrokerBySlug(article.brokerSlugs[0])
    return broker ? <BrokerReviewThumbnail brokerName={broker.name} slug={broker.slug} /> : null
  }

  if (article.category === 'account-opening') {
    const broker = getBrokerBySlug(article.brokerSlugs[0])
    return broker ? (
      <BrokerReviewThumbnail brokerName={broker.name} slug={broker.slug} caption="口座開設ガイド" />
    ) : null
  }

  if (article.brokerSlugs.length === 1 && article.category !== 'hub') {
    const broker = getBrokerBySlug(article.brokerSlugs[0])
    if (broker) {
      return (
        <BrokerReviewThumbnail
          brokerName={broker.name}
          slug={broker.slug}
          caption={categoryLabels[article.category]}
        />
      )
    }
  }

  return <CategoryThumbnail category={article.category} />
}

function readingMinutes(body: string): number {
  return Math.max(1, Math.round(body.length / 600))
}

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {articles.map((article) => (
        <li key={article.slug} className="min-w-0">
          <Link
            href={`/articles/${article.slug}`}
            className="group flex h-full cursor-pointer flex-col rounded-2xl border border-line bg-white p-4 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            {renderThumbnail(article)}
            <div className="flex items-center gap-2 text-xs">
              <span className="rounded-md bg-navy-50 px-2 py-0.5 font-bold text-navy-800">
                {categoryLabels[article.category]}
              </span>
              <span className="text-slate-400">約{readingMinutes(article.body)}分</span>
            </div>
            <p className="mt-2 font-bold leading-snug text-navy-900 transition-colors group-hover:text-navy-700">
              {article.title}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
