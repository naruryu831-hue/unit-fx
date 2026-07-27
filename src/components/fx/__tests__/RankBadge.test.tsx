import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RankBadge } from '../RankBadge'

describe('RankBadge', () => {
  it('displays "01" for index=1', () => {
    render(<RankBadge index={1} />)
    expect(screen.getByText('01')).toBeInTheDocument()
  })

  it('displays "12" for index=12', () => {
    render(<RankBadge index={12} />)
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('never renders the word "位"', () => {
    const { container } = render(<RankBadge index={3} />)
    expect(container.textContent ?? '').not.toContain('位')
  })
})
