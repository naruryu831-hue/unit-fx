import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@/lib/broker-logos', () => ({
  getBrokerLogoPath: vi.fn(),
}))

import { BrokerLogo } from '../BrokerLogo'
import { getBrokerLogoPath } from '@/lib/broker-logos'

const mockedGetLogoPath = vi.mocked(getBrokerLogoPath)

describe('BrokerLogo', () => {
  beforeEach(() => {
    mockedGetLogoPath.mockReset()
  })

  it('renders the logo image with descriptive alt text when a file exists', () => {
    mockedGetLogoPath.mockReturnValue('/logos/titanfx.svg')
    render(<BrokerLogo name="TitanFX（タイタンFX）" slug="titanfx" />)

    const img = screen.getByAltText('TitanFX（タイタンFX）のロゴ')
    expect(img).toHaveAttribute('src', '/logos/titanfx.svg')
  })

  it('falls back to a wordmark of the short name when no logo file exists', () => {
    mockedGetLogoPath.mockReturnValue(null)
    render(<BrokerLogo name="AXIORY(アキシオリー)" slug="axiory" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('AXIORY')).toBeInTheDocument()
  })

  it('strips the parenthetical alias from the wordmark', () => {
    mockedGetLogoPath.mockReturnValue(null)
    render(<BrokerLogo name="XM(XM Trading)" slug="xm" />)

    expect(screen.getByText('XM')).toBeInTheDocument()
    expect(screen.queryByText('XM(XM Trading)')).not.toBeInTheDocument()
  })
})
