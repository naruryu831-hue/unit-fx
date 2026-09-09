import type { Broker } from '../brokers-types'

export const minnaFx: Broker = {
  slug: 'minna-fx',
  name: 'みんなのFX（トレイダーズ証券）',
  officialUrl: 'https://min-fx.jp/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 1999,
  summary: 'みんなのFXはトレイダーズ証券が運営する国内FXサービス。スワップポイントと高金利通貨の取扱いに力を入れており、システムトレードのみんなのシストレも併設。',
  market: 'domestic',
  company: 'トレイダーズ証券株式会社',
  registration: '関東財務局長（金商）第123号',
  minTradeUnit: '1,000通貨',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '公式サイト参照',
  tools: 'FXトレーダー / みんなのFXアプリ',
}
