import type { Broker } from '../brokers-types'

export const icMarkets: Broker = {
  slug: 'ic-markets',
  name: 'IC Markets',
  officialUrl: 'https://ic.com/global/ja/',
  minAgeYears: 18,
  maxLeverage: '1000倍',
  minDeposit: '200米ドル相当',
  bonusSummary:
    '時期により入金ボーナス等のキャンペーンを実施している場合がある（常設の制度ではなく、内容・実施有無は変動するため公式サイト参照）',
  japaneseSupport: true,
  founded: 2007,
  summary:
    'IC Marketsは2007年にオーストラリアで設立された海外FX業者で、狭いスプレッドとcTraderなど複数プラットフォーム対応で知られる。2026年にグローバルブランドを「IC」へ刷新したが、日本向けサイトは引き続き「IC Markets」の名称でサービスを提供している。',
}
