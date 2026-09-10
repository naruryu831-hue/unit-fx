export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://unit-fx.jp'
export const SITE_NAME = 'UNIT-FX'
export const SITE_DESCRIPTION =
  '国内FX11社と海外FX7社を、取引単位・スプレッドの読み方・レバレッジ・税金など公式サイトで確認できる事実だけで比較。必要証拠金・税金の計算ツールも無料で使えます。'
/** 個別記事に updatedAt が無い場合に使う、サイト全体の最終確認日（ISO 8601）。 */
export const DEFAULT_UPDATED_AT = '2026-09-09'

export function formatJaDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number)
  return `${y}年${m}月${d}日`
}
