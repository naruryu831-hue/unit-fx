import type { Broker } from '../brokers-types'

export const jfx: Broker = {
  slug: 'jfx',
  name: 'JFX（MATRIX TRADER）',
  officialUrl: 'https://www.jfx.co.jp/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座。法人は最大50倍）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバック等のキャンペーンあり（条件は公式サイト参照）',
  japaneseSupport: true,
  founded: 2005,
  summary: 'JFXはヒロセ通商グループのJFX株式会社が運営する国内FXサービス。取引ツールMATRIX TRADERと、スキャルピングを公式に認めている点で知られる。',
  market: 'domestic',
  company: 'JFX株式会社',
  registration: '関東財務局長（金商）第238号',
  minTradeUnit: '1,000通貨（一部の通貨ペアは1万通貨）',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '52種類',
  tools: 'MATRIX TRADER（PC/スマホアプリ）・MT5・TradingView対応',
}
