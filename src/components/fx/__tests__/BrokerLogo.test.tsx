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
    mockedGetLogoPath.mockReturnValue('/logos/xm.svg')
    render(<BrokerLogo name="XM(XM Trading)" slug="xm" />)

    const img = screen.getByAltText('XM(XM Trading)のロゴ')
    expect(img).toHaveAttribute('src', '/logos/xm.svg')
  })

  it('falls back to a branded initials badge when no logo file exists', () => {
    mockedGetLogoPath.mockReturnValue(null)
    render(<BrokerLogo name="Exness" slug="exness" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.getByText('EX')).toBeInTheDocument()
  })
})
