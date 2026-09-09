import Link from 'next/link'

// 本文中のリンク記法:
//   [表示文字](/articles/slug)  … Markdown 風の内部リンク
//   （/tools）や /articles/xxx  … 括弧内などに裸で書かれたサイト内パス
const TOKEN_RE = /\[([^\]]+)\]\((\/[^\s)]+)\)|(\/(?:articles\/[a-z0-9-]+|tools|about|kokunai|kaigai)(?:#[a-z0-9-]+)?)(?![a-z0-9-])/g

const PATH_LABELS: Record<string, string> = {
  '/tools': '計算ツール',
  '/about': '運営者情報',
  '/kokunai': '国内FX一覧',
  '/kaigai': '海外FX一覧',
}

export function InlineText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  TOKEN_RE.lastIndex = 0
  while ((match = TOKEN_RE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const href = match[2] ?? match[3]
    const label = match[1] ?? PATH_LABELS[href.split('#')[0]] ?? href
    nodes.push(
      <Link
        key={`${match.index}-${href}`}
        href={href}
        className="font-bold text-navy-800 underline decoration-gold-500 decoration-2 underline-offset-2 hover:text-navy-950"
      >
        {label}
      </Link>
    )
    last = match.index + match[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return <>{nodes}</>
}
