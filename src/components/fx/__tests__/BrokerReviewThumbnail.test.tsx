import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrokerReviewThumbnail } from '../BrokerReviewThumbnail'

describe('BrokerReviewThumbnail', () => {
  it('renders the broker name and the "口コミ・評判" caption', () => {
    render(<BrokerReviewThumbnail brokerName="XM(XM Trading)" slug="xm" />)
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('口コミ・評判')).toBeInTheDocument()
  })
})
