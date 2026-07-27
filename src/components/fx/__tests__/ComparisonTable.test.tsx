import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComparisonTable } from '../ComparisonTable'
import { xm } from '@/data/brokers/xm'

describe('ComparisonTable', () => {
  it('renders one row per broker including the age requirement column', () => {
    render(<ComparisonTable brokers={[xm]} />)
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('18歳以上')).toBeInTheDocument()

    const link = screen.getByRole('link', { name: '公式サイト' })
    expect(link).toHaveAttribute('href', 'https://www.xmtrading.com/')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })
})
