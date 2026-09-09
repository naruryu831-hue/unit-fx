import type { Broker } from '../brokers-types'

export const gaitame: Broker = {
  slug: 'gaitame',
  name: '外為どっとコム（外貨ネクストネオ）',
  officialUrl: 'https://www.gaitame.com/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座。1倍からの設定も可）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 2002,
  summary: '外為どっとコムはFX専業の老舗で、情報コンテンツとセミナーの充実で知られる。外貨ネクストネオが主力サービス。',
  market: 'domestic',
  company: '株式会社外為どっとコム',
  registration: '関東財務局長（金商）第262号',
  minTradeUnit: '1,000通貨',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '42通貨ペア',
  tools: '外貨ネクストネオ / GFX（スマホアプリ）',
}
