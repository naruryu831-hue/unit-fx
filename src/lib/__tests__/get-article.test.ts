import { describe, it, expect, vi } from 'vitest'
import { getArticleBySlug, getBrokersForArticle, getRelatedArticles } from '../get-article'
import type { Article } from '@/data/articles-types'

// get-article.ts は SITE_MARKET でフィルタ済みの articles / getBrokerBySlug を使う実装のため、
// このテストが使う国内FXの固定記事（kokunai-fx-hikaku-hub 等）は overseas ビルド設定でテストを
// 実行すると見つからなくなる。市場を問わずロジックだけを検証したいので、市場フィルタを経由しない
// allArticles / allBrokers を参照するようにモックする。
vi.mock('@/data/articles-index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/articles-index')>()
  return { ...actual, articles: actual.allArticles }
})

vi.mock('@/data/brokers-index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/brokers-index')>()
  return { ...actual, getBrokerBySlug: (slug: string) => actual.allBrokers.find((b) => b.slug === slug) }
})

describe('getArticleBySlug', () => {
  it('finds the seeded hub article by slug', () => {
    const article = getArticleBySlug('kokunai-fx-hikaku-hub')
    expect(article).toBeDefined()
    expect(article?.category).toBe('hub')
  })

  it('returns undefined for an unknown slug', () => {
    expect(getArticleBySlug('does-not-exist')).toBeUndefined()
  })
})

describe('getBrokersForArticle', () => {
  it('resolves broker slugs to broker records', () => {
    const article = getArticleBySlug('kokunai-fx-hikaku-hub')!
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
    const article = getArticleBySlug('dmm-fx-account-opening')!
    const related = getRelatedArticles(article)
    expect(related.map((a) => a.slug)).toEqual([
      'dmm-fx-review',
      'kokunai-fx-hikaku-hub',
      'kokunai-fx-shoshinsha-hajimekata',
    ])
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
      relatedSlugs: ['does-not-exist', 'kokunai-fx-hikaku-hub'],
    }
    expect(getRelatedArticles(article).map((a) => a.slug)).toEqual(['kokunai-fx-hikaku-hub'])
  })
})
