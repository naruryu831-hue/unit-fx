import Link from 'next/link'
import type { Article } from '@/data/articles-types'

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section
      aria-label="次に読むおすすめ"
      className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6"
    >
      <h2 className="text-lg font-bold text-slate-900">次に読むおすすめ</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={`/articles/${article.slug}`}
              className="flex h-full cursor-pointer items-center justify-between gap-2 rounded-xl border border-indigo-200 bg-white px-4 py-3 font-bold text-indigo-700 shadow-sm transition-colors duration-200 hover:bg-indigo-600 hover:text-white"
            >
              <span>{article.title}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
