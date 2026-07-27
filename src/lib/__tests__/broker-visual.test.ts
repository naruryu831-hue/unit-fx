import { describe, it, expect } from 'vitest'
import { getBrokerInitials, getBrokerColor } from '../broker-visual'

describe('getBrokerInitials', () => {
  it('takes first two letters when the name has no spaces', () => {
    expect(getBrokerInitials('Exness')).toBe('EX')
  })

  it('strips parenthetical remarks before deriving initials', () => {
    expect(getBrokerInitials('XM(XM Trading)')).toBe('XM')
  })

  it('combines the first letter of the first two words when space-separated', () => {
    expect(getBrokerInitials('Traders Trust')).toBe('TT')
  })
})

describe('getBrokerColor', () => {
  it('returns the same color for the same slug', () => {
    expect(getBrokerColor('xm')).toBe(getBrokerColor('xm'))
  })

  it('returns a tailwind background class', () => {
    expect(getBrokerColor('exness')).toMatch(/^bg-/)
  })
})
