import { parseBody } from '@/lib/parse-body'

export function ArticleBody({ body }: { body: string }) {
  const blocks = parseBody(body)

  return (
    <div>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  id={block.id}
                  className="text-2xl font-bold text-slate-900 mt-10 mb-4 scroll-mt-24"
                >
                  {block.text}
                </h2>
              )
            }
            return (
              <h3
                key={index}
                id={block.id}
                className="text-xl font-bold text-slate-900 mt-8 mb-3 scroll-mt-24"
              >
                {block.text}
              </h3>
            )
          case 'paragraph':
            return (
              <p key={index} className="text-slate-700 leading-relaxed mb-4">
                {block.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={index} className="list-disc pl-6 space-y-1 text-slate-700 mb-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={index} className="list-decimal pl-6 space-y-1 text-slate-700 mb-4">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
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
