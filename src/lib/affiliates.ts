import { getBrokerBySlug } from '@/data/brokers-index'

// ASP/IB審査が通った業者から、ここにアフィリエイトリンクを追加していく。
// 未設定(null)の間は公式サイトへの通常リンクにフォールバックする。
const AFFILIATE_LINKS: Record<string, string | null> = {
  xm: null,
}

// broker.linkCaution が true の業者は、公式サイトの実態確認が取れていない等の理由で
// リンクを出さない方針のため、ComparisonTable 以外の呼び出し元でも警告なくリンクが
// 出てしまわないよう、この関数自体が null を返すようにする。
export function getBrokerLink(slug: string): string | null {
  const broker = getBrokerBySlug(slug)
  if (!broker) {
    throw new Error(`Unknown broker slug: ${slug}`)
  }
  if (broker.linkCaution === true) {
    return null
  }
  return AFFILIATE_LINKS[slug] ?? broker.officialUrl
}
