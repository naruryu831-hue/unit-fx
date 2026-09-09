type TocItem = { id: string; level: 2 | 3; text: string }

export function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav
      aria-label="目次"
      className="rounded-2xl border border-line bg-white p-5 shadow-card"
    >
      <h2 className="flex items-center gap-2 text-sm font-black text-navy-900">
        <span className="h-4 w-1 rounded-full bg-gold-500" aria-hidden="true" />
        目次
      </h2>
      <ul className="mt-3 max-h-[70vh] space-y-1 overflow-y-auto">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-4' : 'pl-0'}>
            <a
              href={`#${item.id}`}
              className={`block rounded-md px-2 py-1 leading-snug transition-colors hover:bg-navy-50 hover:text-navy-900 ${
                item.level === 3 ? 'text-xs text-slate-500' : 'text-[13px] font-bold text-slate-700'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
