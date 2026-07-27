import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RiskDisclaimer } from '../RiskDisclaimer'

describe('RiskDisclaimer', () => {
  it('renders the required legal notices', () => {
    render(<RiskDisclaimer />)
    const text = screen.getByRole('note', { name: 'リスク・注意事項' }).textContent ?? ''
    expect(text).toContain('元本')
    expect(text).toContain('を超える損失')
    expect(text).toContain('金融庁に登録されていない')
    expect(text).toContain('断定的な利益表現')
  })
})
