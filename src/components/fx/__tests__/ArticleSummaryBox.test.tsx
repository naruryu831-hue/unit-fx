import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleSummaryBox } from '../ArticleSummaryBox'

describe('ArticleSummaryBox', () => {
  it('renders the broker name in the heading and each point', () => {
    render(<ArticleSummaryBox brokerName="XM(XM Trading)" points={['A', 'B', 'C']} />)
    expect(screen.getByText('3行でわかるXM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.getByText('B')).toBeInTheDocument()
    expect(screen.getByText('C')).toBeInTheDocument()
  })
})
