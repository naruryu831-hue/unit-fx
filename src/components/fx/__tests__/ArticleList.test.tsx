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
    const link = screen.getByRole('link', { name: '記事A' })
    expect(link).toHaveAttribute('href', '/articles/a')
  })
})
