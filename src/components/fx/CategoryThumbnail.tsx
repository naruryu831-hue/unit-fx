import type { ArticleCategory } from '@/data/articles-types'
import { categoryLabels } from '@/lib/category-labels'

const CATEGORY_STYLES: Record<ArticleCategory, { bg: string; icon: React.ReactNode }> = {
  hub: {
    bg: 'from-navy-900 to-navy-700',
    icon: <path d="M4 18h4V8H4v10zm6 0h4V4h-4v14zm6 0h4v-7h-4v7z" />,
  },
  'broker-review': {
    bg: 'from-navy-900 to-navy-700',
    icon: <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2z" />,
  },
  'account-opening': {
    bg: 'from-navy-800 to-sky-700',
    icon: <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h8v2H8V9zm0 4h5v2H8v-2z" />,
  },
  'problem-solving': {
    bg: 'from-sky-800 to-cyan-600',
    icon: <path d="M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2zM9 19h6v2H9v-2z" />,
  },
  'bonus-roundup': {
    bg: 'from-gold-600 to-amber-500',
    icon: <path d="M3 8h18v4H3V8zm1 5h7v8H4v-8zm9 0h7v8h-7v-8zM8.5 3a2.5 2.5 0 012.5 2.5V8H8.5a2.5 2.5 0 010-5zm7 0a2.5 2.5 0 010 5H13V5.5A2.5 2.5 0 0115.5 3z" />,
  },
  comparison: {
    bg: 'from-teal-800 to-emerald-600',
    icon: <path d="M3 5h8v14H3V5zm10 0h8v14h-8V5zM5 7v10h4V7H5zm10 0v10h4V7h-4z" />,
  },
  tax: {
    bg: 'from-violet-800 to-fuchsia-600',
    icon: <path d="M5 3h14v18l-3-2-2 2-2-2-2 2-2-2-3 2V3zm3 4v2h8V7H8zm0 4v2h8v-2H8zm0 4v2h5v-2H8z" />,
  },
}

export function CategoryThumbnail({ category }: { category: ArticleCategory }) {
  const { bg, icon } = CATEGORY_STYLES[category]

  return (
    <div
      className={`relative mb-3 flex h-28 w-full items-center justify-between overflow-hidden rounded-xl bg-gradient-to-br px-5 text-white ${bg}`}
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <p className="relative text-lg font-black leading-tight">{categoryLabels[category]}</p>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="relative h-12 w-12 opacity-30"
      >
        {icon}
      </svg>
    </div>
  )
}
