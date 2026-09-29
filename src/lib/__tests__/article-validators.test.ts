import { describe, it, expect } from 'vitest'
import { validateArticleTitleCount, validateArticleMarkup } from '../article-validators'
import { stripLinkMarkup } from '../parse-body'
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

describe('validateArticleMarkup', () => {
  it('passes a clean article', () => {
    expect(validateArticleMarkup({ ...baseArticle, body: '■ 1. はじめに\n\n本文' })).toEqual([])
  })

  it('flags a heading over 60 characters', () => {
    const body = `■ 結論：${'あ'.repeat(70)}\n\n本文`
    expect(validateArticleMarkup({ ...baseArticle, body }).join()).toContain('heading is')
  })

  it('flags link markup inside a heading', () => {
    const body = '■ 結論：[JFX](/articles/jfx-review)の話\n\n本文'
    expect(validateArticleMarkup({ ...baseArticle, body }).join()).toContain('link markup')
  })

  it('allows a well-formed link in FAQ but flags a broken one', () => {
    const ok = { ...baseArticle, faq: [{ question: 'Q', answer: '詳しくは[運営者情報](/about)へ' }] }
    expect(validateArticleMarkup(ok)).toEqual([])
    const broken = { ...baseArticle, faq: [{ question: 'Q', answer: '動かすには](/about)へ' }] }
    expect(validateArticleMarkup(broken).join()).toContain('broken link markup')
  })

  it('flags a raw URL in body and FAQ', () => {
    const body = '公式サイト（https://example.com/）を確認'
    expect(validateArticleMarkup({ ...baseArticle, body }).join()).toContain('raw URL')
    const faq = [{ question: 'Q', answer: 'https://example.com/' }]
    expect(validateArticleMarkup({ ...baseArticle, faq }).join()).toContain('raw URL')
  })

  it('flags heading numbering that does not start at 1', () => {
    const body = '■ 2-1. 向いている人\n\n本文\n\n■ 2-2. 向かない人\n\n本文'
    expect(validateArticleMarkup({ ...baseArticle, body }).join()).toContain('instead of 1.')
  })
})

describe('stripLinkMarkup', () => {
  it('keeps only the label', () => {
    expect(stripLinkMarkup('[JFX](/articles/jfx-review)の口座')).toBe('JFXの口座')
  })
})
