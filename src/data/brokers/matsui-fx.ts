import type { Broker } from '../brokers-types'

export const matsuiFx: Broker = {
  slug: 'matsui-fx',
  name: '松井証券（MATSUI FX）',
  officialUrl: 'https://www.matsui.co.jp/fx/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座。レバレッジコース選択制）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 1918,
  summary: '松井証券のMATSUI FXは老舗証券会社が提供する国内FXサービス。1通貨単位から取引でき、レバレッジをコースで選べる仕組みがある。',
  market: 'domestic',
  company: '松井証券株式会社',
  registration: '公式サイト参照',
  minTradeUnit: '1通貨（一部の通貨ペアは1万通貨以上）',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '32通貨ペア',
  tools: '松井証券 FXアプリ / FXトレーダー・プラス',
}
