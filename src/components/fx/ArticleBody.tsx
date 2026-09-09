import { parseBody } from '@/lib/parse-body'

export function ArticleBody({ body }: { body: string }) {
  const blocks = parseBody(body)

  return (
    <div className="text-[15px] leading-8 text-slate-700 md:text-base">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="mt-12 mb-5 scroll-mt-24 border-l-4 border-gold-500 bg-navy-50 py-3 pl-4 pr-3 text-xl font-black leading-snug text-navy-900 md:text-2xl"
                >
                  {block.text}
                </h2>
              )
            }
            return (
              <h3
                key={index}
                id={block.id}
                className="mt-8 mb-3 scroll-mt-24 border-b-2 border-navy-100 pb-2 text-lg font-black text-navy-900"
              >
                {block.text}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={index} className="mb-5">
                {block.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={index} className="mb-5 space-y-2 rounded-xl bg-paper px-5 py-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2.5 leading-7">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={index} className="mb-5 space-y-2.5">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3 leading-7">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-900 text-xs font-black text-white">
                      {itemIndex + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
