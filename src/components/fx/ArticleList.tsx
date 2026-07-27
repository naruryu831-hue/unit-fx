import Link from 'next/link'
import type { Article } from '@/data/articles-types'

export function ArticleList({ articles }: { articles: Article[] }) {
  return (
    <ul className="space-y-2">
      {articles.map((article) => (
        <li key={article.slug}>
          <Link href={`/articles/${article.slug}`} className="text-blue-600 underline">
            {article.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
