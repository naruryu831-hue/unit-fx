import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FeaturedArticleCard } from '../FeaturedArticleCard'
import type { Article } from '@/data/articles-types'

const sample: Article = {
  slug: 'kaigai-fx-hikaku-hub',
  title: '海外FX 全業者比較・おすすめランキング',
  category: 'hub',
  brokerSlugs: [],
  body: '',
  faq: [],
}

describe('FeaturedArticleCard', () => {
  it('links to the article', () => {
    render(<FeaturedArticleCard article={sample} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/articles/kaigai-fx-hikaku-hub')
  })

  it('renders the article title', () => {
    render(<FeaturedArticleCard article={sample} />)
    expect(screen.getByText(sample.title)).toBeInTheDocument()
  })
})
