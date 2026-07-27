import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SpecBar } from '../SpecBar'

describe('SpecBar', () => {
  it('displays the label and displayValue text', () => {
    render(
      <SpecBar label="最大レバレッジ" value={1000} max={5000} displayValue="1000倍" />
    )
    expect(screen.getByText('最大レバレッジ')).toBeInTheDocument()
    expect(screen.getByText('1000倍')).toBeInTheDocument()
  })

  it('sets the bar width to 20% for value=1000, max=5000', () => {
    render(
      <SpecBar label="最大レバレッジ" value={1000} max={5000} displayValue="1000倍" />
    )
    const bar = screen.getByTestId('spec-bar-fill')
    expect(bar.style.width).toBe('20%')
  })

  it('does not throw and treats width as 0% when max is 0', () => {
    expect(() =>
      render(<SpecBar label="スプレッド" value={0} max={0} displayValue="-" />)
    ).not.toThrow()

    render(<SpecBar label="スプレッド" value={0} max={0} displayValue="-" />)
    const bars = screen.getAllByTestId('spec-bar-fill')
    expect(bars[bars.length - 1].style.width).toBe('0%')
  })

  it('fills the bar to 100% for an unlimited (Infinity) value', () => {
    render(<SpecBar label="最大レバレッジ" value={Infinity} max={3000} displayValue="無制限" />)
    const bar = screen.getByTestId('spec-bar-fill')
    expect(bar.style.width).toBe('100%')
  })

  it('shows a neutral unknown state instead of a 0% fill when value is NaN', () => {
    render(<SpecBar label="最大レバレッジ" value={NaN} max={3000} displayValue="公式サイト参照" />)
    expect(screen.queryByTestId('spec-bar-fill')).not.toBeInTheDocument()
    expect(screen.getByTestId('spec-bar-unknown')).toBeInTheDocument()
  })
})
