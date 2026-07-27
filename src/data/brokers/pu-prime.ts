import type { Broker } from '../brokers-types'

export const puPrime: Broker = {
  slug: 'pu-prime',
  name: 'PU Prime',
  officialUrl: 'https://www.puprime.com/',
  minAgeYears: 18,
  maxLeverage: '1000倍',
  minDeposit: '20米ドル相当（口座タイプにより異なる。詳細は公式サイト参照）',
  bonusSummary:
    '入金ボーナス・キャッシュバックなどのキャンペーンあり（口座開設ボーナスの有無・内容は時期により変動。詳細は公式サイト参照）',
  japaneseSupport: true,
  founded: 2015,
  summary:
    'PU Primeは2015年に設立され、複数の金融ライセンスのもとで運営されている海外FX・CFDブローカー。',
}
