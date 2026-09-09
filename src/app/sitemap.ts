import type { MetadataRoute } from 'next'
import { articles } from '@/data/articles-index'
import { DEFAULT_UPDATED_AT, SITE_URL } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const latest = articles.reduce(
    (max, a) => ((a.updatedAt ?? DEFAULT_UPDATED_AT) > max ? (a.updatedAt ?? DEFAULT_UPDATED_AT) : max),
    DEFAULT_UPDATED_AT
  )
  const articleEntries = articles.map((article) => ({
    url: `${SITE_URL}/articles/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? DEFAULT_UPDATED_AT),
    changeFrequency: 'monthly' as const,
    priority: article.category === 'hub' ? 1 : article.category === 'broker-review' ? 0.8 : 0.6,
  }))

  return [
    { url: SITE_URL, lastModified: new Date(latest), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/kokunai`, lastModified: new Date(latest), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/kaigai`, lastModified: new Date(latest), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/tools`, lastModified: new Date(DEFAULT_UPDATED_AT), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(DEFAULT_UPDATED_AT), changeFrequency: 'yearly', priority: 0.3 },
    ...articleEntries,
  ]
}
