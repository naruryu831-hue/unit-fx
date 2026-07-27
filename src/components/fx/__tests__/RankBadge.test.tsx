import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RankBadge } from '../RankBadge'

describe('RankBadge', () => {
  it('displays "1" and "位" for index=1', () => {
    render(<RankBadge index={1} />)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('位')).toBeInTheDocument()
  })

  it('displays "12" for index=12', () => {
    render(<RankBadge index={12} />)
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('gives rank 1 a distinct gold style from rank 4+', () => {
    const { container: gold } = render(<RankBadge index={1} />)
    const { container: plain } = render(<RankBadge index={4} />)
    expect(gold.querySelector('span')?.className).not.toBe(plain.querySelector('span')?.className)
  })
})
