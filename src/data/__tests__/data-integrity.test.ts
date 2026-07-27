import { describe, it, expect } from 'vitest'
import { brokers } from '@/data/brokers-index'
import { articles } from '@/data/articles-index'
import { validateBroker } from '@/lib/validators'
import { validateArticleTitleCount } from '@/lib/article-validators'

describe('data integrity', () => {
  it.each(brokers)('broker $slug passes validateBroker', (broker) => {
    expect(validateBroker(broker)).toEqual([])
  })

  it.each(articles)('article $slug passes validateArticleTitleCount', (article) => {
    expect(validateArticleTitleCount(article)).toEqual([])
  })

  it.each(brokers)('broker $slug has exactly one broker-review article', (broker) => {
    const matches = articles.filter(
      (article) =>
        article.category === 'broker-review' && article.brokerSlugs.includes(broker.slug)
    )
    expect(matches.map((a) => a.slug)).toHaveLength(1)
  })

  it.each(brokers)('broker $slug has exactly one account-opening article', (broker) => {
    const matches = articles.filter(
      (article) =>
        article.category === 'account-opening' && article.brokerSlugs.includes(broker.slug)
    )
    expect(matches.map((a) => a.slug)).toHaveLength(1)
  })

  it.each(articles.filter((article) => article.category === 'account-opening'))(
    'account-opening article $slug includes mt4-mt5-guide in relatedSlugs',
    (article) => {
      expect(article.relatedSlugs ?? []).toContain('mt4-mt5-guide')
    }
  )

  it.each(articles)('article $slug relatedSlugs all reference existing articles', (article) => {
    const articleSlugs = new Set(articles.map((a) => a.slug))
    const relatedSlugs = article.relatedSlugs ?? []
    const missing = relatedSlugs.filter((slug) => !articleSlugs.has(slug))
    expect(missing).toEqual([])
  })
})
