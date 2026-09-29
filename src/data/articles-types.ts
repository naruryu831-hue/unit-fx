import type { BrokerMarket } from './brokers-types'

export type FaqItem = {
  question: string
  answer: string
}

export type ArticleCategory =
  | 'hub'
  | 'broker-review'
  | 'account-opening'
  | 'problem-solving'
  | 'bonus-roundup'
  | 'comparison'
  | 'tax'

export type KeyFact = {
  label: string
  value: string
}

export type Article = {
  slug: string
  title: string
  category: ArticleCategory
  brokerSlugs: string[]
  body: string
  faq: FaqItem[]
  relatedSlugs?: string[]
  summaryPoints?: string[]
  /** 口座開設記事の冒頭に出す「この業者ならではの違い」の表（既存データ・本文にある事実のみ）。 */
  keyFacts?: KeyFact[]
  /** 解説記事の末尾に付く業者比較表の直前に出す、テーマと表を結ぶ2〜3文。 */
  bridgeNote?: string
  /** 'domestic' は国内FX向け記事。省略時は海外FX向け。 */
  market?: BrokerMarket
  /** 最終更新日（ISO 8601: YYYY-MM-DD）。省略時はサイト全体の既定日。 */
  updatedAt?: string
}
