import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleList } from '../ArticleList'
import type { Article } from '@/data/articles-types'

const sample: Article[] = [
  { slug: 'a', title: '記事A', category: 'hub', brokerSlugs: [], body: '', faq: [] },
]

describe('ArticleList', () => {
  it('renders a link to each article', () => {
    render(<ArticleList articles={sample} />)
    const link = screen.getByText('記事A').closest('a')
    expect(link).toHaveAttribute('href', '/articles/a')
  })

  it('shows the category label on each card', () => {
    render(<ArticleList articles={sample} />)
    expect(screen.getByText('比較ハブ')).toBeInTheDocument()
  })
})
