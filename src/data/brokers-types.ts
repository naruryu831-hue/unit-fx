export type BrokerMarket = 'overseas' | 'domestic'

export type Broker = {
  slug: string
  name: string
  officialUrl: string
  minAgeYears: number
  maxLeverage: string
  minDeposit: string
  bonusSummary: string
  japaneseSupport: boolean
  founded: number
  summary: string
  /**
   * true の場合、公式サイトの実態確認が取れていない等の理由でリンクを出さない。
   * 省略時は false 相当（通常どおりリンクを表示する）。
   */
  linkCaution?: boolean
  /** 'domestic' は金融庁登録の国内FX業者。省略時は 'overseas'。 */
  market?: BrokerMarket
  /** 運営会社の正式名称（国内業者向け）。 */
  company?: string
  /** 金融商品取引業の登録番号（国内業者向け）。 */
  registration?: string
  /** 最低取引単位（例: '1,000通貨'）。 */
  minTradeUnit?: string
  /** 米ドル/円のスプレッド表示（例: '0.2銭（原則固定・例外あり）'）。 */
  spreadUsdJpy?: string
  /** 公式公表の基準スプレッド（対円は銭、EUR/USDはpips）。null は公式サイト参照。 */
  spreads?: {
    usdjpy?: number | null
    eurjpy?: number | null
    gbpjpy?: number | null
    audjpy?: number | null
    eurusd?: number | null
  }
  /** スプレッドの適用時間帯・例外の注記。 */
  spreadNote?: string
  /** スプレッド公表値の出典URL（公式）。 */
  spreadSource?: string
  /** スプレッド公表値の確認日（YYYY-MM-DD）。 */
  spreadCheckedAt?: string
  /** 取扱通貨ペア数（例: '21通貨ペア'）。 */
  currencyPairs?: string
  /** 取引ツール・アプリ名。 */
  tools?: string
}
