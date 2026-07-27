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
    <section aria-label="カテゴリから探す" className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-bold text-slate-900">カテゴリから探す</h2>
      <div className="mt-3 space-y-4">
        {BROWSE_ORDER.map((category) => {
          const items = articles.filter((article) => article.category === category).slice(0, 4)
          if (items.length === 0) {
            return null
          }

          return (
            <div key={category}>
              <p className="text-xs font-bold text-slate-500">{categoryLabels[category]}</p>
              <ul className="mt-1 space-y-1">
                {items.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/articles/${article.slug}`}
                      className="text-sm text-slate-700 hover:text-indigo-600"
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
