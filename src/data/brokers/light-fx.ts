import type { Broker } from '../brokers-types'

export const lightFx: Broker = {
  slug: 'light-fx',
  name: 'LIGHT FX（トレイダーズ証券）',
  officialUrl: 'https://lightfx.jp/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座。一部通貨ペアは10倍）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバック等のキャンペーンあり（条件は公式サイト参照）',
  japaneseSupport: true,
  founded: 1999,
  summary: 'LIGHT FXはトレイダーズ証券が「みんなのFX」と並行して運営する国内FXサービス。低スプレッドに特化したLIGHTペアと、TradingView搭載の取引ツールが特徴。',
  market: 'domestic',
  company: 'トレイダーズ証券株式会社',
  registration: '関東財務局長（金商）第123号',
  minTradeUnit: '1,000通貨',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '通常38通貨ペア＋LIGHTペア（公式サイト参照）',
  tools: 'LIGHT FX アプリ（TradingView搭載）/ PC取引ツール',
}
