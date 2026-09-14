import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/*?_rsc=', '/*&_rsc=', '/favicon.ico?'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
