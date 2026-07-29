import { describe, it, expect, vi } from 'vitest'
import { getBrokerLink, getBrokerSignupLink, hasAffiliateLink } from '../affiliates'
import type { Broker } from '../../data/brokers-types'

// linkCaution: true のダミー業者。実際の brokers-index には登録せず、
// getBrokerBySlug をモックして注入することで、将来 linkCaution な業者が
// 増えても getBrokerLink がリンクを隠す（null を返す）ことを検証する。
// vi.mock のファクトリはモジュール本体より先に評価される（巻き上げ）ため、
// 参照する値は vi.hoisted 経由で定義する必要がある。
const { cautionBroker } = vi.hoisted(() => {
  const cautionBroker: Broker = {
    slug: 'caution-broker',
    name: '要確認業者',
    officialUrl: 'https://example.com/',
    minAgeYears: 18,
    maxLeverage: '公式サイト参照',
    minDeposit: '公式サイト参照',
    bonusSummary: '公式サイト参照',
    japaneseSupport: true,
    founded: 2020,
    summary: 'テスト用',
    linkCaution: true,
  }
  return { cautionBroker }
})

vi.mock('../../data/brokers-index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../data/brokers-index')>()
  return {
    ...actual,
    getBrokerBySlug: (slug: string) =>
      slug === cautionBroker.slug ? cautionBroker : actual.getBrokerBySlug(slug),
  }
})

describe('getBrokerLink', () => {
  it('returns the configured homepage affiliate link when one exists', () => {
    expect(getBrokerLink('xm')).toBe('https://affx.click/tFXMb')
  })

  it('falls back to the official URL when no affiliate link is configured', () => {
    expect(getBrokerLink('axiory')).toBe('https://www.axiory.com/jp/')
  })

  it('throws for an unknown broker slug', () => {
    expect(() => getBrokerLink('does-not-exist')).toThrow('Unknown broker slug: does-not-exist')
  })

  it('returns null for a broker flagged with linkCaution, even if an affiliate/official URL exists', () => {
    expect(getBrokerLink(cautionBroker.slug)).toBeNull()
  })
})

describe('getBrokerSignupLink', () => {
  it('prefers the dedicated signup link over the homepage link', () => {
    expect(getBrokerSignupLink('xm')).toBe('https://affx.click/h0xVg')
  })

  it('falls back to the homepage link when only one link is issued', () => {
    expect(getBrokerSignupLink('exness')).toBe('https://one.exnessonelink.com/a/228znq0vo6')
  })

  it('falls back to the official URL when nothing is configured', () => {
    expect(getBrokerSignupLink('axiory')).toBe('https://www.axiory.com/jp/')
  })

  it('returns null for a linkCaution broker', () => {
    expect(getBrokerSignupLink(cautionBroker.slug)).toBeNull()
  })
})

describe('hasAffiliateLink', () => {
  it('is true for brokers whose tracking links are configured', () => {
    expect(hasAffiliateLink('xm')).toBe(true)
    expect(hasAffiliateLink('exness')).toBe(true)
  })

  it('is false for brokers still pointing at the plain official site', () => {
    expect(hasAffiliateLink('axiory')).toBe(false)
  })
})
