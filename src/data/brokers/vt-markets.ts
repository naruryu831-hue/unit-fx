import type { Broker } from '../brokers-types'

export const vtMarkets: Broker = {
  slug: 'vt-markets',
  name: 'VT Markets',
  officialUrl: 'https://www.vtmarkets.com/jp/',
  minAgeYears: 18,
  maxLeverage: '1000倍（口座タイプ・地域により異なる場合あり、公式サイト参照）',
  minDeposit: '50米ドル相当（口座タイプにより異なる場合あり、公式サイト参照）',
  bonusSummary: '入金ボーナスキャンペーンを実施している場合あり（口座開設ボーナスの常時提供は確認できず、詳細は公式サイト参照）',
  japaneseSupport: true,
  founded: 2015,
  summary: 'VT Marketsは2015年設立、狭いスプレッドを掲げるRaw ECN口座が特徴の海外FX業者。',
}
