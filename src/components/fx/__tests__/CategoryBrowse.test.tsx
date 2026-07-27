import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CategoryBrowse } from '../CategoryBrowse'
import type { Article } from '@/data/articles-types'

const sample: Article[] = [
  { slug: 'a', title: 'レビューA', category: 'broker-review', brokerSlugs: [], body: '', faq: [] },
  { slug: 'b', title: '口座開設B', category: 'account-opening', brokerSlugs: [], body: '', faq: [] },
]

describe('CategoryBrowse', () => {
  it('groups articles under their category label', () => {
    render(<CategoryBrowse articles={sample} />)
    expect(screen.getByText('業者レビュー')).toBeInTheDocument()
    expect(screen.getByText('レビューA')).toBeInTheDocument()
    expect(screen.getByText('口座開設ガイド')).toBeInTheDocument()
    expect(screen.getByText('口座開設B')).toBeInTheDocument()
  })

  it('omits categories that have no articles', () => {
    render(<CategoryBrowse articles={sample} />)
    expect(screen.queryByText('税金')).not.toBeInTheDocument()
  })
})
