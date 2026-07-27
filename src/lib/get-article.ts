import { articles } from '@/data/articles-index'
import { getBrokerBySlug } from '@/data/brokers-index'
import type { Article } from '@/data/articles-types'
import type { Broker } from '@/data/brokers-types'

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getBrokersForArticle(article: Article): Broker[] {
  return article.brokerSlugs.map((slug) => {
    const broker = getBrokerBySlug(slug)
    if (!broker) {
      throw new Error(`Unknown broker slug: ${slug}`)
    }
    return broker
  })
}

export function getRelatedArticles(article: Article): Article[] {
  const slugs = article.relatedSlugs ?? []
  return slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((related): related is Article => related !== undefined)
}
