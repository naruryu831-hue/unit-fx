import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { CtaButton } from '../CtaButton'

describe('CtaButton', () => {
  it('renders as a link with sponsored rel by default when href is a string', () => {
    render(<CtaButton href="https://example.com/broker">今すぐ口座開設</CtaButton>)
    const link = screen.getByRole('link', { name: '今すぐ口座開設' })
    expect(link).toHaveAttribute('href', 'https://example.com/broker')
    expect(link.getAttribute('rel')).toContain('sponsored')
  })

  it('does not include sponsored in rel when sponsored is false', () => {
    render(
      <CtaButton href="https://example.com/broker" sponsored={false}>
        今すぐ口座開設
      </CtaButton>
    )
    const link = screen.getByRole('link', { name: '今すぐ口座開設' })
    expect(link.getAttribute('rel')).not.toContain('sponsored')
  })

  it('renders no link and shows a pending notice when href is null', () => {
    render(<CtaButton href={null}>今すぐ口座開設</CtaButton>)
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.getByText(/現在確認中/)).toBeInTheDocument()
  })
})
