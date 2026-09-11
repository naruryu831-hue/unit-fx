import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerCtaBanner } from '../BrokerCtaBanner'
import { dmmFx } from '@/data/brokers/dmm-fx'

// BrokerCtaBanner は getBrokerSignupLink（→ SITE_MARKET でフィルタ済みの getBrokerBySlug）を
// 使う。国内FXの dmm-fx を固定で使うため、overseas ビルド設定で実行しても見つかるよう、
// 市場フィルタを経由しない allBrokers を参照するようにモックする。
vi.mock('@/data/brokers-index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/brokers-index')>()
  return { ...actual, getBrokerBySlug: (slug: string) => actual.allBrokers.find((b) => b.slug === slug) }
})

describe('BrokerCtaBanner', () => {
  it('renders the bonus summary and a CTA button using the signup tracking link', () => {
    render(<BrokerCtaBanner broker={dmmFx} />)
    expect(screen.getByText(dmmFx.bonusSummary)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /DMM FX公式サイト/ })
    // 素の公式URLではなく、口座開設用の計測リンクが使われていること（＝報酬が発生する状態）。
    expect(link).toHaveAttribute('href', 'https://h.accesstrade.net/sp/cc?rk=0100kz3o00oyuv')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })

  it('shows the caution state instead of a link when linkCaution is true', () => {
    const caution = { ...dmmFx, linkCaution: true }
    render(<BrokerCtaBanner broker={caution} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
