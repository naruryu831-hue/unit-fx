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

export type Article = {
  slug: string
  title: string
  category: ArticleCategory
  brokerSlugs: string[]
  body: string
  faq: FaqItem[]
  relatedSlugs?: string[]
  summaryPoints?: string[]
  /** 'domestic' は国内FX向け記事。省略時は海外FX向け。 */
  market?: BrokerMarket
  /** 最終更新日（ISO 8601: YYYY-MM-DD）。省略時はサイト全体の既定日。 */
  updatedAt?: string
}
