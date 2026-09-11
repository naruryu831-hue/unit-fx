import { describe, it, expect } from 'vitest'
import { allBrokers } from '@/data/brokers-index'
import { allArticles } from '@/data/articles-index'
import { validateBroker } from '@/lib/validators'
import { validateArticleTitleCount } from '@/lib/article-validators'

describe('data integrity', () => {
  it.each(allBrokers)('broker $slug passes validateBroker', (broker) => {
    expect(validateBroker(broker)).toEqual([])
  })

  it.each(allArticles)('article $slug passes validateArticleTitleCount', (article) => {
    expect(validateArticleTitleCount(article)).toEqual([])
  })

  it.each(allBrokers)('broker $slug has exactly one broker-review article', (broker) => {
    const matches = allArticles.filter(
      (article) =>
        article.category === 'broker-review' && article.brokerSlugs.includes(broker.slug)
    )
    expect(matches.map((a) => a.slug)).toHaveLength(1)
  })

  it.each(allBrokers)('broker $slug has exactly one account-opening article', (broker) => {
    const matches = allArticles.filter(
      (article) =>
        article.category === 'account-opening' && article.brokerSlugs.includes(broker.slug)
    )
    expect(matches.map((a) => a.slug)).toHaveLength(1)
  })

  it.each(
    allArticles.filter(
      (article) => article.category === 'account-opening' && article.market !== 'domestic'
    )
  )(
    'account-opening article $slug includes mt4-mt5-guide in relatedSlugs',
    (article) => {
      expect(article.relatedSlugs ?? []).toContain('mt4-mt5-guide')
    }
  )

  it.each(allArticles)('article $slug relatedSlugs all reference existing articles', (article) => {
    const articleSlugs = new Set(allArticles.map((a) => a.slug))
    const relatedSlugs = article.relatedSlugs ?? []
    const missing = relatedSlugs.filter((slug) => !articleSlugs.has(slug))
    expect(missing).toEqual([])
  })
})
