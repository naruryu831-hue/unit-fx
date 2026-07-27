type TocItem = { id: string; level: 2 | 3; text: string }

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav aria-label="目次" className="bg-slate-50 border border-slate-200 rounded-xl p-4">
      <h2 className="font-bold">目次</h2>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : 'pl-0'}>
            <a href={`#${item.id}`} className="text-indigo-600 hover:underline">
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
