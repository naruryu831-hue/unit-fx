import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PopularArticles } from '../PopularArticles'
import type { Article } from '@/data/articles-types'

const sample: Article[] = [
  { slug: 'a', title: '記事A', category: 'hub', brokerSlugs: [], body: '', faq: [] },
  { slug: 'b', title: '記事B', category: 'broker-review', brokerSlugs: [], body: '', faq: [] },
]

describe('PopularArticles', () => {
  it('renders a link for each article in order', () => {
    render(<PopularArticles articles={sample} />)
    const links = screen.getAllByRole('link')
    expect(links.map((l) => l.textContent)).toEqual(['記事A', '記事B'])
  })

  it('renders nothing when given an empty list', () => {
    const { container } = render(<PopularArticles articles={[]} />)
    expect(container).toBeEmptyDOMElement()
  })
})
