import { describe, it, expect } from 'vitest'
import { validateBroker } from '../validators'
import { xm } from '@/data/brokers/xm'

describe('validateBroker', () => {
  it('returns no errors for a valid broker', () => {
    expect(validateBroker(xm)).toEqual([])
  })

  it('flags a broker with minAgeYears below 18', () => {
    const invalid = { ...xm, minAgeYears: 16 }
    expect(validateBroker(invalid)).toContain('minAgeYears must be 18 or above')
  })

  it('flags a broker with an invalid officialUrl', () => {
    const invalid = { ...xm, officialUrl: 'not-a-url' }
    expect(validateBroker(invalid)).toContain('officialUrl must be a valid URL')
  })
})
