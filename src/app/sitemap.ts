import { SITE_URL } from '@/content/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [`${SITE_URL}/opengraph-image.png`],
    },
    ...['/privacy', '/terms'].map(path => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    })),
  ]
}
