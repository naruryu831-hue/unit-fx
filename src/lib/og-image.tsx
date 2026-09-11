import type { CSSProperties } from 'react'
import { SITE_MARKET } from './site-config'

/** OGP画像で使うネイビー／ゴールドのカラートークン（globals.css の navy-950 / navy-900 / gold-500 / gold-400 と一致） */
export const OG_NAVY_950 = '#060c1c'
export const OG_NAVY_900 = '#0b1a33'
export const OG_GOLD_500 = '#d9a63a'
export const OG_GOLD_400 = '#ecc35f'

/** 1200x630 のOGP画像で共通して使う外枠スタイル。日本語フォントは外部fetchせずデフォルト(sans-serif)で描画する。 */
export const ogContainerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '68px 76px',
  background: `linear-gradient(135deg, ${OG_NAVY_950} 0%, ${OG_NAVY_900} 100%)`,
  fontFamily: 'sans-serif',
}

/** ゴールドのアクセントバー＋ラベル（例: 「国内FX ・ 業者レビュー」） */
export function OgEyebrow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ display: 'flex', width: 10, height: 32, borderRadius: 6, background: OG_GOLD_500 }} />
      <span style={{ marginLeft: 16, color: OG_GOLD_400, fontSize: 28, fontWeight: 700 }}>{label}</span>
    </div>
  )
}

/** 右下に置くサイト名のワードマーク（SITE_NAME に追従） */
export function OgBrand() {
  if (SITE_MARKET === 'overseas') {
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
        <span style={{ color: '#ffffff', fontSize: 34, fontWeight: 900 }}>海外</span>
        <span style={{ color: OG_GOLD_400, fontSize: 34, fontWeight: 900 }}>FX</span>
        <span style={{ color: '#ffffff', fontSize: 34, fontWeight: 900 }}>比較ラボ</span>
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
      <span style={{ color: '#ffffff', fontSize: 34, fontWeight: 900 }}>UNIT-</span>
      <span style={{ color: OG_GOLD_400, fontSize: 34, fontWeight: 900 }}>FX</span>
    </div>
  )
}
