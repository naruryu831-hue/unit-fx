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

  it('discloses the ranking criterion so "1位" is not read as a numeric score', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    expect(screen.getByText(/編集部調べ/)).toBeInTheDocument()
  })

  it('renders a logo badge for each broker', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    expect(screen.getByText('XM')).toBeInTheDocument()
  })

  it('renders correct CtaButton links to each official site', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    const links = screen.getAllByRole('link', { name: '公式サイトはこちら' })
    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('https://www.xmtrading.com/')
    expect(hrefs).toContain('https://www.exness.com/')
  })

  it('renders a primary button linking to each broker review page', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    const links = screen.getAllByRole('link', { name: 'この業者の紹介ページを見る' })
    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('/articles/xm-review')
    expect(hrefs).toContain('/articles/exness-review')
  })

  it('shows the bonus summary and min deposit alongside the leverage bar', () => {
    render(<BrokerRankingList brokers={[xm]} />)
    expect(screen.getByText(xm.minDeposit)).toBeInTheDocument()
    expect(screen.getByText(xm.bonusSummary)).toBeInTheDocument()
  })
})
