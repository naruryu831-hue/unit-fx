import { describe, it, expect } from 'vitest'
import { validateArticleTitleCount } from '../article-validators'
import type { Article } from '@/data/articles-types'

const baseArticle: Article = {
  slug: 'test-article',
  title: 'テスト業者3選',
  category: 'broker-review',
  brokerSlugs: ['xm', 'exness', 'titanfx'],
  body: '本文',
  faq: [{ question: 'Q', answer: 'A' }],
}

describe('validateArticleTitleCount', () => {
  it('passes when the title count matches brokerSlugs length', () => {
    expect(validateArticleTitleCount(baseArticle)).toEqual([])
  })

  it('flags a mismatch between title count and brokerSlugs length', () => {
    const mismatched = { ...baseArticle, brokerSlugs: ['xm'] }
    expect(validateArticleTitleCount(mismatched)).toContain(
      'title claims 3 items but brokerSlugs has 1'
    )
  })

  it('flags an article with no FAQ items', () => {
    const noFaq = { ...baseArticle, faq: [] }
    expect(validateArticleTitleCount(noFaq)).toContain(
      'article must include at least one FAQ item'
    )
  })
})
