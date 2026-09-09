import type { Broker } from '../brokers-types'

export const fxtf: Broker = {
  slug: 'fxtf',
  name: 'FXTF（ゴールデンウェイ・ジャパン）',
  officialUrl: 'https://www.fxtrade.co.jp/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '建玉連動のキャッシュバック等のキャンペーンあり（条件は公式サイト参照）',
  japaneseSupport: true,
  founded: 2006,
  summary: 'FXTFはゴールデンウェイ・ジャパン株式会社が運営する国内FXサービス。MT4に対応した数少ない国内業者のひとつで、暗号資産CFDやノックアウトオプションも扱う。',
  market: 'domestic',
  company: 'ゴールデンウェイ・ジャパン株式会社',
  registration: '関東財務局長（金商）第258号',
  minTradeUnit: '公式サイト参照',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '公式サイト参照（30通貨ペア前後）',
  tools: 'FXTF MT4 / FXTF GX',
}
