import type { Broker } from '../brokers-types'

export const gmoGaika: Broker = {
  slug: 'gmo-gaika',
  name: 'GMO外貨（外貨ex）',
  officialUrl: 'https://www.gaikaex.com/',
  minAgeYears: 18,
  maxLeverage: '25倍（個人口座）',
  minDeposit: '指定なし（公式サイト参照）',
  bonusSummary: '新規口座開設キャッシュバックキャンペーンあり（条件・金額は公式サイト参照）',
  japaneseSupport: true,
  founded: 2003,
  summary: 'GMO外貨の外貨exは、GMOインターネットグループの国内FXサービス。旧YJFX!（ワイジェイFX）の流れを汲み、スマホアプリの使いやすさで知られる。',
  market: 'domestic',
  company: 'GMO外貨株式会社',
  registration: '関東財務局長（金商）第271号',
  minTradeUnit: '1,000通貨',
  spreadUsdJpy: '公式サイト参照',
  currencyPairs: '公式サイト参照',
  tools: '外貨ex アプリ / Exチャート',
}
