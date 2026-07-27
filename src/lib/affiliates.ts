import { getBrokerBySlug } from '@/data/brokers-index'

// ASP/IB審査が通った業者から、ここにアフィリエイトリンクを追加していく。
// 未設定(null)の間は公式サイトへの通常リンクにフォールバックする。
const AFFILIATE_LINKS: Record<string, string | null> = {
  xm: null,
}

export function getBrokerLink(slug: string): string {
  const broker = getBrokerBySlug(slug)
  if (!broker) {
    throw new Error(`Unknown broker slug: ${slug}`)
  }
  return AFFILIATE_LINKS[slug] ?? broker.officialUrl
}
