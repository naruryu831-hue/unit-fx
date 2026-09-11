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
  hfm: {
    // refid付きの紹介リンク1本のみのため、両方に同じリンクを使う。
    homepage: 'https://www.hfm.com/sv/jp/?refid=30560054',
    signup: 'https://www.hfm.com/sv/jp/?refid=30560054',
  },
  fxgt: {
    // 発行されているのは口座開設ページ直行の計測リンクのみ。
    signup: 'https://fxgt.link/register?refid=4614',
  },
  fxtf: {
    // A8.net（メディアID a26060521639 / 掲載サイト UNIT-FX = wid 003）で
    // ゴールデンウェイ・ジャパンと提携。素材は「自由テキスト」を使用しているため、
    // アンカーテキストはサイト側のボタン文言をそのまま使える。
    // 口座開設フォーム直行の素材は発行されていないため、両方に同じリンクを使う。
    homepage: 'https://px.a8.net/svt/ejp?a8mat=4BC737+T6AYQ+48D0+6A4FM',
    signup: 'https://px.a8.net/svt/ejp?a8mat=4BC737+T6AYQ+48D0+6A4FM',
  },
  jfx: {
    // A8.net（掲載サイト UNIT-FX = wid 003）でＪＦＸ株式会社と提携（2026-09-10承認）。
    // テキスト素材「JFX」（素材ID 003）。口座開設直行の素材は無いため両方に同じリンクを使う。
    homepage: 'https://px.a8.net/svt/ejp?a8mat=4BC737+UYLS2+25B2+5YZ76',
    signup: 'https://px.a8.net/svt/ejp?a8mat=4BC737+UYLS2+25B2+5YZ76',
  },
  'dmm-fx': {
    // アクセストレード（報酬¥30,000）に差し替え。A8.net（報酬¥20,000）より高いため。
    // 素材「DMM FX公式サイトへ」= homepage、「DMM FX無料口座お申込みへ」= signup。
    homepage: 'https://h.accesstrade.net/sp/cc?rk=0100kz3n00oyuv',
    signup: 'https://h.accesstrade.net/sp/cc?rk=0100kz3o00oyuv',
    // 旧: A8.net（掲載サイト UNIT-FX = wid 003）で株式会社ＤＭＭ．ｃｏｍ証券と提携（2026-09-11承認）。
    // homepage = 「【DMM FX】について詳しくはこちら」、signup = 「アカウント登録のお申込みはこちら」。
    // homepage: 'https://px.a8.net/svt/ejp?a8mat=4BC737+PLPC2+1WP2+69WPU',
    // signup: 'https://px.a8.net/svt/ejp?a8mat=4BC737+PLPC2+1WP2+6JC82',
  },
  // TitanFX / BigBoss / AXIORY はパートナー登録が未完了のため未設定。
  // 設定するまでは素の公式サイトURLにフォールバックし、報酬は発生しない。
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
