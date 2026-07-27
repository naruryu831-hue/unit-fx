import type { Broker } from '../brokers-types'

export const xm: Broker = {
  slug: 'xm',
  name: 'XM(XM Trading)',
  officialUrl: 'https://www.xmtrading.com/',
  minAgeYears: 18,
  maxLeverage: '1000倍',
  minDeposit: '5米ドル相当',
  bonusSummary: '口座開設ボーナス・入金ボーナスあり（詳細は公式サイト参照）',
  japaneseSupport: true,
  founded: 2009,
  summary: 'XMは日本人トレーダーに最も知名度の高い海外FX業者の一つ。',
}
