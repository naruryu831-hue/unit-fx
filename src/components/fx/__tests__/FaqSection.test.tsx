import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FaqSection } from '../FaqSection'

const items = [
  {
    question: '海外FXは違法ですか？',
    answer: '海外FX業者を利用すること自体は違法ではありませんが、無登録業者への勧誘には規制があります。',
  },
  {
    question: 'レバレッジはどれくらいですか？',
    answer: '業者によりますが最大で数百倍から千倍以上のレバレッジを提供する場合があります。',
  },
]

describe('FaqSection', () => {
  it('renders each question and answer', () => {
    render(<FaqSection items={items} />)
    expect(screen.getByText('海外FXは違法ですか？')).toBeInTheDocument()
  })

  it('embeds valid FAQPage JSON-LD structured data', () => {
    const { container } = render(<FaqSection items={items} />)
    const script = container.querySelector('script[type="application/ld+json"]')
    expect(script).not.toBeNull()
    const data = JSON.parse(script!.textContent ?? '{}')
    expect(data['@type']).toBe('FAQPage')
    expect(data.mainEntity).toHaveLength(2)
    expect(data.mainEntity[0].name).toBe('海外FXは違法ですか？')
  })

  it('hides all answers initially (accordion closed by default)', () => {
    render(<FaqSection items={items} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    buttons.forEach((button) => {
      expect(button).toHaveAttribute('aria-expanded', 'false')
    })
    expect(screen.queryByText(items[0].answer)).not.toBeVisible()
    expect(screen.queryByText(items[1].answer)).not.toBeVisible()
  })

  it('opens an answer when its question button is clicked', () => {
    render(<FaqSection items={items} />)
    const button = screen.getByRole('button', { name: /海外FXは違法ですか？/ })
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText(items[0].answer)).toBeVisible()
    // the other item should remain closed
    const otherButton = screen.getByRole('button', { name: /レバレッジはどれくらいですか？/ })
    expect(otherButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the answer again when the question button is clicked a second time', () => {
    render(<FaqSection items={items} />)
    const button = screen.getByRole('button', { name: /海外FXは違法ですか？/ })
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText(items[0].answer)).not.toBeVisible()
  })

  it('keeps the JSON-LD script content unchanged regardless of open/close state', () => {
    const { container } = render(<FaqSection items={items} />)
    const getJsonLdCount = () => {
      const script = container.querySelector('script[type="application/ld+json"]')
      const data = JSON.parse(script!.textContent ?? '{}')
      return data.mainEntity.length
    }
    expect(getJsonLdCount()).toBe(2)
    const button = screen.getByRole('button', { name: /海外FXは違法ですか？/ })
    fireEvent.click(button)
    expect(getJsonLdCount()).toBe(2)
    fireEvent.click(button)
    expect(getJsonLdCount()).toBe(2)
  })
})
