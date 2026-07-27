import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerRankingList } from '../BrokerRankingList'
import { xm } from '@/data/brokers/xm'
import { exness } from '@/data/brokers/exness'

describe('BrokerRankingList', () => {
  it('renders both broker names', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('Exness')).toBeInTheDocument()
  })

  it('never renders the word "位" anywhere', () => {
    const { container } = render(<BrokerRankingList brokers={[xm, exness]} />)
    expect(container.textContent ?? '').not.toContain('位')
  })

  it('renders correct CtaButton links to each official site', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    const links = screen.getAllByRole('link', { name: '公式サイト' })
    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('https://www.xmtrading.com/')
    expect(hrefs).toContain('https://www.exness.com/')
  })
})
