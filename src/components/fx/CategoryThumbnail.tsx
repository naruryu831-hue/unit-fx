import type { ArticleCategory } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'

const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  hub: 'bg-indigo-600',
  'broker-review': 'bg-indigo-600',
  'account-opening': 'bg-indigo-600',
  'problem-solving': 'bg-sky-600',
  'bonus-roundup': 'bg-amber-600',
  comparison: 'bg-teal-600',
  tax: 'bg-violet-600',
}

export function CategoryThumbnail({ category }: { category: ArticleCategory }) {
  const color = CATEGORY_COLORS[category]

  return (
    <div
      className={`mb-3 flex h-24 w-full flex-col items-center justify-center rounded-lg px-3 text-center text-white ${color}`}
    >
      <p className="text-lg font-bold leading-tight">{categoryLabels[category]}</p>
    </div>
  )
}
