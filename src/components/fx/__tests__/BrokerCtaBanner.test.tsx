import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerCtaBanner } from '../BrokerCtaBanner'
import { xm } from '@/data/brokers/xm'

describe('BrokerCtaBanner', () => {
  it('renders the bonus summary and a CTA button linking to the broker', () => {
    render(<BrokerCtaBanner broker={xm} />)
    expect(screen.getByText(xm.bonusSummary)).toBeInTheDocument()
    const link = screen.getByRole('link', { name: /XM\(XM Trading\)公式サイト/ })
    expect(link).toHaveAttribute('href', 'https://www.xmtrading.com/')
  })

  it('shows the caution state instead of a link when linkCaution is true', () => {
    const caution = { ...xm, linkCaution: true }
    render(<BrokerCtaBanner broker={caution} />)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
  })
})
