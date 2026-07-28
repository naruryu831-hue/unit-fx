import Link from 'next/link'
import type { Article } from '@/data/articles-types'

export function PopularArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section aria-label="人気記事" className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-bold text-slate-900">人気記事</h2>
      <ul className="mt-3 space-y-3">
        {articles.map((article, i) => (
          <li key={article.slug} className="flex items-start gap-3">
            <span className="mt-0.5 text-lg font-bold text-slate-400">{i + 1}</span>
            <Link
              href={`/articles/${article.slug}`}
              className="text-sm font-medium text-slate-800 hover:text-indigo-600"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
