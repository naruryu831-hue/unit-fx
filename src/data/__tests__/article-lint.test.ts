import { describe, it, expect } from 'vitest'
import { allArticles } from '@/data/articles-index'
import { validateArticleMarkup } from '@/lib/article-validators'

// `npm run build` の prebuild で実行される。表記ルール違反があるとビルドが止まる。
describe('article markup lint', () => {
  it.each(allArticles)('article $slug passes validateArticleMarkup', (article) => {
    expect(validateArticleMarkup(article)).toEqual([])
  })
})
