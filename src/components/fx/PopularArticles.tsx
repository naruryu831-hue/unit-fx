import Link from 'next/link'
import type { Article } from '@/data/articles-types'

export function PopularArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section
      aria-label="人気記事"
      className="rounded-2xl border border-line bg-white p-5 shadow-card"
    >
      <h2 className="flex items-center gap-2 text-base font-black text-navy-900">
        <span className="h-4 w-1 rounded-full bg-gold-500" aria-hidden="true" />
        人気記事
      </h2>
      <ul className="mt-3 divide-y divide-line">
        {articles.map((article, i) => (
          <li key={article.slug} className="flex items-start gap-3 py-3">
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-md text-xs font-black ${
                i < 3 ? 'bg-gold-500 text-navy-950' : 'bg-navy-50 text-navy-800'
              }`}
            >
              {i + 1}
            </span>
            <Link
              href={`/articles/${article.slug}`}
              className="text-sm font-bold leading-snug text-slate-800 transition-colors hover:text-navy-700"
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
