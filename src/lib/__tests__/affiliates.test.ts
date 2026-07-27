import { describe, it, expect, vi } from 'vitest'
import { getBrokerLink } from '../affiliates'
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
  it('falls back to the official URL when no affiliate link is configured', () => {
    expect(getBrokerLink('xm')).toBe('https://www.xmtrading.com/')
  })

  it('throws for an unknown broker slug', () => {
    expect(() => getBrokerLink('does-not-exist')).toThrow('Unknown broker slug: does-not-exist')
  })

  it('returns null for a broker flagged with linkCaution, even if an affiliate/official URL exists', () => {
    expect(getBrokerLink(cautionBroker.slug)).toBeNull()
  })
})
