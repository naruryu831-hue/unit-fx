import type { Broker } from '../brokers-types'

export const dmmFx: Broker = {
  slug: 'dmm-fx',
  name: 'DMM FX',
  officialUrl: 'https://fx.dmm.com/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 2006,
  summary: 'DMM FXはDMM.com証券が運営する国内FXサービス。取引ツールの使いやすさとサポート体制で知られ、FX口座数の多さを公表している。',
  market: 'domestic',
  company: '株式会社DMM.com証券',
  registration: '関東財務局長（金商）第1629号',
  minTradeUnit: '10,000通貨（ミニ通貨ペア4種は1,000通貨）',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '31通貨ペア（通常23＋ミニ4＋ラージ4）',
  tools: 'DMMFX PLUS / DMMFX スマホアプリ',
}
