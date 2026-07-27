import { describe, it, expect } from 'vitest'
import { getArticleBySlug, getBrokersForArticle } from '../get-article'

describe('getArticleBySlug', () => {
  it('finds the seeded hub article by slug', () => {
    const article = getArticleBySlug('kaigai-fx-hikaku-hub')
    expect(article).toBeDefined()
    expect(article?.category).toBe('hub')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getArticleBySlug('does-not-exist')).toBeUndefined()
  })
})

describe('getBrokersForArticle', () => {
  it('resolves broker slugs to broker records', () => {
    const article = getArticleBySlug('kaigai-fx-hikaku-hub')!
    const brokers = getBrokersForArticle(article)
    expect(brokers.map((b) => b.slug)).toEqual(article.brokerSlugs)
  })
})
