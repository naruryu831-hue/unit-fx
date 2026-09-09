import type { Broker } from '../brokers-types'

export const sbiFxtrade: Broker = {
  slug: 'sbi-fxtrade',
  name: 'SBI FXトレード',
  officialUrl: 'https://www.sbifxt.co.jp/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 2011,
  summary: 'SBI FXトレードはSBIグループの国内FX専業会社。1通貨単位から取引できる点が最大の特徴で、少額からの練習に向く。',
  market: 'domestic',
  company: 'SBI FXトレード株式会社',
  registration: '公式サイト参照',
  minTradeUnit: '1通貨',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '34通貨ペア',
  tools: 'SBI FXTRADE（PC/スマホアプリ）',
}
