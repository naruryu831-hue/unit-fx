import Link from 'next/link'
import type { Article } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section
      aria-label="次に読むおすすめ"
      className="rounded-2xl border border-line bg-white p-6 shadow-card"
    >
      <h2 className="flex items-center gap-2 text-lg font-black text-navy-900">
        <span className="h-5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />
        次に読むおすすめ
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link prefetch={false}
              href={`/articles/${article.slug}`}
              className="group flex h-full cursor-pointer items-center justify-between gap-3 rounded-xl border border-line bg-paper px-4 py-3 transition-all duration-200 hover:border-navy-900 hover:bg-navy-900"
            >
              <span>
                <span aria-hidden="true" className="block text-[10px] font-bold text-slate-500 group-hover:text-gold-400">
                  {categoryLabels[article.category]}
                </span>
                <span className="block text-sm font-bold leading-snug text-navy-900 group-hover:text-white">
                  {article.title}
                </span>
              </span>
              <span aria-hidden="true" className="text-gold-500">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
