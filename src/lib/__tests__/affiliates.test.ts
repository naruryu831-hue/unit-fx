import { describe, it, expect } from 'vitest'
import { getBrokerLink } from '../affiliates'

describe('getBrokerLink', () => {
  it('falls back to the official URL when no affiliate link is configured', () => {
    expect(getBrokerLink('xm')).toBe('https://www.xmtrading.com/')
  })

  it('throws for an unknown broker slug', () => {
    expect(() => getBrokerLink('does-not-exist')).toThrow('Unknown broker slug: does-not-exist')
  })
})
