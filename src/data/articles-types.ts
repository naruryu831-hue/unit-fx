import type { FaqItem } from '@/components/fx/FaqSection'

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
}
