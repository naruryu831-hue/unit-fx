import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles-index'
import { SITE_URL } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const articleEntries = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
  }))

  return [
    { url: SITE_URL },
    { url: `${SITE_URL}/tools` },
    { url: `${SITE_URL}/about` },
    ...articleEntries,
  ]
}
