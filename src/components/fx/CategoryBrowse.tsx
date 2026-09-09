import Link from 'next/link'
import type { Article, ArticleCategory } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'

const BROWSE_ORDER: ArticleCategory[] = [
  'broker-review',
  'account-opening',
  'problem-solving',
  'bonus-roundup',
  'comparison',
  'tax',
]

export function CategoryBrowse({ articles }: { articles: Article[] }) {
  return (
    <section
      aria-label="カテゴリから探す"
      className="rounded-2xl border border-line bg-white p-5 shadow-card"
    >
      <h2 className="flex items-center gap-2 text-base font-black text-navy-900">
        <span className="h-4 w-1 rounded-full bg-gold-500" aria-hidden="true" />
        カテゴリから探す
      </h2>
      <div className="mt-3 space-y-4">
        {BROWSE_ORDER.map((category) => {
          const all = articles.filter((article) => article.category === category)
          const items = all.slice(0, 4)
          if (items.length === 0) {
            return null
          }

          return (
            <div key={category}>
              <p className="flex items-center justify-between text-xs font-black text-navy-800">
                {categoryLabels[category]}
                <span className="tnum rounded-full bg-navy-50 px-2 py-0.5 text-[10px] text-slate-500">
                  {all.length}本
                </span>
              </p>
              <ul className="mt-1.5 space-y-1">
                {items.map((article) => (
                  <li key={article.slug} className="flex gap-2">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-sm leading-snug text-slate-700 transition-colors hover:text-navy-700"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
