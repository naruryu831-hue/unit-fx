import { ImageResponse } from 'next/og'
import { articles } from '@/data/articles-index'
import { getArticleBySlug } from '@/lib/get-article'
import { categoryLabels } from '@/lib/category-labels'
import { SITE_NAME } from '@/lib/site-config'
import { OgBrand, OgEyebrow, ogContainerStyle } from '@/lib/og-image'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  const title = article?.title ?? SITE_NAME
  const marketLabel = article ? (article.market === 'domestic' ? '国内FX' : '海外FX') : ''
  const categoryLabel = article ? categoryLabels[article.category] : ''
  const eyebrow = [marketLabel, categoryLabel].filter(Boolean).join(' ・ ') || SITE_NAME
  const titleFontSize = title.length > 40 ? 44 : title.length > 28 ? 52 : 60

  return new ImageResponse(
    (
      <div style={ogContainerStyle}>
        <OgEyebrow label={eyebrow} />
        <div style={{ display: 'flex', color: '#ffffff', fontSize: titleFontSize, fontWeight: 900, lineHeight: 1.35 }}>
          {title}
        </div>
        <OgBrand />
      </div>
    ),
    { ...size }
  )
}
