import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RelatedArticles } from '../RelatedArticles'
import type { Article } from '@/data/articles-types'

function makeArticle(overrides: Partial<Article>): Article {
  return {
    slug: 'fixture-slug',
    title: 'テスト記事タイトル',
    category: 'problem-solving',
    brokerSlugs: [],
    body: '本文',
    faq: [],
    ...overrides,
  }
}

describe('RelatedArticles', () => {
  it('renders nothing when articles is empty', () => {
    const { container } = render(<RelatedArticles articles={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders a heading and a link for each related article', () => {
    const articles = [
      makeArticle({ slug: 'mt4-mt5-guide', title: 'MT4/MT5の使い方' }),
      makeArticle({ slug: 'another-article', title: '別の記事' }),
    ]
    render(<RelatedArticles articles={articles} />)

    expect(screen.getByText('次に読むおすすめ')).toBeInTheDocument()

    const link1 = screen.getByRole('link', { name: 'MT4/MT5の使い方' })
    expect(link1).toHaveAttribute('href', '/articles/mt4-mt5-guide')

    const link2 = screen.getByRole('link', { name: '別の記事' })
    expect(link2).toHaveAttribute('href', '/articles/another-article')
  })
})
