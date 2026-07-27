import { describe, it, expect } from 'vitest'
import { getArticleBySlug, getBrokersForArticle, getRelatedArticles } from '../get-article'
import type { Article } from '@/data/articles-types'

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

  it('throws for an article referencing an unknown broker slug', () => {
    const article: Article = {
      slug: 'fixture-unknown-broker',
      title: 'テスト記事',
      category: 'hub',
      brokerSlugs: ['does-not-exist'],
      body: 'テスト本文',
      faq: [],
    }
    expect(() => getBrokersForArticle(article)).toThrow('Unknown broker slug: does-not-exist')
  })
})

describe('getRelatedArticles', () => {
  it('resolves relatedSlugs to article records', () => {
    const article = getArticleBySlug('xm-account-opening')!
    const related = getRelatedArticles(article)
    expect(related.map((a) => a.slug)).toEqual(['mt4-mt5-guide'])
  })

  it('returns an empty array when relatedSlugs is undefined', () => {
    const article: Article = {
      slug: 'fixture-no-related',
      title: 'テスト記事',
      category: 'hub',
      brokerSlugs: [],
      body: 'テスト本文',
      faq: [],
    }
    expect(getRelatedArticles(article)).toEqual([])
  })

  it('ignores unknown related slugs instead of throwing', () => {
    const article: Article = {
      slug: 'fixture-unknown-related',
      title: 'テスト記事',
      category: 'hub',
      brokerSlugs: [],
      body: 'テスト本文',
      faq: [],
      relatedSlugs: ['does-not-exist', 'mt4-mt5-guide'],
    }
    expect(getRelatedArticles(article).map((a) => a.slug)).toEqual(['mt4-mt5-guide'])
  })
})
