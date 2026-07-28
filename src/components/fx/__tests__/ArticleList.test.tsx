import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleList } from '../ArticleList'
import type { Article } from '@/data/articles-types'

const sample: Article[] = [
  { slug: 'a', title: '記事A', category: 'problem-solving', brokerSlugs: [], body: '', faq: [] },
]

describe('ArticleList', () => {
  it('renders a link to each article', () => {
    render(<ArticleList articles={sample} />)
    const link = screen.getByText('記事A').closest('a')
    expect(link).toHaveAttribute('href', '/articles/a')
  })

  it('shows the category label on each card', () => {
    render(<ArticleList articles={sample} />)
    expect(screen.getAllByText('お悩み解決').length).toBeGreaterThan(0)
  })

  it('shows a broker review thumbnail for broker-review articles', () => {
    const reviewArticle: Article[] = [
      {
        slug: 'xm-review',
        title: 'XM(XM Trading)の評判・特徴を徹底解説',
        category: 'broker-review',
        brokerSlugs: ['xm'],
        body: '',
        faq: [],
      },
    ]
    render(<ArticleList articles={reviewArticle} />)
    expect(screen.getByText('口コミ・評判')).toBeInTheDocument()
  })

  it('shows a broker thumbnail with a different caption for account-opening articles', () => {
    const openingArticle: Article[] = [
      {
        slug: 'xm-account-opening',
        title: 'XM(XM Trading)の口座開設方法をわかりやすく解説',
        category: 'account-opening',
        brokerSlugs: ['xm'],
        body: '',
        faq: [],
      },
    ]
    render(<ArticleList articles={openingArticle} />)
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.queryByText('口コミ・評判')).not.toBeInTheDocument()
  })

  it('shows a category thumbnail (no broker name) for non-broker articles', () => {
    render(<ArticleList articles={sample} />)
    expect(screen.queryByText('口コミ・評判')).not.toBeInTheDocument()
  })

  it('shows a distinct category thumbnail for tax articles', () => {
    const taxArticle: Article[] = [
      { slug: 't', title: '税金の記事', category: 'tax', brokerSlugs: [], body: '', faq: [] },
    ]
    render(<ArticleList articles={taxArticle} />)
    expect(screen.getAllByText('税金').length).toBeGreaterThan(0)
  })
})
