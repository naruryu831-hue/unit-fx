import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerCtaBanner } from '../BrokerCtaBanner'
import { xm } from '@/data/brokers/xm'

describe('BrokerCtaBanner', () => {
  it('renders the bonus summary and a CTA button using the signup tracking link', () => {
    render(<BrokerCtaBanner broker={xm} />)
    expect(screen.getByText(xm.bonusSummary)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /XM\(XM Trading\)公式サイト/ })
    // 素の公式URLではなく、口座開設用の計測リンクが使われていること（＝報酬が発生する状態）。
    expect(link).toHaveAttribute('href', 'https://affx.click/h0xVg')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })

  it('shows the caution state instead of a link when linkCaution is true', () => {
    const caution = { ...xm, linkCaution: true }
    render(<BrokerCtaBanner broker={caution} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
