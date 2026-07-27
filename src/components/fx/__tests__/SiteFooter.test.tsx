import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SiteFooter } from '../SiteFooter'

describe('SiteFooter', () => {
  it('renders the heading', () => {
    render(<SiteFooter />)
    expect(screen.getByRole('heading', { name: 'UNIT-FXについて' })).toBeInTheDocument()
  })

  it('renders the footer landmark with the required notices', () => {
    render(<SiteFooter />)
    const text = screen.getByRole('contentinfo').textContent ?? ''
    expect(text).toContain('アフィリエイト')
    expect(text).toContain('金融庁に登録されていない')
    expect(text).toContain('UNIT-FX')
  })

  it('renders a copyright notice', () => {
    render(<SiteFooter />)
    const text = screen.getByRole('contentinfo').textContent ?? ''
    expect(text).toMatch(/©\s?\d{4}\s?UNIT-FX/)
  })
})
