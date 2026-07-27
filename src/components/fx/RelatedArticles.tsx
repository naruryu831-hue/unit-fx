import type { Article } from '@/data/articles-types'

export function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return null
  }

  return (
    <section aria-label="次に読むおすすめ">
      <h2 className="text-xl font-bold">次に読むおすすめ</h2>
      <ul className="mt-4 space-y-2">
        {articles.map((article) => (
          <li key={article.slug}>
            <a href={`/articles/${article.slug}`}>{article.title}</a>
          </li>
        ))}
      </ul>
    </section>
  )
}
