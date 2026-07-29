import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerRankingList } from '../BrokerRankingList'
import { xm } from '@/data/brokers/xm'
import { exness } from '@/data/brokers/exness'
import { getBrokerShortName } from '@/lib/broker-visual'

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

  it('renders a logo for each broker', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    // public/logos にロゴ画像がある業者は画像で、無い業者はワードマークで表示される。
    // どちらの場合でも各社に何らかのロゴ表現があることを確認する。
    for (const broker of [xm, exness]) {
      const logo =
        screen.queryByAltText(`${broker.name}のロゴ`) ??
        screen.queryByText(getBrokerShortName(broker.name))
      expect(logo).not.toBeNull()
    }
  })

  it('renders each broker CTA using its affiliate tracking link, not the bare official URL', () => {
    render(<BrokerRankingList brokers={[xm, exness]} />)
    const links = screen.getAllByRole('link', { name: '公式サイトはこちら' })
    const hrefs = links.map((link) => link.getAttribute('href'))
    expect(hrefs).toContain('https://affx.click/tFXMb')
    expect(hrefs).toContain('https://one.exnessonelink.com/a/228znq0vo6')
    expect(hrefs).not.toContain('https://www.xmtrading.com/')
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
