import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TableOfContents } from '../TableOfContents'

describe('TableOfContents', () => {
  it('renders nothing when items is empty', () => {
    const { container } = render(<TableOfContents items={[]} />)
    expect(container).toBeEmptyDOMElement()
  })

  it('renders links for level 2 and level 3 items with correct href', () => {
    render(
      <TableOfContents
        items={[
          { id: 'section-1', level: 2, text: 'セクション1' },
          { id: 'section-1-1', level: 3, text: 'サブセクション1-1' },
        ]}
      />
    )

    const link2 = screen.getByRole('link', { name: 'セクション1' })
    expect(link2).toHaveAttribute('href', '#section-1')

    const link3 = screen.getByRole('link', { name: 'サブセクション1-1' })
    expect(link3).toHaveAttribute('href', '#section-1-1')
  })

  it('indents level 3 items more deeply than level 2 items', () => {
    render(
      <TableOfContents
        items={[
          { id: 'section-1', level: 2, text: 'セクション1' },
          { id: 'section-1-1', level: 3, text: 'サブセクション1-1' },
        ]}
      />
    )

    const link2 = screen.getByRole('link', { name: 'セクション1' })
    const link3 = screen.getByRole('link', { name: 'サブセクション1-1' })

    const item2 = link2.closest('li') ?? link2.parentElement
    const item3 = link3.closest('li') ?? link3.parentElement

    expect(item2).not.toBeNull()
    expect(item3).not.toBeNull()
    expect(item2!.className).not.toBe(item3!.className)
  })

  it('wraps content in a nav with 目次 heading', () => {
    render(
      <TableOfContents items={[{ id: 'section-1', level: 2, text: 'セクション1' }]}
      />
    )

    const nav = screen.getByRole('navigation', { name: '目次' })
    expect(nav).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: '目次' })).toBeInTheDocument()
  })
})
