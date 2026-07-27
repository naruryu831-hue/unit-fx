import type { Broker } from '../brokers-types'

export const exness: Broker = {
  slug: 'exness',
  name: 'Exness',
  officialUrl: 'https://www.exness.com/',
  minAgeYears: 18,
  maxLeverage: '無制限（Unlimited。口座残高等の条件により変動する場合あり。詳細は公式サイト参照）',
  minDeposit: '公式サイト参照',
  bonusSummary: '公式サイト参照',
  japaneseSupport: true,
  founded: 2008,
  summary:
    'Exnessは2008年設立とされる海外FX・CFDブローカーで、日本語対応のライブチャットサポートを提供している。口座開設には満18歳以上であることが条件とされている。',
}
