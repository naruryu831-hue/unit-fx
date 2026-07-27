import type { Broker } from '../brokers-types'

export const tradersTrust: Broker = {
  slug: 'traders-trust',
  name: 'Traders Trust(TTCM)',
  officialUrl: 'https://www.traders-trust.com/',
  minAgeYears: 18,
  maxLeverage: '3000倍（ダイナミックレバレッジ。プラットフォーム・口座タイプにより異なる。詳細は公式サイト参照）',
  minDeposit: '5,000円相当（クラシック口座の場合。口座タイプにより異なる。詳細は公式サイト参照）',
  bonusSummary: '口座開設ボーナス・入金ボーナスが実施されることがある（内容・実施有無は時期により変動するため公式サイト参照）',
  japaneseSupport: true,
  founded: 2009,
  summary:
    'Traders Trust(TTCM)は2009年設立のキプロス発祥の海外FX業者で、最大3000倍のダイナミックレバレッジと日本語サポートを提供している。',
}
