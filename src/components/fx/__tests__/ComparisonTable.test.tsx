import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComparisonTable, parseLeverageValue } from '../ComparisonTable'
import { xm } from '@/data/brokers/xm'
import type { Broker } from '@/data/brokers-types'

describe('parseLeverageValue', () => {
  it('returns Infinity for "無制限"', () => {
    expect(parseLeverageValue('無制限（Unlimited）')).toBe(Infinity)
  })

  it('returns Infinity for "unlimited" case-insensitively', () => {
    expect(parseLeverageValue('Unlimited leverage')).toBe(Infinity)
  })

  it('returns NaN when no number and no unlimited marker is present', () => {
    expect(Number.isNaN(parseLeverageValue('公式サイト参照'))).toBe(true)
  })

  it('extracts a plain number', () => {
    expect(parseLeverageValue('1000倍')).toBe(1000)
  })
})

describe('ComparisonTable', () => {
  it('renders one row per broker including the age requirement column', () => {
    render(<ComparisonTable brokers={[xm]} />)
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('18歳以上')).toBeInTheDocument()
    expect(screen.getByText(xm.maxLeverage)).toBeInTheDocument()

    const link = screen.getByRole('link', { name: '公式サイト' })
    // 素の公式URLではなく、トップページ用の計測リンクが使われていること。
    expect(link).toHaveAttribute('href', 'https://affx.click/tFXMb')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })

  it('does not render an official site link for brokers flagged with linkCaution, showing a caution note instead', () => {
    const cautionBroker: Broker = {
      slug: 'caution-broker',
      name: '要確認業者',
      officialUrl: 'https://example.com/',
      minAgeYears: 18,
      maxLeverage: '公式サイト参照',
      minDeposit: '公式サイト参照',
      bonusSummary: '公式サイト参照',
      japaneseSupport: true,
      founded: 2020,
      summary: 'テスト用',
      linkCaution: true,
    }

    render(<ComparisonTable brokers={[cautionBroker]} />)

    expect(screen.getByText('要確認業者')).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: '公式サイト' })).not.toBeInTheDocument()
    expect(screen.getByText('現在確認中（リンクなし）')).toBeInTheDocument()
  })
})
