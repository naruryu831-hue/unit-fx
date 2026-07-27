import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'

export function FeaturedArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block cursor-pointer rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-lg"
    >
      <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-slate-900">
        おすすめ
      </span>
      <h2 className="mt-4 text-2xl font-bold text-slate-900 group-hover:text-indigo-600 md:text-3xl">
        {article.title}
      </h2>
      <p className="mt-2 text-sm text-slate-500">{categoryLabels[article.category]}</p>
      <span className="mt-4 inline-block font-bold text-indigo-600">続きを読む →</span>
    </Link>
  )
}
