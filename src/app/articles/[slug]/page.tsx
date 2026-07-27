import { notFound } from 'next/navigation'
import { getArticleBySlug, getBrokersForArticle } from '@/lib/get-article'
import { ArticleView } from '@/components/fx/ArticleView'

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) {
    notFound()
  }
  const brokers = getBrokersForArticle(article)
  return <ArticleView article={article} brokers={brokers} />
}
