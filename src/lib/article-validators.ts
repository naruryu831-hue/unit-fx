import type { Article } from '@/data/articles-types'

const COUNT_TITLE_PATTERN = /(\d+)\s*(選|社|本)/

export function validateArticleTitleCount(article: Article): string[] {
  const errors: string[] = []
  const match = article.title.match(COUNT_TITLE_PATTERN)
  if (match) {
    const claimedCount = Number(match[1])
    if (claimedCount !== article.brokerSlugs.length) {
      errors.push(
        `title claims ${claimedCount} items but brokerSlugs has ${article.brokerSlugs.length}`
      )
    }
  }
  if (article.faq.length < 1) {
    errors.push('article must include at least one FAQ item')
  }
  return errors
}
