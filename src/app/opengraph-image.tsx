import { ImageResponse } from 'next/og'
import { domesticBrokers, overseasBrokers } from '@/data/brokers-index'
import { OgEyebrow, OG_GOLD_400, ogContainerStyle } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'UNIT-FX 国内FX・海外FX業者比較'

export default function Image() {
  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <OgEyebrow label="国内FX・海外FX業者比較" />
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
          <span style={{ color: '#ffffff', fontSize: 104, fontWeight: 900 }}>UNIT-</span>
          <span style={{ color: OG_GOLD_400, fontSize: 104, fontWeight: 900 }}>FX</span>
        </div>
        <span style={{ display: 'flex', color: '#c7d2e8', fontSize: 30, fontWeight: 700 }}>
          国内{domesticBrokers.length}社 ・ 海外{overseasBrokers.length}社を、事実だけで比較
        </span>
      </div>
    ),
    { ...size }
  )
}
