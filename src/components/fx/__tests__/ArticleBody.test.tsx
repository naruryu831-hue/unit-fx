import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ArticleBody } from '../ArticleBody'

const sampleBody = `■ 1. はじめに
海外FX業者を選ぶ際のポイントを解説します。

・スプレッドが狭い
・約定力が高い

1. 口座を開設する
2. 入金する

■ 1-1. 詳細な比較
比較のポイントは以下の通りです。`

describe('ArticleBody', () => {
  it('renders level 2 and level 3 headings with ids', () => {
    render(<ArticleBody body={sampleBody} />)

    const h2 = screen.getByRole('heading', { level: 2, name: '1. はじめに' })
    expect(h2).toHaveAttribute('id')

    const h3 = screen.getByRole('heading', { level: 3, name: '1-1. 詳細な比較' })
    expect(h3).toHaveAttribute('id')
  })

  it('renders paragraphs', () => {
    render(<ArticleBody body={sampleBody} />)

    expect(screen.getByText('海外FX業者を選ぶ際のポイントを解説します。')).toBeInTheDocument()
    expect(screen.getByText('比較のポイントは以下の通りです。')).toBeInTheDocument()
  })

  it('renders unordered list items', () => {
    render(<ArticleBody body={sampleBody} />)

    const ul = screen.getByText('スプレッドが狭い').closest('ul')
    expect(ul).not.toBeNull()
    expect(screen.getByText('約定力が高い')).toBeInTheDocument()
  })

  it('renders ordered list items', () => {
    render(<ArticleBody body={sampleBody} />)

    const ol = screen.getByText('口座を開設する').closest('ol')
    expect(ol).not.toBeNull()
    expect(screen.getByText('入金する')).toBeInTheDocument()
  })
})
