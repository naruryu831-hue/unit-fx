import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CategoryThumbnail } from '../CategoryThumbnail'

describe('CategoryThumbnail', () => {
  it('renders the category label for each category', () => {
    render(<CategoryThumbnail category="problem-solving" />)
    expect(screen.getByText('お悩み解決')).toBeInTheDocument()
  })

  it('renders a different label for tax articles', () => {
    render(<CategoryThumbnail category="tax" />)
    expect(screen.getByText('税金')).toBeInTheDocument()
  })
})
