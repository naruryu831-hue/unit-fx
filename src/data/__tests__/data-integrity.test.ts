import { describe, it, expect } from 'vitest'
import { brokers } from '@/data/brokers-index'
import { articles } from '@/data/articles-index'
import { validateBroker } from '@/lib/validators'
import { validateArticleTitleCount } from '@/lib/article-validators'

describe('data integrity', () => {
  it.each(brokers)('broker $slug passes validateBroker', (broker) => {
    expect(validateBroker(broker)).toEqual([])
  })

  it.each(articles)('article $slug passes validateArticleTitleCount', (article) => {
    expect(validateArticleTitleCount(article)).toEqual([])
  })
})
