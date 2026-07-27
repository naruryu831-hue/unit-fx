import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link
            href={`/articles/${article.slug}`}
            className="block h-full cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
              {categoryLabels[article.category]}
            </span>
            <p className="mt-2 font-bold leading-snug text-slate-900">{article.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
