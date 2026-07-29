import { getBrokerBySlug } from '@/data/brokers-index'

type AffiliateLinks = {
  /** 業者トップページへ飛ぶ計測リンク。「公式サイト」ボタンで使う。 */
  homepage?: string
  /** 口座開設フォームへ直接飛ぶ計測リンク。「無料で口座開設する」ボタンで使う。 */
  signup?: string
}

// パートナー管理画面で発行された計測リンクをここに追加する。
// 未設定の業者は各社の通常の公式サイトURLにフォールバックする（＝報酬は発生しない）。
const AFFILIATE_LINKS: Record<string, AffiliateLinks> = {
  xm: {
    homepage: 'https://affx.click/tFXMb',
    signup: 'https://affx.click/h0xVg',
  },
  exness: {
    // Exnessはパートナーリンクが1本のみ発行されるため、両方に同じリンクを使う。
    homepage: 'https://one.exnessonelink.com/a/228znq0vo6',
    signup: 'https://one.exnessonelink.com/a/228znq0vo6',
  },
}

function resolve(slug: string, prefer: keyof AffiliateLinks): string | null {
  const broker = getBrokerBySlug(slug)
  if (!broker) {
    throw new Error(`Unknown broker slug: ${slug}`)
  }
  // linkCaution の業者は、公式サイトの実態確認が取れていない等の理由でリンクを出さない。
  if (broker.linkCaution === true) {
    return null
  }

  const links = AFFILIATE_LINKS[slug]
  const other: keyof AffiliateLinks = prefer === 'signup' ? 'homepage' : 'signup'
  return links?.[prefer] ?? links?.[other] ?? broker.officialUrl
}

/** 「公式サイト」ボタン用のリンク。 */
export function getBrokerLink(slug: string): string | null {
  return resolve(slug, 'homepage')
}

/** 「無料で口座開設する」ボタン用のリンク。 */
export function getBrokerSignupLink(slug: string): string | null {
  return resolve(slug, 'signup')
}

/** 計測リンクが設定済みかどうか（報酬が発生する状態か）。 */
export function hasAffiliateLink(slug: string): boolean {
  return AFFILIATE_LINKS[slug] !== undefined
}
