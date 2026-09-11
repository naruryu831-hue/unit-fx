export type SiteMarket = 'domestic' | 'overseas'

/**
 * ビルド対象市場。未設定は必ず 'domestic'（本番 unit-fx.jp が誤って海外FXを出さないため）。
 * 'overseas' を明示指定したときだけ海外FX専門サイトとしてビルドする。
 */
export const SITE_MARKET: SiteMarket =
  process.env.NEXT_PUBLIC_SITE_MARKET === 'overseas' ? 'overseas' : 'domestic'

/** 海外FX専門サイトの本番URL。domestic ビルドのリダイレクト先として使う。 */
export const OVERSEAS_SITE_URL = 'https://kaigai-fx-lab.vercel.app'

const DEFAULT_SITE_URL = SITE_MARKET === 'overseas' ? OVERSEAS_SITE_URL : 'https://unit-fx.jp'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL

export const SITE_NAME = SITE_MARKET === 'overseas' ? '海外FX比較ラボ' : 'UNIT-FX'

/** ロゴのアイコン1文字（例: ヘッダーの丸バッジ）。 */
export const SITE_LOGO_LETTER = SITE_MARKET === 'overseas' ? 'K' : 'U'

export const SITE_DESCRIPTION =
  SITE_MARKET === 'overseas'
    ? '海外FX7社を、取引単位・スプレッドの読み方・レバレッジ・税金など公式サイトで確認できる事実だけで比較。必要証拠金・税金の計算ツールも無料で使えます。'
    : '国内FX11社を、取引単位・スプレッドの読み方・レバレッジ・税金など公式サイトで確認できる事実だけで比較。必要証拠金・税金の計算ツールも無料で使えます。'

/**
 * GA4 測定ID。NEXT_PUBLIC_GA_ID で常に上書き可能。
 * domestic は未設定時 UNIT-FX 本番IDにフォールバックするが、
 * overseas は未設定なら null（GAタグ自体を出力しない）。
 */
export const GA_ID: string | null =
  process.env.NEXT_PUBLIC_GA_ID ?? (SITE_MARKET === 'domestic' ? 'G-SLRLGGPQRW' : null)

/** 個別記事に updatedAt が無い場合に使う、サイト全体の最終確認日（ISO 8601）。 */
export const DEFAULT_UPDATED_AT = '2026-09-09'

export function formatJaDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${y}年${m}月${d}日`
}
