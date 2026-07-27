import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleView } from '../ArticleView'
import { getArticleBySlug, getBrokersForArticle } from '@/lib/get-article'

describe('ArticleView', () => {
  it('renders the title, risk disclaimer, comparison table, and FAQ together', () => {
    const article = getArticleBySlug('kaigai-fx-hikaku-hub')!
    const brokers = getBrokersForArticle(article)
    render(<ArticleView article={article} brokers={brokers} />)

    expect(screen.getByRole('heading', { name: article.title })).toBeInTheDocument()
    expect(screen.getByRole('note', { name: 'リスク・注意事項' })).toBeInTheDocument()
    expect(screen.getByText('XM(XM Trading)')).toBeInTheDocument()
    expect(screen.getByText('よくある質問')).toBeInTheDocument()
  })
})
