import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerLogoBadge } from '../BrokerLogoBadge'

describe('BrokerLogoBadge', () => {
  it('renders the initials derived from the broker name', () => {
    render(<BrokerLogoBadge name="Exness" slug="exness" />)
    expect(screen.getByText('EX')).toBeInTheDocument()
  })
})
