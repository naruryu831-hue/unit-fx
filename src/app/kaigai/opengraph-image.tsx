import { ImageResponse } from 'next/og'
import { articles } from '@/data/articles-index'
import { overseasBrokers } from '@/data/brokers-index'
import { OgBrand, OgEyebrow, ogContainerStyle } from '@/lib/og-image'
import { SITE_MARKET, SITE_NAME } from '@/lib/site-config'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// domestic ビルドでは /kaigai は 308 リダイレクトになるため、海外FXの文言をメタに残さない。
export const alt = SITE_MARKET === 'overseas' ? `${SITE_NAME} 海外FX 記事一覧` : SITE_NAME

export default function Image() {
  const articleCount = articles.filter((article) => article.market !== 'domestic').length

  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <OgEyebrow label="海外FX" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ display: 'flex', color: '#ffffff', fontSize: 68, fontWeight: 900 }}>
            海外FX 業者比較・記事一覧
          </span>
          <span style={{ display: 'flex', marginTop: 20, color: '#c7d2e8', fontSize: 28, fontWeight: 700 }}>
            提携{overseasBrokers.length}社 ・ 記事{articleCount}本
          </span>
        </div>
        <OgBrand />
      </div>
    ),
    { ...size }
  )
}
