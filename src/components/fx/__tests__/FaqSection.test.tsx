import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FaqSection } from '../FaqSection'

const items = [
  {
    question: '海外FXは違法ですか？',
    answer: '海外FX業者を利用すること自体は違法ではありませんが、無登録業者への勧誘には規制があります。',
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
    expect(data.mainEntity).toHaveLength(1)
    expect(data.mainEntity[0].name).toBe('海外FXは違法ですか？')
  })
})
