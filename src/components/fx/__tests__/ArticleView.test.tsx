import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleView } from '../ArticleView'
import { getArticleBySlug, getBrokersForArticle } from '@/lib/get-article'

// get-article.ts は SITE_MARKET でフィルタ済みの articles / getBrokerBySlug を使う実装のため、
// 国内FXの固定記事（kokunai-fx-hikaku-hub）は overseas ビルド設定でテストを実行すると
// 見つからなくなる。市場フィルタを経由しない allArticles / allBrokers を参照するようにモックする。
vi.mock('@/data/articles-index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/articles-index')>()
  return { ...actual, articles: actual.allArticles }
})

vi.mock('@/data/brokers-index', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/data/brokers-index')>()
  return { ...actual, getBrokerBySlug: (slug: string) => actual.allBrokers.find((b) => b.slug === slug) }
})

describe('ArticleView', () => {
  it('renders the title, risk disclaimer, comparison table, and FAQ together', () => {
    const article = getArticleBySlug('kokunai-fx-hikaku-hub')!
    const brokers = getBrokersForArticle(article)
    render(<ArticleView article={article} brokers={brokers} />)

    expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument()
    expect(screen.getByRole('note', { name: 'リスク・注意事項' })).toBeInTheDocument()
    expect(screen.getAllByText('DMM FX').length).toBeGreaterThan(0)
    expect(screen.getByText('よくある質問')).toBeInTheDocument()
  })
})
