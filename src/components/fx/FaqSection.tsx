'use client'

import { useState } from 'react'

export type FaqItem = {
  question: string
  answer: string
}

export function FaqSection({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section aria-label="よくある質問" className="rounded-2xl border border-line bg-paper p-5 md:p-6">
      <h2 className="flex items-center gap-2 text-lg font-black text-navy-900"><span className="h-5 w-1.5 rounded-full bg-gold-500" aria-hidden="true" />よくある質問</h2>
      <dl className="mt-4">
        {items.map((item, index) => {
          const isOpen = openIndex === index
          const answerId = `faq-answer-${index}`

          return (
            <div key={item.question} className="border-b border-line py-4 last:border-b-0">
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-start justify-between gap-3 text-left font-bold text-navy-900"
                >
                  <span className="flex gap-2"><span className="shrink-0 font-black text-gold-600">Q.</span><span>{item.question}</span></span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </dt>
              <dd id={answerId} className="mt-2 text-sm leading-7 text-slate-700" hidden={!isOpen}>
                {item.answer}
              </dd>
            </div>
          )
        })}
      </dl>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
