import type { Broker } from '../brokers-types'

export const tradeview: Broker = {
  slug: 'tradeview',
  name: 'Tradeview Markets(トレードビュー)',
  officialUrl: 'https://www.tvmarkets.com/en/',
  minAgeYears: 18,
  maxLeverage: '1:500',
  minDeposit: '100米ドル(口座タイプにより異なる。ILC口座等は1,000米ドル)',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2004,
  summary:
    'Tradeview Marketsはケイマン諸島を拠点に2004年から運営されている海外FX・CFDブローカーで、MT4/MT5/cTraderなど複数のプラットフォームと最大1:500のレバレッジを提供している。日本語によるメールサポート等にも対応している。',
}
