import type { Broker } from '../brokers-types'

export const hiroseLionfx: Broker = {
  slug: 'hirose-lionfx',
  name: 'ヒロセ通商（LION FX）',
  officialUrl: 'https://hirose-fx.co.jp/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 2004,
  summary: 'ヒロセ通商のLION FXは、取扱通貨ペアの多さと食品などのユニークなキャンペーンで知られる国内FXサービス。',
  market: 'domestic',
  company: 'ヒロセ通商株式会社',
  registration: '近畿財務局長（金商）第41号',
  minTradeUnit: '1,000通貨',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '50種類以上（正確な数は公式サイト参照）',
  tools: 'LION FX（PC/スマホアプリ）',
}
