import type { Broker } from '../brokers-types'

export const miltonMarkets: Broker = {
  slug: 'milton-markets',
  name: 'Milton Markets(ミルトンマーケッツ)',
  officialUrl: 'https://miltonmarkets.com/ja/',
  minAgeYears: 18,
  maxLeverage: '1000倍（口座タイプにより異なる。公式サイト参照）',
  minDeposit: '口座タイプにより異なる（Flex口座は最低入金額の設定なし。公式サイト参照）',
  bonusSummary: '口座開設ボーナス・入金ボーナスあり（詳細・条件は公式サイト参照）',
  japaneseSupport: true,
  founded: 2016,
  summary:
    'Milton Marketsは日本語対応スタッフを配置する海外FX業者で、複数の口座タイプとゼロカットシステムを提供している。',
}
