import { ImageResponse } from 'next/og'
import { OgBrand, OgEyebrow, ogContainerStyle } from '@/lib/og-image'
import { SITE_NAME } from '@/lib/site-config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_NAME} 計算ツール`

export default function Image() {
  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <OgEyebrow label="無料ツール" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ display: 'flex', color: '#ffffff', fontSize: 60, fontWeight: 900 }}>
            FX計算ツール
          </span>
          <span style={{ display: 'flex', marginTop: 20, color: '#c7d2e8', fontSize: 28, fontWeight: 700 }}>
            必要証拠金 ・ pips損益 ・ 税金シミュレーター
          </span>
        </div>
        <OgBrand />
      </div>
    ),
    { ...size }
  )
}
