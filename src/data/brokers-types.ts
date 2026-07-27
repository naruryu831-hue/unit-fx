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
}
