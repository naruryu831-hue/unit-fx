import { ImageResponse } from 'next/og'
import { brokers } from '@/data/brokers-index'
import { OgEyebrow, OG_GOLD_400, ogContainerStyle } from '@/lib/og-image'
import { SITE_MARKET, SITE_NAME } from '@/lib/site-config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_NAME} ${SITE_MARKET === 'overseas' ? '海外FX業者比較' : '国内FX業者比較'}`

export default function Image() {
  const eyebrow = SITE_MARKET === 'overseas' ? '海外FX業者比較' : '国内FX業者比較'
  const countLabel = SITE_MARKET === 'overseas' ? '海外' : '国内'

  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <OgEyebrow label={eyebrow} />
        {SITE_MARKET === 'overseas' ? (
          <span style={{ display: 'flex', color: OG_GOLD_400, fontSize: 88, fontWeight: 900 }}>{SITE_NAME}</span>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
            <span style={{ color: '#ffffff', fontSize: 104, fontWeight: 900 }}>UNIT-</span>
            <span style={{ color: OG_GOLD_400, fontSize: 104, fontWeight: 900 }}>FX</span>
          </div>
        )}
        <span style={{ display: 'flex', color: '#c7d2e8', fontSize: 30, fontWeight: 700 }}>
          {countLabel}
          {brokers.length}社を、事実だけで比較
        </span>
      </div>
    ),
    { ...size }
  )
}
