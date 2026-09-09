import { ImageResponse } from 'next/og'
import { articles } from '@/data/articles-index'
import { domesticBrokers } from '@/data/brokers-index'
import { OgBrand, OgEyebrow, ogContainerStyle } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'UNIT-FX 国内FX 記事一覧'

export default function Image() {
  const articleCount = articles.filter((article) => article.market === 'domestic').length

  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <OgEyebrow label="国内FX" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ display: 'flex', color: '#ffffff', fontSize: 68, fontWeight: 900 }}>
            国内FX 業者比較・記事一覧
          </span>
          <span style={{ display: 'flex', marginTop: 20, color: '#c7d2e8', fontSize: 28, fontWeight: 700 }}>
            金融庁登録{domesticBrokers.length}社 ・ 記事{articleCount}本
          </span>
        </div>
        <OgBrand />
      </div>
    ),
    { ...size }
  )
}
