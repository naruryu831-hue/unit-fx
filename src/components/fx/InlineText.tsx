import Link from 'next/link'
import { SITE_MARKET } from '@/lib/site-config'

// 本文中のリンク記法:
//   [表示文字](/articles/slug)  … Markdown 風の内部リンク
//   （/tools）や /articles/xxx  … 括弧内などに裸で書かれたサイト内パス
// 裸パスの一覧ページ（/kokunai・/kaigai）は自市場のものだけを認識する。
const MARKET_PATH = SITE_MARKET === 'overseas' ? 'kaigai' : 'kokunai'
const TOKEN_RE = new RegExp(
  `\\[([^\\]]+)\\]\\((\\/[^\\s)]+)\\)|(\\/(?:articles\\/[a-z0-9-]+|tools|about|${MARKET_PATH})(?:#[a-z0-9-]+)?)(?![a-z0-9-])`,
  'g'
)

const PATH_LABELS: Record<string, string> = {
  '/tools': '計算ツール',
  '/about': '運営者情報',
  [`/${MARKET_PATH}`]: SITE_MARKET === 'overseas' ? '海外FX一覧' : '国内FX一覧',
}

export function InlineText({ text }: { text: string }) {
  const nodes: React.ReactNode[] = []
  let last = 0
  // matchAll は呼び出しごとに独立したイテレータを作るため、モジュール直下の
  // TOKEN_RE.lastIndex を書き換える必要がない（レンダーのたびに共有状態を
  // ミューテートしない）。
  for (const match of text.matchAll(TOKEN_RE)) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const href = match[2] ?? match[3]
    const label = match[1] ?? PATH_LABELS[href.split('#')[0]] ?? href
    nodes.push(
      <Link prefetch={false}
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
