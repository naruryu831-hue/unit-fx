import type { Broker } from '../brokers-types'

export const gmoClick: Broker = {
  slug: 'gmo-click',
  name: 'GMOクリック証券（FXネオ）',
  officialUrl: 'https://www.click-sec.com/corp/guide/fxneo/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 2005,
  summary: 'GMOクリック証券のFXネオは、GMOインターネットグループの証券会社が提供する国内FXサービス。取引高の大きさと自社開発ツールが特徴。',
  market: 'domestic',
  company: 'GMOクリック証券株式会社',
  registration: '関東財務局長（金商）第77号',
  minTradeUnit: '1,000通貨（公式サイト参照）',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '公式サイト参照',
  tools: 'GMOクリック FXneo / はっちゅう君FXプラス',
}
